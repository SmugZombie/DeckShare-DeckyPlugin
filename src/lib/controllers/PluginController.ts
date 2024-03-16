import { ServerAPI } from "decky-frontend-lib";
import { ScreenshotsController } from "./ScreenshotsController";
import { InstancesController } from "./InstancesController";
import { PyInterop } from "../../PyInterop";
import { SteamController } from "./SteamController";
import { Screenshot } from "../data-structures/Screenshot";
import { WebSocketClient } from "../../WebsocketClient";
import { HookController } from "./HookController";
import { ScreenshotsState } from "../../state/ScreenshotsState";
import { History, debounce } from "../Utils";

/**
 * Main controller class for the plugin.
 */
export class PluginController {
  // @ts-ignore
  private static server: ServerAPI;
  private static state: ScreenshotsState;

  private static steamController: SteamController;
  private static screenshotsController: ScreenshotsController;
  private static instancesController: InstancesController;
  private static hooksController: HookController;
  private static webSocketClient: WebSocketClient;

  private static gameLifetimeRegister: Unregisterer;
  private static historyListener: () => void;

  /**
   * Sets the plugin's serverAPI.
   * @param server The serverAPI to use.
   * @param state The plugin state.
   */
  static setup(server: ServerAPI, state: ScreenshotsState): void {
    this.server = server;
    this.state = state;
    this.steamController = new SteamController();
    this.screenshotsController = new ScreenshotsController(this.steamController);
    this.webSocketClient = new WebSocketClient("localhost", "5000", 1000);
    this.instancesController = new InstancesController(this.screenshotsController, this.webSocketClient, this.state);
    this.hooksController = new HookController(this.steamController, this.instancesController, this.webSocketClient, this.state);

    this.gameLifetimeRegister = this.steamController.registerForAllAppLifetimeNotifications((appId: number, data: LifetimeNotification) => {
      const currGame = this.state.getPublicState().currentGame;
      
      if (data.bRunning) {
        if (currGame == null || currGame.appid != appId) {
          this.state.setGameRunning(true);
          const overview = appStore.GetAppOverviewByAppID(appId);
          this.state.setCurrentGame(overview);

          PyInterop.log(`Set currentGame to ${overview?.display_name} appId: ${appId}`);
        }
      } else {
        this.state.setGameRunning(false);
      }
    });
    
    this.historyListener = History.listen(debounce((info: any) => {
      const currGame = this.state.getPublicState().currentGame;
      const pathStart = "/library/app/";

      if (!this.state.getPublicState().gameRunning) {
        if (info.pathname.startsWith(pathStart)) {
          const appId = parseInt(info.pathname.substring(info.pathname.indexOf(pathStart) + pathStart.length));
  
          if (currGame == null || currGame.appid != appId) {
            const overview = appStore.GetAppOverviewByAppID(appId);
            this.state.setCurrentGame(overview);
  
            PyInterop.log(`Set currentGame to ${overview?.display_name} appId: ${appId}.`);
          }
        } else if (currGame != null) {
          this.state.setCurrentGame(null);
          PyInterop.log(`Set currentGame to null.`);
        }
      }
    }, 200));
  }

  /**
   * Sets the plugin to initialize once the user logs in.
   * @returns The unregister function for the login hook.
   */
  static initOnLogin(): Unregisterer {
    return this.steamController.registerForAuthStateChange(async (username) => {
      PyInterop.log(`user logged in. [DEBUG INFO] username: ${username};`);
      if (await this.steamController.waitForServicesToInitialize()) {
        PluginController.init();
      } else {
        PyInterop.toast("Error", "Failed to initialize, try restarting.");
      }
    }, null, true);
  }

  /**
   * Initializes the Plugin.
   */
  static async init(): Promise<void> {
    PyInterop.log("PluginController initializing...");

    //* clean out all screenshots with names that start with "DeckShare - Instance"
    const oldInstances = (await this.screenshotsController.getScreenshots()).filter((screenshot:SteamAppDetails) => screenshot.strDisplayName.startsWith("DeckShare - Instance"));

    if (oldInstances.length > 0) {
      for (const instance of oldInstances) {
        await this.screenshotsController.removeScreenshotById(instance.unAppID);
      }
    }

    this.webSocketClient.connect();

    const screenshots = (await PyInterop.getScreenshots()).result;
    if (typeof screenshots === "string") {
      PyInterop.log(`Failed to get screenshots for hooks. Error: ${screenshots}`);
    } else {
      this.hooksController.init(screenshots);
    }
    
    PyInterop.log("PluginController initialized.");
  }

  /**
   * Checks if a screenshot is running.
   * @param shorcutId The id of the screenshot to check for.
   * @returns True if the screenshot is running.
   */
  static checkIfRunning(shorcutId: string): boolean {
    return Object.keys(PluginController.instancesController.instances).includes(shorcutId);
  }

  /**
   * Launches a steam screenshot.
   * @param screenshotName The name of the steam screenshot to launch.
   * @param screenshot The screenshot to launch.
   * @param runnerPath The runner path for the screenshot.
   * @param onExit An optional function to run when the instance closes.
   * @returns A promise resolving to true if the screenshot was successfully launched.
   */
  static async launchScreenshot(screenshot: Screenshot, onExit: (data?: LifetimeNotification) => void = () => {}): Promise<boolean> {
    const createdInstance = await this.instancesController.createInstance(screenshot);
    if (createdInstance) {
      PyInterop.log(`Created Instance for screenshot ${screenshot.name}`);
      return await this.instancesController.launchInstance(screenshot.id, onExit, {});
    } else {
      return false;
    }
  }

  /**
   * Closes a running screenshot.
   * @param screenshot The screenshot to close.
   * @returns A promise resolving to true if the screenshot was successfully closed.
   */
  static async closeScreenshot(screenshot:Screenshot): Promise<boolean> {
    const stoppedInstance = await this.instancesController.stopInstance(screenshot.id);
    if (stoppedInstance) {
      PyInterop.log(`Stopped Instance for screenshot ${screenshot.name}`);
      return await this.instancesController.killInstance(screenshot.id);
    } else {
      PyInterop.log(`Failed to stop instance for screenshot ${screenshot.name}. Id: ${screenshot.id}`);
      return false;
    }
  }

  /**
   * Kills a screenshot's instance.
   * @param screenshot The screenshot to kill.
   * @returns A promise resolving to true if the screenshot's instance was successfully killed.
   */
  static async killScreenshot(screenshot: Screenshot): Promise<boolean> {
    return await this.instancesController.killInstance(screenshot.id);
  }

  /**
   * Updates the hooks for a specific screenshot.
   * @param screenshot The screenshot to update the hooks for.
   */
  static updateHooks(screenshot: Screenshot): void {
    this.hooksController.updateHooks(screenshot);
  }

  /**
   * Removes the hooks for a specific screenshot.
   * @param screenshot The screenshot to remove the hooks for.
   */
  static removeHooks(screenshot: Screenshot): void {
    this.hooksController.unregisterAllHooks(screenshot);
  }

  /**
   * Registers a callback to run when WebSocket messages of a given type are recieved.
   * @param type The type of message to register for.
   * @param callback The callback to run.
   */
  static onWebSocketEvent(type: string, callback: (data: any) => void) {
    this.webSocketClient.on(type, callback);
  }

  /**
   * Function to run when the plugin dismounts.
   */
  static dismount(): void {
    PyInterop.log("PluginController dismounting...");

    this.screenshotsController.onDismount();
    this.webSocketClient.disconnect();
    this.hooksController.dismount();
    this.gameLifetimeRegister.unregister();
    this.historyListener();
    
    PyInterop.log("PluginController dismounted.");
  }
}
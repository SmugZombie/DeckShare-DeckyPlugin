import { ServerAPI } from "decky-frontend-lib";
import { ScreenshotsController } from "./screenshotscontroller";
import { PyInterop } from "../PyInterop";
import { SteamController } from "./steamcontroller";
import { Screenshot } from "../lib/datastructure.screenshots";
import { WebSocketClient } from "../WebsocketClient";
import { HookController } from "./hookcontroller";
/**
 * Main controller class for the plugin.
 */

type Unregisterer = {
    unregister: () => void;
  }

export class PluginController {
  // @ts-ignore
  private static server: ServerAPI;
  private static steamController: SteamController;
  private static screenshotsController: ScreenshotsController;
  private static hooksController: HookController;
  private static webSocketClient: WebSocketClient;

  /**
   * Sets the plugin's serverAPI.
   * @param server The serverAPI to use.
   * @param state The plugin state.
   */
  static setup(server: ServerAPI): void {
    this.server = server;
    this.steamController = new SteamController();
    this.screenshotsController = new ScreenshotsController(this.steamController);
    this.webSocketClient = new WebSocketClient("localhost", "5000", 1000);
    this.hooksController = new HookController(this.steamController, this.webSocketClient);
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
    this.webSocketClient.connect();

    const webhookUrl = (await PyInterop.getWebhookUrl()).result;
    if (webhookUrl == "" || webhookUrl == null || webhookUrl == "False" || webhookUrl == "https://discord.com/api/webhooks/") {
      PyInterop.log("Please configure the webhook url in the plugin settings.")
      PyInterop.toast("DeckShare", "Please configure the webhook url in the plugin settings.");
    }

    const screenshots = (await PyInterop.getScreenshots()).result;
    if (typeof screenshots === "string") {
      PyInterop.log(`Failed to get screenshots for hooks. Error: ${screenshots}`);
    } else {
      this.hooksController.init(screenshots);
    }
    
    PyInterop.log("PluginController initialized.");
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
    PyInterop.log("PluginController dismounted.");
  }
}
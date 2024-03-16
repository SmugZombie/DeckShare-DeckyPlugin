import { Instance } from "../data-structures/Instance";
import { Screenshot } from "../data-structures/Screenshot";
import { ScreenshotsController } from "./ScreenshotsController";
import { PyInterop } from "../../PyInterop";
import { Navigation } from "decky-frontend-lib";
import { WebSocketClient } from "../../WebsocketClient";
import { ScreenshotsState } from "../../state/ScreenshotsState";

/**
 * Controller for managing plugin instances.
 */
export class InstancesController {
  private baseName = "DeckShare";
  private runnerPath = "/home/deck/homebrew/plugins/deckshare/screenshotsRunner.sh";
  private startDir = "\"/home/deck/homebrew/plugins/deckshare/\"";
  private shorcutsController:ScreenshotsController;
  private webSocketClient: WebSocketClient;
  private state: ScreenshotsState;

  numInstances: number;
  instances: { [uuid:string]: Instance };

  /**
   * Creates a new InstancesController.
   * @param screenshotsController The screenshots controller used by this class.
   * @param webSocketClient The WebSocketClient used by this class.
   * @param state The plugin state.
   */
  constructor(screenshotsController: ScreenshotsController, webSocketClient: WebSocketClient, state: ScreenshotsState) {
    this.shorcutsController = screenshotsController;
    this.webSocketClient = webSocketClient;
    this.state = state;

    PyInterop.getHomeDir().then((res) => {
      this.runnerPath = `/home/${res.result}/homebrew/plugins/deckshare/screenshotsRunner.sh`;
      this.startDir = `\"/home/${res.result}/homebrew/plugins/deckshare/\"`;
    });

    this.numInstances = 0;
    this.instances = {};
  }

  /**
   * Gets the current date and time.
   * @returns A tuple containing [date, time] in US standard format.
   */
  private getDatetime(): [string, string] {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return [
      `${month}-${day}-${year}`,
      `${hours}:${minutes}:${seconds}`
    ];
  }

  /**
   * Creates a new instance for a screenshot.
   * @param screenshot The screenshot to make an instance for.
   * @returns A promise resolving to true if all the steamClient calls were successful.
   */
  async createInstance(screenshot: Screenshot): Promise<boolean> {
    this.numInstances++;
    const screenshotName = `${this.baseName} - Instance ${this.numInstances}`;

    if (screenshot.isApp) {
      let appId = null;
      
      //* check if instance exists. if so, grab it and modify it
      if (await this.shorcutsController.checkScreenshotExist(screenshotName)) {
        const screenshot = await this.shorcutsController.getScreenshot(screenshotName);
        appId = screenshot?.unAppID;
      } else {
        appId = await this.shorcutsController.addScreenshot(screenshotName, this.runnerPath, this.startDir, screenshot.cmd);
      }

      if (appId) {
        this.instances[screenshot.id] = new Instance(appId, screenshotName, screenshot.id, screenshot.isApp);
        
        const exeRes = await this.shorcutsController.setScreenshotExe(appId, this.runnerPath);
        if (!exeRes) {
          PyInterop.toast("Error", "Failed to set the screenshotsRunner path");
          return false;
        }
        
        const nameRes = await this.shorcutsController.setScreenshotName(appId, screenshotName);
        if (!nameRes) {
          PyInterop.toast("Error", "Failed to set the name of the instance");
          return false;
        }
        
        const startDirRes = await this.shorcutsController.setScreenshotStartDir(appId, this.startDir);
        if (!startDirRes) {
          PyInterop.toast("Error", "Failed to set the start dir");
          return false;
        }
        
        const launchOptsRes = await this.shorcutsController.setScreenshotLaunchOptions(appId, screenshot.cmd);
        if (!launchOptsRes) {
          PyInterop.toast("Error", "Failed to set the launch options");
          return false;
        }

        return true;
      } else {
        this.numInstances--;
        PyInterop.log(`Failed to start instance. Id: ${screenshot.id} Name: ${screenshot.name}`);
        return false;
      }
    } else {
      PyInterop.log(`Screenshot is not an app. Skipping instance screenshot creation. ScreenshotId: ${screenshot.id} ScreenshotName: ${screenshot.name}`);
      this.instances[screenshot.id] = new Instance(null, screenshotName, screenshot.id, screenshot.isApp);

      PyInterop.log(`Adding websocket listener for message type ${screenshot.id}`);
      this.webSocketClient.on(screenshot.id, (data: any) => {
        if (data.type === "end") {
          delete this.instances[screenshot.id];
          PyInterop.log(`Removed non app instance for screenshot with Id: ${screenshot.id} because end was detected.`);
          setTimeout(() => {
            PyInterop.log(`Removing websocket listener for message type ${screenshot.id}`);
            this.webSocketClient.deleteListeners(screenshot.id);
          }, 2000);
        }
      });

      return true;
    }
  }

  /**
   * Kills a live screenshot instance.
   * @param screenshotId The id of the screenshot whose instance should be killed.
   * @returns A promise resolving to true if the instance was successfully killed.
   */
  async killInstance(screenshotId: string): Promise<boolean> {
    const instance = this.instances[screenshotId];

    if (instance.screenshotIsApp) {
      const appId = instance.unAppID as number;
      const success = await this.shorcutsController.removeScreenshotById(appId);
  
      if (success) {
        PyInterop.log(`Killed instance. Id: ${screenshotId} InstanceName: ${instance.steamScreenshotName}`);
        delete this.instances[screenshotId];
        this.numInstances--;

        return true;
      } else {
        PyInterop.log(`Failed to kill instance. Could not delete screenshot. Id: ${screenshotId} InstanceName: ${instance.steamScreenshotName}`);
        return false;
      }
    } else {
      delete this.instances[screenshotId];
      const res = await PyInterop.killNonAppScreenshot(screenshotId);
      console.log(res);

      this.webSocketClient.on(screenshotId, (data:any) => {
        if (data.type == "end") {
          setTimeout(() => {
            PyInterop.log(`Removing websocket listener for message type ${screenshotId}`);
            this.webSocketClient.deleteListeners(screenshotId);
          }, 2000);
        }
      });
      return true;
    }
  }

  /**
   * Launches an instance.
   * @param screenshotId The id of the screenshot associated with the instance to launch.
   * @param onExit The function to run when the screenshot closes.
   * @param flags Optional flags to pass to the screenshot.
   * @returns A promise resolving to true if the instance is launched.
   */
  async launchInstance(screenshotId: string, onExit: (data?: LifetimeNotification) => void, flags: { [flag: string]: string } = {}): Promise<boolean> {
    const instance = this.instances[screenshotId];
    
    if (instance.screenshotIsApp) {
      const appId = instance.unAppID as number;
      const res = await this.shorcutsController.launchScreenshot(appId);

      if (!res) {
        PyInterop.log(`Failed to launch instance. InstanceName: ${instance.steamScreenshotName} ScreenshotId: ${screenshotId}`);
      } else {
        const { unregister } = this.shorcutsController.registerForScreenshotExit(appId, (data: LifetimeNotification) => {
          onExit(data);
          unregister();
        });
      }
      
      return res;
    } else {
      const [ date, time ] = this.getDatetime();
      const currentGameOverview = this.state.getPublicState().currentGame;
      
      flags["d"] = date;
      flags["t"] = time;

      if (!Object.keys(flags).includes("u")) flags["u"] = loginStore.m_strAccountName;
      if (!Object.keys(flags).includes("i") && currentGameOverview != null) flags["i"] = currentGameOverview.appid.toString();
      if (!Object.keys(flags).includes("n") && currentGameOverview != null) flags["n"] = currentGameOverview.display_name;

      const res = await PyInterop.runNonAppScreenshot(screenshotId, Object.entries(flags));
      console.log(res);
      return true;
    }
  }

  /**
   * Stops an instance.
   * @param screenshotId The id of the screenshot associated with the instance to stop.
   * @returns A promise resolving to true if the instance is stopped.
   */
  async stopInstance(screenshotId: string): Promise<boolean> {
    const instance = this.instances[screenshotId];

    if (instance.screenshotIsApp) {
      const appId = instance.unAppID as number;
      const res = await this.shorcutsController.closeScreenshot(appId);

      Navigation.Navigate("/library/home");
      Navigation.CloseSideMenus();
  
      if (!res) {
        PyInterop.log(`Failed to stop instance. Could not close screenshot. Id: ${screenshotId} InstanceName: ${instance.steamScreenshotName}`);
        return false;
      }
      
      return true;
    } else {
      //* atm nothing needed here
      // const res = await PyInterop.killNonAppScreenshot(screenshotId);
      // console.log(res);
      return true;
    }
  }
}
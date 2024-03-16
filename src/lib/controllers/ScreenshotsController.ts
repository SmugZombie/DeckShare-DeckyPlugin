import { PyInterop } from "../../PyInterop";
import { SteamController } from "./SteamController";

/**
 * Controller class for screenshots.
 */
export class ScreenshotsController {
  private steamController: SteamController;

  /**
   * Creates a new ScreenshotsController.
   * @param steamController The SteamController used by this class.
   */
  constructor(steamController:SteamController) {
    this.steamController = steamController;
  }

  /**
   * Function to run when the plugin dismounts.
   */
  onDismount(): void {
    PyInterop.log("Dismounting...");
  }

  /**
   * Gets all of the current user's steam screenshots.
   * @returns A promise resolving to a collection of the current user's steam screenshots.
   */
  async getScreenshots(): Promise<SteamAppDetails[]> {
    const res = await this.steamController.getScreenshots();
    return res;
  }

  /**
   * Gets the current user's steam screenshot with the given name.
   * @param name The name of the screenshot to get.
   * @returns A promise resolving to the screenshot with the provided name, or null.
   */
  async getScreenshot(name:string): Promise<SteamAppDetails | null> {
    const res = await this.steamController.getScreenshot(name);

    if (res) {
      return res[0];
    } else {
      return null;
    }
  }

  /**
   * Checks if a screenshot exists.
   * @param name The name of the screenshot to check for.
   * @returns A promise resolving to true if the screenshot was found.
   */
  async checkScreenshotExist(name: string): Promise<boolean> {
    const screenshotsArr = await this.steamController.getScreenshot(name) as SteamAppDetails[];
    return screenshotsArr.length > 0;
  }
  
  /**
   * Checks if a screenshot exists.
   * @param appId The id of the screenshot to check for.
   * @returns A promise resolving to true if the screenshot was found.
   */
  async checkScreenshotExistById(appId: number): Promise<boolean> {
    const screenshotsArr = await this.steamController.getScreenshotById(appId) as SteamAppDetails[];
    return screenshotsArr[0]?.unAppID != 0;
  }

  /**
   * Sets the exe of a steam screenshot.
   * @param appId The id of the app to set.
   * @param exec The new value for the exe.
   * @returns A promise resolving to true if the exe was set successfully.
   */
  async setScreenshotExe(appId: number, exec: string): Promise<boolean> {
    return await this.steamController.setScreenshotExe(appId, exec);
  }

  /**
   * Sets the start dir of a steam screenshot.
   * @param appId The id of the app to set.
   * @param startDir The new value for the start dir.
   * @returns A promise resolving to true if the start dir was set successfully.
   */
  async setScreenshotStartDir(appId: number, startDir: string): Promise<boolean> {
    return await this.steamController.setScreenshotStartDir(appId, startDir);
  }

  /**
   * Sets the launch options of a steam screenshot.
   * @param appId The id of the app to set.
   * @param launchOpts The new value for the launch options.
   * @returns A promise resolving to true if the launch options was set successfully.
   */
  async setScreenshotLaunchOptions(appId: number, launchOpts: string): Promise<boolean> {
    return await this.steamController.setAppLaunchOptions(appId, launchOpts);
  }

  /**
   * Sets the name of a steam screenshot.
   * @param appId The id of the app to set.
   * @param newName The new name for the screenshot.
   * @returns A promise resolving to true if the name was set successfully.
   */
  async setScreenshotName(appId: number, newName: string): Promise<boolean> {
    return await this.steamController.setScreenshotName(appId, newName);
  }

  /**
   * Launches a steam screenshot.
   * @param appId The id of the steam screenshot to launch.
   * @returns A promise resolving to true if the screenshot was successfully launched.
   */
  async launchScreenshot(appId: number): Promise<boolean> {
    return await this.steamController.runGame(appId, false);
  }

  /**
   * Closes a running screenshot.
   * @param appId The id of the screenshot to close.
   * @returns A promise resolving to true if the screenshot was successfully closed.
   */
  async closeScreenshot(appId: number): Promise<boolean> {
    return await this.steamController.terminateGame(appId);
  }

  /**
   * Creates a new steam screenshot.
   * @param name The name of the screenshot to create.
   * @param exec The executable file for the screenshot.
   * @param startDir The start directory of the screenshot.
   * @param launchArgs The launch args of the screenshot.
   * @returns A promise resolving to true if the screenshot was successfully created.
   */
  async addScreenshot(name: string, exec: string, startDir: string, launchArgs: string): Promise<number | null> {
    const appId = await this.steamController.addScreenshot(name, exec, startDir, launchArgs);
    if (appId) {
      return appId;
    } else {
      PyInterop.log(`Failed to add screenshot. Name: ${name}`);
      PyInterop.toast("Error", "Failed to add screenshot");
      return null;
    }
  }

  /**
   * Deletes a screenshot from steam.
   * @param name Name of the screenshot to delete.
   * @returns A promise resolving to true if the screenshot was successfully deleted.
   */
  async removeScreenshot(name: string): Promise<boolean> {
    const screenshot = await this.steamController.getScreenshot(name)[0] as SteamAppDetails;
    if (screenshot) {
      return await this.steamController.removeScreenshot(screenshot.unAppID);
    } else {
      PyInterop.log(`Didn't find screenshot to remove. Name: ${name}`);
      PyInterop.toast("Error", "Didn't find screenshot to remove.");
      return false;
    }
  }

  /**
   * Deletes a screenshot from steam by id.
   * @param appId The id of the screenshot to delete.
   * @returns A promise resolving to true if the screenshot was successfully deleted.
   */
  async removeScreenshotById(appId: number): Promise<boolean> {
    const res = await this.steamController.removeScreenshot(appId);
    if (res) {
      return true;
    } else {
      PyInterop.log(`Failed to remove screenshot. AppId: ${appId}`);
      PyInterop.toast("Error", "Failed to remove screenshot");
      return false;
    }
  }

  /**
   * Registers for lifetime updates for a screenshot.
   * @param appId The id of the screenshot to register for.
   * @param onExit The function to run when the screenshot closes.
   * @returns An Unregisterer function to call to unregister from updates.
   */
  registerForScreenshotExit(appId: number, onExit: (data: LifetimeNotification) => void): Unregisterer {
    return this.steamController.registerForAppLifetimeNotifications(appId, (data: LifetimeNotification) => {
      if (data.bRunning) return;

      onExit(data);
    });
  }
}
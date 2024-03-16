import { ServerAPI, ServerResponse } from "decky-frontend-lib";
import { Screenshot } from "./lib/data-structures/Screenshot";

type ScreenshotsDictionary = {
  [key: string]: Screenshot
}

/**
 * Class for frontend - backend communication.
 */
export class PyInterop {
  private static serverAPI: ServerAPI;

  /**
   * Sets the interop's severAPI.
   * @param serv The ServerAPI for the interop to use.
   */
  static setServer(serv: ServerAPI): void {
    this.serverAPI = serv;
  }

  /**
   * Gets the interop's serverAPI.
   */
  static get server(): ServerAPI { return this.serverAPI; }

  /**
   * Logs a message to bash screenshot's log file and the frontend console.
   * @param message The message to log.
   */
  static async log(message: String): Promise<void> {
    console.log(message);
    await this.serverAPI.callPluginMethod<{ message: String }, boolean>("logMessage", { message: `[front-end]: ${message}` });
  }

  /**
   * Gets a user's home directory.
   * @returns A promise resolving to a server response containing the user's home directory.
   */
  static async getHomeDir(): Promise<ServerResponse<string>> {
    const res = await this.serverAPI.callPluginMethod<{}, string>("getHomeDir", {});
    return res;
  }

  /**
   * Shows a toast message.
   * @param title The title of the toast.
   * @param message The message of the toast.
   */
  static toast(title: string, message: string): void {
    return (() => {
      try {
        return this.serverAPI.toaster.toast({
          title: title,
          body: message,
          duration: 8000,
        });
      } catch (e) {
        console.log("Toaster Error", e);
      }
    })();
  }

  /**
   * Gets the screenshots from the backend.
   * @returns A promise resolving to a server response containing the screenshots dictionary.
   */
  static async getScreenshots(): Promise<ServerResponse<ScreenshotsDictionary>> {
    return await this.serverAPI.callPluginMethod<{}, ScreenshotsDictionary>("getScreenshots", {});
  }

  /**
   * Gets the plugin's guides.
   * @returns The guides.
   */
  static async getGuides(): Promise<ServerResponse<GuidePages>> {
    return await this.serverAPI.callPluginMethod<{}, GuidePages>("getGuides", {});
  }

  /**
   * Gets the value of a plugin's setting.
   * @param key The key of the setting to get.
   * @param defaultVal The default value of the setting.
   * @returns A promise resolving to the setting's value.
   */
  static async getSetting<T>(key: string, defaultVal: T): Promise<T> {
    return (await this.serverAPI.callPluginMethod<{ key: string, defaultVal: T }, T>("getSetting", { key: key, defaultVal: defaultVal })).result as T;
  }

  /**
   * Sets the value of a plugin's setting.
   * @param key The key of the setting to set.
   * @param newVal The new value for the setting.
   * @returns A void promise resolving once the setting is set.
   */
  static async setSetting<T>(key: string, newVal: T): Promise<ServerResponse<void>> {
    return await this.serverAPI.callPluginMethod<{ key: string, newVal : T}, void>("setSetting", { key: key, newVal: newVal });
  }

  /**
   * Adds a new screenshot on the backend and returns the updated screenshots dictionary.
   * @param screenshot The screenshot to add.
   * @returns A promise resolving to a server response containing the updated screenshots dictionary.
   */
  static async addScreenshot(screenshot: Screenshot): Promise<ServerResponse<ScreenshotsDictionary>> {
    return await this.serverAPI.callPluginMethod<{ screenshot: Screenshot }, ScreenshotsDictionary>("addScreenshot", { screenshot: screenshot });
  }

  /**
   * Sets the entire screenshots dictionary, and returns the updated dictionary.
   * @param screenshots The updated screenshots dictionary.
   * @returns A promise resolving to a server response containing the updated screenshots dictionary.
   */
  static async setScreenshots(screenshots: ScreenshotsDictionary): Promise<ServerResponse<ScreenshotsDictionary>> {
    return await this.serverAPI.callPluginMethod<{ screenshots: ScreenshotsDictionary }, ScreenshotsDictionary>("setScreenshots", { screenshots: screenshots });
  }

  /**
   * Updates/edits a screenshot on the backend, and returns the updated dictionary.
   * @param screenshot The screenshot to update.
   * @returns A promise resolving to a server response containing the updated screenshots dictionary.
   */
  static async modScreenshot(screenshot: Screenshot): Promise<ServerResponse<ScreenshotsDictionary>> {
    return await this.serverAPI.callPluginMethod<{ screenshot: Screenshot }, ScreenshotsDictionary>("modScreenshot", { screenshot: screenshot });
  }

  /**
   * Removes a screenshot on the backend and returns the updated screenshots dictionary.
   * @param screenshot The screenshot to remove.
   * @returns A promise resolving to a server response containing the updated screenshots dictionary.
   */
  static async remScreenshot(screenshot: Screenshot): Promise<ServerResponse<ScreenshotsDictionary>> {
    return await this.serverAPI.callPluginMethod<{ screenshot: Screenshot }, ScreenshotsDictionary>("remScreenshot", { screenshot: screenshot });
  }

  /**
   * Runs a non app screenshot.
   * @param screenshotId The id of the screenshot to run.
   * @param flags Optional tuple array of flags to pass to the screenshot.
   */
  static async runNonAppScreenshot(screenshotId: string, flags: [string, string][]): Promise<ServerResponse<void>> {
    const successful = await this.serverAPI.callPluginMethod<{ screenshotId: string, flags: [string, string][] }, void>("runNonAppScreenshot", { screenshotId: screenshotId, flags: flags });
    return successful;
  }

  /**
   * Kills a non app screenshot.
   * @param screenshotId The id of the screenshot to kill.
   */
  static async killNonAppScreenshot(screenshotId: string): Promise<ServerResponse<void>> {
    const successful = await this.serverAPI.callPluginMethod<{ screenshotId: string }, void>("killNonAppScreenshot", { screenshotId: screenshotId });
    return successful;
  }
}
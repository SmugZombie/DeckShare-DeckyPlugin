import { ServerAPI, ServerResponse } from "decky-frontend-lib";
import { Screenshot } from "./lib/data-structures/screenshots";

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
  static async log(message: any): Promise<void> {
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

  static async getScreenshots(): Promise<ServerResponse<ScreenshotsDictionary>> {
    return await this.serverAPI.callPluginMethod<{}, ScreenshotsDictionary>("getScreenshots", {});
  }

  static async getSetting<T>(key: string, defaultVal: T): Promise<T> {
    return (await this.serverAPI.callPluginMethod<{ key: string, defaultVal: T }, T>("getSetting", { key: key, defaultVal: defaultVal })).result as T;
  }
  
  static async getImage<T>(key: string): Promise<T> {
    return (await this.serverAPI.callPluginMethod<{ filepath: string }, T>("getImage", { filepath: key })).result as T;
  }

  static async isOnline<T>(): Promise<T> {
    return (await this.serverAPI.callPluginMethod("isOnline", {})).result as T;
  }  

  static async setSetting<T>(key: string, newVal: T): Promise<ServerResponse<void>> {
    return await this.serverAPI.callPluginMethod<{ key: string, newVal : T}, void>("setSetting", { key: key, newVal: newVal });
  }

  static async getWebhookUrl<T>(): Promise<ServerResponse<void>> {
    return await this.serverAPI.callPluginMethod<{ key: string, newVal : T}, void>("getWebhookUrl", { });
  }

  static async setWebhookUrl<T>(key: string): Promise<ServerResponse<void>> {
    return await this.serverAPI.callPluginMethod<{ key: string}, void>("setWebhookUrl", { webhookUrl: key });
  }

  static async uploadScreenshot(key: string): Promise<ServerResponse<void>> {
    return await this.serverAPI.callPluginMethod<{ filepath: string }, void>("uploadScreenshot", { filepath: key });
  }

  static async uploadScreenshots<T>(): Promise<ServerResponse<void>> {
    return await this.serverAPI.callPluginMethod<{ key: string, newVal : T}, void>("uploadScreenshots", { });
  }

  static async getUploadQueue(): Promise<ServerResponse<ScreenshotsDictionary>> {
    return await this.serverAPI.callPluginMethod<{}, ScreenshotsDictionary>("getUploadQueue", {});
  }

  static async processQueue(): Promise<ServerResponse<void>> {
    return await this.serverAPI.callPluginMethod<{ }, void>("processQueue", { });
  }

  static async getLogs<T>(): Promise<T> {
    return (await this.serverAPI.callPluginMethod("getLogs", {})).result as T;
  }  

  static async getSuccessfulUploads<T>(): Promise<T> {
    return (await this.serverAPI.callPluginMethod("getSuccessfulUploads", {})).result as T;
  }  

  static async getAboutContent<T>(): Promise<T> {
    return (await this.serverAPI.callPluginMethod("getAboutContent", {})).result as T;
  }  
}
import { sleep } from "decky-frontend-lib";
import { PyInterop } from "../PyInterop";
import { waitForCondition } from "../utils";

/**
 * Wrapper class for the SteamClient interface.
 */
export class SteamController {
  private hasLoggedIn = false;
  private hasLoggedOut = false;

  /**
   * Gets a list of non steam game appIds.
   * @returns A list of non steam game appIds.
   */
  getNonSteamAppIds() {
    return Array.from(collectionStore.deckDesktopApps.apps.keys());
  }

  /**
   * Gets a list of the current user's steam screenshots.
   * @returns A promise resolving to list of the current user's steam screenshots.
   */
  async getScreenshots(): Promise<SteamAppDetails[]> {
    const appIds = this.getNonSteamAppIds();
    const res = await Promise.all(appIds.map((appId:number)=> this.getAppDetails(appId)));
    
    PyInterop.log(`Got screenshots. [DEBUG INFO] resultsLength: ${res.length};`);

    return res as SteamAppDetails[];
  }

  /**
   * Gets a list of the current user's steam screenshots with a given name.
   * @param appName The name of the screenshot to look for.
   * @returns A promise resolving to list of the current user's steam screenshots.
   */
  async getScreenshot(appName: string): Promise<SteamAppDetails[] | undefined> {
    const screenshotsList = await this.getScreenshots();
    const res = screenshotsList.filter((s: SteamAppDetails) => s.strDisplayName == appName);

    PyInterop.log(`Got screenshots with desired name. [DEBUG INFO] appName: ${appName}; resultsLength: ${res.length};`);
    return res;
  }

  /**
   * Gets a list of the current user's steam screenshots with a given id.
   * @param appId The id of the screenshot to look for.
   * @returns A promise resolving to list of the current user's steam screenshots.
   */
  async getScreenshotById(appId: number): Promise<SteamAppDetails[] | undefined> {
    const screenshotsList = await this.getScreenshots();
    const res = screenshotsList.filter((s: SteamAppDetails) => s.unAppID == appId);

    PyInterop.log(`Got screenshots with desired name. [DEBUG INFO] appId: ${appId}; resultsLength: ${res.length};`);
    return res;
  }

  /**
   * Gets the SteamAppOverview of the app with a given appId.
   * @param appId The id of the app to get.
   * @returns A promise resolving to the SteamAppOverview of the app
   */
  async getAppOverview(appId: number) {
    await this.waitForAppOverview(appId, (overview) => overview !== null);
    return this._getAppOverview(appId);
  }

  private async waitForAppOverview(appId: number, condition: (overview:SteamAppOverview|null) => boolean): Promise<boolean> {
    return await waitForCondition(3, 250, async () => {
      const overview = await this._getAppOverview(appId);
      return condition(overview);
    });
  }
  
  async _getAppOverview(appId: number) {
    return appStore.GetAppOverviewByAppID(appId) as SteamAppOverview | null;
  }

  /**
   * Gets the SteamAppDetails of the app with a given appId.
   * @param appId The id of the app to get.
   * @returns A promise resolving to the SteamAppDetails of the app
   */
  async getAppDetails(appId: number): Promise<SteamAppDetails | null> {
    await this.waitForAppDetails(appId, (details) => details !== null);
    return await this._getAppDetails(appId);
  }

  private async waitForAppDetails(appId: number, condition: (details:SteamAppDetails|null) => boolean): Promise<boolean> {
    return await waitForCondition(3, 250, async () => {
      const details = await this._getAppDetails(appId);
      return condition(details);
    });
  }

  private async _getAppDetails(appId: number): Promise<SteamAppDetails | null> {
    return new Promise((resolve) => {
      try {
        const { unregister } = SteamClient.Apps.RegisterForAppDetails(appId, (details: SteamAppDetails) => {
          unregister();
          resolve(details.unAppID === undefined ? null : details);
        });
      } catch (e:any) {
        PyInterop.log(`Error encountered trying to get app details. Error: ${e.message}`);
      }
    });
  }

  /**
   * Hides a steam app.
   * @param appId The id of the app to hide.
   * @returns A promise resolving to true if the app was successfully hidden.
   */
  async hideApp(appId: number): Promise<boolean> {
    const { collectionStore } = (window as any);
    if (collectionStore.BIsHidden(appId)) {
      PyInterop.log(`Successfully hid app (1 try). [DEBUG INFO] appId: ${appId};`);
      return true;
    }

    collectionStore.SetAppsAsHidden([appId], true);

    let retries = 4;
    while (retries--) {
      if (collectionStore.BIsHidden(appId)) {
        PyInterop.log(`Successfully hid app (${ 4 - retries + 1} tries). [DEBUG INFO] appId: ${appId};`);
        return true;
      }
      if (retries > 0) {
        await sleep(250);
      }
    }

    PyInterop.log(`Could not hide app (ran out of retries). [DEBUG INFO] appId: ${appId};`);
    return false;
  }

  /**
   * ! this is broken on preview
   * Creates a new screenshot.
   * @param appName The name of the new screenshot.
   * @param execPath The exe path of the new screenshot.
   * @param startDir The start directory of the new screenshot.
   * @param launchArgs The launch args of the new screenshot.
   * @returns A promise resolving to the new screenshot's appId if the screenshot was successfully created.
   */
  async addScreenshot(appName: string, execPath: string, startDir: string, launchArgs: string): Promise<number | null> {
    const appId = await SteamClient.Apps.AddScreenshot(appName, execPath, startDir, launchArgs) as number | undefined | null;
    if (typeof appId === "number") {
      return appId;
    }

    PyInterop.log(`Could not add screenshot. [DEBUG INFO] appId: ${appId}; appName: ${appName};`);

    return null;
  }

  /**
   * Sets the exe of a steam screenshot.
   * @param appId The id of the screenshot to set.
   * @param exePath The path of the exe.
   * @returns A promise resolving to true if the exe was successfully set.
   */
  async setScreenshotExe(appId: number, exePath: string): Promise<boolean> {
    const details = await this.getAppDetails(appId);
    if (!details) {
      PyInterop.log(`Could not set exe path (does not exist)! [DEBUG INFO] appId: ${appId};`);
      return false;
    }

    if (details.strScreenshotExe == `\"${exePath}\"` || details.strScreenshotExe == exePath) {
      PyInterop.log(`Set screenshot exe path. [DEBUG INFO] strDisplayName: ${details.strDisplayName}; appId:${appId};`);
      return true;
    }

    SteamClient.Apps.SetScreenshotExe(appId, exePath);
    const updated = await this.getAppDetails(appId);
    if (updated?.strScreenshotExe !== `\"${exePath}\"` && updated?.strScreenshotExe !== exePath) {
      PyInterop.log(`Could not exe path. [DEBUG INFO] strDisplayName: ${details.strDisplayName}; appId: ${appId};`);
      return false;
    }
    
    PyInterop.log(`Set screenshot exe path. [DEBUG INFO] strDisplayName: ${details.strDisplayName}; appId:${appId};`);
    return true;
  }

  /**
   * Sets the start directory of a steam screenshot.
   * @param appId The id of the screenshot to set.
   * @param startDir The start directory of the screenshot.
   * @returns A promise resolving to true if the start dir was successfully set.
   */
  async setScreenshotStartDir(appId: number, startDir: string): Promise<boolean> {
    const details = await this.getAppDetails(appId);
    if (!details) {
      PyInterop.log(`Could not start dir (does not exist). [DEBUG INFO] appId: ${appId};`);
      return false;
    }

    if (details.strScreenshotStartDir == `\"${startDir}\"` || details.strScreenshotStartDir == startDir) {
      PyInterop.log(`Set start dir. [DEBUG INFO] appId: ${appId};`);
      return true;
    }

    SteamClient.Apps.SetScreenshotStartDir(appId, startDir);
    const updated = await this.getAppDetails(appId);
    if (updated?.strScreenshotStartDir !== `\"${startDir}\"` && updated?.strScreenshotStartDir !== startDir) {
      PyInterop.log(`Could not set start dir. [DEBUG INFO] appId: ${appId};`);
      return false;
    }
    
    PyInterop.log(`Set start dir. [DEBUG INFO] appId: ${appId};`);
    return true;
  }

  /**
   * Sets the options of a steam app.
   * @param appId The id of the app to set.
   * @param options The options to use.
   * @returns A promise resolving to true if the options were successfully set.
   */
  async setAppLaunchOptions(appId: number, options: string): Promise<boolean> {
    const details = await this.getAppDetails(appId);
    if (!details) {
      PyInterop.log(`Could not add launch options (does not exist). [DEBUG INFO] appId: ${appId};`);
      return false;
    }

    if (details.strLaunchOptions === options) {
      PyInterop.log(`Added launch options. [DEBUG INFO] appId: ${appId};`);
      return true;
    }

    SteamClient.Apps.SetAppLaunchOptions(appId, options);
    const updated = await this.getAppDetails(appId);
    if (updated?.strLaunchOptions !== `\"${options}\"` && updated?.strLaunchOptions !== options) {
      PyInterop.log(`Could not add launch options. [DEBUG INFO] appId: ${appId};`);
      return false;
    }
    
    PyInterop.log(`Added launch options. [DEBUG INFO] appId: ${appId};`);
    return true;
  }

  /**
   * Sets the name of a steam screenshot.
   * @param appId The id of the app to set.
   * @param newName The new name for the screenshot.
   * @returns A promise resolving to true if the name was set successfully.
   */
  async setScreenshotName(appId: number, newName: string): Promise<boolean> {
    const details = await this.getAppDetails(appId);
    if (!details) {
      PyInterop.log(`Could not set screenshot name (does not exist)! [DEBUG INFO] appId: ${appId};`);
      return false;
    }

    if (details.strDisplayName == newName) {
      PyInterop.log(`Set screenshot name. [DEBUG INFO] strDisplayName: ${details.strDisplayName}; appId:${appId};`);
      return true;
    }

    SteamClient.Apps.SetScreenshotName(appId, newName);
    const updated = await this.getAppDetails(appId);
    if (updated?.strDisplayName != newName) {
      PyInterop.log(`Could not set screenshot name. [DEBUG INFO] strDisplayName: ${details.strDisplayName}; appId: ${appId};`);
      return false;
    }
    
    PyInterop.log(`Set screenshot name. [DEBUG INFO] strDisplayName: ${details.strDisplayName}; appId:${appId};`);
    return true;
  }

  /**
   * Removes a steam screenshot.
   * @param appId The id of the screenshot to remove.
   * @returns A promise resolving to true if the screenshot was successfully removed.
   */
  async removeScreenshot(appId: number): Promise<boolean> {
    const overview = await this.getAppOverview(appId);
    if (!overview) {
      PyInterop.log(`Could not remove screenshot (does not exist). [DEBUG INFO] appId: ${appId};`);
      return true;
    }

    const { collectionStore } = (window as any);
    const collections = collectionStore.userCollections;

    SteamClient.Apps.RemoveScreenshot(appId);
    for (const collection of collections) {
      if (collection.bAllowsDragAndDrop && collection.apps.has(appId)) {
        PyInterop.log(`Removed screenshot from collection. [DEBUG INFO] appId: ${appId}; collection: ${collection};`);
        collection.AsDragDropCollection().RemoveApps([overview]);
      }
    }

    await this.waitForAppOverview(appId, (overview) => overview === null);
    if (await this._getAppOverview(appId) !== null) {
      PyInterop.log(`Could not remove screenshot (overview still exists). [DEBUG INFO] appId: ${appId};`);
      return false;
    }

    PyInterop.log(`Removed screenshot. [DEBUG INFO] appId: ${appId};`);
    return true;
  }

  /**
   * Gets the gameId associated with an app.
   * @param appId The id of the game.
   * @returns A promise resolving to the gameId.
   */
  async getGameId(appId: number): Promise<string | null> {
    const overview = await this.getAppOverview(appId);
    if (!overview) {
      PyInterop.log(`Could not get game id. [DEBUG INFO] appId: ${appId};`);
      return null;
    }

    return overview.gameid;
  }

  /**
   * Registers for lifecycle updates for a steam app.
   * @param appId The id of the app to register for.
   * @param callback The callback to run when an update is recieved.
   * @returns A function to call to unregister the hook.
   */
  registerForAppLifetimeNotifications(appId: number, callback: (data: LifetimeNotification) => void): Unregisterer {
    return SteamClient.GameSessions.RegisterForAppLifetimeNotifications((data: LifetimeNotification) => {
      console.log("Lifecycle id:", data.unAppID, appId);
      if (data.unAppID !== appId) return;

      callback(data);
    });
  }

  /**
   * Registers for all lifecycle updates for steam apps.
   * @param callback The callback to run when an update is recieved.
   * @returns A function to call to unregister the hook.
   */
  registerForAllAppLifetimeNotifications(callback: (appId: number, data: LifetimeNotification) => void): Unregisterer {
    return SteamClient.GameSessions.RegisterForAppLifetimeNotifications((data: LifetimeNotification) => {
      callback(data.unAppID, data);
    });
  }

  /**
   * Waits for a game lifetime event to occur.
   * @param appId The id of the app to wait for.
   * @param options The options to determine when the function returns true.
   * @returns A promise resolving to true when the desired lifetime event occurs.
   */
  async waitForAppLifetimeNotifications(appId: number, options: { initialTimeout?: number, waitForStart?: boolean, waitUntilNewEnd?: boolean } = {}): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let timeoutId: any = null;
      const { unregister } = this.registerForAppLifetimeNotifications(appId, (data: LifetimeNotification) => {
        if (options.waitForStart && !data.bRunning) {
          return;
        }

        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (options.waitUntilNewEnd && data.bRunning) {
          return;
        }

        unregister();
        PyInterop.log(`Game lifetime subscription ended, game closed. [DEBUG INFO] appId: ${appId};`);
        resolve(true);
      });

      if (options.initialTimeout) {
        timeoutId = setTimeout(() => {
          PyInterop.log(`Game lifetime subscription expired. [DEBUG INFO] appId: ${appId};`);
          unregister();
          resolve(false);
        }, options.initialTimeout);
      }
    });
  }

  /**
   * Runs a steam app.
   * @param appId The id of the app to run.
   * @returns A promise resolving once the app has been run or the request times out.
   */
  async runGame(appId: number, waitUntilGameStops: boolean): Promise<boolean> {
    const gameStart = this.waitForAppLifetimeNotifications(appId, { initialTimeout: 1500, waitForStart: true, waitUntilNewEnd: waitUntilGameStops });
    const gameId = await this.getGameId(appId);
    console.log("GameId:", gameId);
    SteamClient.Apps.RunGame(gameId as string, "", -1, 100);

    PyInterop.log(`Running app/game. [DEBUG INFO] appId: ${appId}; gameId: ${gameId};`);

    return await gameStart;
  }

  /**
   * Terminates a steam app.
   * @param appId The id of the app to terminate.
   * @returns A promise resolving once the app has been terminated or the request times out.
   */
  async terminateGame(appId: number): Promise<boolean> {
    const gameEnd = this.waitForAppLifetimeNotifications(appId, { initialTimeout: 1500, waitForStart: false, waitUntilNewEnd: true });
    const gameId = await this.getGameId(appId);
    SteamClient.Apps.TerminateApp(gameId as string, false);
    
    PyInterop.log(`Terminating app/game. [DEBUG INFO] appId: ${appId}; gameId: ${gameId};`);

    return await gameEnd;
  }

  /**
   * Registers a hook for when the user's login state changes.
   * @param onLogin Function to run on login.
   * @param onLogout Function to run on logout.
   * @param once Whether the hook should run once.
   * @returns A function to unregister the hook.
   */
  registerForAuthStateChange(onLogin: ((username:string) => Promise<void>) | null, onLogout: ((username:string) => Promise<void>) | null, once: boolean): Unregisterer {
    try {
      let isLoggedIn: boolean | null = null;
      const currentUsername = loginStore.m_strAccountName;
      return SteamClient.User.RegisterForLoginStateChange((username: string) => {
        if (username === "") {
          if (isLoggedIn !== false && (once ? !this.hasLoggedOut : true)) {
            if (onLogout) onLogout(currentUsername);
          }
          isLoggedIn = false;
        } else {
          if (isLoggedIn !== true && (once ? !this.hasLoggedIn : true)) {
            if (onLogin) onLogin(username);
          }
          isLoggedIn = true;
        }
      });
    } catch (error) {
      PyInterop.log(`error with AuthStateChange hook. [DEBUG INFO] error: ${error};`);
      // @ts-ignore
      return () => { };
    }
  }

  /**
   * Waits until the services are initialized.
   * @returns A promise resolving to true if services were initialized on any attempt, or false if all attemps failed.
   */
  async waitForServicesToInitialize(): Promise<boolean> {
    type WindowEx = Window & { App?: { WaitForServicesInitialized?: () => Promise<boolean> } };
    const servicesFound = await waitForCondition(20, 250, () => (window as WindowEx).App?.WaitForServicesInitialized != null);
  
    if (servicesFound) {
      PyInterop.log(`Services found.`);
    } else {
      PyInterop.log(`Couldn't find services.`);
    }
  
    return (await (window as WindowEx).App?.WaitForServicesInitialized?.().then((success: boolean) => {
      PyInterop.log(`Services initialized. Success: ${success}`);
      return success;
    })) ?? false;
  }

  /**
   * Registers a callback for game install events.
   * @param callback The callback to run.
   * @returns An Unregisterer for this hook.
   */
  registerForGameInstall(callback: (appData: SteamAppOverview, update: DownloadItem) => void): Unregisterer {
    const installedGames = collectionStore.localGamesCollection;
    const overviewMap = new Map<number, DownloadOverview>();

    const overviewRegister = SteamClient.Downloads.RegisterForDownloadOverview((overview: DownloadOverview) => {
      if (overview && collectionStore.allAppsCollection.apps.has(overview.update_appid)) overviewMap.set(overview.update_appid, overview);
    });

    const itemsRegister = SteamClient.Downloads.RegisterForDownloadItems((_: boolean, downloadItems: DownloadItem[]) => {
      const download = downloadItems[0];
      
      if (downloadItems.length > 0) {
        const appId = download.appid;
        
        if (overviewMap.has(appId)) {
          const overview = overviewMap.get(appId);

          const isInstall = overview?.update_is_install;

          if (download.completed && isInstall) {
            callback(installedGames.apps.get(appId) as SteamAppOverview, download);
          }
        }
      }
    });

    return {
      unregister: () => {
        overviewRegister.unregister();
        itemsRegister.unregister();
      }
    }
  }

  /**
   * Registers a callback for game update events.
   * @param callback The callback to run.
   * @returns An Unregisterer for this hook.
   */
  registerForGameUpdate(callback: (game: SteamAppOverview, update: DownloadItem) => void): Unregisterer {
    const installedGames = collectionStore.localGamesCollection;
    const overviewMap = new Map<number, DownloadOverview>();

    const overviewRegister = SteamClient.Downloads.RegisterForDownloadOverview((overview: DownloadOverview) => {
      if (overview && collectionStore.allAppsCollection.apps.has(overview.update_appid)) overviewMap.set(overview.update_appid, overview);
    });

    const itemsRegister = SteamClient.Downloads.RegisterForDownloadItems((_: boolean, downloadItems: DownloadItem[]) => {
      const download = downloadItems[0];
      
      if (downloadItems.length > 0) {
        const appId = download.appid;
        
        if (overviewMap.has(appId)) {
          const overview = overviewMap.get(appId);

          const isUpdate = !overview?.update_is_install;

          if (download.completed && isUpdate) {
            callback(installedGames.apps.get(appId) as SteamAppOverview, download);
          }
        }
      }
    });

    return {
      unregister: () => {
        overviewRegister.unregister();
        itemsRegister.unregister();
      }
    }
  }

  /**
   * Registers a callback for game uninstall events.
   * @param callback The callback to run.
   * @returns An Unregisterer for this hook.
   */
  registerForGameUninstall(callback: (appData: SteamAppOverview) => void): Unregisterer {
    const installedGames = collectionStore.localGamesCollection;
    const actionQueue:{ data: any, action: string }[] = [];

    const startRegister = SteamClient.Apps.RegisterForGameActionStart((_: number, appId: string, action: string) => {
      const appData = installedGames.apps.get(parseInt(appId));

      if (action === "UninstallApps") {
        actionQueue.push({ "data": { "appData": appData }, "action": action });
      } else {
        actionQueue.push({ "data": null, "action": action });
      }
    });

    const endRegister = SteamClient.Apps.RegisterForGameActionEnd((_: number) => {
      const actionInfo = actionQueue.shift();

      if (actionInfo?.action === "UninstallApps") {
        callback(actionInfo.data.appData);
      }
    });

    return {
      unregister: () => {
        startRegister.unregister();
        endRegister.unregister();
      }
    }
  }

  /**
   * Registers a callback for achievement notification events.
   * @param callback The callback to run.
   * @returns An Unregisterer for this hook.
   */
  registerForGameAchievementNotification(callback: (data: AchievementNotification) => void): Unregisterer {
    return SteamClient.GameSessions.RegisterForAchievementNotification((data: AchievementNotification) => {
      callback(data);
    });
  }

  /**
   * Registers a callback for screenshot notification events.
   * @param callback The callback to run.
   * @returns An Unregisterer for this hook.
   */
  registerForScreenshotNotification(callback: (data: ScreenshotNotification) => void): Unregisterer {
    return SteamClient.GameSessions.RegisterForScreenshotNotification((data: ScreenshotNotification) => {
      callback(data);
    });
  }

  /**
   * Registers a callback for deck sleep requested events.
   * @param callback The callback to run.
   * @returns An Unregisterer for this hook.
   */
  registerForSleepStart(callback: () => void): Unregisterer {
    return SteamClient.User.RegisterForPrepareForSystemSuspendProgress(() => {
      callback();
    });
  }

  /**
   * Registers a callback for deck shutdown requested events.
   * @param callback The callback to run.
   * @returns An Unregisterer for this hook.
   */
  registerForShutdownStart(callback: () => void): Unregisterer {
    return SteamClient.User.RegisterForShutdownStart(() => {
      callback();
    });
  }

  /**
   * Restarts the Steam client.
   */
  restartClient(): void {
    SteamClient.User.StartRestart();
  }
}
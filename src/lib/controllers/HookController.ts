import { Navigation } from "decky-frontend-lib";
import { PyInterop } from "../../PyInterop";
import { WebSocketClient } from "../../WebsocketClient";
import { ScreenshotsState } from "../../state/ScreenshotsState";
import { Screenshot } from "../data-structures/Screenshot";
import { InstancesController } from "./InstancesController";
import { SteamController } from "./SteamController";

/**
 * Enum for the different hook events.
 */
export enum Hook {
  LOG_IN = "Log In",
  LOG_OUT = "Log Out",
  GAME_START = "Game Start",
  GAME_END = "Game End",
  GAME_INSTALL = "Game Install",
  GAME_UPDATE = "Game Update",
  GAME_UNINSTALL = "Game Uninstall",
  GAME_ACHIEVEMENT_UNLOCKED = "Game Achievement Unlocked",
  SCREENSHOT_TAKEN = "Screenshot Taken",
  DECK_SHUTDOWN = "Deck Shutdown",
  DECK_SLEEP = "Deck Sleep"
}

export const hookAsOptions = Object.values(Hook).map((entry) => { return { label: entry, data: entry } });

type HooksDict = { [key in Hook]: Set<string> }
type RegisteredDict = { [key in Hook]: Unregisterer }

/**
 * Controller for handling hook events.
 */
export class HookController {
  private state: ScreenshotsState;
  private steamController: SteamController;
  private instancesController: InstancesController;
  private webSocketClient: WebSocketClient;

  // @ts-ignore
  screenshotHooks: HooksDict = {};
  // @ts-ignore
  registeredHooks: RegisteredDict = {};

  /**
   * Creates a new HooksController.
   * @param steamController The SteamController to use.
   * @param instancesController The InstanceController to use.
   * @param webSocketClient The WebSocketClient to use.
   * @param state The plugin state.
   */
  constructor(steamController: SteamController, instancesController: InstancesController, webSocketClient: WebSocketClient, state: ScreenshotsState) {
    this.state = state;
    this.steamController = steamController;
    this.instancesController = instancesController;
    this.webSocketClient = webSocketClient;

    for (const hook of Object.values(Hook)) {
      this.screenshotHooks[hook] = new Set<string>();
    }
  }

  /**
   * Initializes the hooks for all screenshots.
   * @param screenshots The screenshots to initialize the hooks of.
   */
  init(screenshots: ScreenshotsDictionary): void {
    this.liten();

    for (const screenshot of Object.values(screenshots)) {
      this.updateHooks(screenshot);
    }
  }

  /**
   * Gets a screenshot by its id.
   * @param screenshotId The id of the screenshot to get.
   * @returns The screenshot.
   */
  private getScreenshotById(screenshotId: string): Screenshot {
    return this.state.getPublicState().screenshots[screenshotId];
  }

  /**
   * Sets wether a screenshot is running or not.
   * @param screenshotId The id of the screenshot to set.
   * @param value The new value.
   */
  private setIsRunning(screenshotId: string, value: boolean): void {
    this.state.setIsRunning(screenshotId, value);
  }

  /**
   * Checks if a screenshot is running.
   * @param shorcutId The id of the screenshot to check for.
   * @returns True if the screenshot is running.
   */
  private checkIfRunning(shorcutId: string): boolean {
    return Object.keys(this.instancesController.instances).includes(shorcutId);
  }

  /**
   * Updates the hooks for a screenshot.
   * @param screenshot The screenshot to update the hooks of.
   */
  updateHooks(screenshot: Screenshot) {
    const screenshotHooks = screenshot.hooks;
    
    for (const h of Object.keys(this.screenshotHooks)) {
      const hook = h as Hook;
      const registeredHooks = this.screenshotHooks[hook];

      if (screenshotHooks.includes(hook)) {
        this.registerHook(screenshot, hook);
      } else if (Object.keys(registeredHooks).includes(screenshot.id)) {
        this.unregisterHook(screenshot, hook);
      }
    }
  }

  /**
   * Registers a hook for a screenshot.
   * @param screenshot The screenshot to register the hook for.
   * @param hook The hook to register.
   */
  private registerHook(screenshot: Screenshot, hook: Hook): void {
    this.screenshotHooks[hook].add(screenshot.id);
    PyInterop.log(`Registered hook: ${hook} for screenshot: ${screenshot.name} Id: ${screenshot.id}`);
  }

  /**
   * Unregisters all hooks for a given screenshot.
   * @param screenshot The screenshot to unregister the hooks from.
   */
  unregisterAllHooks(screenshot: Screenshot) {
    const screenshotHooks = screenshot.hooks;

    for (const hook of screenshotHooks) {
      this.unregisterHook(screenshot, hook);
    }
  }

  /**
   * Unregisters a registered hook for a screenshot.
   * @param screenshot The screenshot to remove the hook from.
   * @param hook The hook to remove.
   */
  private unregisterHook(screenshot: Screenshot, hook: Hook): void {
    this.screenshotHooks[hook].delete(screenshot.id);
    PyInterop.log(`Unregistered hook: ${hook} for screenshot: ${screenshot.name} Id: ${screenshot.id}`);
  }

  private async runScreenshots(hook: Hook, flags: { [flag: string ]: string }): Promise<void> {
    flags["h"] = hook;

    for (const screenshotId of this.screenshotHooks[hook].values()) {
      if (!this.checkIfRunning(screenshotId)) {
        const screenshot = this.getScreenshotById(screenshotId);
        const createdInstance = await this.instancesController.createInstance(screenshot);

        if (createdInstance) {
          PyInterop.log(`Created Instance for screenshot { Id: ${screenshot.id}, Name: ${screenshot.name} } on hook: ${hook}`);
          const didLaunch = await this.instancesController.launchInstance(screenshot.id, async () => {
            if (this.checkIfRunning(screenshot.id) && screenshot.isApp) {
              this.setIsRunning(screenshot.id, false);
              const killRes = await this.instancesController.killInstance(screenshot.id);
              if (killRes) {
                Navigation.Navigate("/library/home");
                Navigation.CloseSideMenus();
              } else {
                PyInterop.toast("Error", "Failed to kill screenshot.");
              }
            }
          }, flags);
          
          if (!didLaunch) {
            PyInterop.log(`Failed to launch instance for screenshot { Id: ${screenshot.id}, Name: ${screenshot.name} } on hook: ${hook}`);
          } else {
            if (!screenshot.isApp) {
              PyInterop.log(`Registering for WebSocket messages of type: ${screenshot.id} on hook: ${hook}...`);
    
              this.webSocketClient.on(screenshot.id, (data: any) => {
                if (data.type == "end") {
                  if (data.status == 0) {
                    PyInterop.toast(screenshot.name, "Screenshot execution finished.");
                  } else {
                    PyInterop.toast(screenshot.name, "Screenshot execution was canceled.");
                  }
    
                  this.setIsRunning(screenshot.id, false);
                }
              });
            }
            
            this.setIsRunning(screenshot.id, true);
          }
        } else {
          PyInterop.toast("Error", "Screenshot failed. Check the command.");
          PyInterop.log(`Failed to create instance for screenshot { Id: ${screenshot.id}, Name: ${screenshot.name} } on hook: ${hook}`);
        }
      } else {
        PyInterop.log(`Skipping hook: ${hook} for screenshot: ${screenshotId} because it was already running.`);
      }
    }
  }

  /**
   * Sets up all of the hooks for the plugin.
   */
  liten(): void {
    this.registeredHooks[Hook.LOG_IN] = this.steamController.registerForAuthStateChange(async (username: string) => {
      this.runScreenshots(Hook.LOG_IN, { "u": username});
    }, null, false);

    this.registeredHooks[Hook.LOG_OUT] = this.steamController.registerForAuthStateChange(null, async (username: string) => {
      this.runScreenshots(Hook.LOG_IN, { "u": username });
    }, false);

    this.registeredHooks[Hook.GAME_START] = this.steamController.registerForAllAppLifetimeNotifications((appId: number, data: LifetimeNotification) => {
      if (data.bRunning && (collectionStore.allAppsCollection.apps.has(appId) || collectionStore.deckDesktopApps.apps.has(appId))) {
        const app = collectionStore.allAppsCollection.apps.get(appId) ?? collectionStore.deckDesktopApps.apps.get(appId);
        if (app) {
          this.runScreenshots(Hook.GAME_START, { "i": appId.toString(), "n": app.display_name });
        }
      }
    });

    this.registeredHooks[Hook.GAME_END] = this.steamController.registerForAllAppLifetimeNotifications((appId: number, data: LifetimeNotification) => {
      if (!data.bRunning && (collectionStore.allAppsCollection.apps.has(appId) || collectionStore.deckDesktopApps.apps.has(appId))) {
        const app = collectionStore.allAppsCollection.apps.get(appId) ?? collectionStore.deckDesktopApps.apps.get(appId);
        if (app) {
          this.runScreenshots(Hook.GAME_END, { "i": appId.toString(), "n": app.display_name });
        }
      }
    });

    this.registeredHooks[Hook.GAME_INSTALL] = this.steamController.registerForGameInstall((appData: SteamAppOverview) => {
      this.runScreenshots(Hook.GAME_INSTALL, { "i": appData.appid.toString(), "n": appData.display_name });
    });

    this.registeredHooks[Hook.GAME_UPDATE] = this.steamController.registerForGameUpdate((appData: SteamAppOverview) => {
      this.runScreenshots(Hook.GAME_UPDATE, { "i": appData.appid.toString(), "n": appData.display_name });
    });

    this.registeredHooks[Hook.GAME_UNINSTALL] = this.steamController.registerForGameUninstall((appData: SteamAppOverview) => {
      this.runScreenshots(Hook.GAME_UNINSTALL, { "i": appData.appid.toString(), "n": appData.display_name });
    });
    
    this.registeredHooks[Hook.GAME_ACHIEVEMENT_UNLOCKED] = this.steamController.registerForGameAchievementNotification((data: AchievementNotification) => {
      const appId = data.unAppID;
      const app = collectionStore.localGamesCollection.apps.get(appId);
      if (app) {
        this.runScreenshots(Hook.GAME_ACHIEVEMENT_UNLOCKED, { "i": appId.toString(), "n": app.display_name, "a": data.achievement.strName });
      }
    });

    this.registeredHooks[Hook.SCREENSHOT_TAKEN] = this.steamController.registerForScreenshotNotification((data: ScreenshotNotification) => {
      const appId = data.unAppID;
      const app = collectionStore.localGamesCollection.apps.get(appId);
      if (app) {
        this.runScreenshots(Hook.GAME_ACHIEVEMENT_UNLOCKED, { "i": appId.toString(), "n": app.display_name, "p": data.details.strUrl });
      }
    });

    this.registeredHooks[Hook.DECK_SLEEP] = this.steamController.registerForSleepStart(() => {
      this.runScreenshots(Hook.DECK_SLEEP, {});
    });

    this.registeredHooks[Hook.DECK_SHUTDOWN] = this.steamController.registerForShutdownStart(() => {
      this.runScreenshots(Hook.DECK_SHUTDOWN, {});
    });
  }

  /**
   * Dismounts the HooksController.
   */
  dismount(): void {
    for (const hook of Object.keys(this.registeredHooks)) {
      this.registeredHooks[hook].unregister();
      PyInterop.log(`Unregistered hook: ${hook}`);
    }
  }
}
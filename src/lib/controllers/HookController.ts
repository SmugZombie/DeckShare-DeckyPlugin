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
    //PyInterop.log(JSON.stringify(screenshots))
    for (const screenshot of Object.values(screenshots)) {
      //PyInterop.log(JSON.stringify(screenshot))
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

  private async runScreenshots(): Promise<void> {
    try{
      const autoupload = await PyInterop.getSetting("autoupload", false);
      const notifications = await PyInterop.getSetting("notifications", false);
      const screenshotsTaken = await PyInterop.getSetting("screenshotsTaken", 0);
      const screenshotsShared = await PyInterop.getSetting("screenshotsShared", 0);
      await PyInterop.setSetting("screenshotsTaken", screenshotsTaken + 1);
      if(!autoupload){
        PyInterop.log("Screenshot detected but auto upload is disabled");
        return;
      }
      let uploadStatus = await PyInterop.uploadScreenshots();
      if(uploadStatus.result == "200"){
        await PyInterop.setSetting("screenshotsShared", screenshotsShared + 1);
        if(notifications){
          PyInterop.toast("Deckshare","Screenshots shared successfully");
        }
      }else if(uploadStatus.result == "307"){
        if(notifications){
          PyInterop.toast("Deckshare","You're currently offline, but we've queue this upload for when you reconnect.");
        }
      }else{
        if(notifications){
          PyInterop.toast("DeckShare", "Error! Screenshots failed to upload");
        }
        PyInterop.log(JSON.stringify(uploadStatus));
      }
    }catch(e){
      PyInterop.log(e);
    }
  }

  /**
   * Sets up all of the hooks for the plugin.
   */
  liten(): void {

    this.registeredHooks[Hook.SCREENSHOT_TAKEN] = this.steamController.registerForScreenshotNotification((data: ScreenshotNotification) => {
      try{
        const appId = data.unAppID;
        const app = collectionStore.localGamesCollection.apps.get(appId);
        this.runScreenshots();
      }catch(e){
        PyInterop.log(e);
      }
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
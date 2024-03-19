import { createContext, FC, useContext, useEffect, useState } from "react";
import { Screenshot } from "../lib/data-structures/Screenshot"
import { ReorderableEntry } from "decky-frontend-lib";

type ScreenshotsDictionary = {
  [key: string]: Screenshot
}

interface PublicScreenshotsState {
  screenshots: ScreenshotsDictionary;
  screenshotsList: Screenshot[];
  uploadQueueList: Screenshot[];
  runningScreenshots: Set<string>;
  reorderableScreenshots: ReorderableEntry<Screenshot>[];
  currentGame: SteamAppOverview | null;
  gameRunning: boolean;
}

interface PublicScreenshotsContext extends PublicScreenshotsState {
  setScreenshots(screenshots: ScreenshotsDictionary): void;
  setIsRunning(screenshotId: string, value: boolean): void;
  setCurrentGame(overview: SteamAppOverview | null): void;
  setGameRunning(isRunning: boolean): void;
}

interface PublicUploadQueueContext extends PublicScreenshotsState {
  setUploadQueue(screenshots: ScreenshotsDictionary): void;
}

export class ScreenshotsState {
  private screenshots: ScreenshotsDictionary = {};
  private screenshotsList: Screenshot[] = [];
  private runningScreenshots = new Set<string>();
  private reorderableScreenshots: ReorderableEntry<Screenshot>[] = [];
  private currentGame: SteamAppOverview | null = null;
  private gameRunning: boolean = false;

  public eventBus = new EventTarget();

  getPublicState() {
    return {
      "screenshots": this.screenshots,
      "screenshotsList": this.screenshotsList,
      "runningScreenshots": this.runningScreenshots,
      "reorderableScreenshots": this.reorderableScreenshots,
      "currentGame": this.currentGame,
      "gameRunning": this.gameRunning
    }
  }

  setIsRunning(screenshotId: string, value: boolean): void {
    if (value) {
      this.runningScreenshots.add(screenshotId);
    } else {
      this.runningScreenshots.delete(screenshotId);
    }

    this.runningScreenshots = new Set(this.runningScreenshots.values());

    this.forceUpdate();
  }

  setCurrentGame(overview: SteamAppOverview | null): void {
    this.currentGame = overview;

    this.forceUpdate();
  }

  setGameRunning(isRunning: boolean): void {
    this.gameRunning = isRunning;

    this.forceUpdate();
  }

  setScreenshots(screenshots: ScreenshotsDictionary): void {
    this.screenshots = screenshots;
    this.screenshotsList = Object.values(this.screenshots).sort((a, b) => a.position - b.position);
    this.reorderableScreenshots = [];

    for (let i = 0; i < this.screenshotsList.length; i++) {
      const screenshot = this.screenshotsList[i];
      this.reorderableScreenshots[i] = {
        "label": screenshot.name,
        "data": screenshot,
        "position": screenshot.position
      }
    }

    this.reorderableScreenshots.sort((a, b) => a.position - b.position);

    this.forceUpdate();
  }

  private forceUpdate(): void {
    this.eventBus.dispatchEvent(new Event("stateUpdate"));
  }
}

const ScreenshotsContext = createContext<PublicScreenshotsContext>(null as any);
const UploadQueueContext = createContext<PublicUploadQueueContext>(null as any);
export const useScreenshotsState = () => useContext(ScreenshotsContext);
export const useUploadQueueState = () => useContext(UploadQueueContext);

interface ProviderProps {
  screenshotsStateClass: ScreenshotsState
}

export const ScreenshotsContextProvider: FC<ProviderProps> = ({
  children,
  screenshotsStateClass
}) => {
  const [publicState, setPublicState] = useState<PublicScreenshotsState>({
    ...screenshotsStateClass.getPublicState()
  });

  useEffect(() => {
    function onUpdate() {
      setPublicState({ ...screenshotsStateClass.getPublicState() });
    }

    screenshotsStateClass.eventBus
      .addEventListener("stateUpdate", onUpdate);

    return () => {
      screenshotsStateClass.eventBus
        .removeEventListener("stateUpdate", onUpdate);
    }
  }, []);

  const setScreenshots = (screenshots: ScreenshotsDictionary) => {
    screenshotsStateClass.setScreenshots(screenshots);
  }

  const setIsRunning = (screenshotId: string, value: boolean) => {
    screenshotsStateClass.setIsRunning(screenshotId, value);
  }

  const setCurrentGame = (overview: SteamAppOverview | null) => {
    screenshotsStateClass.setCurrentGame(overview);
  }

  const setGameRunning = (isRunning: boolean) => {
    screenshotsStateClass.setGameRunning(isRunning);
  }

  return (
    <ScreenshotsContext.Provider
      value={{
        ...publicState,
        setScreenshots,
        setIsRunning,
        setCurrentGame,
        setGameRunning
      }}
    >
      {children}
    </ScreenshotsContext.Provider>
  )
}
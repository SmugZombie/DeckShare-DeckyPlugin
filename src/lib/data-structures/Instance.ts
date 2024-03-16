/**
 * Class representing an Instance of DeckShare.
 */
export class Instance {
  unAppID: number | null; // null if the instance is not an app.
  steamScreenshotName: string;
  screenshotId: string;
  screenshotIsApp: boolean;

  /**
   * Creates a new Instance.
   * @param unAppID The id of the app to create an instance for.
   * @param steamScreenshotName The name of this instance.
   * @param screenshotId The id of the screenshot associated with this instance.
   * @param screenshotIsApp Whether the screenshot is an app.
   */
  constructor(unAppID: number | null, steamScreenshotName: string, screenshotId: string, screenshotIsApp: boolean) {
    this.unAppID = unAppID;
    this.steamScreenshotName = steamScreenshotName;
    this.screenshotId = screenshotId;
    this.screenshotIsApp = screenshotIsApp;
  }
}
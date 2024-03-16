import { Hook } from "../controllers/HookController";

/**
 * Contains all of the nessesary information on each screenshot.
 */
export class Screenshot {
  id: string;
  name: string;
  path: string;
  base64: string;

  /**
   * Creates a new Screenshot.
   * @param id The id of the screenshot.
   * @param name The name/lable of the screenshot.
   * @param cmd The command the screenshot runs.
   * @param position The position of the screenshot in the list of screenshots.
   * @param isApp Whether the screenshot is an app or not.
   * @param passFlags Whether the screenshot takes flags or not.
   * @param hooks The list of hooks for this screenshot.
   */
  constructor(id: string, name: string, path: string, base64: string ) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.base64 = base64;
  }

  /**
   * Creates a new Screenshot from the provided json data.
   * @param json The json data to use for the screenshot.
   * @returns A new Screenshot.
   */
  static fromJSON(json: any): Screenshot {
    return new Screenshot(json.id, json.name, json.path, json.base64);
  }
}
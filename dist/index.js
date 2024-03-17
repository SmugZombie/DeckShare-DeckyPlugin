(function (deckyFrontendLib, React) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
  };
  var IconContext = React__default["default"].createContext && React__default["default"].createContext(DefaultContext);

  var __assign = window && window.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __rest = window && window.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };
  function Tree2Element(tree) {
    return tree && tree.map(function (node, i) {
      return React__default["default"].createElement(node.tag, __assign({
        key: i
      }, node.attr), Tree2Element(node.child));
    });
  }
  function GenIcon(data) {
    // eslint-disable-next-line react/display-name
    return function (props) {
      return React__default["default"].createElement(IconBase, __assign({
        attr: __assign({}, data.attr)
      }, props), Tree2Element(data.child));
    };
  }
  function IconBase(props) {
    var elem = function (conf) {
      var attr = props.attr,
        size = props.size,
        title = props.title,
        svgProps = __rest(props, ["attr", "size", "title"]);
      var computedSize = size || conf.size || "1em";
      var className;
      if (conf.className) className = conf.className;
      if (props.className) className = (className ? className + " " : "") + props.className;
      return React__default["default"].createElement("svg", __assign({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, conf.attr, attr, svgProps, {
        className: className,
        style: __assign(__assign({
          color: props.color || conf.color
        }, conf.style), props.style),
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }), title && React__default["default"].createElement("title", null, title), props.children);
    };
    return IconContext !== undefined ? React__default["default"].createElement(IconContext.Consumer, null, function (conf) {
      return elem(conf);
    }) : elem(DefaultContext);
  }

  // THIS FILE IS AUTO GENERATED
  function IoApps (props) {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M104 160a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zM104 312a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zM104 464a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56zm152 0a56 56 0 1156-56 56.06 56.06 0 01-56 56z"}}]})(props);
  }

  /**
   * Class for frontend - backend communication.
   */
  class PyInterop {
      /**
       * Sets the interop's severAPI.
       * @param serv The ServerAPI for the interop to use.
       */
      static setServer(serv) {
          this.serverAPI = serv;
      }
      /**
       * Gets the interop's serverAPI.
       */
      static get server() { return this.serverAPI; }
      /**
       * Logs a message to bash screenshot's log file and the frontend console.
       * @param message The message to log.
       */
      static async log(message) {
          console.log(message);
          await this.serverAPI.callPluginMethod("logMessage", { message: `[front-end]: ${message}` });
      }
      /**
       * Gets a user's home directory.
       * @returns A promise resolving to a server response containing the user's home directory.
       */
      static async getHomeDir() {
          const res = await this.serverAPI.callPluginMethod("getHomeDir", {});
          return res;
      }
      /**
       * Shows a toast message.
       * @param title The title of the toast.
       * @param message The message of the toast.
       */
      static toast(title, message) {
          return (() => {
              try {
                  return this.serverAPI.toaster.toast({
                      title: title,
                      body: message,
                      duration: 8000,
                  });
              }
              catch (e) {
                  console.log("Toaster Error", e);
              }
          })();
      }
      /**
       * Gets the screenshots from the backend.
       * @returns A promise resolving to a server response containing the screenshots dictionary.
       */
      static async getScreenshots() {
          return await this.serverAPI.callPluginMethod("getScreenshots", {});
      }
      /**
       * Gets the plugin's guides.
       * @returns The guides.
       */
      static async getGuides() {
          return await this.serverAPI.callPluginMethod("getGuides", {});
      }
      /**
       * Gets the value of a plugin's setting.
       * @param key The key of the setting to get.
       * @param defaultVal The default value of the setting.
       * @returns A promise resolving to the setting's value.
       */
      static async getSetting(key, defaultVal) {
          return (await this.serverAPI.callPluginMethod("getSetting", { key: key, defaultVal: defaultVal })).result;
      }
      static async getImage(key) {
          return (await this.serverAPI.callPluginMethod("getImage", { filepath: key })).result;
      }
      static async isOnline() {
          return (await this.serverAPI.callPluginMethod("isOnline", {})).result;
      }
      /**
       * Sets the value of a plugin's setting.
       * @param key The key of the setting to set.
       * @param newVal The new value for the setting.
       * @returns A void promise resolving once the setting is set.
       */
      static async setSetting(key, newVal) {
          return await this.serverAPI.callPluginMethod("setSetting", { key: key, newVal: newVal });
      }
      /**
       * Adds a new screenshot on the backend and returns the updated screenshots dictionary.
       * @param screenshot The screenshot to add.
       * @returns A promise resolving to a server response containing the updated screenshots dictionary.
       */
      static async addScreenshot(screenshot) {
          return await this.serverAPI.callPluginMethod("addScreenshot", { screenshot: screenshot });
      }
      /**
       * Sets the entire screenshots dictionary, and returns the updated dictionary.
       * @param screenshots The updated screenshots dictionary.
       * @returns A promise resolving to a server response containing the updated screenshots dictionary.
       */
      static async setScreenshots(screenshots) {
          return await this.serverAPI.callPluginMethod("setScreenshots", { screenshots: screenshots });
      }
      /**
       * Updates/edits a screenshot on the backend, and returns the updated dictionary.
       * @param screenshot The screenshot to update.
       * @returns A promise resolving to a server response containing the updated screenshots dictionary.
       */
      static async modScreenshot(screenshot) {
          return await this.serverAPI.callPluginMethod("modScreenshot", { screenshot: screenshot });
      }
      /**
       * Removes a screenshot on the backend and returns the updated screenshots dictionary.
       * @param screenshot The screenshot to remove.
       * @returns A promise resolving to a server response containing the updated screenshots dictionary.
       */
      static async remScreenshot(screenshot) {
          return await this.serverAPI.callPluginMethod("remScreenshot", { screenshot: screenshot });
      }
      /**
       * Runs a non app screenshot.
       * @param screenshotId The id of the screenshot to run.
       * @param flags Optional tuple array of flags to pass to the screenshot.
       */
      static async runNonAppScreenshot(screenshotId, flags) {
          const successful = await this.serverAPI.callPluginMethod("runNonAppScreenshot", { screenshotId: screenshotId, flags: flags });
          return successful;
      }
      /**
       * Kills a non app screenshot.
       * @param screenshotId The id of the screenshot to kill.
       */
      static async killNonAppScreenshot(screenshotId) {
          const successful = await this.serverAPI.callPluginMethod("killNonAppScreenshot", { screenshotId: screenshotId });
          return successful;
      }
      /**
       * Sets the value of a plugin's setting.
       * @param key The key of the setting to set.
       * @param newVal The new value for the setting.
       * @returns A void promise resolving once the setting is set.
       */
      static async getWebhookUrl() {
          return await this.serverAPI.callPluginMethod("getWebhookUrl", {});
      }
      /**
       * Sets the value of a plugin's setting.
       * @param key The key of the setting to set.
       * @param newVal The new value for the setting.
       * @returns A void promise resolving once the setting is set.
       */
      static async setWebhookUrl(key) {
          return await this.serverAPI.callPluginMethod("setWebhookUrl", { webhookUrl: key });
      }
      /**
       * Sets the value of a plugin's setting.
       * @param key The key of the setting to set.
       * @param newVal The new value for the setting.
       * @returns A void promise resolving once the setting is set.
       */
      static async uploadScreenshot(key) {
          return await this.serverAPI.callPluginMethod("uploadScreenshot", { filepath: key });
      }
      /**
       * Sets the value of a plugin's setting.
       * @param key The key of the setting to set.
       * @param newVal The new value for the setting.
       * @returns A void promise resolving once the setting is set.
       */
      static async uploadScreenshots() {
          return await this.serverAPI.callPluginMethod("uploadScreenshots", {});
      }
  }

  /**
   * A component for the label of a ScreenshotLauncher.
   * @param props The props for this ScreenshotLabel.
   * @returns A ScreenshotLabel component.
   */
  const ScreenshotLabel = (props) => {
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("style", null, `
        @keyframes deckshare-running-screenshot-gradient {
          0% {
            background-color:  #36ff04;
          }
          50% {
            background-color: #00d836;
          }
          100% {
            background-color:  #36ff04;
          }
        }
      `),
          window.SP_REACT.createElement("div", { style: {
                  "height": "100%",
                  "display": "flex",
                  "flexDirection": "row",
                  "alignItems": "center"
              } },
              window.SP_REACT.createElement("div", null, props.screenshot.name),
              window.SP_REACT.createElement("div", { style: {
                      "visibility": props.isRunning ? "visible" : "hidden",
                      "marginLeft": "7px",
                      "width": "12px",
                      "height": "12px",
                      "borderRadius": "50%",
                      "backgroundColor": "#36ff04",
                      "animation": "gradient 3s ease-in-out infinite"
                  } }))));
  };
  /**
   * A component for launching screenshots.
   * @param props The ScreenshotLauncher's props.
   * @returns The ScreenshotLauncher component.
   */
  const ScreenshotLauncher = (props) => {
      const [isRunning] = React.useState(false);
      /**
       * Determines which action to run when the interactable is selected.
       * @param screenshot The screenshot associated with this screenshotLauncher.
       */
      async function onAction() {
          PyInterop.toast("DeckShare", "Manually sharing screenshot");
          await PyInterop.setSetting("screenshotsShared", (await PyInterop.getSetting("screenshotsShared", 0) + 1));
          await PyInterop.uploadScreenshot(props.screenshot.path);
      }
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("style", null, `
          .custom-buttons {
            width: inherit;
            height: inherit;
            display: inherit;
          }

          .custom-buttons .${deckyFrontendLib.gamepadDialogClasses.FieldChildren} {
            margin: 0px 16px;
          }
      `),
          window.SP_REACT.createElement("div", { className: "custom-buttons" },
              window.SP_REACT.createElement(deckyFrontendLib.Field, { label: window.SP_REACT.createElement(ScreenshotLabel, { screenshot: props.screenshot, isRunning: isRunning }) },
                  window.SP_REACT.createElement(deckyFrontendLib.Focusable, { style: { display: "flex", width: "100%" } },
                      window.SP_REACT.createElement(deckyFrontendLib.DialogButton, { onClick: () => onAction(), style: {
                              minWidth: "30px",
                              maxWidth: "60px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                          } }, props.screenshot.base64 && window.SP_REACT.createElement("img", { style: { maxWidth: 60, maxHeight: 32 }, src: `data:image/png;base64,${props.screenshot.base64}`, alt: "Screenshot" })))))));
  };

  class ScreenshotsState {
      constructor() {
          this.screenshots = {};
          this.screenshotsList = [];
          this.runningScreenshots = new Set();
          this.reorderableScreenshots = [];
          this.currentGame = null;
          this.gameRunning = false;
          this.eventBus = new EventTarget();
      }
      getPublicState() {
          return {
              "screenshots": this.screenshots,
              "screenshotsList": this.screenshotsList,
              "runningScreenshots": this.runningScreenshots,
              "reorderableScreenshots": this.reorderableScreenshots,
              "currentGame": this.currentGame,
              "gameRunning": this.gameRunning
          };
      }
      setIsRunning(screenshotId, value) {
          if (value) {
              this.runningScreenshots.add(screenshotId);
          }
          else {
              this.runningScreenshots.delete(screenshotId);
          }
          this.runningScreenshots = new Set(this.runningScreenshots.values());
          this.forceUpdate();
      }
      setCurrentGame(overview) {
          this.currentGame = overview;
          this.forceUpdate();
      }
      setGameRunning(isRunning) {
          this.gameRunning = isRunning;
          this.forceUpdate();
      }
      setScreenshots(screenshots) {
          this.screenshots = screenshots;
          this.screenshotsList = Object.values(this.screenshots).sort((a, b) => a.position - b.position);
          this.reorderableScreenshots = [];
          for (let i = 0; i < this.screenshotsList.length; i++) {
              const screenshot = this.screenshotsList[i];
              this.reorderableScreenshots[i] = {
                  "label": screenshot.name,
                  "data": screenshot,
                  "position": screenshot.position
              };
          }
          this.reorderableScreenshots.sort((a, b) => a.position - b.position);
          this.forceUpdate();
      }
      forceUpdate() {
          this.eventBus.dispatchEvent(new Event("stateUpdate"));
      }
  }
  const ScreenshotsContext = React.createContext(null);
  const useScreenshotsState = () => React.useContext(ScreenshotsContext);
  const ScreenshotsContextProvider = ({ children, screenshotsStateClass }) => {
      const [publicState, setPublicState] = React.useState({
          ...screenshotsStateClass.getPublicState()
      });
      React.useEffect(() => {
          function onUpdate() {
              setPublicState({ ...screenshotsStateClass.getPublicState() });
          }
          screenshotsStateClass.eventBus
              .addEventListener("stateUpdate", onUpdate);
          return () => {
              screenshotsStateClass.eventBus
                  .removeEventListener("stateUpdate", onUpdate);
          };
      }, []);
      const setScreenshots = (screenshots) => {
          screenshotsStateClass.setScreenshots(screenshots);
      };
      const setIsRunning = (screenshotId, value) => {
          screenshotsStateClass.setIsRunning(screenshotId, value);
      };
      const setCurrentGame = (overview) => {
          screenshotsStateClass.setCurrentGame(overview);
      };
      const setGameRunning = (isRunning) => {
          screenshotsStateClass.setGameRunning(isRunning);
      };
      return (window.SP_REACT.createElement(ScreenshotsContext.Provider, { value: {
              ...publicState,
              setScreenshots,
              setIsRunning,
              setCurrentGame,
              setGameRunning
          } }, children));
  };

  /**
   * Controller class for screenshots.
   */
  class ScreenshotsController {
      /**
       * Creates a new ScreenshotsController.
       * @param steamController The SteamController used by this class.
       */
      constructor(steamController) {
          this.steamController = steamController;
      }
      /**
       * Function to run when the plugin dismounts.
       */
      onDismount() {
          PyInterop.log("Dismounting...");
      }
      /**
       * Gets all of the current user's steam screenshots.
       * @returns A promise resolving to a collection of the current user's steam screenshots.
       */
      async getScreenshots() {
          const res = await this.steamController.getScreenshots();
          return res;
      }
      /**
       * Gets the current user's steam screenshot with the given name.
       * @param name The name of the screenshot to get.
       * @returns A promise resolving to the screenshot with the provided name, or null.
       */
      async getScreenshot(name) {
          const res = await this.steamController.getScreenshot(name);
          if (res) {
              return res[0];
          }
          else {
              return null;
          }
      }
      /**
       * Checks if a screenshot exists.
       * @param name The name of the screenshot to check for.
       * @returns A promise resolving to true if the screenshot was found.
       */
      async checkScreenshotExist(name) {
          const screenshotsArr = await this.steamController.getScreenshot(name);
          return screenshotsArr.length > 0;
      }
      /**
       * Checks if a screenshot exists.
       * @param appId The id of the screenshot to check for.
       * @returns A promise resolving to true if the screenshot was found.
       */
      async checkScreenshotExistById(appId) {
          const screenshotsArr = await this.steamController.getScreenshotById(appId);
          return screenshotsArr[0]?.unAppID != 0;
      }
      /**
       * Sets the exe of a steam screenshot.
       * @param appId The id of the app to set.
       * @param exec The new value for the exe.
       * @returns A promise resolving to true if the exe was set successfully.
       */
      async setScreenshotExe(appId, exec) {
          return await this.steamController.setScreenshotExe(appId, exec);
      }
      /**
       * Sets the start dir of a steam screenshot.
       * @param appId The id of the app to set.
       * @param startDir The new value for the start dir.
       * @returns A promise resolving to true if the start dir was set successfully.
       */
      async setScreenshotStartDir(appId, startDir) {
          return await this.steamController.setScreenshotStartDir(appId, startDir);
      }
      /**
       * Sets the launch options of a steam screenshot.
       * @param appId The id of the app to set.
       * @param launchOpts The new value for the launch options.
       * @returns A promise resolving to true if the launch options was set successfully.
       */
      async setScreenshotLaunchOptions(appId, launchOpts) {
          return await this.steamController.setAppLaunchOptions(appId, launchOpts);
      }
      /**
       * Sets the name of a steam screenshot.
       * @param appId The id of the app to set.
       * @param newName The new name for the screenshot.
       * @returns A promise resolving to true if the name was set successfully.
       */
      async setScreenshotName(appId, newName) {
          return await this.steamController.setScreenshotName(appId, newName);
      }
      /**
       * Launches a steam screenshot.
       * @param appId The id of the steam screenshot to launch.
       * @returns A promise resolving to true if the screenshot was successfully launched.
       */
      async launchScreenshot(appId) {
          return await this.steamController.runGame(appId, false);
      }
      /**
       * Closes a running screenshot.
       * @param appId The id of the screenshot to close.
       * @returns A promise resolving to true if the screenshot was successfully closed.
       */
      async closeScreenshot(appId) {
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
      async addScreenshot(name, exec, startDir, launchArgs) {
          const appId = await this.steamController.addScreenshot(name, exec, startDir, launchArgs);
          if (appId) {
              return appId;
          }
          else {
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
      async removeScreenshot(name) {
          const screenshot = await this.steamController.getScreenshot(name)[0];
          if (screenshot) {
              return await this.steamController.removeScreenshot(screenshot.unAppID);
          }
          else {
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
      async removeScreenshotById(appId) {
          const res = await this.steamController.removeScreenshot(appId);
          if (res) {
              return true;
          }
          else {
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
      registerForScreenshotExit(appId, onExit) {
          return this.steamController.registerForAppLifetimeNotifications(appId, (data) => {
              if (data.bRunning)
                  return;
              onExit(data);
          });
      }
  }

  /**
   * Class representing an Instance of DeckShare.
   */
  class Instance {
      /**
       * Creates a new Instance.
       * @param unAppID The id of the app to create an instance for.
       * @param steamScreenshotName The name of this instance.
       * @param screenshotId The id of the screenshot associated with this instance.
       * @param screenshotIsApp Whether the screenshot is an app.
       */
      constructor(unAppID, steamScreenshotName, screenshotId, screenshotIsApp) {
          this.unAppID = unAppID;
          this.steamScreenshotName = steamScreenshotName;
          this.screenshotId = screenshotId;
          this.screenshotIsApp = screenshotIsApp;
      }
  }

  /**
   * Controller for managing plugin instances.
   */
  class InstancesController {
      /**
       * Creates a new InstancesController.
       * @param screenshotsController The screenshots controller used by this class.
       * @param webSocketClient The WebSocketClient used by this class.
       * @param state The plugin state.
       */
      constructor(screenshotsController, webSocketClient, state) {
          this.baseName = "DeckShare";
          this.runnerPath = "/home/deck/homebrew/plugins/deckshare/screenshotsRunner.sh";
          this.startDir = "\"/home/deck/homebrew/plugins/deckshare/\"";
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
      getDatetime() {
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
      async createInstance(screenshot) {
          this.numInstances++;
          const screenshotName = `${this.baseName} - Instance ${this.numInstances}`;
          if (screenshot.isApp) {
              let appId = null;
              //* check if instance exists. if so, grab it and modify it
              if (await this.shorcutsController.checkScreenshotExist(screenshotName)) {
                  const screenshot = await this.shorcutsController.getScreenshot(screenshotName);
                  appId = screenshot?.unAppID;
              }
              else {
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
              }
              else {
                  this.numInstances--;
                  PyInterop.log(`Failed to start instance. Id: ${screenshot.id} Name: ${screenshot.name}`);
                  return false;
              }
          }
          else {
              PyInterop.log(`Screenshot is not an app. Skipping instance screenshot creation. ScreenshotId: ${screenshot.id} ScreenshotName: ${screenshot.name}`);
              this.instances[screenshot.id] = new Instance(null, screenshotName, screenshot.id, screenshot.isApp);
              PyInterop.log(`Adding websocket listener for message type ${screenshot.id}`);
              this.webSocketClient.on(screenshot.id, (data) => {
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
      async killInstance(screenshotId) {
          const instance = this.instances[screenshotId];
          if (instance.screenshotIsApp) {
              const appId = instance.unAppID;
              const success = await this.shorcutsController.removeScreenshotById(appId);
              if (success) {
                  PyInterop.log(`Killed instance. Id: ${screenshotId} InstanceName: ${instance.steamScreenshotName}`);
                  delete this.instances[screenshotId];
                  this.numInstances--;
                  return true;
              }
              else {
                  PyInterop.log(`Failed to kill instance. Could not delete screenshot. Id: ${screenshotId} InstanceName: ${instance.steamScreenshotName}`);
                  return false;
              }
          }
          else {
              delete this.instances[screenshotId];
              const res = await PyInterop.killNonAppScreenshot(screenshotId);
              console.log(res);
              this.webSocketClient.on(screenshotId, (data) => {
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
      async launchInstance(screenshotId, onExit, flags = {}) {
          const instance = this.instances[screenshotId];
          if (instance.screenshotIsApp) {
              const appId = instance.unAppID;
              const res = await this.shorcutsController.launchScreenshot(appId);
              if (!res) {
                  PyInterop.log(`Failed to launch instance. InstanceName: ${instance.steamScreenshotName} ScreenshotId: ${screenshotId}`);
              }
              else {
                  const { unregister } = this.shorcutsController.registerForScreenshotExit(appId, (data) => {
                      onExit(data);
                      unregister();
                  });
              }
              return res;
          }
          else {
              const [date, time] = this.getDatetime();
              const currentGameOverview = this.state.getPublicState().currentGame;
              flags["d"] = date;
              flags["t"] = time;
              if (!Object.keys(flags).includes("u"))
                  flags["u"] = loginStore.m_strAccountName;
              if (!Object.keys(flags).includes("i") && currentGameOverview != null)
                  flags["i"] = currentGameOverview.appid.toString();
              if (!Object.keys(flags).includes("n") && currentGameOverview != null)
                  flags["n"] = currentGameOverview.display_name;
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
      async stopInstance(screenshotId) {
          const instance = this.instances[screenshotId];
          if (instance.screenshotIsApp) {
              const appId = instance.unAppID;
              const res = await this.shorcutsController.closeScreenshot(appId);
              deckyFrontendLib.Navigation.Navigate("/library/home");
              deckyFrontendLib.Navigation.CloseSideMenus();
              if (!res) {
                  PyInterop.log(`Failed to stop instance. Could not close screenshot. Id: ${screenshotId} InstanceName: ${instance.steamScreenshotName}`);
                  return false;
              }
              return true;
          }
          else {
              //* atm nothing needed here
              // const res = await PyInterop.killNonAppScreenshot(screenshotId);
              // console.log(res);
              return true;
          }
      }
  }

  /**
   * Waits for a condition to be true.
   * @param retries The number of times to retry the condition.
   * @param delay The time (in ms) between retries.
   * @param check The condition to check.
   * @returns A promise resolving to true if the check was true on any attempt, or false if it failed each time.
   */
  async function waitForCondition(retries, delay, check) {
      const waitImpl = async () => {
          try {
              let tries = retries + 1;
              while (tries-- !== 0) {
                  if (await check()) {
                      return true;
                  }
                  if (tries > 0) {
                      await deckyFrontendLib.sleep(delay);
                  }
              }
          }
          catch (error) {
              console.error(error);
          }
          return false;
      };
      return await waitImpl();
  }
  /**
   * The react History object.
   */
  const History = deckyFrontendLib.findModuleChild((m) => {
      if (typeof m !== "object")
          return undefined;
      for (let prop in m) {
          if (m[prop]?.m_history)
              return m[prop].m_history;
      }
  });
  /**
   * Provides a debounced version of a function.
   * @param func The function to debounce.
   * @param wait How long before function gets run.
   * @param immediate Wether the function should run immediately.
   * @returns A debounced version of the function.
   */
  function debounce(func, wait, immediate) {
      let timeout;
      return function () {
          const context = this, args = arguments;
          const later = function () {
              timeout = null;
              if (!immediate)
                  func.apply(context, args);
          };
          const callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow)
              func.apply(context, args);
      };
  }

  /**
   * Wrapper class for the SteamClient interface.
   */
  class SteamController {
      constructor() {
          this.hasLoggedIn = false;
          this.hasLoggedOut = false;
      }
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
      async getScreenshots() {
          const appIds = this.getNonSteamAppIds();
          const res = await Promise.all(appIds.map((appId) => this.getAppDetails(appId)));
          PyInterop.log(`Got screenshots. [DEBUG INFO] resultsLength: ${res.length};`);
          return res;
      }
      /**
       * Gets a list of the current user's steam screenshots with a given name.
       * @param appName The name of the screenshot to look for.
       * @returns A promise resolving to list of the current user's steam screenshots.
       */
      async getScreenshot(appName) {
          const screenshotsList = await this.getScreenshots();
          const res = screenshotsList.filter((s) => s.strDisplayName == appName);
          PyInterop.log(`Got screenshots with desired name. [DEBUG INFO] appName: ${appName}; resultsLength: ${res.length};`);
          return res;
      }
      /**
       * Gets a list of the current user's steam screenshots with a given id.
       * @param appId The id of the screenshot to look for.
       * @returns A promise resolving to list of the current user's steam screenshots.
       */
      async getScreenshotById(appId) {
          const screenshotsList = await this.getScreenshots();
          const res = screenshotsList.filter((s) => s.unAppID == appId);
          PyInterop.log(`Got screenshots with desired name. [DEBUG INFO] appId: ${appId}; resultsLength: ${res.length};`);
          return res;
      }
      /**
       * Gets the SteamAppOverview of the app with a given appId.
       * @param appId The id of the app to get.
       * @returns A promise resolving to the SteamAppOverview of the app
       */
      async getAppOverview(appId) {
          await this.waitForAppOverview(appId, (overview) => overview !== null);
          return this._getAppOverview(appId);
      }
      async waitForAppOverview(appId, condition) {
          return await waitForCondition(3, 250, async () => {
              const overview = await this._getAppOverview(appId);
              return condition(overview);
          });
      }
      async _getAppOverview(appId) {
          return appStore.GetAppOverviewByAppID(appId);
      }
      /**
       * Gets the SteamAppDetails of the app with a given appId.
       * @param appId The id of the app to get.
       * @returns A promise resolving to the SteamAppDetails of the app
       */
      async getAppDetails(appId) {
          await this.waitForAppDetails(appId, (details) => details !== null);
          return await this._getAppDetails(appId);
      }
      async waitForAppDetails(appId, condition) {
          return await waitForCondition(3, 250, async () => {
              const details = await this._getAppDetails(appId);
              return condition(details);
          });
      }
      async _getAppDetails(appId) {
          return new Promise((resolve) => {
              try {
                  const { unregister } = SteamClient.Apps.RegisterForAppDetails(appId, (details) => {
                      unregister();
                      resolve(details.unAppID === undefined ? null : details);
                  });
              }
              catch (e) {
                  PyInterop.log(`Error encountered trying to get app details. Error: ${e.message}`);
              }
          });
      }
      /**
       * Hides a steam app.
       * @param appId The id of the app to hide.
       * @returns A promise resolving to true if the app was successfully hidden.
       */
      async hideApp(appId) {
          const { collectionStore } = window;
          if (collectionStore.BIsHidden(appId)) {
              PyInterop.log(`Successfully hid app (1 try). [DEBUG INFO] appId: ${appId};`);
              return true;
          }
          collectionStore.SetAppsAsHidden([appId], true);
          let retries = 4;
          while (retries--) {
              if (collectionStore.BIsHidden(appId)) {
                  PyInterop.log(`Successfully hid app (${4 - retries + 1} tries). [DEBUG INFO] appId: ${appId};`);
                  return true;
              }
              if (retries > 0) {
                  await deckyFrontendLib.sleep(250);
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
      async addScreenshot(appName, execPath, startDir, launchArgs) {
          const appId = await SteamClient.Apps.AddScreenshot(appName, execPath, startDir, launchArgs);
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
      async setScreenshotExe(appId, exePath) {
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
      async setScreenshotStartDir(appId, startDir) {
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
      async setAppLaunchOptions(appId, options) {
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
      async setScreenshotName(appId, newName) {
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
      async removeScreenshot(appId) {
          const overview = await this.getAppOverview(appId);
          if (!overview) {
              PyInterop.log(`Could not remove screenshot (does not exist). [DEBUG INFO] appId: ${appId};`);
              return true;
          }
          const { collectionStore } = window;
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
      async getGameId(appId) {
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
      registerForAppLifetimeNotifications(appId, callback) {
          return SteamClient.GameSessions.RegisterForAppLifetimeNotifications((data) => {
              console.log("Lifecycle id:", data.unAppID, appId);
              if (data.unAppID !== appId)
                  return;
              callback(data);
          });
      }
      /**
       * Registers for all lifecycle updates for steam apps.
       * @param callback The callback to run when an update is recieved.
       * @returns A function to call to unregister the hook.
       */
      registerForAllAppLifetimeNotifications(callback) {
          return SteamClient.GameSessions.RegisterForAppLifetimeNotifications((data) => {
              callback(data.unAppID, data);
          });
      }
      /**
       * Waits for a game lifetime event to occur.
       * @param appId The id of the app to wait for.
       * @param options The options to determine when the function returns true.
       * @returns A promise resolving to true when the desired lifetime event occurs.
       */
      async waitForAppLifetimeNotifications(appId, options = {}) {
          return new Promise((resolve) => {
              let timeoutId = null;
              const { unregister } = this.registerForAppLifetimeNotifications(appId, (data) => {
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
      async runGame(appId, waitUntilGameStops) {
          const gameStart = this.waitForAppLifetimeNotifications(appId, { initialTimeout: 1500, waitForStart: true, waitUntilNewEnd: waitUntilGameStops });
          const gameId = await this.getGameId(appId);
          console.log("GameId:", gameId);
          SteamClient.Apps.RunGame(gameId, "", -1, 100);
          PyInterop.log(`Running app/game. [DEBUG INFO] appId: ${appId}; gameId: ${gameId};`);
          return await gameStart;
      }
      /**
       * Terminates a steam app.
       * @param appId The id of the app to terminate.
       * @returns A promise resolving once the app has been terminated or the request times out.
       */
      async terminateGame(appId) {
          const gameEnd = this.waitForAppLifetimeNotifications(appId, { initialTimeout: 1500, waitForStart: false, waitUntilNewEnd: true });
          const gameId = await this.getGameId(appId);
          SteamClient.Apps.TerminateApp(gameId, false);
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
      registerForAuthStateChange(onLogin, onLogout, once) {
          try {
              let isLoggedIn = null;
              const currentUsername = loginStore.m_strAccountName;
              return SteamClient.User.RegisterForLoginStateChange((username) => {
                  if (username === "") {
                      if (isLoggedIn !== false && (once ? !this.hasLoggedOut : true)) {
                          if (onLogout)
                              onLogout(currentUsername);
                      }
                      isLoggedIn = false;
                  }
                  else {
                      if (isLoggedIn !== true && (once ? !this.hasLoggedIn : true)) {
                          if (onLogin)
                              onLogin(username);
                      }
                      isLoggedIn = true;
                  }
              });
          }
          catch (error) {
              PyInterop.log(`error with AuthStateChange hook. [DEBUG INFO] error: ${error};`);
              // @ts-ignore
              return () => { };
          }
      }
      /**
       * Waits until the services are initialized.
       * @returns A promise resolving to true if services were initialized on any attempt, or false if all attemps failed.
       */
      async waitForServicesToInitialize() {
          const servicesFound = await waitForCondition(20, 250, () => window.App?.WaitForServicesInitialized != null);
          if (servicesFound) {
              PyInterop.log(`Services found.`);
          }
          else {
              PyInterop.log(`Couldn't find services.`);
          }
          return (await window.App?.WaitForServicesInitialized?.().then((success) => {
              PyInterop.log(`Services initialized. Success: ${success}`);
              return success;
          })) ?? false;
      }
      /**
       * Registers a callback for game install events.
       * @param callback The callback to run.
       * @returns An Unregisterer for this hook.
       */
      registerForGameInstall(callback) {
          const installedGames = collectionStore.localGamesCollection;
          const overviewMap = new Map();
          const overviewRegister = SteamClient.Downloads.RegisterForDownloadOverview((overview) => {
              if (overview && collectionStore.allAppsCollection.apps.has(overview.update_appid))
                  overviewMap.set(overview.update_appid, overview);
          });
          const itemsRegister = SteamClient.Downloads.RegisterForDownloadItems((_, downloadItems) => {
              const download = downloadItems[0];
              if (downloadItems.length > 0) {
                  const appId = download.appid;
                  if (overviewMap.has(appId)) {
                      const overview = overviewMap.get(appId);
                      const isInstall = overview?.update_is_install;
                      if (download.completed && isInstall) {
                          callback(installedGames.apps.get(appId), download);
                      }
                  }
              }
          });
          return {
              unregister: () => {
                  overviewRegister.unregister();
                  itemsRegister.unregister();
              }
          };
      }
      /**
       * Registers a callback for game update events.
       * @param callback The callback to run.
       * @returns An Unregisterer for this hook.
       */
      registerForGameUpdate(callback) {
          const installedGames = collectionStore.localGamesCollection;
          const overviewMap = new Map();
          const overviewRegister = SteamClient.Downloads.RegisterForDownloadOverview((overview) => {
              if (overview && collectionStore.allAppsCollection.apps.has(overview.update_appid))
                  overviewMap.set(overview.update_appid, overview);
          });
          const itemsRegister = SteamClient.Downloads.RegisterForDownloadItems((_, downloadItems) => {
              const download = downloadItems[0];
              if (downloadItems.length > 0) {
                  const appId = download.appid;
                  if (overviewMap.has(appId)) {
                      const overview = overviewMap.get(appId);
                      const isUpdate = !overview?.update_is_install;
                      if (download.completed && isUpdate) {
                          callback(installedGames.apps.get(appId), download);
                      }
                  }
              }
          });
          return {
              unregister: () => {
                  overviewRegister.unregister();
                  itemsRegister.unregister();
              }
          };
      }
      /**
       * Registers a callback for game uninstall events.
       * @param callback The callback to run.
       * @returns An Unregisterer for this hook.
       */
      registerForGameUninstall(callback) {
          const installedGames = collectionStore.localGamesCollection;
          const actionQueue = [];
          const startRegister = SteamClient.Apps.RegisterForGameActionStart((_, appId, action) => {
              const appData = installedGames.apps.get(parseInt(appId));
              if (action === "UninstallApps") {
                  actionQueue.push({ "data": { "appData": appData }, "action": action });
              }
              else {
                  actionQueue.push({ "data": null, "action": action });
              }
          });
          const endRegister = SteamClient.Apps.RegisterForGameActionEnd((_) => {
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
          };
      }
      /**
       * Registers a callback for achievement notification events.
       * @param callback The callback to run.
       * @returns An Unregisterer for this hook.
       */
      registerForGameAchievementNotification(callback) {
          return SteamClient.GameSessions.RegisterForAchievementNotification((data) => {
              callback(data);
          });
      }
      /**
       * Registers a callback for screenshot notification events.
       * @param callback The callback to run.
       * @returns An Unregisterer for this hook.
       */
      registerForScreenshotNotification(callback) {
          return SteamClient.GameSessions.RegisterForScreenshotNotification((data) => {
              callback(data);
          });
      }
      /**
       * Registers a callback for deck sleep requested events.
       * @param callback The callback to run.
       * @returns An Unregisterer for this hook.
       */
      registerForSleepStart(callback) {
          return SteamClient.User.RegisterForPrepareForSystemSuspendProgress(() => {
              callback();
          });
      }
      /**
       * Registers a callback for deck shutdown requested events.
       * @param callback The callback to run.
       * @returns An Unregisterer for this hook.
       */
      registerForShutdownStart(callback) {
          return SteamClient.User.RegisterForShutdownStart(() => {
              callback();
          });
      }
      /**
       * Restarts the Steam client.
       */
      restartClient() {
          SteamClient.User.StartRestart();
      }
  }

  /**
   * Enum for return values from running scripts.
   */
  // @ts-ignore
  var ScriptStatus;
  (function (ScriptStatus) {
      ScriptStatus[ScriptStatus["UNEXPECTED_RETURN_CODE"] = -1] = "UNEXPECTED_RETURN_CODE";
      ScriptStatus[ScriptStatus["FINISHED"] = 0] = "FINISHED";
      ScriptStatus[ScriptStatus["DOES_NOT_EXIST"] = 1] = "DOES_NOT_EXIST";
      ScriptStatus[ScriptStatus["RUNNING"] = 2] = "RUNNING";
      ScriptStatus[ScriptStatus["KILLED"] = 3] = "KILLED";
      ScriptStatus[ScriptStatus["FAILED"] = 4] = "FAILED";
  })(ScriptStatus || (ScriptStatus = {}));
  /**
   * WebSocketClient class for connecting to a WebSocket.
   */
  class WebSocketClient {
      /**
       * Creates a new WebSocketClient.
       * @param hostName The host name of the WebSocket.
       * @param port The port of the WebSocket.
       * @param reconnectInterval The time between reconnect attempts.
       * @param numRetries The number of times to try to reconnect. If null there is no cap. Defaults to null.
       */
      constructor(hostName, port, reconnectInterval, numRetries = null) {
          this.listeners = new Map();
          this.hostName = hostName;
          this.port = port;
          this.reconnectInterval = reconnectInterval;
          this.numRetries = numRetries;
          this.ws = null;
      }
      /**
       * Connects the client to the WebSocket.
       */
      connect() {
          PyInterop.log(`WebSocket client connecting to ${this.hostName}:${this.port}...`);
          this.ws = new WebSocket(`ws://${this.hostName}:${this.port}`);
          this.ws.onopen = this.onOpen.bind(this);
          this.ws.onmessage = this.listen.bind(this);
          this.ws.onerror = this.onError.bind(this);
          this.ws.onclose = this.onClose.bind(this);
          PyInterop.log(`WebSocket client connected to ${this.hostName}:${this.port}.`);
      }
      /**
       * Disconnects the client from the WebSocket.
       */
      disconnect() {
          PyInterop.log(`WebSocket client disconnecting from ${this.hostName}:${this.port}...`);
          this.ws?.close();
          PyInterop.log(`WebSocket client disconnected from ${this.hostName}:${this.port}.`);
      }
      /**
       * Listens to the WebSocket for messages.
       * @param e The MessageEvent.
       */
      listen(e) {
          // PyInterop.log(`Recieved message: ${JSON.stringify(e)}`);
          try {
              const info = JSON.parse(e.data);
              // PyInterop.log(`WebSocketClient recieved message containing JSON data. Message: ${JSON.stringify(e)} Data: ${JSON.stringify(info)}`);
              if (this.listeners.has(info.type)) {
                  const registeredListeners = this.listeners.get(info.type);
                  for (const listener of registeredListeners) {
                      listener(info.data);
                  }
              }
          }
          catch (err) {
              // PyInterop.log(`WebSocketClient recieved message containing no JSON data. Message: ${JSON.stringify(e)} Error: ${JSON.stringify(err)}`);
          }
      }
      /**
       * Handler for WebSocket errors.
       * @param e The Event.
       */
      onError(e) {
          PyInterop.log(`Websocket recieved and error: ${JSON.stringify(e)}`);
      }
      /**
       * Handler for when WebSocket opens.
       * @param e The Event.
       */
      onOpen(e) {
          this.ws?.send("Hello server from TS!");
          PyInterop.log(`WebSocket server opened. Event: ${JSON.stringify(e)}`);
      }
      /**
       * Handler for when WebSocket closes.
       * @param e The CloseEvent.
       */
      onClose(e) {
          // const returnCode = e.code;
          // const reason = e.reason;
          // const wasClean = e.wasClean;
          PyInterop.log(`WebSocket onClose triggered: ${JSON.stringify(e)}`);
      }
      /**
       * Registers a callback to run when an event with the given message is recieved.
       * @param type The type of message to register the callback for.
       * @param callback The callback to run.
       */
      on(type, callback) {
          let existingListeners = [];
          if (this.listeners.has(type)) {
              existingListeners = this.listeners.get(type);
          }
          existingListeners.push(callback);
          this.listeners.set(type, existingListeners);
          PyInterop.log(`Registered listener for message of type: ${type}.`);
      }
      /**
       * Deletes all listeners for a message type.
       * @param type The type of message.
       */
      deleteListeners(type) {
          this.listeners.delete(type);
          PyInterop.log(`Removed listeners for message of type: ${type}.`);
      }
      /**
       * Sends a message to the WebSocket.
       * @param type The type message name to send.
       * @param data The data to send.
       */
      sendMessage(type, data) {
          this.ws?.send(JSON.stringify({
              "type": type,
              "data": data
          }));
      }
  }

  /**
   * Enum for the different hook events.
   */
  var Hook;
  (function (Hook) {
      Hook["LOG_IN"] = "Log In";
      Hook["LOG_OUT"] = "Log Out";
      Hook["GAME_START"] = "Game Start";
      Hook["GAME_END"] = "Game End";
      Hook["GAME_INSTALL"] = "Game Install";
      Hook["GAME_UPDATE"] = "Game Update";
      Hook["GAME_UNINSTALL"] = "Game Uninstall";
      Hook["GAME_ACHIEVEMENT_UNLOCKED"] = "Game Achievement Unlocked";
      Hook["SCREENSHOT_TAKEN"] = "Screenshot Taken";
      Hook["DECK_SHUTDOWN"] = "Deck Shutdown";
      Hook["DECK_SLEEP"] = "Deck Sleep";
  })(Hook || (Hook = {}));
  Object.values(Hook).map((entry) => { return { label: entry, data: entry }; });
  /**
   * Controller for handling hook events.
   */
  class HookController {
      /**
       * Creates a new HooksController.
       * @param steamController The SteamController to use.
       * @param instancesController The InstanceController to use.
       * @param webSocketClient The WebSocketClient to use.
       * @param state The plugin state.
       */
      constructor(steamController, instancesController, webSocketClient, state) {
          // @ts-ignore
          this.screenshotHooks = {};
          // @ts-ignore
          this.registeredHooks = {};
          this.state = state;
          this.steamController = steamController;
          this.instancesController = instancesController;
          this.webSocketClient = webSocketClient;
          for (const hook of Object.values(Hook)) {
              this.screenshotHooks[hook] = new Set();
          }
      }
      /**
       * Initializes the hooks for all screenshots.
       * @param screenshots The screenshots to initialize the hooks of.
       */
      init(screenshots) {
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
      getScreenshotById(screenshotId) {
          return this.state.getPublicState().screenshots[screenshotId];
      }
      /**
       * Updates the hooks for a screenshot.
       * @param screenshot The screenshot to update the hooks of.
       */
      updateHooks(screenshot) {
          const screenshotHooks = screenshot.hooks;
          for (const h of Object.keys(this.screenshotHooks)) {
              const hook = h;
              const registeredHooks = this.screenshotHooks[hook];
              if (screenshotHooks.includes(hook)) {
                  this.registerHook(screenshot, hook);
              }
              else if (Object.keys(registeredHooks).includes(screenshot.id)) {
                  this.unregisterHook(screenshot, hook);
              }
          }
      }
      /**
       * Registers a hook for a screenshot.
       * @param screenshot The screenshot to register the hook for.
       * @param hook The hook to register.
       */
      registerHook(screenshot, hook) {
          this.screenshotHooks[hook].add(screenshot.id);
          PyInterop.log(`Registered hook: ${hook} for screenshot: ${screenshot.name} Id: ${screenshot.id}`);
      }
      /**
       * Unregisters all hooks for a given screenshot.
       * @param screenshot The screenshot to unregister the hooks from.
       */
      unregisterAllHooks(screenshot) {
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
      unregisterHook(screenshot, hook) {
          this.screenshotHooks[hook].delete(screenshot.id);
          PyInterop.log(`Unregistered hook: ${hook} for screenshot: ${screenshot.name} Id: ${screenshot.id}`);
      }
      async runScreenshots() {
          try {
              const autoupload = await PyInterop.getSetting("autoupload", false);
              const notifications = await PyInterop.getSetting("notifications", false);
              const screenshotsTaken = await PyInterop.getSetting("screenshotsTaken", 0);
              const screenshotsShared = await PyInterop.getSetting("screenshotsShared", 0);
              await PyInterop.setSetting("screenshotsTaken", screenshotsTaken + 1);
              if (!autoupload) {
                  PyInterop.log("Screenshot detected but auto upload is disabled");
                  return;
              }
              let uploadStatus = await PyInterop.uploadScreenshots();
              if (uploadStatus.result == "200") {
                  await PyInterop.setSetting("screenshotsShared", screenshotsShared + 1);
                  if (notifications) {
                      PyInterop.toast("Deckshare", "Screenshots shared successfully");
                  }
              }
              else {
                  if (notifications) {
                      PyInterop.toast("DeckShare", "Error! Screenshots failed to upload");
                  }
                  PyInterop.log(JSON.stringify(uploadStatus));
              }
          }
          catch (e) {
              PyInterop.log(e);
          }
      }
      /**
       * Sets up all of the hooks for the plugin.
       */
      liten() {
          this.registeredHooks[Hook.SCREENSHOT_TAKEN] = this.steamController.registerForScreenshotNotification((data) => {
              try {
                  const appId = data.unAppID;
                  const app = collectionStore.localGamesCollection.apps.get(appId);
                  this.runScreenshots();
              }
              catch (e) {
                  PyInterop.log(e);
              }
          });
      }
      /**
       * Dismounts the HooksController.
       */
      dismount() {
          for (const hook of Object.keys(this.registeredHooks)) {
              this.registeredHooks[hook].unregister();
              PyInterop.log(`Unregistered hook: ${hook}`);
          }
      }
  }

  /**
   * Main controller class for the plugin.
   */
  class PluginController {
      /**
       * Sets the plugin's serverAPI.
       * @param server The serverAPI to use.
       * @param state The plugin state.
       */
      static setup(server, state) {
          this.server = server;
          this.state = state;
          this.steamController = new SteamController();
          this.screenshotsController = new ScreenshotsController(this.steamController);
          this.webSocketClient = new WebSocketClient("localhost", "5000", 1000);
          this.instancesController = new InstancesController(this.screenshotsController, this.webSocketClient, this.state);
          this.hooksController = new HookController(this.steamController, this.instancesController, this.webSocketClient, this.state);
          this.gameLifetimeRegister = this.steamController.registerForAllAppLifetimeNotifications((appId, data) => {
              const currGame = this.state.getPublicState().currentGame;
              if (data.bRunning) {
                  if (currGame == null || currGame.appid != appId) {
                      this.state.setGameRunning(true);
                      const overview = appStore.GetAppOverviewByAppID(appId);
                      this.state.setCurrentGame(overview);
                      PyInterop.log(`Set currentGame to ${overview?.display_name} appId: ${appId}`);
                  }
              }
              else {
                  this.state.setGameRunning(false);
              }
          });
          this.historyListener = History.listen(debounce((info) => {
              const currGame = this.state.getPublicState().currentGame;
              const pathStart = "/library/app/";
              if (!this.state.getPublicState().gameRunning) {
                  if (info.pathname.startsWith(pathStart)) {
                      const appId = parseInt(info.pathname.substring(info.pathname.indexOf(pathStart) + pathStart.length));
                      if (currGame == null || currGame.appid != appId) {
                          const overview = appStore.GetAppOverviewByAppID(appId);
                          this.state.setCurrentGame(overview);
                          PyInterop.log(`Set currentGame to ${overview?.display_name} appId: ${appId}.`);
                      }
                  }
                  else if (currGame != null) {
                      this.state.setCurrentGame(null);
                      PyInterop.log(`Set currentGame to null.`);
                  }
              }
          }, 200));
      }
      /**
       * Sets the plugin to initialize once the user logs in.
       * @returns The unregister function for the login hook.
       */
      static initOnLogin() {
          return this.steamController.registerForAuthStateChange(async (username) => {
              PyInterop.log(`user logged in. [DEBUG INFO] username: ${username};`);
              if (await this.steamController.waitForServicesToInitialize()) {
                  PluginController.init();
              }
              else {
                  PyInterop.toast("Error", "Failed to initialize, try restarting.");
              }
          }, null, true);
      }
      /**
       * Initializes the Plugin.
       */
      static async init() {
          PyInterop.log("PluginController initializing...");
          this.webSocketClient.connect();
          const webhookUrl = (await PyInterop.getWebhookUrl()).result;
          if (webhookUrl == "" || webhookUrl == null || webhookUrl == "False" || webhookUrl == "https://discord.com/api/webhooks/") {
              PyInterop.log("Please configure the webhook url in the plugin settings.");
              PyInterop.toast("DeckShare", "Please configure the webhook url in the plugin settings.");
          }
          const screenshots = (await PyInterop.getScreenshots()).result;
          if (typeof screenshots === "string") {
              PyInterop.log(`Failed to get screenshots for hooks. Error: ${screenshots}`);
          }
          else {
              this.hooksController.init(screenshots);
          }
          PyInterop.log("PluginController initialized.");
      }
      /**
       * Checks if a screenshot is running.
       * @param shorcutId The id of the screenshot to check for.
       * @returns True if the screenshot is running.
       */
      static checkIfRunning(shorcutId) {
          return Object.keys(PluginController.instancesController.instances).includes(shorcutId);
      }
      /**
       * Launches a steam screenshot.
       * @param screenshotName The name of the steam screenshot to launch.
       * @param screenshot The screenshot to launch.
       * @param runnerPath The runner path for the screenshot.
       * @param onExit An optional function to run when the instance closes.
       * @returns A promise resolving to true if the screenshot was successfully launched.
       */
      static async launchScreenshot(screenshot, onExit = () => { }) {
          const createdInstance = await this.instancesController.createInstance(screenshot);
          if (createdInstance) {
              PyInterop.log(`Created Instance for screenshot ${screenshot.name}`);
              return await this.instancesController.launchInstance(screenshot.id, onExit, {});
          }
          else {
              return false;
          }
      }
      /**
       * Closes a running screenshot.
       * @param screenshot The screenshot to close.
       * @returns A promise resolving to true if the screenshot was successfully closed.
       */
      static async closeScreenshot(screenshot) {
          const stoppedInstance = await this.instancesController.stopInstance(screenshot.id);
          if (stoppedInstance) {
              PyInterop.log(`Stopped Instance for screenshot ${screenshot.name}`);
              return await this.instancesController.killInstance(screenshot.id);
          }
          else {
              PyInterop.log(`Failed to stop instance for screenshot ${screenshot.name}. Id: ${screenshot.id}`);
              return false;
          }
      }
      /**
       * Kills a screenshot's instance.
       * @param screenshot The screenshot to kill.
       * @returns A promise resolving to true if the screenshot's instance was successfully killed.
       */
      static async killScreenshot(screenshot) {
          return await this.instancesController.killInstance(screenshot.id);
      }
      /**
       * Updates the hooks for a specific screenshot.
       * @param screenshot The screenshot to update the hooks for.
       */
      static updateHooks(screenshot) {
          this.hooksController.updateHooks(screenshot);
      }
      /**
       * Removes the hooks for a specific screenshot.
       * @param screenshot The screenshot to remove the hooks for.
       */
      static removeHooks(screenshot) {
          this.hooksController.unregisterAllHooks(screenshot);
      }
      /**
       * Registers a callback to run when WebSocket messages of a given type are recieved.
       * @param type The type of message to register for.
       * @param callback The callback to run.
       */
      static onWebSocketEvent(type, callback) {
          this.webSocketClient.on(type, callback);
      }
      /**
       * Function to run when the plugin dismounts.
       */
      static dismount() {
          PyInterop.log("PluginController dismounting...");
          this.screenshotsController.onDismount();
          this.webSocketClient.disconnect();
          this.hooksController.dismount();
          this.gameLifetimeRegister.unregister();
          this.historyListener();
          PyInterop.log("PluginController dismounted.");
      }
  }

  const Content = ({}) => {
      const { screenshots, setScreenshots, screenshotsList } = useScreenshotsState();
      const [webhookUrl, setWebhookUrl] = React.useState("");
      const [isError, setIsError] = React.useState(false);
      const [errorMessage, setErrorMessage] = React.useState("");
      const [isLoadingUrl, setIsLoadingUrl] = React.useState(false);
      const [isSaving, setIsSaving] = React.useState(false);
      const [isSaved, setIsSaved] = React.useState(false);
      const [version, setVersion] = React.useState("0.0.0");
      const [autoUpload, setAutoUpload] = React.useState(false);
      const [notifications, setNotifications] = React.useState(false);
      const [screenshotsTaken, setScreenshotsTaken] = React.useState(0);
      const [screenshotsShared, setScreenshotsShared] = React.useState(0);
      const [isOnline, setIsOnline] = React.useState(false);
      const tries = React.useRef(0);
      async function saveWebhookUrl(webhookUrl) {
          setIsLoadingUrl(true);
          setIsSaving(true);
          setIsSaved(false);
          await PyInterop.setWebhookUrl(webhookUrl).then((res) => {
              setIsSaving(false);
              if (res.result?.toLowerCase().includes("invalid")) {
                  setIsError(true);
                  setErrorMessage(res.result);
                  setTimeout(() => { setIsError(false); setErrorMessage(""); setIsSaved(false); }, 3000);
              }
              else {
                  if (res.result) {
                      setIsError(false);
                      setErrorMessage("");
                      setWebhookUrl(res.result);
                      setIsSaved(true);
                      setTimeout(() => { setIsSaved(false); }, 3000);
                  }
              }
              setIsLoadingUrl(false);
          });
      }
      async function reload() {
          try {
              await PyInterop.getScreenshots().then((res) => {
                  setScreenshots(res.result);
              });
          }
          catch (e) {
              PyInterop.log("Error in reload: " + e);
          }
      }
      async function loadWebhookUrl(force = true) {
          if (((webhookUrl == "" || webhookUrl == null || webhookUrl == "False") && isLoadingUrl == false) || force == true) {
              setIsLoadingUrl(true);
              await PyInterop.getWebhookUrl().then((res) => {
                  if (res.result?.toLowerCase().includes("invalid")) {
                      setIsError(true);
                      setErrorMessage(res.result);
                  }
                  else {
                      if (res.result) {
                          setIsError(false);
                          setWebhookUrl(res.result);
                          setErrorMessage("");
                      }
                  }
                  setIsLoadingUrl(false);
              });
          }
      }
      async function toggleAutoUpload(value) {
          await PyInterop.setSetting("autoupload", value);
          setAutoUpload(value);
      }
      async function toggleNotifications(value) {
          await PyInterop.setSetting("notifications", value);
          setNotifications(value);
      }
      async function checkOnlineStatus() {
          setIsOnline(await PyInterop.isOnline());
          setTimeout(async () => { await checkOnlineStatus(); }, 150000);
      }
      async function loadSettings() {
          try {
              const version = await PyInterop.getSetting("version", "0.0.0");
              setVersion(version);
              let autoupload = await PyInterop.getSetting("autoupload", false);
              setAutoUpload(autoupload);
              let notifications = await PyInterop.getSetting("notifications", false);
              setNotifications(notifications);
              const screenshotsTaken = await PyInterop.getSetting("screenshotsTaken", 0);
              setScreenshotsTaken(screenshotsTaken);
              const screenshotsShared = await PyInterop.getSetting("screenshotsShared", 0);
              setScreenshotsShared(screenshotsShared);
              setTimeout(async () => { await loadSettings(); reload(); }, 5000);
          }
          catch (e) {
              PyInterop.log("Error in loadSettings: " + e);
          }
      }
      if (version == "0.0.0") {
          loadSettings();
          checkOnlineStatus();
      }
      loadWebhookUrl(false);
      if (Object.values(screenshots).length === 0 && tries.current < 10) {
          reload();
          tries.current++;
      }
      return (window.SP_REACT.createElement(React.Fragment, null,
          window.SP_REACT.createElement("style", null, `
        .deckshare-scope {
          width: inherit;
          height: inherit;

          flex: 1 1 1px;
          scroll-padding: 48px 0px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-content: stretch;
        }
        .deckshare-scope .${deckyFrontendLib.quickAccessControlsClasses.PanelSection} {
          padding: 0px;
        }

        .deckshare-scope .${deckyFrontendLib.gamepadDialogClasses.FieldChildren} {
          margin: 0px 16px;
        }
        
        .deckshare-scope .${deckyFrontendLib.gamepadDialogClasses.FieldLabel} {
          margin-left: 16px;
        }
      `),
          window.SP_REACT.createElement("div", { className: "deckshare-scope" },
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, { title: "Settings" },
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: "AutoShare", checked: autoUpload, onChange: (value) => toggleAutoUpload(value) }),
                      window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: "Notifications", checked: notifications, onChange: (value) => toggleNotifications(value) }),
                      window.SP_REACT.createElement(deckyFrontendLib.TextField, { value: webhookUrl, onChange: (e) => setWebhookUrl(e.target.value) }),
                      window.SP_REACT.createElement(deckyFrontendLib.ToggleField, { label: "Save Webhook Url", checked: isSaving, onChange: () => saveWebhookUrl(webhookUrl) }),
                      (isError) ? (window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                          "Error: ",
                          errorMessage)) : (""),
                      (isSaving) ? (window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null, "Validating webhook url.")) : (""),
                      (isSaved) ? (window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null, "Saved Successfully")) : (""))),
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, { title: "Recent Screenshots" }, (screenshotsList.length == 0) ? (window.SP_REACT.createElement("div", { style: { textAlign: "center", margin: "14px 0px", padding: "0px 15px", fontSize: "18px" } }, "No screenshots found")) : (window.SP_REACT.createElement(React.Fragment, null,
                  screenshotsList.map((itm) => (window.SP_REACT.createElement(ScreenshotLauncher, { screenshot: itm }))),
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      window.SP_REACT.createElement(deckyFrontendLib.ButtonItem, { layout: "below", onClick: reload }, "Reload Screenshots"))))),
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, { title: "Credits" },
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null, "Created with \u2764\uFE0F by SmugZombie"),
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null, "Visit: https://deckshare.zip"),
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      "Version: ",
                      version)),
              window.SP_REACT.createElement(deckyFrontendLib.PanelSection, { title: "Stats For Nerds" },
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      "Screenshots Taken: ",
                      screenshotsTaken),
                  window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null,
                      "Screenshots Shared: ",
                      screenshotsShared),
                  (isOnline) ? (window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null, "Currently Online")) : (window.SP_REACT.createElement(deckyFrontendLib.PanelSectionRow, null, "Currently Offline"))))));
  };
  var index = deckyFrontendLib.definePlugin((serverApi) => {
      PyInterop.setServer(serverApi);
      const state = new ScreenshotsState();
      PluginController.setup(serverApi, state);
      const loginHook = PluginController.initOnLogin();
      return {
          title: window.SP_REACT.createElement("div", { className: deckyFrontendLib.staticClasses.Title }, "DeckShare"),
          content: (window.SP_REACT.createElement(ScreenshotsContextProvider, { screenshotsStateClass: state },
              window.SP_REACT.createElement(Content, { serverAPI: serverApi }))),
          icon: window.SP_REACT.createElement(IoApps, null),
          onDismount() {
              loginHook.unregister();
              serverApi.routerHook.removeRoute("/deckshare-config");
              PluginController.dismount();
          },
          alwaysRender: true
      };
  });

  return index;

})(DFL, SP_REACT);

import { DialogButton, Field, Focusable, Navigation, gamepadDialogClasses } from "decky-frontend-lib";
import { Fragment, VFC, useEffect, useState } from "react";
import { Screenshot } from "../lib/data-structures/Screenshot";

import { IoRocketSharp } from "react-icons/io5";
import { PyInterop } from "../PyInterop";
import { FaTrashAlt } from "react-icons/fa";
import { PluginController } from "../lib/controllers/PluginController";
import { useScreenshotsState } from "../state/ScreenshotsState";

export type ScreenshotLauncherProps = {
  screenshot: Screenshot
}

/**
 * A component for the label of a ScreenshotLauncher.
 * @param props The props for this ScreenshotLabel.
 * @returns A ScreenshotLabel component.
 */
const ScreenshotLabel: VFC<{ screenshot: Screenshot, isRunning: boolean}> = (props: { screenshot: Screenshot, isRunning: boolean }) => {
  return (
    <>
      <style>{`
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
      `}</style>
      <div style={{
        "height": "100%",
        "display": "flex",
        "flexDirection": "row",
        "alignItems": "center"
      }}>
        <div>{props.screenshot.name}</div>
        <div style={{
          "visibility": props.isRunning ? "visible" : "hidden",
          "marginLeft": "7px",
          "width": "12px",
          "height": "12px",
          "borderRadius": "50%",
          "backgroundColor": "#36ff04",
          "animation": "gradient 3s ease-in-out infinite"
        }}></div>
      </div>
    </>
  );
}
/**
 * A component for launching screenshots.
 * @param props The ScreenshotLauncher's props.
 * @returns The ScreenshotLauncher component.
 */
export const ScreenshotLauncher: VFC<ScreenshotLauncherProps> = (props: ScreenshotLauncherProps) => {
  const { runningScreenshots, setIsRunning } = useScreenshotsState();
  const [ isRunning, _setIsRunning ] = useState<boolean>(PluginController.checkIfRunning(props.screenshot.id));

  useEffect(() => {
    if (PluginController.checkIfRunning(props.screenshot.id) && !runningScreenshots.has(props.screenshot.id)) {
      setIsRunning(props.screenshot.id, true);
    }
  }, []);

  useEffect(() => {
    _setIsRunning(runningScreenshots.has(props.screenshot.id));
  }, [runningScreenshots]);

  /**
   * Determines which action to run when the interactable is selected.
   * @param screenshot The screenshot associated with this screenshotLauncher.
   */
  async function onAction(screenshot:Screenshot): Promise<void> {
    if (isRunning) {
      const res = await PluginController.closeScreenshot(screenshot);
      if (!res) {
        PyInterop.toast("Error", "Failed to close screenshot.");
      } else {
        setIsRunning(screenshot.id, false);
      }
    } else {
      const res = await PluginController.launchScreenshot(screenshot, async () => {
        if (PluginController.checkIfRunning(screenshot.id) && screenshot.isApp) {
          setIsRunning(screenshot.id, false);
          const killRes = await PluginController.killScreenshot(screenshot);
          if (killRes) {
            Navigation.Navigate("/library/home");
            Navigation.CloseSideMenus();
          } else {
            PyInterop.toast("Error", "Failed to kill screenshot.");
          }
        }
      });
      if (!res) {
        PyInterop.toast("Error", "Screenshot failed. Check the command.");
      } else {
        if (!screenshot.isApp) {
          PyInterop.log(`Registering for WebSocket messages of type: ${screenshot.id}...`);

          PluginController.onWebSocketEvent(screenshot.id, (data: any) => {
            if (data.type == "end") {
              if (data.status == 0) {
                PyInterop.toast(screenshot.name, "Screenshot execution finished.");
              } else {
                PyInterop.toast(screenshot.name, "Screenshot execution was canceled.");
              }

              setIsRunning(screenshot.id, false);
            }
          });
        }
        
        setIsRunning(screenshot.id, true);
      }
    }
  }

  return (
    <>
      <style>
        {`
          .custom-buttons {
            width: inherit;
            height: inherit;
            display: inherit;
          }

          .custom-buttons .${gamepadDialogClasses.FieldChildren} {
            margin: 0px 16px;
          }
      `}
      </style>
      <div className="custom-buttons">
        <Field label={<ScreenshotLabel screenshot={props.screenshot} isRunning={isRunning} />}>
          <Focusable style={{ display: "flex", width: "100%" }}>
            <DialogButton onClick={() => onAction(props.screenshot)} style={{
              minWidth: "30px",
              maxWidth: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              { (isRunning) ? <FaTrashAlt color="#e24a4a" /> : <IoRocketSharp color="#36ff04" /> }
            </DialogButton>
          </Focusable>
        </Field>
      </div>
    </>
  );
}
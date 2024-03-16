import { ButtonItem, ConfirmModal, DialogButton, ReorderableEntry, ReorderableList, showModal } from "decky-frontend-lib";
import { Fragment, VFC, useRef } from "react";
import { PyInterop } from "../../PyInterop";
import { Screenshot } from "../../lib/data-structures/Screenshot";

import { EditModal } from "./EditModal";
import { useScreenshotsState } from "../../state/ScreenshotsState";
import { Menu, MenuItem, showContextMenu } from "./utils/MenuProxy";
import { FaEllipsisH } from "react-icons/fa"
import { PluginController } from "../../lib/controllers/PluginController";

type ActionButtonProps<T> = {
  entry: ReorderableEntry<T>
}

/**
 * Component for reorderable list actions.
 * @param props The props for this ActionButton.
 * @returns An ActionButton component.
 */
const ActionButtion: VFC<ActionButtonProps<Screenshot>> = (props:ActionButtonProps<Screenshot>) => {
  const { screenshots, setScreenshots } = useScreenshotsState();

  function onAction(entryReference: ReorderableEntry<Screenshot>): void {
    const screenshot = entryReference.data as Screenshot;
    showContextMenu(
      <Menu label="Actions">
        <MenuItem onSelected={() => {
          showModal(
            // @ts-ignore
            <EditModal onConfirm={(updated: Screenshot) => {
              if (PluginController.checkIfRunning(screenshot.id)) PluginController.closeScreenshot(screenshot);
              PyInterop.modScreenshot(updated);
              PluginController.updateHooks(updated);
              let shorts = screenshots;
              shorts[screenshot.id] = updated;
              setScreenshots(shorts);
              PyInterop.toast("Success", `Updated screenshot ${props.entry.data?.name}.`);
            }} screenshot={screenshot} />
          );
        }}>Edit</MenuItem>
        <MenuItem onSelected={() => {
          showModal(
            <ConfirmModal onOK={() => {
              if (PluginController.checkIfRunning(screenshot.id)) PluginController.closeScreenshot(screenshot);
              PyInterop.remScreenshot(screenshot);
              PluginController.updateHooks(screenshot);
              let shorts = screenshots;
              delete shorts[screenshot.id];
              setScreenshots(shorts);
              PyInterop.toast("Success", `Removed screenshot ${props.entry.data?.name}.`);
            }} bDestructiveWarning={true}>
              Are you sure you want to delete this screenshot?
            </ConfirmModal>
          );
        }}>Delete</MenuItem>
      </Menu>,
      window
    );
  }

  return (
    <DialogButton style={{ height: "40px", minWidth: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }} onClick={() => onAction(props.entry)} onOKButton={() => onAction(props.entry)}>
      <FaEllipsisH />
    </DialogButton>
  );
}

type InteractablesProps<T> = {
  entry: ReorderableEntry<T>
}

const Interactables: VFC<InteractablesProps<Screenshot>> = (props:InteractablesProps<Screenshot>) => {
  return (
    <>
      <ActionButtion  entry={props.entry} />
    </>
  );
}

/**
 * Component for managing plugin screenshots.
 * @returns A ManageScreenshots component.
 */
export const ManageScreenshots: VFC = () => {
  const { setScreenshots, screenshotsList, reorderableScreenshots } = useScreenshotsState();
  const tries = useRef(0);

  async function reload() {
    await PyInterop.getScreenshots().then((res) => {
      setScreenshots(res.result as ScreenshotsDictionary);
    });
  }

  function onSave(entries: ReorderableEntry<Screenshot>[]) {
    const data = {};

    for (const entry of entries) {
      data[entry.data!.id] = {...entry.data, "position": entry.position}
    }

    setScreenshots(data);
    
    PyInterop.log("Reordered screenshots.");
    PyInterop.setScreenshots(data as ScreenshotsDictionary);
  }

  if (screenshotsList.length === 0 && tries.current < 10) {
    reload();
    tries.current++;
  }

  return (
    <>
      <div style={{
        marginBottom: "5px"
      }}>Here you can re-order or remove existing screenshots</div>
      {screenshotsList.length > 0 ? (
        <>
          <ReorderableList<Screenshot> entries={reorderableScreenshots} onSave={onSave} interactables={Interactables} />
          <ButtonItem layout="below" onClick={reload} >
            Reload Screenshots
          </ButtonItem>
        </>
      ) : (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px" }}>
          Loading...
        </div>
      )
      }
    </>
  );
}
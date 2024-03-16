import { Field, PanelSection, PanelSectionRow, TextField, ButtonItem, quickAccessControlsClasses, ToggleField, DropdownOption } from "decky-frontend-lib"
import { Fragment, useState, useEffect, VFC } from "react"
import { PyInterop } from "../../PyInterop";
import { Screenshot } from "../../lib/data-structures/Screenshot";

import { v4 as uuidv4 } from "uuid";
import { useScreenshotsState } from "../../state/ScreenshotsState";
import { Hook, hookAsOptions } from "../../lib/controllers/HookController";
import { MultiSelect } from "./utils/MultiSelect";
import { PluginController } from "../../lib/controllers/PluginController";

/**
 * Component for adding a screenshot to the plugin.
 * @returns An AddScreenshot component.
 */
export const AddScreenshot: VFC = () => {
  const { screenshots, setScreenshots, screenshotsList } = useScreenshotsState();
  const [ ableToSave, setAbleToSave ] = useState(false);
  const [ name, setName ] = useState<string>("");
  const [ cmd, setCmd ] = useState<string>("");
  const [ isApp, setIsApp ] = useState<boolean>(true);
  const [ passFlags, setPassFlags ] = useState<boolean>(false);
  const [ hooks, setHooks ] = useState<Hook[]>([]);

  function saveScreenshot() {
    const newShort = new Screenshot(uuidv4(), name, cmd, screenshotsList.length + 1, isApp, passFlags, hooks);
    PyInterop.addScreenshot(newShort);
    PluginController.updateHooks(newShort);
    setName("");
    setCmd("");
    PyInterop.toast("Success", "Screenshot Saved!");

    const ref = { ...screenshots };
    ref[newShort.id] = newShort;
    setScreenshots(ref);
  }

  useEffect(() => {
    setAbleToSave(name != "" && cmd != "");
  }, [name, cmd])

  return (
    <>
      <style>{`
          .deckshare-scoper .${quickAccessControlsClasses.PanelSection} {
            width: inherit;
            height: inherit;
            padding: 0px;
          }
        `}</style>
      <div className="deckshare-scoper">
        <PanelSection>
          <PanelSectionRow>
            <Field
              label="Screenshot Name"
              description={
                <TextField
                  label={'Name'}
                  value={name}
                  onChange={(e) => { setName(e?.target.value); }}
                />
              }
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <Field
              label="Screenshot Command"
              description={
                <TextField
                  label={'Command'}
                  value={cmd}
                  onChange={(e) => { setCmd(e?.target.value); }}
                />
              }
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <ToggleField
              label="Does this launch an app?"
              onChange={(e) => {
                setIsApp(e);
                if (e) setPassFlags(false);
              }}
              checked={isApp}
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <ToggleField
              label="Does this screenshot use flags?"
              onChange={(e) => { setPassFlags(e); }}
              checked={passFlags}
              disabled={isApp}
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <Field 
              label="Hooks"
              highlightOnFocus={false}
              description={
                <MultiSelect
                  label="Select a hook"
                  options={hookAsOptions}
                  selected={[]}
                  onChange={(selected:DropdownOption[]) => { setHooks(selected.map((s) => s.label as Hook)); }}
                />
              }
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <ButtonItem layout="below" onClick={saveScreenshot} disabled={!ableToSave} bottomSeparator='none'>
              Save
            </ButtonItem>
          </PanelSectionRow>
        </PanelSection>
      </div>
    </>
  );
}
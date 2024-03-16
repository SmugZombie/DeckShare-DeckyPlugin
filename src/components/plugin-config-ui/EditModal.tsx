import { Field, ConfirmModal, PanelSection, PanelSectionRow, TextField, ToggleField, DropdownOption } from "decky-frontend-lib"
import { VFC, Fragment, useState } from "react"
import { Screenshot } from "../../lib/data-structures/Screenshot"
import { MultiSelect } from "./utils/MultiSelect"
import { Hook, hookAsOptions } from "../../lib/controllers/HookController"

type EditModalProps = {
  closeModal: () => void,
  onConfirm?(screenshot: Screenshot): any,
  title?: string,
  screenshot: Screenshot,
}

/**
 * Component for the edit screenshot modal.
 * @param props The EditModalProps for this component. 
 * @returns An EditModal component.
 */
export const EditModal: VFC<EditModalProps> = ({
  closeModal,
  onConfirm = () => { },
  screenshot,
  title = `Modifying: ${screenshot.name}`,
}) => {
  const [ name, setName ] = useState<string>(screenshot.name);
  const [ cmd, setCmd ] = useState<string>(screenshot.cmd);
  const [ isApp, setIsApp ] = useState<boolean>(screenshot.isApp);
  const [ passFlags, setPassFlags ] = useState<boolean>(screenshot.passFlags);
  const [ hooks, setHooks ] = useState<Hook[]>(screenshot.hooks);

  return (
    <>
      <ConfirmModal
        bAllowFullSize
        onCancel={closeModal}
        onEscKeypress={closeModal}

        onOK={() => {
          const updated = new Screenshot(screenshot.id, name, cmd, screenshot.position, isApp, passFlags, hooks);
          onConfirm(updated);
          closeModal();
        }}>
        <PanelSection title={title}>
          <PanelSectionRow>
            <Field
              label="Name"
              description={
                <TextField
                  value={name}
                  onChange={(e) => { setName(e?.target.value); }}
                />}
            />
          </PanelSectionRow>
          <PanelSectionRow>
            <Field
              label="Command"
              description={
                <TextField
                  value={cmd}
                  onChange={(e) => { setCmd(e?.target.value); }}
                />}
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
                  selected={hookAsOptions.filter((hookOpt) => hooks.includes(hookOpt.label))}
                  onChange={(selected:DropdownOption[]) => { setHooks(selected.map((s) => s.label as Hook)); }}
                />
              }
            />
          </PanelSectionRow>
        </PanelSection>
      </ConfirmModal>
    </>
  )
}
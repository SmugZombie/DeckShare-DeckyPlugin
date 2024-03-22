import { useState } from "react";
import { PyInterop } from "../PyInterop";
import { 
    ButtonItem,
    Focusable,
    PanelSection,
    PanelSectionRow,
    TextField,
    ToggleField,
    Navigation,
    DialogButton
} from "decky-frontend-lib"

const DeveloperController =() => {
    const [ forceOffline, setForceOffline ] = useState(false);
    const [ loaded, setLoaded ] = useState(false);
    const [ isOnline, setIsOnline ] = useState(false);
    const [ debug, setDebug ] = useState(false);

    async function toggleOfflineMode(value:boolean) {
        setForceOffline(value);
        await PyInterop.setSetting("devOfflineMode", value ? true : false);
        await checkOnlineStatus();
    }

    async function toggleDebug(value:boolean) {
        setDebug(value);
        await PyInterop.setSetting("debug", value ? true : false);
    }

    async function loadSettings() {
        await checkOnlineStatus();
        const devOfflineMode = await PyInterop.getSetting("devOfflineMode", false);
        setForceOffline(devOfflineMode);
        const debug = await PyInterop.getSetting("debug", false);
        setDebug(debug);
        setLoaded(true);
    }

    async function checkOnlineStatus(){
        let isOnline = await PyInterop.isOnline();
        setIsOnline(isOnline);
        setTimeout(async () => { await checkOnlineStatus(); }, 150000);
    }

    if(!loaded){
        loadSettings();
    }

    return (
        <div>
            <PanelSection>
                <PanelSectionRow>
                    <ToggleField label="Force Offline Mode" checked={forceOffline} onChange={(value) => toggleOfflineMode(value)} ></ToggleField>
                    <ToggleField label="Toggle Additional Logging" checked={debug} onChange={(value) => toggleDebug(value)} ></ToggleField>
                </PanelSectionRow>
                {(isOnline) ? (
                    <PanelSectionRow><span>Online Status:</span> <span style={{float: "right", color: "limegreen"}}>Online</span></PanelSectionRow>
                ) : (
                    <PanelSectionRow><span>Online Status: </span><span style={{float: "right", color: "red"}}>Offline</span></PanelSectionRow>
                )}
                <PanelSectionRow>
                    <DialogButton onClick={() => checkOnlineStatus()}>Check Online Status</DialogButton>
                </PanelSectionRow>
            </PanelSection>
            
        </div>
    )
}

export { DeveloperController }
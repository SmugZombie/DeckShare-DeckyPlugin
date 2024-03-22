import { useState, Fragment } from "react";
import { PyInterop } from "../PyInterop";
import { 
    ButtonItem,
    Focusable,
    PanelSection,
    PanelSectionRow,
    TextField,
    ToggleField,
    Navigation,
    DialogButton,
} from "decky-frontend-lib"


const SettingsController = () => {
    const [ uploadQueue, setUploadQueue ] = useState({});
  const [ webhookUrl, setWebhookUrl ] = useState("");
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ isLoadingUrl, setIsLoadingUrl ] = useState(false);
  const [ isSaving, setIsSaving ] = useState(false);
  const [ isSaved, setIsSaved ] = useState(false);
  const [ version, setVersion ] = useState("0.0.0");
  const [ autoUpload, setAutoUpload ] = useState(false);
  const [ notifications, setNotifications ] = useState(false);
  const [ screenshotsTaken, setScreenshotsTaken ] = useState(0);
  const [ screenshotsShared, setScreenshotsShared ] = useState(0);
  const [ isOnline, setIsOnline ] = useState(false);

  async function saveWebhookUrl(webhookUrl:string) {
    setIsLoadingUrl(true);
    setIsSaving(true);
    setIsSaved(false);
    await PyInterop.setWebhookUrl(webhookUrl).then((res) => {
      setIsSaving(false);
      if (res.result?.toLowerCase().includes("invalid")) {
        setIsError(true);
        setErrorMessage(res.result);
        setTimeout(() => { setIsError(false); setErrorMessage(""); setIsSaved(false) }, 3000);
      }else{
        if(res.result){
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

  async function processQueue(): Promise<void> {
    try{
      await PyInterop.processQueue().then(() => {});
      await PyInterop.getUploadQueue().then((res) => {
        setUploadQueue(res.result);
      });
    }catch(e:string){
      PyInterop.log("Error in processQueue: " + e);
      PyInterop.toast("DeckShare Error", e.toString());
    }
  }

  async function reload(): Promise<void> {
    try{
      /*await PyInterop.getScreenshots().then((res) => {
        setScreenshots(res.result);
      });*/
      await PyInterop.getUploadQueue().then((res) => {
        setUploadQueue(res.result);
      });
    }catch(e){  
      PyInterop.log("Error in reload: " + e);
    }
  }

  async function loadWebhookUrl(force=true) {
    if (((webhookUrl == "" || webhookUrl == null || webhookUrl == "False") && isLoadingUrl == false) || force == true) {
      setIsLoadingUrl(true);
      await PyInterop.getWebhookUrl().then((res) => {

        if (res.result?.toLowerCase().includes("invalid")) {
          setIsError(true);
          setErrorMessage(res.result);
        }else{
          if(res.result){
            setIsError(false);
            setWebhookUrl(res.result);
            setErrorMessage("");
          }
        }
        setIsLoadingUrl(false);
      });
    }
  }

  async function toggleAutoUpload(value:boolean){
    await PyInterop.setSetting("autoupload", value);
    setAutoUpload(value);
  }

  async function toggleNotifications(value:boolean){
    await PyInterop.setSetting("notifications", value);
    setNotifications(value);
  }

  async function checkOnlineStatus(){
    let isOnline = await PyInterop.isOnline();
    setIsOnline(isOnline);
    if(isOnline){
      await processQueue();
    }
    setTimeout(async () => { await checkOnlineStatus(); }, 150000);
  }

  async function loadSettings() {
    try{
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
    }catch(e){
      PyInterop.log("Error in loadSettings: " + e);
    }
  }

  if(version == "0.0.0"){
    loadSettings();
    checkOnlineStatus();
    reload();
  }

  const NavigateToPage = (path:string) => {
    Navigation.Navigate(path)
    Navigation.CloseSideMenus()
  }

  loadWebhookUrl(false);

  return (
    <>
      <div className="deckshare-scope">
        <PanelSection>
          <PanelSectionRow>
            <ToggleField label="AutoShare" checked={autoUpload} onChange={(value) => toggleAutoUpload(value)} ></ToggleField>
            <ToggleField label="Notifications" checked={notifications} onChange={(value) => toggleNotifications(value)} ></ToggleField>
            <TextField value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)}></TextField>
            <ToggleField label="Save Webhook Url" checked={isSaving} onChange={() => saveWebhookUrl(webhookUrl)} ></ToggleField>
            {(isError) ? (
              <PanelSectionRow>Error: {errorMessage}</PanelSectionRow>
            ) : ("")}
            {(isSaving) ? (
              <PanelSectionRow>Validating webhook url.</PanelSectionRow>
            ) : ("")}
            {(isSaved) ? (
              <PanelSectionRow>Saved Successfully</PanelSectionRow>
            ) : ("")}
          </PanelSectionRow>
        </PanelSection>
        <PanelSection title={`Pending Uploads: ${Object.keys(uploadQueue).length}`}>
        {(Object.keys(uploadQueue).length) ? (
          <ButtonItem layout="below" onClick={processQueue} >
            Process Queue
          </ButtonItem>
        ) : null}
        </PanelSection>
        <PanelSection title="Stats For Nerds">
          <PanelSectionRow>Screenshots Taken: {screenshotsTaken}</PanelSectionRow>
          <PanelSectionRow>Screenshots Shared: {screenshotsShared}</PanelSectionRow>
          {(isOnline) ? (
            <PanelSectionRow>Currently Online</PanelSectionRow>
          ) : (
            <PanelSectionRow>Currently Offline</PanelSectionRow>
          )}
        </PanelSection>
      </div>
    </>
  )
}

export { SettingsController }
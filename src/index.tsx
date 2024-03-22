import { 
  definePlugin, 
  ServerAPI, 
  staticClasses, 
  ButtonItem,
  Focusable,
  gamepadDialogClasses,
  PanelSection,
  PanelSectionRow,
  quickAccessControlsClasses,
  TextField,
  ToggleField,
  Navigation,
  DialogButton
} from "decky-frontend-lib"
import { VFC, Fragment, useRef, useState, useEffect } from "react";
import { PyInterop } from "./PyInterop";
import Router from "./routes/router";
import { PluginController } from "./controllers/plugincontroller";
import logo from '../assets/images/discordlogo.png';
declare global {
  var SteamClient: SteamClient;
}

const Content: VFC<{ serverAPI: ServerAPI }> = ({ }) => {
  const [ uploadQueue, setUploadQueue ] = useState({});
  const [ isLoaded, setIsLoaded ] = useState(false);
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

  async function loadWebhookUrl(){
    try{
      setIsLoadingUrl(true);
      await PyInterop.getWebhookUrl().then((res) => {
        let webhookUrl = res.result;
        if (webhookUrl?.toLowerCase().includes("invalid") || webhookUrl == "" || webhookUrl == null || webhookUrl == "False" || webhookUrl == "https://discord.com/api/webhooks/") {
          setIsError(true);
          setErrorMessage("Setup not completed. Please visit the advanced settings to configure the webhook url.");
        }else{
          setIsError(false);
          setErrorMessage("");
        }
        setIsLoadingUrl(false);
      });

    }catch(e){
      PyInterop.log("Error in loadWebhookUrl: " + e);
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
      setIsLoaded(true);
      setTimeout(async () => { await loadSettings(); reload(); }, 5000);
    }catch(e){
      PyInterop.log("Error in loadSettings: " + e);
    }
  }

  useEffect(() => {
    loadWebhookUrl();
    loadSettings();
    checkOnlineStatus();
    reload();
  }, [isLoaded]);

  const NavigateToPage = (path:string) => {
    Navigation.Navigate(path)
    Navigation.CloseSideMenus()
  }

  return (
    <>
      <style>{`
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
        .deckshare-scope .${quickAccessControlsClasses.PanelSection} {
          padding: 0px;
        }

        .deckshare-scope .${gamepadDialogClasses.FieldChildren} {
          margin: 0px 16px;
        }
        
        .deckshare-scope .${gamepadDialogClasses.FieldLabel} {
          margin-left: 16px;
        }
      `}</style>
      <div className="deckshare-scope">
        <PanelSection title="Quick Settings">
        {(!isOnline && isLoaded) ? (
          <PanelSectionRow style={{backgroundColor: "red", color: "yellow", textAlign: "center"}}>
            Currently Offline. Queueing uploads.
          </PanelSectionRow>
        ) : null}
        {(isError && isLoaded && !isLoadingUrl) ? (
          <PanelSectionRow style={{backgroundColor: "red", color: "yellow", textAlign: "center"}}>
            {errorMessage}
          </PanelSectionRow>
        ) : null}
          <PanelSectionRow>
            <ToggleField label="AutoShare" checked={autoUpload} onChange={(value) => toggleAutoUpload(value)} ></ToggleField>
            <ToggleField label="Notifications" checked={notifications} onChange={(value) => toggleNotifications(value)} ></ToggleField>
            <DialogButton onClick={()=>NavigateToPage("/deckshare")}>Advanced</DialogButton>
          </PanelSectionRow>
        </PanelSection>
        {(Object.keys(uploadQueue).length) ? (
          <PanelSection title={`Pending Uploads: ${Object.keys(uploadQueue).length}`}>
            <ButtonItem layout="below" onClick={processQueue} >
              Process Queue
            </ButtonItem>
          </PanelSection>
        ) : null }
        <PanelSection title="Credits">
          <PanelSectionRow style={{textAlign: "center"}}>Created with ❤️ by SmugZombie</PanelSectionRow>
          <PanelSectionRow style={{textAlign: "center"}}>Visit: https://deckshare.zip</PanelSectionRow>
          <PanelSectionRow style={{textAlign: "center"}}>Version: {version}</PanelSectionRow>
        </PanelSection>
        <PanelSection title="Stats For Nerds">
          <PanelSectionRow>Screenshots Taken: {screenshotsTaken}</PanelSectionRow>
          <PanelSectionRow>Screenshots Shared: {screenshotsShared}</PanelSectionRow>
        </PanelSection>
      </div>
    </>
  )
}

export default definePlugin((serverApi: ServerAPI) => {
  PyInterop.setServer(serverApi);
  PluginController.setup(serverApi);
  const loginHook = PluginController.initOnLogin();

  serverApi.routerHook.addRoute("/deckshare", Router);

  return {
    title: <div className={staticClasses.Title}>DeckShare</div>,
    content:  <Content serverAPI={serverApi} />,
    icon: <img src={logo} alt="Logo" width="32px" height="32px;" />,
    onDismount: () => {
      PyInterop.log("Unmounting DeckShare Plugin");
      loginHook.unregister();
      serverApi.routerHook.removeRoute("/deckshare");
    },
    alwaysRender: true,
  }
})

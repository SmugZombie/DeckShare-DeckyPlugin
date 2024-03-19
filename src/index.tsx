import {
  ButtonItem,
  definePlugin,
  Focusable,
  gamepadDialogClasses,
  PanelSection,
  PanelSectionRow,
  quickAccessControlsClasses,
  ServerAPI,
  staticClasses,
  TextField,
  ToggleField,
} from "decky-frontend-lib";
import { VFC, Fragment, useRef, useState } from "react";
import { IoApps } from "react-icons/io5";
import { ScreenshotLauncher } from "./components/ScreenshotLauncher";
import { PyInterop } from "./PyInterop";
import { Screenshot } from "./lib/data-structures/Screenshot";
import { ScreenshotsContextProvider, ScreenshotsState, useScreenshotsState, useUploadQueueState } from "./state/ScreenshotsState";
import { PluginController } from "./lib/controllers/PluginController";

declare global {
  var SteamClient: SteamClient;
  var collectionStore: CollectionStore;
  var appStore: AppStore;
  var loginStore: LoginStore;
}

const Content: VFC<{ serverAPI: ServerAPI }> = ({ }) => {
  const { screenshots, setScreenshots, screenshotsList } = useScreenshotsState();
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
  const tries = useRef(0);

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
        setUploadQueue(res.result as ScreenshotsDictionary);
      });
    }catch(e:string){
      PyInterop.log("Error in processQueue: " + e);
      PyInterop.toast("DeckShare Error", e.toString());
    }
  }

  async function reload(): Promise<void> {
    try{
      await PyInterop.getScreenshots().then((res) => {
        setScreenshots(res.result as ScreenshotsDictionary);
      });
      await PyInterop.getUploadQueue().then((res) => {
        setUploadQueue(res.result as ScreenshotsDictionary);
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
  }

  loadWebhookUrl(false);

  if (Object.values(screenshots as ScreenshotsDictionary).length === 0 && tries.current < 10) {
    reload();
    tries.current++;
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
        <PanelSection title="Settings">
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
        <PanelSection title="Recent Screenshots">
          {
            (screenshotsList.length == 0) ? (
              <div style={{ textAlign: "center", margin: "14px 0px", padding: "0px 15px", fontSize: "18px" }}>No screenshots found</div>
            ) : (
              <>
                {
                  screenshotsList.map((itm: Screenshot) => (
                    <ScreenshotLauncher screenshot={itm} />
                  ))
                }
                <PanelSectionRow>
                  <ButtonItem layout="below" onClick={reload} >
                    Reload Screenshots
                  </ButtonItem>
                </PanelSectionRow>
              </>
            )
          }
        </PanelSection>
        <PanelSection title="Credits">
          <PanelSectionRow>Created with ❤️ by SmugZombie</PanelSectionRow>
          <PanelSectionRow>Visit: https://deckshare.zip</PanelSectionRow>
          <PanelSectionRow>Version: {version}</PanelSectionRow>
        </PanelSection>
        <PanelSection title="Stats For Nerds">
          <PanelSectionRow>Screenshots Taken: {screenshotsTaken}</PanelSectionRow>
          <PanelSectionRow>Screenshots Shared: {screenshotsShared}</PanelSectionRow>
          {(isOnline) ? (
            <PanelSectionRow>Currently Online</PanelSectionRow>
          ) : (
            <PanelSectionRow>Currently Offline</PanelSectionRow>
          )}
          <Focusable>
            <PanelSectionRow></PanelSectionRow>
          </Focusable>
        </PanelSection>
      </div>
    </>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  PyInterop.setServer(serverApi);
  const state = new ScreenshotsState();
  PluginController.setup(serverApi, state);
  const loginHook = PluginController.initOnLogin();

  return {
    title: <div className={staticClasses.Title}>DeckShare</div>,
    content: (
      <ScreenshotsContextProvider screenshotsStateClass={state}>
        <Content serverAPI={serverApi} />
      </ScreenshotsContextProvider>
    ),
    icon: <IoApps />,
    onDismount() {
      loginHook.unregister();
      serverApi.routerHook.removeRoute("/deckshare-config");
      PluginController.dismount();
    },
    alwaysRender: true
  };
});

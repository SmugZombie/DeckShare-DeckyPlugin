import {
  ButtonItem,
  definePlugin,
  gamepadDialogClasses,
  Navigation,
  PanelSection,
  PanelSectionRow,
  quickAccessControlsClasses,
  ServerAPI,
  ServerResponse,
  SidebarNavigation,
  staticClasses,
} from "decky-frontend-lib";
import { VFC, Fragment, useRef } from "react";
import { IoApps, IoSettingsSharp } from "react-icons/io5";
import { HiViewGridAdd } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import { AddScreenshot } from "./components/plugin-config-ui/AddScreenshot";
import { ScreenshotLauncher } from "./components/ScreenshotLauncher";
import { ManageScreenshots } from "./components/plugin-config-ui/ManageScreenshots";

import { PyInterop } from "./PyInterop";
import { Screenshot } from "./lib/data-structures/Screenshot";
import { ScreenshotsContextProvider, ScreenshotsState, useScreenshotsState } from "./state/ScreenshotsState";
import { PluginController } from "./lib/controllers/PluginController";
import { Settings } from "./components/plugin-config-ui/Settings";
import { GuidePage } from "./components/plugin-config-ui/guides/GuidePage";

declare global {
  var SteamClient: SteamClient;
  var collectionStore: CollectionStore;
  var appStore: AppStore;
  var loginStore: LoginStore;
}

const Content: VFC<{ serverAPI: ServerAPI }> = ({ }) => {
  const { screenshots, setScreenshots, screenshotsList } = useScreenshotsState();
  const tries = useRef(0);

  async function reload(): Promise<void> {
    await PyInterop.getScreenshots().then((res) => {
      setScreenshots(res.result as ScreenshotsDictionary);
    });
  }

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
        <PanelSection>
          <PanelSectionRow>
            <ButtonItem layout="below" onClick={() => { Navigation.CloseSideMenus(); Navigation.Navigate("/deckshare-config"); }} >
              Plugin Config
            </ButtonItem>
          </PanelSectionRow>
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
                    Reload
                  </ButtonItem>
                </PanelSectionRow>
              </>
            )
          }
        </PanelSection>
      </div>
    </>
  );
};

const ScreenshotsManagerRouter: VFC<{ guides: GuidePages }> = ({ guides }) => {
  const guidePages = {}
  Object.entries(guides).map(([ guideName, guide ]) => {
    guidePages[guideName] = {
      title: guideName,
      content: <GuidePage content={guide} />,
      route: `/deckshare-config/guides-${guideName.toLowerCase().replace(/ /g, "-")}`,
      icon: <MdNumbers />,
      hideTitle: true
    }
  });

  return (
    <SidebarNavigation
      title="Plugin Config"
      showTitle
      pages={[
        {
          title: "Add Screenshot",
          content: <AddScreenshot />,
          route: "/deckshare-config/add",
          icon: <HiViewGridAdd />
        },
        {
          title: "Manage Screenshots",
          content: <ManageScreenshots />,
          route: "/deckshare-config/manage",
          icon: <FaEdit />
        },
        {
          title: "Settings",
          content: <Settings />,
          route: "/deckshare-config/settings",
          icon: <IoSettingsSharp />
        },
        "separator",
        guidePages["Overview"],
        guidePages["Managing Screenshots"],
        guidePages["Custom Scripts"],
        guidePages["Using Hooks"]
      ]}
    />
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  PyInterop.setServer(serverApi);

  const state = new ScreenshotsState();
  PluginController.setup(serverApi, state);

  const loginHook = PluginController.initOnLogin();

  PyInterop.getGuides().then((res: ServerResponse<GuidePages>) => {
    const guides = res.result as GuidePages;
    console.log("Guides:", guides);

    serverApi.routerHook.addRoute("/deckshare-config", () => (
      <ScreenshotsContextProvider screenshotsStateClass={state}>
        <ScreenshotsManagerRouter guides={guides} />
      </ScreenshotsContextProvider>
    ));
  });

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

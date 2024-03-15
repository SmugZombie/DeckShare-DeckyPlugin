(function (React) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    let webpackCache = {};
    let hasWebpack5 = false;
    if (window.webpackJsonp && !window.webpackJsonp.deckyShimmed) {
        // Webpack 4, currently on stable
        const wpRequire = window.webpackJsonp.push([
            [],
            { get_require: (mod, _exports, wpRequire) => (mod.exports = wpRequire) },
            [['get_require']],
        ]);
        delete wpRequire.m.get_require;
        delete wpRequire.c.get_require;
        webpackCache = wpRequire.c;
    }
    else {
        // Webpack 5, currently on beta
        hasWebpack5 = true;
        const id = Math.random();
        let initReq;
        window.webpackChunksteamui.push([
            [id],
            {},
            (r) => {
                initReq = r;
            },
        ]);
        for (let i of Object.keys(initReq.m)) {
            webpackCache[i] = initReq(i);
        }
    }
    const allModules = hasWebpack5
        ? Object.values(webpackCache).filter((x) => x)
        : Object.keys(webpackCache)
            .map((x) => webpackCache[x].exports)
            .filter((x) => x);
    const findModule = (filter) => {
        for (const m of allModules) {
            if (m.default && filter(m.default))
                return m.default;
            if (filter(m))
                return m;
        }
    };
    const findModuleChild = (filter) => {
        for (const m of allModules) {
            for (const mod of [m.default, m]) {
                const filterRes = filter(mod);
                if (filterRes) {
                    return filterRes;
                }
                else {
                    continue;
                }
            }
        }
    };
    const CommonUIModule = allModules.find((m) => {
        if (typeof m !== 'object')
            return false;
        for (let prop in m) {
            if (m[prop]?.contextType?._currentValue && Object.keys(m).length > 60)
                return true;
        }
        return false;
    });
    findModule((m) => {
        if (typeof m !== 'object')
            return false;
        for (let prop in m) {
            if (m[prop]?.toString && /Spinner\)}\),.\.createElement\(\"path\",{d:\"M18 /.test(m[prop].toString()))
                return true;
        }
        return false;
    });
    allModules.find((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.computeRootMatch)
                return true;
        }
        return false;
    });

    const CommonDialogDivs = Object.values(CommonUIModule).filter((m) => typeof m === 'object' && m?.render?.toString().includes('"div",Object.assign({},'));
    const MappedDialogDivs = new Map(Object.values(CommonDialogDivs).map((m) => {
        const renderedDiv = m.render({});
        // Take only the first class name segment as it identifies the element we want
        return [renderedDiv.props.className.split(' ')[0], m];
    }));
    MappedDialogDivs.get('DialogHeader');
    MappedDialogDivs.get('DialogSubHeader');
    MappedDialogDivs.get('DialogFooter');
    MappedDialogDivs.get('DialogLabel');
    MappedDialogDivs.get('DialogBodyText');
    MappedDialogDivs.get('DialogBody');
    MappedDialogDivs.get('DialogControlsSection');
    MappedDialogDivs.get('DialogControlsSectionHeader');
    Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('DialogButton') && mod?.render?.toString()?.includes('Primary'));
    const DialogButtonSecondary = Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('Object.assign({type:"button"') &&
        mod?.render?.toString()?.includes('DialogButton') &&
        mod?.render?.toString()?.includes('Secondary'));
    // This is the "main" button. The Primary can act as a submit button,
    // therefore secondary is chosen (also for backwards comp. reasons)
    const DialogButton = DialogButtonSecondary;

    const ButtonItem = CommonUIModule.ButtonField ||
        Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('"highlightOnFocus","childrenContainerWidth"') ||
            mod?.render?.toString()?.includes('childrenContainerWidth:"min"'));

    const Dropdown = Object.values(CommonUIModule).find((mod) => mod?.prototype?.SetSelectedOption && mod?.prototype?.BuildMenu);
    Object.values(CommonUIModule).find((mod) => mod?.toString()?.includes('"dropDownControlRef","description"'));

    const Field = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.render?.toString().includes('"shift-children-below"'))
                return m[prop];
        }
    });

    const Focusable = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.render?.toString()?.includes('["flow-children","onActivate","onCancel","focusClassName",'))
                return m[prop];
        }
    });

    var GamepadButton;
    (function (GamepadButton) {
        GamepadButton[GamepadButton["INVALID"] = 0] = "INVALID";
        GamepadButton[GamepadButton["OK"] = 1] = "OK";
        GamepadButton[GamepadButton["CANCEL"] = 2] = "CANCEL";
        GamepadButton[GamepadButton["SECONDARY"] = 3] = "SECONDARY";
        GamepadButton[GamepadButton["OPTIONS"] = 4] = "OPTIONS";
        GamepadButton[GamepadButton["BUMPER_LEFT"] = 5] = "BUMPER_LEFT";
        GamepadButton[GamepadButton["BUMPER_RIGHT"] = 6] = "BUMPER_RIGHT";
        GamepadButton[GamepadButton["TRIGGER_LEFT"] = 7] = "TRIGGER_LEFT";
        GamepadButton[GamepadButton["TRIGGER_RIGHT"] = 8] = "TRIGGER_RIGHT";
        GamepadButton[GamepadButton["DIR_UP"] = 9] = "DIR_UP";
        GamepadButton[GamepadButton["DIR_DOWN"] = 10] = "DIR_DOWN";
        GamepadButton[GamepadButton["DIR_LEFT"] = 11] = "DIR_LEFT";
        GamepadButton[GamepadButton["DIR_RIGHT"] = 12] = "DIR_RIGHT";
        GamepadButton[GamepadButton["SELECT"] = 13] = "SELECT";
        GamepadButton[GamepadButton["START"] = 14] = "START";
        GamepadButton[GamepadButton["LSTICK_CLICK"] = 15] = "LSTICK_CLICK";
        GamepadButton[GamepadButton["RSTICK_CLICK"] = 16] = "RSTICK_CLICK";
        GamepadButton[GamepadButton["LSTICK_TOUCH"] = 17] = "LSTICK_TOUCH";
        GamepadButton[GamepadButton["RSTICK_TOUCH"] = 18] = "RSTICK_TOUCH";
        GamepadButton[GamepadButton["LPAD_TOUCH"] = 19] = "LPAD_TOUCH";
        GamepadButton[GamepadButton["LPAD_CLICK"] = 20] = "LPAD_CLICK";
        GamepadButton[GamepadButton["RPAD_TOUCH"] = 21] = "RPAD_TOUCH";
        GamepadButton[GamepadButton["RPAD_CLICK"] = 22] = "RPAD_CLICK";
        GamepadButton[GamepadButton["REAR_LEFT_UPPER"] = 23] = "REAR_LEFT_UPPER";
        GamepadButton[GamepadButton["REAR_LEFT_LOWER"] = 24] = "REAR_LEFT_LOWER";
        GamepadButton[GamepadButton["REAR_RIGHT_UPPER"] = 25] = "REAR_RIGHT_UPPER";
        GamepadButton[GamepadButton["REAR_RIGHT_LOWER"] = 26] = "REAR_RIGHT_LOWER";
        GamepadButton[GamepadButton["STEAM_GUIDE"] = 27] = "STEAM_GUIDE";
        GamepadButton[GamepadButton["STEAM_QUICK_MENU"] = 28] = "STEAM_QUICK_MENU";
    })(GamepadButton || (GamepadButton = {}));

    function sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }
    /**
     * Finds the SP window, since it is a render target as of 10-19-2022's beta
     */
    function findSP() {
        // old (SP as host)
        if (document.title == 'SP')
            return window;
        // new (SP as popup)
        const navTrees = getGamepadNavigationTrees();
        return navTrees.find((x) => x.m_ID == 'root_1_').Root.Element.ownerDocument.defaultView;
    }
    /**
     * Gets the correct FocusNavController, as the Feb 22 2023 beta has two for some reason.
     */
    function getFocusNavController() {
        return window.GamepadNavTree?.m_context?.m_controller || window.FocusNavController;
    }
    /**
     * Gets the gamepad navigation trees as Valve seems to be moving them.
     */
    function getGamepadNavigationTrees() {
        const focusNav = getFocusNavController();
        const context = focusNav.m_ActiveContext || focusNav.m_LastActiveContext;
        return context.m_rgGamepadNavigationTrees;
    }

    const showModalRaw = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (typeof m[prop] === 'function' &&
                m[prop].toString().includes('props.bDisableBackgroundDismiss') &&
                !m[prop]?.prototype?.Cancel) {
                return m[prop];
            }
        }
    });
    const oldShowModalRaw = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (typeof m[prop] === 'function' && m[prop].toString().includes('bHideMainWindowForPopouts:!0')) {
                return m[prop];
            }
        }
    });
    const showModal = (modal, parent, props = {
        strTitle: 'Decky Dialog',
        bHideMainWindowForPopouts: false,
    }) => {
        if (showModalRaw) {
            return showModalRaw(modal, parent || findSP(), props.strTitle, props, undefined, {
                bHideActions: props.bHideActionIcons,
            });
        }
        else if (oldShowModalRaw) {
            return oldShowModalRaw(modal, parent || findSP(), props);
        }
        else {
            throw new Error('[DFL:Modals]: Cannot find showModal function');
        }
    };
    const ConfirmModal = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (!m[prop]?.prototype?.OK && m[prop]?.prototype?.Cancel && m[prop]?.prototype?.render) {
                return m[prop];
            }
        }
    });
    // new as of december 2022 on beta
    (Object.values(findModule((m) => {
        if (typeof m !== 'object')
            return false;
        for (let prop in m) {
            if (m[prop]?.m_mapModalManager && Object.values(m)?.find((x) => x?.type)) {
                return true;
            }
        }
        return false;
    }) || {})?.find((x) => x?.type?.toString()?.includes('((function(){')) ||
        // before december 2022 beta
        Object.values(findModule((m) => {
            if (typeof m !== 'object')
                return false;
            for (let prop in m) {
                if (m[prop]?.toString()?.includes('"ModalManager","DialogWrapper"')) {
                    return true;
                }
            }
            return false;
        }) || {})?.find((x) => x?.type?.toString()?.includes('((function(){')) ||
        // old
        findModuleChild((m) => {
            if (typeof m !== 'object')
                return undefined;
            for (let prop in m) {
                if (m[prop]?.prototype?.OK && m[prop]?.prototype?.Cancel && m[prop]?.prototype?.render) {
                    return m[prop];
                }
            }
        }));

    const [panelSection, mod] = findModuleChild((mod) => {
        for (let prop in mod) {
            if (mod[prop]?.toString()?.includes('.PanelSection')) {
                return [mod[prop], mod];
            }
        }
        return null;
    });
    const PanelSection = panelSection;
    // New as of Feb 22 2023 Beta || Old
    const PanelSectionRow = mod.PanelSectionRow ||
        Object.values(mod).filter((exp) => !exp?.toString()?.includes('.PanelSection'))[0];

    var SideMenu;
    (function (SideMenu) {
        SideMenu[SideMenu["None"] = 0] = "None";
        SideMenu[SideMenu["Main"] = 1] = "Main";
        SideMenu[SideMenu["QuickAccess"] = 2] = "QuickAccess";
    })(SideMenu || (SideMenu = {}));
    var QuickAccessTab;
    (function (QuickAccessTab) {
        QuickAccessTab[QuickAccessTab["Notifications"] = 0] = "Notifications";
        QuickAccessTab[QuickAccessTab["RemotePlayTogetherControls"] = 1] = "RemotePlayTogetherControls";
        QuickAccessTab[QuickAccessTab["VoiceChat"] = 2] = "VoiceChat";
        QuickAccessTab[QuickAccessTab["Friends"] = 3] = "Friends";
        QuickAccessTab[QuickAccessTab["Settings"] = 4] = "Settings";
        QuickAccessTab[QuickAccessTab["Perf"] = 5] = "Perf";
        QuickAccessTab[QuickAccessTab["Help"] = 6] = "Help";
        QuickAccessTab[QuickAccessTab["Music"] = 7] = "Music";
        QuickAccessTab[QuickAccessTab["Decky"] = 999] = "Decky";
    })(QuickAccessTab || (QuickAccessTab = {}));
    var DisplayStatus;
    (function (DisplayStatus) {
        DisplayStatus[DisplayStatus["Invalid"] = 0] = "Invalid";
        DisplayStatus[DisplayStatus["Launching"] = 1] = "Launching";
        DisplayStatus[DisplayStatus["Uninstalling"] = 2] = "Uninstalling";
        DisplayStatus[DisplayStatus["Installing"] = 3] = "Installing";
        DisplayStatus[DisplayStatus["Running"] = 4] = "Running";
        DisplayStatus[DisplayStatus["Validating"] = 5] = "Validating";
        DisplayStatus[DisplayStatus["Updating"] = 6] = "Updating";
        DisplayStatus[DisplayStatus["Downloading"] = 7] = "Downloading";
        DisplayStatus[DisplayStatus["Synchronizing"] = 8] = "Synchronizing";
        DisplayStatus[DisplayStatus["ReadyToInstall"] = 9] = "ReadyToInstall";
        DisplayStatus[DisplayStatus["ReadyToPreload"] = 10] = "ReadyToPreload";
        DisplayStatus[DisplayStatus["ReadyToLaunch"] = 11] = "ReadyToLaunch";
        DisplayStatus[DisplayStatus["RegionRestricted"] = 12] = "RegionRestricted";
        DisplayStatus[DisplayStatus["PresaleOnly"] = 13] = "PresaleOnly";
        DisplayStatus[DisplayStatus["InvalidPlatform"] = 14] = "InvalidPlatform";
        DisplayStatus[DisplayStatus["PreloadComplete"] = 16] = "PreloadComplete";
        DisplayStatus[DisplayStatus["BorrowerLocked"] = 17] = "BorrowerLocked";
        DisplayStatus[DisplayStatus["UpdatePaused"] = 18] = "UpdatePaused";
        DisplayStatus[DisplayStatus["UpdateQueued"] = 19] = "UpdateQueued";
        DisplayStatus[DisplayStatus["UpdateRequired"] = 20] = "UpdateRequired";
        DisplayStatus[DisplayStatus["UpdateDisabled"] = 21] = "UpdateDisabled";
        DisplayStatus[DisplayStatus["DownloadPaused"] = 22] = "DownloadPaused";
        DisplayStatus[DisplayStatus["DownloadQueued"] = 23] = "DownloadQueued";
        DisplayStatus[DisplayStatus["DownloadRequired"] = 24] = "DownloadRequired";
        DisplayStatus[DisplayStatus["DownloadDisabled"] = 25] = "DownloadDisabled";
        DisplayStatus[DisplayStatus["LicensePending"] = 26] = "LicensePending";
        DisplayStatus[DisplayStatus["LicenseExpired"] = 27] = "LicenseExpired";
        DisplayStatus[DisplayStatus["AvailForFree"] = 28] = "AvailForFree";
        DisplayStatus[DisplayStatus["AvailToBorrow"] = 29] = "AvailToBorrow";
        DisplayStatus[DisplayStatus["AvailGuestPass"] = 30] = "AvailGuestPass";
        DisplayStatus[DisplayStatus["Purchase"] = 31] = "Purchase";
        DisplayStatus[DisplayStatus["Unavailable"] = 32] = "Unavailable";
        DisplayStatus[DisplayStatus["NotLaunchable"] = 33] = "NotLaunchable";
        DisplayStatus[DisplayStatus["CloudError"] = 34] = "CloudError";
        DisplayStatus[DisplayStatus["CloudOutOfDate"] = 35] = "CloudOutOfDate";
        DisplayStatus[DisplayStatus["Terminating"] = 36] = "Terminating";
    })(DisplayStatus || (DisplayStatus = {}));
    const Router = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.Navigate && m[prop]?.NavigationManager)
                return m[prop];
        }
    });
    let Navigation = {};
    try {
        (async () => {
            let InternalNavigators = {};
            if (!Router.NavigateToAppProperties || Router.deckyShim) {
                function initInternalNavigators() {
                    try {
                        InternalNavigators = findModuleChild((m) => {
                            if (typeof m !== 'object')
                                return undefined;
                            for (let prop in m) {
                                if (m[prop]?.GetNavigator) {
                                    return m[prop];
                                }
                            }
                        })?.GetNavigator();
                    }
                    catch (e) {
                        console.error('[DFL:Router]: Failed to init internal navigators, trying again');
                    }
                }
                initInternalNavigators();
                while (!InternalNavigators?.AppProperties) {
                    console.log('[DFL:Router]: Trying to init internal navigators again');
                    await sleep(100);
                    initInternalNavigators();
                }
            }
            const newNavigation = {
                Navigate: Router.Navigate?.bind(Router),
                NavigateBack: Router.WindowStore?.GamepadUIMainWindowInstance?.NavigateBack?.bind(Router.WindowStore.GamepadUIMainWindowInstance),
                NavigateToAppProperties: InternalNavigators?.AppProperties || Router.NavigateToAppProperties?.bind(Router),
                NavigateToExternalWeb: InternalNavigators?.ExternalWeb || Router.NavigateToExternalWeb?.bind(Router),
                NavigateToInvites: InternalNavigators?.Invites || Router.NavigateToInvites?.bind(Router),
                NavigateToChat: Router.NavigateToChat?.bind(Router),
                NavigateToLibraryTab: InternalNavigators?.LibraryTab || Router.NavigateToLibraryTab?.bind(Router),
                NavigateToLayoutPreview: Router.NavigateToLayoutPreview?.bind(Router),
                NavigateToSteamWeb: Router.WindowStore?.GamepadUIMainWindowInstance?.NavigateToSteamWeb?.bind(Router.WindowStore.GamepadUIMainWindowInstance),
                OpenSideMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenSideMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
                OpenQuickAccessMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenQuickAccessMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
                OpenMainMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenMainMenu?.bind(Router.WindowStore.GamepadUIMainWindowInstance.MenuStore),
                CloseSideMenus: Router.CloseSideMenus?.bind(Router),
                OpenPowerMenu: Router.OpenPowerMenu?.bind(Router),
            };
            Object.assign(Navigation, newNavigation);
        })();
    }
    catch (e) {
        console.error('[DFL:Router]: Error initializing Navigation interface', e);
    }

    const SidebarNavigation = findModuleChild((mod) => {
        for (let prop in mod) {
            if (mod[prop]?.toString()?.includes('"disableRouteReporting"')) {
                return mod[prop];
            }
        }
        return null;
    });

    const quickAccessMenuClasses = findModule((mod) => typeof mod === 'object' && mod?.Title?.includes('quickaccessmenu'));
    /**
     * @depreciated please use quickAccessMenuClasses instead
     */
    const staticClasses = quickAccessMenuClasses;
    findModule((mod) => typeof mod === 'object' && mod?.ScrollPanel?.includes('scrollpanel'));
    const gamepadDialogClasses = findModule((mod) => typeof mod === 'object' && mod?.GamepadDialogContent?.includes('gamepaddialog'));
    const quickAccessControlsClasses = findModule((mod) => typeof mod === 'object' && typeof mod?.PanelSection === 'string' && mod?.PanelSection?.includes('quickaccesscontrols'));
    findModule((mod) => typeof mod === 'object' && mod?.OOBEUpdateStatusContainer?.includes('updaterfield'));
    findModule((mod) => typeof mod === 'object' && mod?.Container?.includes('appdetailsplaysection'));
    findModule((mod) => typeof mod === 'object' && mod?.SliderControlPanelGroup?.includes('gamepadslider'));
    findModule((mod) => typeof mod === 'object' && mod?.TopCapsule?.includes('sharedappdetailsheader'));
    findModule((mod) => typeof mod === 'object' && mod?.HeaderLoaded?.includes('appdetails_'));

    const TextField = Object.values(CommonUIModule).find((mod) => mod?.validateUrl && mod?.validateEmail);

    const ToggleField = Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('ToggleField,fallback'));

    /**
     * A component for creating reorderable lists.
     *
     * See an example implementation {@linkplain https://github.com/Tormak9970/Component-Testing-Plugin/blob/main/src/testing-window/ReorderableListTest.tsx here}.
     */
    function ReorderableList(props) {
        if (props.animate === undefined)
            props.animate = true;
        const [entryList, setEntryList] = React.useState(props.entries.sort((a, b) => a.position - b.position));
        const [reorderEnabled, setReorderEnabled] = React.useState(false);
        React.useEffect(() => {
            setEntryList(props.entries.sort((a, b) => a.position - b.position));
        }, [props.entries]);
        function toggleReorderEnabled() {
            let newReorderValue = !reorderEnabled;
            setReorderEnabled(newReorderValue);
            if (!newReorderValue) {
                props.onSave(entryList);
            }
        }
        function saveOnBackout(e) {
            const event = e;
            if (event.detail.button == GamepadButton.CANCEL && reorderEnabled) {
                setReorderEnabled(!reorderEnabled);
                props.onSave(entryList);
            }
        }
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement("div", { style: {
                    width: 'inherit',
                    height: 'inherit',
                    flex: '1 1 1px',
                    scrollPadding: '48px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignContent: 'stretch',
                } },
                window.SP_REACT.createElement(Focusable, { onSecondaryButton: toggleReorderEnabled, onSecondaryActionDescription: reorderEnabled ? 'Save Order' : 'Reorder', onClick: toggleReorderEnabled, onButtonDown: saveOnBackout }, entryList.map((entry) => (window.SP_REACT.createElement(ReorderableItem, { animate: props.animate, listData: entryList, entryData: entry, reorderEntryFunc: setEntryList, reorderEnabled: reorderEnabled, fieldProps: props.fieldProps }, props.interactables ? window.SP_REACT.createElement(props.interactables, { entry: entry }) : null)))))));
    }
    function ReorderableItem(props) {
        const [isSelected, _setIsSelected] = React.useState(false);
        const [isSelectedLastFrame, setIsSelectedLastFrame] = React.useState(false);
        const listEntries = props.listData;
        function onReorder(e) {
            if (!props.reorderEnabled)
                return;
            const event = e;
            const currentIdx = listEntries.findIndex((entryData) => entryData === props.entryData);
            const currentIdxValue = listEntries[currentIdx];
            if (currentIdx < 0)
                return;
            let targetPosition = -1;
            if (event.detail.button == GamepadButton.DIR_DOWN) {
                targetPosition = currentIdxValue.position + 1;
            }
            else if (event.detail.button == GamepadButton.DIR_UP) {
                targetPosition = currentIdxValue.position - 1;
            }
            if (targetPosition >= listEntries.length || targetPosition < 0)
                return;
            let otherToUpdate = listEntries.find((entryData) => entryData.position === targetPosition);
            if (!otherToUpdate)
                return;
            let currentPosition = currentIdxValue.position;
            currentIdxValue.position = otherToUpdate.position;
            otherToUpdate.position = currentPosition;
            props.reorderEntryFunc([...listEntries].sort((a, b) => a.position - b.position));
        }
        async function setIsSelected(val) {
            _setIsSelected(val);
            // Wait 3 frames, then set. I have no idea why, but if you dont wait long enough it doesn't work.
            for (let i = 0; i < 3; i++)
                await new Promise((res) => requestAnimationFrame(res));
            setIsSelectedLastFrame(val);
        }
        return (window.SP_REACT.createElement("div", { style: props.animate
                ? {
                    transition: isSelected || isSelectedLastFrame
                        ? ''
                        : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    transform: !props.reorderEnabled || isSelected ? 'scale(1)' : 'scale(0.9)',
                    opacity: !props.reorderEnabled || isSelected ? 1 : 0.7,
                }
                : {} },
            window.SP_REACT.createElement(Field, { label: props.entryData.label, ...props.fieldProps, focusable: !props.children, onButtonDown: onReorder, onGamepadBlur: () => setIsSelected(false), onGamepadFocus: () => setIsSelected(true) },
                window.SP_REACT.createElement(Focusable, { style: { display: 'flex', width: '100%', position: 'relative' } }, props.children))));
    }

    // TypeScript helper function
    const definePlugin = (fn) => {
        return (...args) => {
            // TODO: Maybe wrap this
            return fn(...args);
        };
    };

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
    }function IoRocketSharp (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M477.64 38.26a4.75 4.75 0 00-3.55-3.66c-58.57-14.32-193.9 36.71-267.22 110a317 317 0 00-35.63 42.1c-22.61-2-45.22-.33-64.49 8.07C52.38 218.7 36.55 281.14 32.14 308a9.64 9.64 0 0010.55 11.2l87.31-9.63a194.1 194.1 0 001.19 19.7 19.53 19.53 0 005.7 12L170.7 375a19.59 19.59 0 0012 5.7 193.53 193.53 0 0019.59 1.19l-9.58 87.2a9.65 9.65 0 0011.2 10.55c26.81-4.3 89.36-20.13 113.15-74.5 8.4-19.27 10.12-41.77 8.18-64.27a317.66 317.66 0 0042.21-35.64C441 232.05 491.74 99.74 477.64 38.26zM294.07 217.93a48 48 0 1167.86 0 47.95 47.95 0 01-67.86 0z"}},{"tag":"path","attr":{"d":"M168.4 399.43c-5.48 5.49-14.27 7.63-24.85 9.46-23.77 4.05-44.76-16.49-40.49-40.52 1.63-9.11 6.45-21.88 9.45-24.88a4.37 4.37 0 00-3.65-7.45 60 60 0 00-35.13 17.12C50.22 376.69 48 464 48 464s87.36-2.22 110.87-25.75A59.69 59.69 0 00176 403.09c.37-4.18-4.72-6.67-7.6-3.66z"}}]})(props);
    }function IoSettingsSharp (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M256 176a80 80 0 1080 80 80.24 80.24 0 00-80-80zm172.72 80a165.53 165.53 0 01-1.64 22.34l48.69 38.12a11.59 11.59 0 012.63 14.78l-46.06 79.52a11.64 11.64 0 01-14.14 4.93l-57.25-23a176.56 176.56 0 01-38.82 22.67l-8.56 60.78a11.93 11.93 0 01-11.51 9.86h-92.12a12 12 0 01-11.51-9.53l-8.56-60.78A169.3 169.3 0 01151.05 393L93.8 416a11.64 11.64 0 01-14.14-4.92L33.6 331.57a11.59 11.59 0 012.63-14.78l48.69-38.12A174.58 174.58 0 0183.28 256a165.53 165.53 0 011.64-22.34l-48.69-38.12a11.59 11.59 0 01-2.63-14.78l46.06-79.52a11.64 11.64 0 0114.14-4.93l57.25 23a176.56 176.56 0 0138.82-22.67l8.56-60.78A11.93 11.93 0 01209.94 26h92.12a12 12 0 0111.51 9.53l8.56 60.78A169.3 169.3 0 01361 119l57.2-23a11.64 11.64 0 0114.14 4.92l46.06 79.52a11.59 11.59 0 01-2.63 14.78l-48.69 38.12a174.58 174.58 0 011.64 22.66z"}}]})(props);
    }

    // THIS FILE IS AUTO GENERATED
    function HiViewGridAdd (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 20 20","fill":"currentColor","aria-hidden":"true"},"child":[{"tag":"path","attr":{"d":"M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"}}]})(props);
    }

    // THIS FILE IS AUTO GENERATED
    function FaEdit (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 576 512"},"child":[{"tag":"path","attr":{"d":"M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"}}]})(props);
    }function FaEllipsisH (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"}}]})(props);
    }function FaTimes (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 352 512"},"child":[{"tag":"path","attr":{"d":"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"}}]})(props);
    }function FaTrashAlt (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"}}]})(props);
    }

    // THIS FILE IS AUTO GENERATED
    function MdNumbers (props) {
      return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"fill":"none","d":"M0 0h24v24H0z"}},{"tag":"path","attr":{"d":"M20.5 10l.5-2h-4l1-4h-2l-1 4h-4l1-4h-2L9 8H5l-.5 2h4l-1 4h-4L3 16h4l-1 4h2l1-4h4l-1 4h2l1-4h4l.5-2h-4l1-4h4zm-7 4h-4l1-4h4l-1 4z"}}]})(props);
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
         * TBD
         * @returns TBD
         */
        static async uploadScreenshots() {
          const res = await this.serverAPI.callPluginMethod("uploadScreenshots", {});
          return res;
      }

        static async uploadScreenshot(filepath) {
          const res = await this.serverAPI.callPluginMethod("uploadScreenshot", { filepath: filepath});
          return res;
        }

        static async getWebhookUrl() {
          const res = await this.serverAPI.callPluginMethod("getWebhookUrl", {});
          return res;
        }

        static async setWebhookUrl(webhookUrl) {
          const res = await this.serverAPI.callPluginMethod("setWebhookUrl", { webhookUrl: webhookUrl});
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
        /**
         * Sets the value of a plugin's setting.
         * @param key The key of the setting to set.
         * @param newVal The new value for the setting.
         * @returns A void promise resolving once the setting is set.
         */
        static async setSetting(key, newVal) {
            return await this.serverAPI.callPluginMethod("setSetting", { key: key, newVal: newVal });
        }
    }

    /**
     * Contains all of the nessesary information on each screenshot.
     */
    class Screenshot {
        /**
         * Creates a new Screenshot.
         * @param id The id of the screenshot.
         * @param name The name/lable of the screenshot.
         * @param position The position of the screenshot in the list of screenshots.
         * @param hooks The list of hooks for this screenshot.
         */
        constructor(id, name, position, hooks) {
            this.id = id;
            this.name = name;
            this.position = position;
            this.hooks = hooks;
        }
        /**
         * Creates a new Screenshot from the provided json data.
         * @param json The json data to use for the screenshot.
         * @returns A new Screenshot.
         */
        static fromJSON(json) {
            return new Screenshot(json.id, json.name, json.cmd, json.position, json.isApp, json.passFlags, json.hooks);
        }
    }

    // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).
    let getRandomValues;
    const rnds8 = new Uint8Array(16);
    function rng() {
      // lazy load so that environments that need to polyfill have a chance to do so
      if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

        if (!getRandomValues) {
          throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
      }

      return getRandomValues(rnds8);
    }

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */

    const byteToHex = [];

    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 0x100).toString(16).slice(1));
    }

    function unsafeStringify(arr, offset = 0) {
      // Note: Be careful editing this code!  It's been tuned for performance
      // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
      return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    }

    const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var native = {
      randomUUID
    };

    function v4(options, buf, offset) {
      if (native.randomUUID && !buf && !options) {
        return native.randomUUID();
      }

      options = options || {};
      const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        offset = offset || 0;

        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }

        return buf;
      }

      return unsafeStringify(rnds);
    }

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
        setScreenshots(screenshots) {
            this.screenshots = screenshots;
            this.screenshotsList = Object.values(this.screenshots).sort((a, b) => a.position - b.position);
            this.reorderableScreenshots = [];
            for (let i = 0; i < this.screenshotsList.length; i++) {
                const screenshot = this.screenshotsList[i];
                //PyInterop.log(JSON.stringify(screenshot))
                this.reorderableScreenshots[i] = {
                    "label": screenshot.name,
                    "data": screenshot.path,
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
    const WebhookContext = React.createContext('');
    const useScreenshotsState = () => React.useContext(ScreenshotsContext);
    const useWebhookState = () => React.useContext(WebhookContext);
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
        return (window.SP_REACT.createElement(ScreenshotsContext.Provider, { value: {
                ...publicState,
                setScreenshots,
            } }, children));
    };

    /**
     * Enum for the different hook events.
     */
    var Hook;
    (function (Hook) {
        Hook["SCREENSHOT_TAKEN"] = "Screenshot Taken";
    })(Hook || (Hook = {}));
    const hookAsOptions = Object.values(Hook).map((entry) => { return { label: entry, data: entry }; });
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
            this.listen();
            for (const screenshot of Object.values(screenshots)) {
                this.updateHooks(screenshot);
            }
        }
        /**
         * Gets a screenshot by its id.
         * @param screenshotId The id of the screenshot to get.
         * @returns The screenshot.
         */
        getScreenshotBy(screenshotId) {
            return this.state.getPublicState().screenshots[screenshotId];
        }
        /**
         * Sets wether a screenshot is running or not.
         * @param screenshotId The id of the screenshot to set.
         * @param value The new value.
         */
        setIsRunning(screenshotId, value) {
            this.state.setIsRunning(screenshotId, value);
        }
        /**
         * Checks if a screenshot is running.
         * @param shorcutId The id of the screenshot to check for.
         * @returns True if the screenshot is running.
         */
        checkIfRunning(shorcutId) {
            return Object.keys(this.instancesController.instances).includes(shorcutId);
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

        async runScreenshots(hook, flags) {
          try{

            const autoupload = await PyInterop.getSetting("autoupload", false);
            const notifications = await PyInterop.getSetting("notifications", false);
            if(autoupload == 1 || autoupload == "1" || autoupload == "true" || autoupload == true){
              // Proceed
            }else{
              PyInterop.log("Screenshot detected but auto upload is disabled");
              return;
            }
            
            let uploadStatus = await PyInterop.uploadScreenshots();
            if(uploadStatus.result == 200 || uploadStatus.result == "200"){
              if(notifications){
                PyInterop.toast("Deckshare Info","Screenshots shared successfully");
              }
            }else{
              if(notifications){
                PyInterop.toast("DeckShare Error", "Screenshots failed to upload");
              }
              PyInterop.log(JSON.stringify(uploadStatus));
            }
            return true;
          }catch(e){
            PyInterop.log(e);
            return false;
          }
        }

        /**
         * Sets up all of the hooks for the plugin.
         */
        listen() {
          PyInterop.log("Listening for hooks...");
            this.registeredHooks[Hook.SCREENSHOT_TAKEN] = this.steamController.registerForScreenshotNotification((data) => {
              try{
                const appId = data.unAppID;
                const app = collectionStore.localGamesCollection.apps.get(appId);
                //PyInterop.toast(`Screenshot taken`);
                this.runScreenshots(null, null);
              }catch(e){
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
     * A component for multi select dropdown options.
     * @param props The MultiSelectedOptionProps for this component.
     * @returns A MultiSelectedOption component.
     */
    const MultiSelectedOption = ({ option, fieldProps, onRemove }) => {
        return (window.SP_REACT.createElement(Field, { label: option.label, ...fieldProps },
            window.SP_REACT.createElement(Focusable, { style: { display: 'flex', width: '100%', position: 'relative' } },
                window.SP_REACT.createElement(DialogButton, { style: { height: "40px", minWidth: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }, onClick: () => onRemove(option), onOKButton: () => onRemove(option), onOKActionDescription: `Remove ${option.label}` },
                    window.SP_REACT.createElement(FaTimes, null)))));
    };
    /**
     * A component for multi select dropdown menus.
     * @param props The MultiSelectProps for this component.
     * @returns A MultiSelect component.
     */
    const MultiSelect = ({ options, selected, label, onChange = () => { }, maxOptions, fieldProps }) => {
        const [sel, setSel] = React.useState(selected);
        const [available, setAvailable] = React.useState(options.filter((opt) => !selected.includes(opt)));
        const [dropLabel, setDropLabel] = React.useState(label);
        React.useEffect(() => {
            const avail = options.filter((opt) => !sel.includes(opt));
            setAvailable(avail);
            setDropLabel(avail.length == 0 ? "All selected" : (!!maxOptions && sel.length == maxOptions ? "Max selected" : label));
            onChange(sel);
        }, [sel]);
        const onRemove = (option) => {
            const ref = [...sel];
            ref.splice(sel.indexOf(option), 1);
            selected = ref;
            setSel(selected);
        };
        const onSelectedChange = (option) => {
            selected = [...sel, option];
            setSel(selected);
        };
        return (window.SP_REACT.createElement(Focusable, null,
            window.SP_REACT.createElement("div", { style: { width: "100%", marginBottom: "14px" } }, sel.map((option) => window.SP_REACT.createElement(MultiSelectedOption, { option: option, onRemove: onRemove, fieldProps: fieldProps }))),
            window.SP_REACT.createElement(Dropdown, { rgOptions: available, selectedOption: dropLabel, onChange: onSelectedChange, strDefaultLabel: dropLabel, focusable: true, disabled: available.length == 0 || (!!maxOptions && selected.length == maxOptions) })));
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
     * Class representing an Instance of Screenshots.
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
            this.runnerPath = "/home/deck/homebrew/plugins/deckshare-plugin/screenshotsRunner.sh";
            this.startDir = "\"/home/deck/homebrew/plugins/deckshare-plugin/\"";
            this.shorcutsController = screenshotsController;
            this.webSocketClient = webSocketClient;
            this.state = state;
            PyInterop.getHomeDir().then((res) => {
                this.runnerPath = `/home/${res.result}/homebrew/plugins/deckshare-plugin/screenshotsRunner.sh`;
                this.startDir = `\"/home/${res.result}/homebrew/plugins/deckshare-plugin/\"`;
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
                Navigation.Navigate("/library/home");
                Navigation.CloseSideMenus();
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
                        await sleep(delay);
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
    const History = findModuleChild((m) => {
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
                    await sleep(250);
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
            this.webSocketClient = new WebSocketClient("localhost", "5050", 1000);
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
              PyInterop.log("Please configure the webhook url in the plugin settings.")
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

    /**
     * Component for adding a screenshot to the plugin.
     * @returns An AddScreenshot component.
     */
    const AddScreenshot = () => {
        const { screenshots, setScreenshots, screenshotsList } = useScreenshotsState();
        const [ableToSave, setAbleToSave] = React.useState(false);
        const [name, setName] = React.useState("");
        const [cmd, setCmd] = React.useState("");
        const [isApp, setIsApp] = React.useState(true);
        const [passFlags, setPassFlags] = React.useState(false);
        const [hooks, setHooks] = React.useState([]);
        function saveScreenshot() {
            const newShort = new Screenshot(v4(), name, cmd, screenshotsList.length + 1, isApp, passFlags, hooks);
            PyInterop.addScreenshot(newShort);
            PluginController.updateHooks(newShort);
            setName("");
            setCmd("");
            PyInterop.toast("Success", "Screenshot Saved!");
            const ref = { ...screenshots };
            ref[newShort.id] = newShort;
            setScreenshots(ref);
        }
        React.useEffect(() => {
            setAbleToSave(name != "" && cmd != "");
        }, [name, cmd]);
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement("style", null, `
          .deckshare-plugin-scoper .${quickAccessControlsClasses.PanelSection} {
            width: inherit;
            height: inherit;
            padding: 0px;
          }
        `),
            window.SP_REACT.createElement("div", { className: "deckshare-plugin-scoper" },
                window.SP_REACT.createElement(PanelSection, null,
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(Field, { label: "Screenshot Name", description: window.SP_REACT.createElement(TextField, { label: 'Name', value: name, onChange: (e) => { setName(e?.target.value); } }) })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(Field, { label: "Screenshot Command", description: window.SP_REACT.createElement(TextField, { label: 'Command', value: cmd, onChange: (e) => { setCmd(e?.target.value); } }) })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(ToggleField, { label: "Does this launch an app?", onChange: (e) => {
                                setIsApp(e);
                                if (e)
                                    setPassFlags(false);
                            }, checked: isApp })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(ToggleField, { label: "Does this screenshot use flags?", onChange: (e) => { setPassFlags(e); }, checked: passFlags, disabled: isApp })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(Field, { label: "Hooks", highlightOnFocus: false, description: window.SP_REACT.createElement(MultiSelect, { label: "Select a hook", options: hookAsOptions, selected: [], onChange: (selected) => { setHooks(selected.map((s) => s.label)); } }) })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(ButtonItem, { layout: "below", onClick: saveScreenshot, disabled: !ableToSave, bottomSeparator: 'none' }, "Save"))))));
    };

    /**
     * A component for the label of a ScreenshotLauncher.
     * @param props The props for this ScreenshotLabel.
     * @returns A ScreenshotLabel component.
     */
    const ScreenshotLabel = (props) => {
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement("style", null, `
        @keyframes deckshare-plugin-running-screenshot-gradient {
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
        const [isRunning, setIsRunning] = React.useState(false);
        /**
         * Determines which action to run when the interactable is selected.
         * @param screenshot The screenshot associated with this screenshotLauncher.
         */
        async function onAction(screenshot) {
          PyInterop.toast(screenshot)
          await PyInterop.uploadScreenshot(screenshot.path)
        }
        
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement("style", null, `
          .custom-buttons {
            width: inherit;
            height: inherit;
            display: inherit;
          }

          .custom-buttons .${gamepadDialogClasses.FieldChildren} {
            margin: 0px 16px;
          }
      `),
            window.SP_REACT.createElement("div", { className: "custom-buttons" },
                window.SP_REACT.createElement(Field, { label: window.SP_REACT.createElement(ScreenshotLabel, { screenshot: props.screenshot, isRunning: false }) },
                    window.SP_REACT.createElement(Focusable, { style: { display: "flex", width: "100%" } },
                        window.SP_REACT.createElement(DialogButton, { onClick: () => onAction(props.screenshot), style: {
                                minWidth: "30px",
                                maxWidth: "60px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            } }, (isRunning) ? window.SP_REACT.createElement(FaTrashAlt, { color: "#e24a4a" }) : window.SP_REACT.createElement(IoRocketSharp, { color: "#36ff04" })))))));
    };

    /**
     * Component for the edit screenshot modal.
     * @param props The EditModalProps for this component.
     * @returns An EditModal component.
     */
    const EditModal = ({ closeModal, onConfirm = () => { }, screenshot, title = `Modifying: ${screenshot.name}`, }) => {
        const [name, setName] = React.useState(screenshot.name);
        const [cmd, setCmd] = React.useState(screenshot.cmd);
        const [isApp, setIsApp] = React.useState(screenshot.isApp);
        const [passFlags, setPassFlags] = React.useState(screenshot.passFlags);
        const [hooks, setHooks] = React.useState(screenshot.hooks);
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement(ConfirmModal, { bAllowFullSize: true, onCancel: closeModal, onEscKeypress: closeModal, onOK: () => {
                    const updated = new Screenshot(screenshot.id, name, cmd, screenshot.position, isApp, passFlags, hooks);
                    onConfirm(updated);
                    closeModal();
                } },
                window.SP_REACT.createElement(PanelSection, { title: title },
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(Field, { label: "Name", description: window.SP_REACT.createElement(TextField, { value: name, onChange: (e) => { setName(e?.target.value); } }) })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(Field, { label: "Command", description: window.SP_REACT.createElement(TextField, { value: cmd, onChange: (e) => { setCmd(e?.target.value); } }) })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(ToggleField, { label: "Does this launch an app?", onChange: (e) => {
                                setIsApp(e);
                                if (e)
                                    setPassFlags(false);
                            }, checked: isApp })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(ToggleField, { label: "Does this screenshot use flags?", onChange: (e) => { setPassFlags(e); }, checked: passFlags, disabled: isApp })),
                    window.SP_REACT.createElement(PanelSectionRow, null,
                        window.SP_REACT.createElement(Field, { label: "Hooks", highlightOnFocus: false, description: window.SP_REACT.createElement(MultiSelect, { label: "Select a hook", options: hookAsOptions, selected: hookAsOptions.filter((hookOpt) => hooks.includes(hookOpt.label)), onChange: (selected) => { setHooks(selected.map((s) => s.label)); } }) }))))));
    };

    const showContextMenu = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (typeof m[prop] === 'function' && m[prop].toString().includes('stopPropagation))')) {
                return m[prop];
            }
        }
    });
    const Menu = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.prototype?.HideIfSubmenu && m[prop]?.prototype?.HideMenu) {
                return m[prop];
            }
        }
    });
    const MenuItem = findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (m[prop]?.render?.toString()?.includes('bPlayAudio:') ||
                (m[prop]?.prototype?.OnOKButton && m[prop]?.prototype?.OnMouseEnter)) {
                return m[prop];
            }
        }
    });

    /**
     * Component for reorderable list actions.
     * @param props The props for this ActionButton.
     * @returns An ActionButton component.
     */
    const ActionButtion = (props) => {
        const { screenshots, setScreenshots } = useScreenshotsState();
        function onAction(entryReference) {
            const screenshot = entryReference.data;
            showContextMenu(window.SP_REACT.createElement(Menu, { label: "Actions" },
                window.SP_REACT.createElement(MenuItem, { onSelected: () => {
                        showModal(
                        // @ts-ignore
                        window.SP_REACT.createElement(EditModal, { onConfirm: (updated) => {
                                if (PluginController.checkIfRunning(screenshot.id))
                                    PluginController.closeScreenshot(screenshot);
                                PyInterop.modScreenshot(updated);
                                PluginController.updateHooks(updated);
                                let shorts = screenshots;
                                shorts[screenshot.id] = updated;
                                setScreenshots(shorts);
                                PyInterop.toast("Success", `Updated screenshot ${props.entry.data?.name}.`);
                            }, screenshot: screenshot }));
                    } }, "Edit"),
                window.SP_REACT.createElement(MenuItem, { onSelected: () => {
                        showModal(window.SP_REACT.createElement(ConfirmModal, { onOK: () => {
                                if (PluginController.checkIfRunning(screenshot.id))
                                    PluginController.closeScreenshot(screenshot);
                                PyInterop.remScreenshot(screenshot);
                                PluginController.updateHooks(screenshot);
                                let shorts = screenshots;
                                delete shorts[screenshot.id];
                                setScreenshots(shorts);
                                PyInterop.toast("Success", `Removed screenshot ${props.entry.data?.name}.`);
                            }, bDestructiveWarning: true }, "Are you sure you want to delete this screenshot?"));
                    } }, "Delete")), window);
        }
        return (window.SP_REACT.createElement(DialogButton, { style: { height: "40px", minWidth: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }, onClick: () => onAction(props.entry), onOKButton: () => onAction(props.entry) },
            window.SP_REACT.createElement(FaEllipsisH, null)));
    };
    const Interactables = (props) => {
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement(ActionButtion, { entry: props.entry })));
    };
    /**
     * Component for managing plugin screenshots.
     * @returns A ManageScreenshots component.
     */
    const ManageScreenshots = () => {
        const { setScreenshots, screenshotsList, reorderableScreenshots } = useScreenshotsState();
        const tries = React.useRef(0);
        async function reload() {
            await PyInterop.getScreenshots().then((res) => {
                setScreenshots(res.result);
            });
        }
        function onSave(entries) {
            const data = {};
            for (const entry of entries) {
                data[entry.data.id] = { ...entry.data, "position": entry.position };
            }
            setScreenshots(data);
            PyInterop.log("Reordered screenshots.");
            PyInterop.setScreenshots(data);
        }
        if (screenshotsList.length === 0 && tries.current < 10) {
            reload();
            tries.current++;
        }
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement("div", { style: {
                    marginBottom: "5px"
                } }, "Here you can re-order or remove existing screenshots"),
            screenshotsList.length > 0 ? (window.SP_REACT.createElement(React.Fragment, null,
                window.SP_REACT.createElement(ReorderableList, { entries: reorderableScreenshots, onSave: onSave, interactables: Interactables }),
                window.SP_REACT.createElement(ButtonItem, { layout: "below", onClick: reload }, "Reload Screenshots"))) : (window.SP_REACT.createElement("div", { style: { width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px" } }, "Loading..."))));
    };

    /**
     * Returns a React state for a plugin's setting.
     * @param key The key of the setting to use.
     * @param def The default value of the setting.
     * @returns A React state for the setting.
     */
    function useSetting(key, def) {
        const [value, setValue] = React.useState(def);
        React.useEffect(() => {
            (async () => {
                const res = await PyInterop.getSetting(key, def);
                setValue(res);
            })();
        }, []);
        return [
            value,
            async (val) => {
                setValue(val);
                await PyInterop.setSetting(key, val);
            },
        ];
    }

    const SettingsField = ({ field }) => {
        const [setting, setSetting] = useSetting(field.settingsKey, field.default);
        const [fieldVal, setFieldVal] = React.useState(setting);
        React.useEffect(() => {
            setFieldVal(setting);
        }, [setting]);
        const onChange = (e) => {
            const newVal = e.target.value;
            setFieldVal(newVal);
            PyInterop.log(`Checking newVal for ${field.settingsKey}. Result was: ${field.validator(newVal)} for value ${newVal}`);
            if (field.validator(newVal)) {
                setSetting(newVal).then(() => PyInterop.log(`Set value of setting ${field.settingsKey} to ${newVal}`));
            }
        };
        return (window.SP_REACT.createElement(TextField, { label: field.shortTitle, value: fieldVal, onChange: onChange, description: field.description, mustBeNumeric: field.mustBeNumeric }));
    };
    const Settings = ({}) => {
        const fields = [
            {
                title: "WebSocket Port",
                shortTitle: "Port",
                settingsKey: "webSocketPort",
                default: "",
                description: "Set the port the WebSocket uses. Change requires a restart to take effect.",
                validator: (newVal) => parseInt(newVal) <= 65535,
                mustBeNumeric: true
            }
        ];
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement("style", null, `
          .deckshare-plugin-scoper .${quickAccessControlsClasses.PanelSection} {
            width: inherit;
            height: inherit;
            padding: 0px;
          }
        `),
            window.SP_REACT.createElement("div", { className: "deckshare-plugin-scoper" },
                window.SP_REACT.createElement(PanelSection, null, fields.map((field) => (window.SP_REACT.createElement(PanelSectionRow, null,
                    window.SP_REACT.createElement(Field, { label: field.title, description: window.SP_REACT.createElement(SettingsField, { field: field }) }))))))));
    };

    function getAugmentedNamespace(n) {
    	if (n.__esModule) return n;
    	var a = Object.defineProperty({}, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
    }

    var utils$1 = {};

    var Aacute = "Á";
    var aacute = "á";
    var Abreve = "Ă";
    var abreve = "ă";
    var ac = "∾";
    var acd = "∿";
    var acE = "∾̳";
    var Acirc = "Â";
    var acirc = "â";
    var acute = "´";
    var Acy = "А";
    var acy = "а";
    var AElig = "Æ";
    var aelig = "æ";
    var af = "⁡";
    var Afr = "𝔄";
    var afr = "𝔞";
    var Agrave = "À";
    var agrave = "à";
    var alefsym = "ℵ";
    var aleph = "ℵ";
    var Alpha = "Α";
    var alpha = "α";
    var Amacr = "Ā";
    var amacr = "ā";
    var amalg = "⨿";
    var amp = "&";
    var AMP = "&";
    var andand = "⩕";
    var And = "⩓";
    var and = "∧";
    var andd = "⩜";
    var andslope = "⩘";
    var andv = "⩚";
    var ang = "∠";
    var ange = "⦤";
    var angle = "∠";
    var angmsdaa = "⦨";
    var angmsdab = "⦩";
    var angmsdac = "⦪";
    var angmsdad = "⦫";
    var angmsdae = "⦬";
    var angmsdaf = "⦭";
    var angmsdag = "⦮";
    var angmsdah = "⦯";
    var angmsd = "∡";
    var angrt = "∟";
    var angrtvb = "⊾";
    var angrtvbd = "⦝";
    var angsph = "∢";
    var angst = "Å";
    var angzarr = "⍼";
    var Aogon = "Ą";
    var aogon = "ą";
    var Aopf = "𝔸";
    var aopf = "𝕒";
    var apacir = "⩯";
    var ap = "≈";
    var apE = "⩰";
    var ape = "≊";
    var apid = "≋";
    var apos = "'";
    var ApplyFunction = "⁡";
    var approx = "≈";
    var approxeq = "≊";
    var Aring = "Å";
    var aring = "å";
    var Ascr = "𝒜";
    var ascr = "𝒶";
    var Assign = "≔";
    var ast = "*";
    var asymp = "≈";
    var asympeq = "≍";
    var Atilde = "Ã";
    var atilde = "ã";
    var Auml = "Ä";
    var auml = "ä";
    var awconint = "∳";
    var awint = "⨑";
    var backcong = "≌";
    var backepsilon = "϶";
    var backprime = "‵";
    var backsim = "∽";
    var backsimeq = "⋍";
    var Backslash = "∖";
    var Barv = "⫧";
    var barvee = "⊽";
    var barwed = "⌅";
    var Barwed = "⌆";
    var barwedge = "⌅";
    var bbrk = "⎵";
    var bbrktbrk = "⎶";
    var bcong = "≌";
    var Bcy = "Б";
    var bcy = "б";
    var bdquo = "„";
    var becaus = "∵";
    var because = "∵";
    var Because = "∵";
    var bemptyv = "⦰";
    var bepsi = "϶";
    var bernou = "ℬ";
    var Bernoullis = "ℬ";
    var Beta = "Β";
    var beta = "β";
    var beth = "ℶ";
    var between = "≬";
    var Bfr = "𝔅";
    var bfr = "𝔟";
    var bigcap = "⋂";
    var bigcirc = "◯";
    var bigcup = "⋃";
    var bigodot = "⨀";
    var bigoplus = "⨁";
    var bigotimes = "⨂";
    var bigsqcup = "⨆";
    var bigstar = "★";
    var bigtriangledown = "▽";
    var bigtriangleup = "△";
    var biguplus = "⨄";
    var bigvee = "⋁";
    var bigwedge = "⋀";
    var bkarow = "⤍";
    var blacklozenge = "⧫";
    var blacksquare = "▪";
    var blacktriangle = "▴";
    var blacktriangledown = "▾";
    var blacktriangleleft = "◂";
    var blacktriangleright = "▸";
    var blank = "␣";
    var blk12 = "▒";
    var blk14 = "░";
    var blk34 = "▓";
    var block$1 = "█";
    var bne = "=⃥";
    var bnequiv = "≡⃥";
    var bNot = "⫭";
    var bnot = "⌐";
    var Bopf = "𝔹";
    var bopf = "𝕓";
    var bot = "⊥";
    var bottom = "⊥";
    var bowtie = "⋈";
    var boxbox = "⧉";
    var boxdl = "┐";
    var boxdL = "╕";
    var boxDl = "╖";
    var boxDL = "╗";
    var boxdr = "┌";
    var boxdR = "╒";
    var boxDr = "╓";
    var boxDR = "╔";
    var boxh = "─";
    var boxH = "═";
    var boxhd = "┬";
    var boxHd = "╤";
    var boxhD = "╥";
    var boxHD = "╦";
    var boxhu = "┴";
    var boxHu = "╧";
    var boxhU = "╨";
    var boxHU = "╩";
    var boxminus = "⊟";
    var boxplus = "⊞";
    var boxtimes = "⊠";
    var boxul = "┘";
    var boxuL = "╛";
    var boxUl = "╜";
    var boxUL = "╝";
    var boxur = "└";
    var boxuR = "╘";
    var boxUr = "╙";
    var boxUR = "╚";
    var boxv = "│";
    var boxV = "║";
    var boxvh = "┼";
    var boxvH = "╪";
    var boxVh = "╫";
    var boxVH = "╬";
    var boxvl = "┤";
    var boxvL = "╡";
    var boxVl = "╢";
    var boxVL = "╣";
    var boxvr = "├";
    var boxvR = "╞";
    var boxVr = "╟";
    var boxVR = "╠";
    var bprime = "‵";
    var breve = "˘";
    var Breve = "˘";
    var brvbar = "¦";
    var bscr = "𝒷";
    var Bscr = "ℬ";
    var bsemi = "⁏";
    var bsim = "∽";
    var bsime = "⋍";
    var bsolb = "⧅";
    var bsol = "\\";
    var bsolhsub = "⟈";
    var bull = "•";
    var bullet = "•";
    var bump = "≎";
    var bumpE = "⪮";
    var bumpe = "≏";
    var Bumpeq = "≎";
    var bumpeq = "≏";
    var Cacute = "Ć";
    var cacute = "ć";
    var capand = "⩄";
    var capbrcup = "⩉";
    var capcap = "⩋";
    var cap = "∩";
    var Cap = "⋒";
    var capcup = "⩇";
    var capdot = "⩀";
    var CapitalDifferentialD = "ⅅ";
    var caps = "∩︀";
    var caret = "⁁";
    var caron = "ˇ";
    var Cayleys = "ℭ";
    var ccaps = "⩍";
    var Ccaron = "Č";
    var ccaron = "č";
    var Ccedil = "Ç";
    var ccedil = "ç";
    var Ccirc = "Ĉ";
    var ccirc = "ĉ";
    var Cconint = "∰";
    var ccups = "⩌";
    var ccupssm = "⩐";
    var Cdot = "Ċ";
    var cdot = "ċ";
    var cedil = "¸";
    var Cedilla = "¸";
    var cemptyv = "⦲";
    var cent = "¢";
    var centerdot = "·";
    var CenterDot = "·";
    var cfr = "𝔠";
    var Cfr = "ℭ";
    var CHcy = "Ч";
    var chcy = "ч";
    var check = "✓";
    var checkmark = "✓";
    var Chi = "Χ";
    var chi = "χ";
    var circ = "ˆ";
    var circeq = "≗";
    var circlearrowleft = "↺";
    var circlearrowright = "↻";
    var circledast = "⊛";
    var circledcirc = "⊚";
    var circleddash = "⊝";
    var CircleDot = "⊙";
    var circledR = "®";
    var circledS = "Ⓢ";
    var CircleMinus = "⊖";
    var CirclePlus = "⊕";
    var CircleTimes = "⊗";
    var cir = "○";
    var cirE = "⧃";
    var cire = "≗";
    var cirfnint = "⨐";
    var cirmid = "⫯";
    var cirscir = "⧂";
    var ClockwiseContourIntegral = "∲";
    var CloseCurlyDoubleQuote = "”";
    var CloseCurlyQuote = "’";
    var clubs = "♣";
    var clubsuit = "♣";
    var colon = ":";
    var Colon = "∷";
    var Colone = "⩴";
    var colone = "≔";
    var coloneq = "≔";
    var comma = ",";
    var commat = "@";
    var comp = "∁";
    var compfn = "∘";
    var complement = "∁";
    var complexes = "ℂ";
    var cong = "≅";
    var congdot = "⩭";
    var Congruent = "≡";
    var conint = "∮";
    var Conint = "∯";
    var ContourIntegral = "∮";
    var copf = "𝕔";
    var Copf = "ℂ";
    var coprod = "∐";
    var Coproduct = "∐";
    var copy = "©";
    var COPY = "©";
    var copysr = "℗";
    var CounterClockwiseContourIntegral = "∳";
    var crarr = "↵";
    var cross = "✗";
    var Cross = "⨯";
    var Cscr = "𝒞";
    var cscr = "𝒸";
    var csub = "⫏";
    var csube = "⫑";
    var csup = "⫐";
    var csupe = "⫒";
    var ctdot = "⋯";
    var cudarrl = "⤸";
    var cudarrr = "⤵";
    var cuepr = "⋞";
    var cuesc = "⋟";
    var cularr = "↶";
    var cularrp = "⤽";
    var cupbrcap = "⩈";
    var cupcap = "⩆";
    var CupCap = "≍";
    var cup = "∪";
    var Cup = "⋓";
    var cupcup = "⩊";
    var cupdot = "⊍";
    var cupor = "⩅";
    var cups = "∪︀";
    var curarr = "↷";
    var curarrm = "⤼";
    var curlyeqprec = "⋞";
    var curlyeqsucc = "⋟";
    var curlyvee = "⋎";
    var curlywedge = "⋏";
    var curren = "¤";
    var curvearrowleft = "↶";
    var curvearrowright = "↷";
    var cuvee = "⋎";
    var cuwed = "⋏";
    var cwconint = "∲";
    var cwint = "∱";
    var cylcty = "⌭";
    var dagger = "†";
    var Dagger = "‡";
    var daleth = "ℸ";
    var darr = "↓";
    var Darr = "↡";
    var dArr = "⇓";
    var dash = "‐";
    var Dashv = "⫤";
    var dashv = "⊣";
    var dbkarow = "⤏";
    var dblac = "˝";
    var Dcaron = "Ď";
    var dcaron = "ď";
    var Dcy = "Д";
    var dcy = "д";
    var ddagger = "‡";
    var ddarr = "⇊";
    var DD = "ⅅ";
    var dd = "ⅆ";
    var DDotrahd = "⤑";
    var ddotseq = "⩷";
    var deg = "°";
    var Del = "∇";
    var Delta = "Δ";
    var delta = "δ";
    var demptyv = "⦱";
    var dfisht = "⥿";
    var Dfr = "𝔇";
    var dfr = "𝔡";
    var dHar = "⥥";
    var dharl = "⇃";
    var dharr = "⇂";
    var DiacriticalAcute = "´";
    var DiacriticalDot = "˙";
    var DiacriticalDoubleAcute = "˝";
    var DiacriticalGrave = "`";
    var DiacriticalTilde = "˜";
    var diam = "⋄";
    var diamond = "⋄";
    var Diamond = "⋄";
    var diamondsuit = "♦";
    var diams = "♦";
    var die = "¨";
    var DifferentialD = "ⅆ";
    var digamma = "ϝ";
    var disin = "⋲";
    var div = "÷";
    var divide = "÷";
    var divideontimes = "⋇";
    var divonx = "⋇";
    var DJcy = "Ђ";
    var djcy = "ђ";
    var dlcorn = "⌞";
    var dlcrop = "⌍";
    var dollar = "$";
    var Dopf = "𝔻";
    var dopf = "𝕕";
    var Dot = "¨";
    var dot = "˙";
    var DotDot = "⃜";
    var doteq = "≐";
    var doteqdot = "≑";
    var DotEqual = "≐";
    var dotminus = "∸";
    var dotplus = "∔";
    var dotsquare = "⊡";
    var doublebarwedge = "⌆";
    var DoubleContourIntegral = "∯";
    var DoubleDot = "¨";
    var DoubleDownArrow = "⇓";
    var DoubleLeftArrow = "⇐";
    var DoubleLeftRightArrow = "⇔";
    var DoubleLeftTee = "⫤";
    var DoubleLongLeftArrow = "⟸";
    var DoubleLongLeftRightArrow = "⟺";
    var DoubleLongRightArrow = "⟹";
    var DoubleRightArrow = "⇒";
    var DoubleRightTee = "⊨";
    var DoubleUpArrow = "⇑";
    var DoubleUpDownArrow = "⇕";
    var DoubleVerticalBar = "∥";
    var DownArrowBar = "⤓";
    var downarrow = "↓";
    var DownArrow = "↓";
    var Downarrow = "⇓";
    var DownArrowUpArrow = "⇵";
    var DownBreve = "̑";
    var downdownarrows = "⇊";
    var downharpoonleft = "⇃";
    var downharpoonright = "⇂";
    var DownLeftRightVector = "⥐";
    var DownLeftTeeVector = "⥞";
    var DownLeftVectorBar = "⥖";
    var DownLeftVector = "↽";
    var DownRightTeeVector = "⥟";
    var DownRightVectorBar = "⥗";
    var DownRightVector = "⇁";
    var DownTeeArrow = "↧";
    var DownTee = "⊤";
    var drbkarow = "⤐";
    var drcorn = "⌟";
    var drcrop = "⌌";
    var Dscr = "𝒟";
    var dscr = "𝒹";
    var DScy = "Ѕ";
    var dscy = "ѕ";
    var dsol = "⧶";
    var Dstrok = "Đ";
    var dstrok = "đ";
    var dtdot = "⋱";
    var dtri = "▿";
    var dtrif = "▾";
    var duarr = "⇵";
    var duhar = "⥯";
    var dwangle = "⦦";
    var DZcy = "Џ";
    var dzcy = "џ";
    var dzigrarr = "⟿";
    var Eacute = "É";
    var eacute = "é";
    var easter = "⩮";
    var Ecaron = "Ě";
    var ecaron = "ě";
    var Ecirc = "Ê";
    var ecirc = "ê";
    var ecir = "≖";
    var ecolon = "≕";
    var Ecy = "Э";
    var ecy = "э";
    var eDDot = "⩷";
    var Edot = "Ė";
    var edot = "ė";
    var eDot = "≑";
    var ee = "ⅇ";
    var efDot = "≒";
    var Efr = "𝔈";
    var efr = "𝔢";
    var eg = "⪚";
    var Egrave = "È";
    var egrave = "è";
    var egs = "⪖";
    var egsdot = "⪘";
    var el = "⪙";
    var Element = "∈";
    var elinters = "⏧";
    var ell = "ℓ";
    var els = "⪕";
    var elsdot = "⪗";
    var Emacr = "Ē";
    var emacr = "ē";
    var empty = "∅";
    var emptyset = "∅";
    var EmptySmallSquare = "◻";
    var emptyv = "∅";
    var EmptyVerySmallSquare = "▫";
    var emsp13 = " ";
    var emsp14 = " ";
    var emsp = " ";
    var ENG = "Ŋ";
    var eng = "ŋ";
    var ensp = " ";
    var Eogon = "Ę";
    var eogon = "ę";
    var Eopf = "𝔼";
    var eopf = "𝕖";
    var epar = "⋕";
    var eparsl = "⧣";
    var eplus = "⩱";
    var epsi = "ε";
    var Epsilon = "Ε";
    var epsilon = "ε";
    var epsiv = "ϵ";
    var eqcirc = "≖";
    var eqcolon = "≕";
    var eqsim = "≂";
    var eqslantgtr = "⪖";
    var eqslantless = "⪕";
    var Equal = "⩵";
    var equals = "=";
    var EqualTilde = "≂";
    var equest = "≟";
    var Equilibrium = "⇌";
    var equiv = "≡";
    var equivDD = "⩸";
    var eqvparsl = "⧥";
    var erarr = "⥱";
    var erDot = "≓";
    var escr = "ℯ";
    var Escr = "ℰ";
    var esdot = "≐";
    var Esim = "⩳";
    var esim = "≂";
    var Eta = "Η";
    var eta = "η";
    var ETH = "Ð";
    var eth = "ð";
    var Euml = "Ë";
    var euml = "ë";
    var euro = "€";
    var excl = "!";
    var exist = "∃";
    var Exists = "∃";
    var expectation = "ℰ";
    var exponentiale = "ⅇ";
    var ExponentialE = "ⅇ";
    var fallingdotseq = "≒";
    var Fcy = "Ф";
    var fcy = "ф";
    var female = "♀";
    var ffilig = "ﬃ";
    var fflig = "ﬀ";
    var ffllig = "ﬄ";
    var Ffr = "𝔉";
    var ffr = "𝔣";
    var filig = "ﬁ";
    var FilledSmallSquare = "◼";
    var FilledVerySmallSquare = "▪";
    var fjlig = "fj";
    var flat = "♭";
    var fllig = "ﬂ";
    var fltns = "▱";
    var fnof = "ƒ";
    var Fopf = "𝔽";
    var fopf = "𝕗";
    var forall = "∀";
    var ForAll = "∀";
    var fork = "⋔";
    var forkv = "⫙";
    var Fouriertrf = "ℱ";
    var fpartint = "⨍";
    var frac12 = "½";
    var frac13 = "⅓";
    var frac14 = "¼";
    var frac15 = "⅕";
    var frac16 = "⅙";
    var frac18 = "⅛";
    var frac23 = "⅔";
    var frac25 = "⅖";
    var frac34 = "¾";
    var frac35 = "⅗";
    var frac38 = "⅜";
    var frac45 = "⅘";
    var frac56 = "⅚";
    var frac58 = "⅝";
    var frac78 = "⅞";
    var frasl = "⁄";
    var frown = "⌢";
    var fscr = "𝒻";
    var Fscr = "ℱ";
    var gacute = "ǵ";
    var Gamma = "Γ";
    var gamma = "γ";
    var Gammad = "Ϝ";
    var gammad = "ϝ";
    var gap = "⪆";
    var Gbreve = "Ğ";
    var gbreve = "ğ";
    var Gcedil = "Ģ";
    var Gcirc = "Ĝ";
    var gcirc = "ĝ";
    var Gcy = "Г";
    var gcy = "г";
    var Gdot = "Ġ";
    var gdot = "ġ";
    var ge = "≥";
    var gE = "≧";
    var gEl = "⪌";
    var gel = "⋛";
    var geq = "≥";
    var geqq = "≧";
    var geqslant = "⩾";
    var gescc = "⪩";
    var ges = "⩾";
    var gesdot = "⪀";
    var gesdoto = "⪂";
    var gesdotol = "⪄";
    var gesl = "⋛︀";
    var gesles = "⪔";
    var Gfr = "𝔊";
    var gfr = "𝔤";
    var gg = "≫";
    var Gg = "⋙";
    var ggg = "⋙";
    var gimel = "ℷ";
    var GJcy = "Ѓ";
    var gjcy = "ѓ";
    var gla = "⪥";
    var gl = "≷";
    var glE = "⪒";
    var glj = "⪤";
    var gnap = "⪊";
    var gnapprox = "⪊";
    var gne = "⪈";
    var gnE = "≩";
    var gneq = "⪈";
    var gneqq = "≩";
    var gnsim = "⋧";
    var Gopf = "𝔾";
    var gopf = "𝕘";
    var grave = "`";
    var GreaterEqual = "≥";
    var GreaterEqualLess = "⋛";
    var GreaterFullEqual = "≧";
    var GreaterGreater = "⪢";
    var GreaterLess = "≷";
    var GreaterSlantEqual = "⩾";
    var GreaterTilde = "≳";
    var Gscr = "𝒢";
    var gscr = "ℊ";
    var gsim = "≳";
    var gsime = "⪎";
    var gsiml = "⪐";
    var gtcc = "⪧";
    var gtcir = "⩺";
    var gt = ">";
    var GT = ">";
    var Gt = "≫";
    var gtdot = "⋗";
    var gtlPar = "⦕";
    var gtquest = "⩼";
    var gtrapprox = "⪆";
    var gtrarr = "⥸";
    var gtrdot = "⋗";
    var gtreqless = "⋛";
    var gtreqqless = "⪌";
    var gtrless = "≷";
    var gtrsim = "≳";
    var gvertneqq = "≩︀";
    var gvnE = "≩︀";
    var Hacek = "ˇ";
    var hairsp = " ";
    var half = "½";
    var hamilt = "ℋ";
    var HARDcy = "Ъ";
    var hardcy = "ъ";
    var harrcir = "⥈";
    var harr = "↔";
    var hArr = "⇔";
    var harrw = "↭";
    var Hat = "^";
    var hbar = "ℏ";
    var Hcirc = "Ĥ";
    var hcirc = "ĥ";
    var hearts = "♥";
    var heartsuit = "♥";
    var hellip = "…";
    var hercon = "⊹";
    var hfr = "𝔥";
    var Hfr = "ℌ";
    var HilbertSpace = "ℋ";
    var hksearow = "⤥";
    var hkswarow = "⤦";
    var hoarr = "⇿";
    var homtht = "∻";
    var hookleftarrow = "↩";
    var hookrightarrow = "↪";
    var hopf = "𝕙";
    var Hopf = "ℍ";
    var horbar = "―";
    var HorizontalLine = "─";
    var hscr = "𝒽";
    var Hscr = "ℋ";
    var hslash = "ℏ";
    var Hstrok = "Ħ";
    var hstrok = "ħ";
    var HumpDownHump = "≎";
    var HumpEqual = "≏";
    var hybull = "⁃";
    var hyphen = "‐";
    var Iacute = "Í";
    var iacute = "í";
    var ic = "⁣";
    var Icirc = "Î";
    var icirc = "î";
    var Icy = "И";
    var icy = "и";
    var Idot = "İ";
    var IEcy = "Е";
    var iecy = "е";
    var iexcl = "¡";
    var iff = "⇔";
    var ifr = "𝔦";
    var Ifr = "ℑ";
    var Igrave = "Ì";
    var igrave = "ì";
    var ii = "ⅈ";
    var iiiint = "⨌";
    var iiint = "∭";
    var iinfin = "⧜";
    var iiota = "℩";
    var IJlig = "Ĳ";
    var ijlig = "ĳ";
    var Imacr = "Ī";
    var imacr = "ī";
    var image$1 = "ℑ";
    var ImaginaryI = "ⅈ";
    var imagline = "ℐ";
    var imagpart = "ℑ";
    var imath = "ı";
    var Im = "ℑ";
    var imof = "⊷";
    var imped = "Ƶ";
    var Implies = "⇒";
    var incare = "℅";
    var infin = "∞";
    var infintie = "⧝";
    var inodot = "ı";
    var intcal = "⊺";
    var int = "∫";
    var Int = "∬";
    var integers = "ℤ";
    var Integral = "∫";
    var intercal = "⊺";
    var Intersection = "⋂";
    var intlarhk = "⨗";
    var intprod = "⨼";
    var InvisibleComma = "⁣";
    var InvisibleTimes = "⁢";
    var IOcy = "Ё";
    var iocy = "ё";
    var Iogon = "Į";
    var iogon = "į";
    var Iopf = "𝕀";
    var iopf = "𝕚";
    var Iota = "Ι";
    var iota = "ι";
    var iprod = "⨼";
    var iquest = "¿";
    var iscr = "𝒾";
    var Iscr = "ℐ";
    var isin = "∈";
    var isindot = "⋵";
    var isinE = "⋹";
    var isins = "⋴";
    var isinsv = "⋳";
    var isinv = "∈";
    var it = "⁢";
    var Itilde = "Ĩ";
    var itilde = "ĩ";
    var Iukcy = "І";
    var iukcy = "і";
    var Iuml = "Ï";
    var iuml = "ï";
    var Jcirc = "Ĵ";
    var jcirc = "ĵ";
    var Jcy = "Й";
    var jcy = "й";
    var Jfr = "𝔍";
    var jfr = "𝔧";
    var jmath = "ȷ";
    var Jopf = "𝕁";
    var jopf = "𝕛";
    var Jscr = "𝒥";
    var jscr = "𝒿";
    var Jsercy = "Ј";
    var jsercy = "ј";
    var Jukcy = "Є";
    var jukcy = "є";
    var Kappa = "Κ";
    var kappa = "κ";
    var kappav = "ϰ";
    var Kcedil = "Ķ";
    var kcedil = "ķ";
    var Kcy = "К";
    var kcy = "к";
    var Kfr = "𝔎";
    var kfr = "𝔨";
    var kgreen = "ĸ";
    var KHcy = "Х";
    var khcy = "х";
    var KJcy = "Ќ";
    var kjcy = "ќ";
    var Kopf = "𝕂";
    var kopf = "𝕜";
    var Kscr = "𝒦";
    var kscr = "𝓀";
    var lAarr = "⇚";
    var Lacute = "Ĺ";
    var lacute = "ĺ";
    var laemptyv = "⦴";
    var lagran = "ℒ";
    var Lambda = "Λ";
    var lambda = "λ";
    var lang = "⟨";
    var Lang = "⟪";
    var langd = "⦑";
    var langle = "⟨";
    var lap = "⪅";
    var Laplacetrf = "ℒ";
    var laquo = "«";
    var larrb = "⇤";
    var larrbfs = "⤟";
    var larr = "←";
    var Larr = "↞";
    var lArr = "⇐";
    var larrfs = "⤝";
    var larrhk = "↩";
    var larrlp = "↫";
    var larrpl = "⤹";
    var larrsim = "⥳";
    var larrtl = "↢";
    var latail = "⤙";
    var lAtail = "⤛";
    var lat = "⪫";
    var late = "⪭";
    var lates = "⪭︀";
    var lbarr = "⤌";
    var lBarr = "⤎";
    var lbbrk = "❲";
    var lbrace = "{";
    var lbrack = "[";
    var lbrke = "⦋";
    var lbrksld = "⦏";
    var lbrkslu = "⦍";
    var Lcaron = "Ľ";
    var lcaron = "ľ";
    var Lcedil = "Ļ";
    var lcedil = "ļ";
    var lceil = "⌈";
    var lcub = "{";
    var Lcy = "Л";
    var lcy = "л";
    var ldca = "⤶";
    var ldquo = "“";
    var ldquor = "„";
    var ldrdhar = "⥧";
    var ldrushar = "⥋";
    var ldsh = "↲";
    var le = "≤";
    var lE = "≦";
    var LeftAngleBracket = "⟨";
    var LeftArrowBar = "⇤";
    var leftarrow = "←";
    var LeftArrow = "←";
    var Leftarrow = "⇐";
    var LeftArrowRightArrow = "⇆";
    var leftarrowtail = "↢";
    var LeftCeiling = "⌈";
    var LeftDoubleBracket = "⟦";
    var LeftDownTeeVector = "⥡";
    var LeftDownVectorBar = "⥙";
    var LeftDownVector = "⇃";
    var LeftFloor = "⌊";
    var leftharpoondown = "↽";
    var leftharpoonup = "↼";
    var leftleftarrows = "⇇";
    var leftrightarrow = "↔";
    var LeftRightArrow = "↔";
    var Leftrightarrow = "⇔";
    var leftrightarrows = "⇆";
    var leftrightharpoons = "⇋";
    var leftrightsquigarrow = "↭";
    var LeftRightVector = "⥎";
    var LeftTeeArrow = "↤";
    var LeftTee = "⊣";
    var LeftTeeVector = "⥚";
    var leftthreetimes = "⋋";
    var LeftTriangleBar = "⧏";
    var LeftTriangle = "⊲";
    var LeftTriangleEqual = "⊴";
    var LeftUpDownVector = "⥑";
    var LeftUpTeeVector = "⥠";
    var LeftUpVectorBar = "⥘";
    var LeftUpVector = "↿";
    var LeftVectorBar = "⥒";
    var LeftVector = "↼";
    var lEg = "⪋";
    var leg = "⋚";
    var leq = "≤";
    var leqq = "≦";
    var leqslant = "⩽";
    var lescc = "⪨";
    var les = "⩽";
    var lesdot = "⩿";
    var lesdoto = "⪁";
    var lesdotor = "⪃";
    var lesg = "⋚︀";
    var lesges = "⪓";
    var lessapprox = "⪅";
    var lessdot = "⋖";
    var lesseqgtr = "⋚";
    var lesseqqgtr = "⪋";
    var LessEqualGreater = "⋚";
    var LessFullEqual = "≦";
    var LessGreater = "≶";
    var lessgtr = "≶";
    var LessLess = "⪡";
    var lesssim = "≲";
    var LessSlantEqual = "⩽";
    var LessTilde = "≲";
    var lfisht = "⥼";
    var lfloor = "⌊";
    var Lfr = "𝔏";
    var lfr = "𝔩";
    var lg = "≶";
    var lgE = "⪑";
    var lHar = "⥢";
    var lhard = "↽";
    var lharu = "↼";
    var lharul = "⥪";
    var lhblk = "▄";
    var LJcy = "Љ";
    var ljcy = "љ";
    var llarr = "⇇";
    var ll = "≪";
    var Ll = "⋘";
    var llcorner = "⌞";
    var Lleftarrow = "⇚";
    var llhard = "⥫";
    var lltri = "◺";
    var Lmidot = "Ŀ";
    var lmidot = "ŀ";
    var lmoustache = "⎰";
    var lmoust = "⎰";
    var lnap = "⪉";
    var lnapprox = "⪉";
    var lne = "⪇";
    var lnE = "≨";
    var lneq = "⪇";
    var lneqq = "≨";
    var lnsim = "⋦";
    var loang = "⟬";
    var loarr = "⇽";
    var lobrk = "⟦";
    var longleftarrow = "⟵";
    var LongLeftArrow = "⟵";
    var Longleftarrow = "⟸";
    var longleftrightarrow = "⟷";
    var LongLeftRightArrow = "⟷";
    var Longleftrightarrow = "⟺";
    var longmapsto = "⟼";
    var longrightarrow = "⟶";
    var LongRightArrow = "⟶";
    var Longrightarrow = "⟹";
    var looparrowleft = "↫";
    var looparrowright = "↬";
    var lopar = "⦅";
    var Lopf = "𝕃";
    var lopf = "𝕝";
    var loplus = "⨭";
    var lotimes = "⨴";
    var lowast = "∗";
    var lowbar = "_";
    var LowerLeftArrow = "↙";
    var LowerRightArrow = "↘";
    var loz = "◊";
    var lozenge = "◊";
    var lozf = "⧫";
    var lpar = "(";
    var lparlt = "⦓";
    var lrarr = "⇆";
    var lrcorner = "⌟";
    var lrhar = "⇋";
    var lrhard = "⥭";
    var lrm = "‎";
    var lrtri = "⊿";
    var lsaquo = "‹";
    var lscr = "𝓁";
    var Lscr = "ℒ";
    var lsh = "↰";
    var Lsh = "↰";
    var lsim = "≲";
    var lsime = "⪍";
    var lsimg = "⪏";
    var lsqb = "[";
    var lsquo = "‘";
    var lsquor = "‚";
    var Lstrok = "Ł";
    var lstrok = "ł";
    var ltcc = "⪦";
    var ltcir = "⩹";
    var lt = "<";
    var LT = "<";
    var Lt = "≪";
    var ltdot = "⋖";
    var lthree = "⋋";
    var ltimes = "⋉";
    var ltlarr = "⥶";
    var ltquest = "⩻";
    var ltri = "◃";
    var ltrie = "⊴";
    var ltrif = "◂";
    var ltrPar = "⦖";
    var lurdshar = "⥊";
    var luruhar = "⥦";
    var lvertneqq = "≨︀";
    var lvnE = "≨︀";
    var macr = "¯";
    var male = "♂";
    var malt = "✠";
    var maltese = "✠";
    var map$1 = "↦";
    var mapsto = "↦";
    var mapstodown = "↧";
    var mapstoleft = "↤";
    var mapstoup = "↥";
    var marker = "▮";
    var mcomma = "⨩";
    var Mcy = "М";
    var mcy = "м";
    var mdash = "—";
    var mDDot = "∺";
    var measuredangle = "∡";
    var MediumSpace = " ";
    var Mellintrf = "ℳ";
    var Mfr = "𝔐";
    var mfr = "𝔪";
    var mho = "℧";
    var micro = "µ";
    var midast = "*";
    var midcir = "⫰";
    var mid = "∣";
    var middot = "·";
    var minusb = "⊟";
    var minus = "−";
    var minusd = "∸";
    var minusdu = "⨪";
    var MinusPlus = "∓";
    var mlcp = "⫛";
    var mldr = "…";
    var mnplus = "∓";
    var models = "⊧";
    var Mopf = "𝕄";
    var mopf = "𝕞";
    var mp = "∓";
    var mscr = "𝓂";
    var Mscr = "ℳ";
    var mstpos = "∾";
    var Mu = "Μ";
    var mu = "μ";
    var multimap = "⊸";
    var mumap = "⊸";
    var nabla = "∇";
    var Nacute = "Ń";
    var nacute = "ń";
    var nang = "∠⃒";
    var nap = "≉";
    var napE = "⩰̸";
    var napid = "≋̸";
    var napos = "ŉ";
    var napprox = "≉";
    var natural = "♮";
    var naturals = "ℕ";
    var natur = "♮";
    var nbsp = " ";
    var nbump = "≎̸";
    var nbumpe = "≏̸";
    var ncap = "⩃";
    var Ncaron = "Ň";
    var ncaron = "ň";
    var Ncedil = "Ņ";
    var ncedil = "ņ";
    var ncong = "≇";
    var ncongdot = "⩭̸";
    var ncup = "⩂";
    var Ncy = "Н";
    var ncy = "н";
    var ndash = "–";
    var nearhk = "⤤";
    var nearr = "↗";
    var neArr = "⇗";
    var nearrow = "↗";
    var ne = "≠";
    var nedot = "≐̸";
    var NegativeMediumSpace = "​";
    var NegativeThickSpace = "​";
    var NegativeThinSpace = "​";
    var NegativeVeryThinSpace = "​";
    var nequiv = "≢";
    var nesear = "⤨";
    var nesim = "≂̸";
    var NestedGreaterGreater = "≫";
    var NestedLessLess = "≪";
    var NewLine = "\n";
    var nexist = "∄";
    var nexists = "∄";
    var Nfr = "𝔑";
    var nfr = "𝔫";
    var ngE = "≧̸";
    var nge = "≱";
    var ngeq = "≱";
    var ngeqq = "≧̸";
    var ngeqslant = "⩾̸";
    var nges = "⩾̸";
    var nGg = "⋙̸";
    var ngsim = "≵";
    var nGt = "≫⃒";
    var ngt = "≯";
    var ngtr = "≯";
    var nGtv = "≫̸";
    var nharr = "↮";
    var nhArr = "⇎";
    var nhpar = "⫲";
    var ni = "∋";
    var nis = "⋼";
    var nisd = "⋺";
    var niv = "∋";
    var NJcy = "Њ";
    var njcy = "њ";
    var nlarr = "↚";
    var nlArr = "⇍";
    var nldr = "‥";
    var nlE = "≦̸";
    var nle = "≰";
    var nleftarrow = "↚";
    var nLeftarrow = "⇍";
    var nleftrightarrow = "↮";
    var nLeftrightarrow = "⇎";
    var nleq = "≰";
    var nleqq = "≦̸";
    var nleqslant = "⩽̸";
    var nles = "⩽̸";
    var nless = "≮";
    var nLl = "⋘̸";
    var nlsim = "≴";
    var nLt = "≪⃒";
    var nlt = "≮";
    var nltri = "⋪";
    var nltrie = "⋬";
    var nLtv = "≪̸";
    var nmid = "∤";
    var NoBreak = "⁠";
    var NonBreakingSpace = " ";
    var nopf = "𝕟";
    var Nopf = "ℕ";
    var Not = "⫬";
    var not = "¬";
    var NotCongruent = "≢";
    var NotCupCap = "≭";
    var NotDoubleVerticalBar = "∦";
    var NotElement = "∉";
    var NotEqual = "≠";
    var NotEqualTilde = "≂̸";
    var NotExists = "∄";
    var NotGreater = "≯";
    var NotGreaterEqual = "≱";
    var NotGreaterFullEqual = "≧̸";
    var NotGreaterGreater = "≫̸";
    var NotGreaterLess = "≹";
    var NotGreaterSlantEqual = "⩾̸";
    var NotGreaterTilde = "≵";
    var NotHumpDownHump = "≎̸";
    var NotHumpEqual = "≏̸";
    var notin = "∉";
    var notindot = "⋵̸";
    var notinE = "⋹̸";
    var notinva = "∉";
    var notinvb = "⋷";
    var notinvc = "⋶";
    var NotLeftTriangleBar = "⧏̸";
    var NotLeftTriangle = "⋪";
    var NotLeftTriangleEqual = "⋬";
    var NotLess = "≮";
    var NotLessEqual = "≰";
    var NotLessGreater = "≸";
    var NotLessLess = "≪̸";
    var NotLessSlantEqual = "⩽̸";
    var NotLessTilde = "≴";
    var NotNestedGreaterGreater = "⪢̸";
    var NotNestedLessLess = "⪡̸";
    var notni = "∌";
    var notniva = "∌";
    var notnivb = "⋾";
    var notnivc = "⋽";
    var NotPrecedes = "⊀";
    var NotPrecedesEqual = "⪯̸";
    var NotPrecedesSlantEqual = "⋠";
    var NotReverseElement = "∌";
    var NotRightTriangleBar = "⧐̸";
    var NotRightTriangle = "⋫";
    var NotRightTriangleEqual = "⋭";
    var NotSquareSubset = "⊏̸";
    var NotSquareSubsetEqual = "⋢";
    var NotSquareSuperset = "⊐̸";
    var NotSquareSupersetEqual = "⋣";
    var NotSubset = "⊂⃒";
    var NotSubsetEqual = "⊈";
    var NotSucceeds = "⊁";
    var NotSucceedsEqual = "⪰̸";
    var NotSucceedsSlantEqual = "⋡";
    var NotSucceedsTilde = "≿̸";
    var NotSuperset = "⊃⃒";
    var NotSupersetEqual = "⊉";
    var NotTilde = "≁";
    var NotTildeEqual = "≄";
    var NotTildeFullEqual = "≇";
    var NotTildeTilde = "≉";
    var NotVerticalBar = "∤";
    var nparallel = "∦";
    var npar = "∦";
    var nparsl = "⫽⃥";
    var npart = "∂̸";
    var npolint = "⨔";
    var npr = "⊀";
    var nprcue = "⋠";
    var nprec = "⊀";
    var npreceq = "⪯̸";
    var npre = "⪯̸";
    var nrarrc = "⤳̸";
    var nrarr = "↛";
    var nrArr = "⇏";
    var nrarrw = "↝̸";
    var nrightarrow = "↛";
    var nRightarrow = "⇏";
    var nrtri = "⋫";
    var nrtrie = "⋭";
    var nsc = "⊁";
    var nsccue = "⋡";
    var nsce = "⪰̸";
    var Nscr = "𝒩";
    var nscr = "𝓃";
    var nshortmid = "∤";
    var nshortparallel = "∦";
    var nsim = "≁";
    var nsime = "≄";
    var nsimeq = "≄";
    var nsmid = "∤";
    var nspar = "∦";
    var nsqsube = "⋢";
    var nsqsupe = "⋣";
    var nsub = "⊄";
    var nsubE = "⫅̸";
    var nsube = "⊈";
    var nsubset = "⊂⃒";
    var nsubseteq = "⊈";
    var nsubseteqq = "⫅̸";
    var nsucc = "⊁";
    var nsucceq = "⪰̸";
    var nsup = "⊅";
    var nsupE = "⫆̸";
    var nsupe = "⊉";
    var nsupset = "⊃⃒";
    var nsupseteq = "⊉";
    var nsupseteqq = "⫆̸";
    var ntgl = "≹";
    var Ntilde = "Ñ";
    var ntilde = "ñ";
    var ntlg = "≸";
    var ntriangleleft = "⋪";
    var ntrianglelefteq = "⋬";
    var ntriangleright = "⋫";
    var ntrianglerighteq = "⋭";
    var Nu = "Ν";
    var nu = "ν";
    var num = "#";
    var numero = "№";
    var numsp = " ";
    var nvap = "≍⃒";
    var nvdash = "⊬";
    var nvDash = "⊭";
    var nVdash = "⊮";
    var nVDash = "⊯";
    var nvge = "≥⃒";
    var nvgt = ">⃒";
    var nvHarr = "⤄";
    var nvinfin = "⧞";
    var nvlArr = "⤂";
    var nvle = "≤⃒";
    var nvlt = "<⃒";
    var nvltrie = "⊴⃒";
    var nvrArr = "⤃";
    var nvrtrie = "⊵⃒";
    var nvsim = "∼⃒";
    var nwarhk = "⤣";
    var nwarr = "↖";
    var nwArr = "⇖";
    var nwarrow = "↖";
    var nwnear = "⤧";
    var Oacute = "Ó";
    var oacute = "ó";
    var oast = "⊛";
    var Ocirc = "Ô";
    var ocirc = "ô";
    var ocir = "⊚";
    var Ocy = "О";
    var ocy = "о";
    var odash = "⊝";
    var Odblac = "Ő";
    var odblac = "ő";
    var odiv = "⨸";
    var odot = "⊙";
    var odsold = "⦼";
    var OElig = "Œ";
    var oelig = "œ";
    var ofcir = "⦿";
    var Ofr = "𝔒";
    var ofr = "𝔬";
    var ogon = "˛";
    var Ograve = "Ò";
    var ograve = "ò";
    var ogt = "⧁";
    var ohbar = "⦵";
    var ohm = "Ω";
    var oint = "∮";
    var olarr = "↺";
    var olcir = "⦾";
    var olcross = "⦻";
    var oline = "‾";
    var olt = "⧀";
    var Omacr = "Ō";
    var omacr = "ō";
    var Omega = "Ω";
    var omega = "ω";
    var Omicron = "Ο";
    var omicron = "ο";
    var omid = "⦶";
    var ominus = "⊖";
    var Oopf = "𝕆";
    var oopf = "𝕠";
    var opar = "⦷";
    var OpenCurlyDoubleQuote = "“";
    var OpenCurlyQuote = "‘";
    var operp = "⦹";
    var oplus = "⊕";
    var orarr = "↻";
    var Or = "⩔";
    var or = "∨";
    var ord = "⩝";
    var order = "ℴ";
    var orderof = "ℴ";
    var ordf = "ª";
    var ordm = "º";
    var origof = "⊶";
    var oror = "⩖";
    var orslope = "⩗";
    var orv = "⩛";
    var oS = "Ⓢ";
    var Oscr = "𝒪";
    var oscr = "ℴ";
    var Oslash = "Ø";
    var oslash = "ø";
    var osol = "⊘";
    var Otilde = "Õ";
    var otilde = "õ";
    var otimesas = "⨶";
    var Otimes = "⨷";
    var otimes = "⊗";
    var Ouml = "Ö";
    var ouml = "ö";
    var ovbar = "⌽";
    var OverBar = "‾";
    var OverBrace = "⏞";
    var OverBracket = "⎴";
    var OverParenthesis = "⏜";
    var para = "¶";
    var parallel = "∥";
    var par = "∥";
    var parsim = "⫳";
    var parsl = "⫽";
    var part = "∂";
    var PartialD = "∂";
    var Pcy = "П";
    var pcy = "п";
    var percnt = "%";
    var period = ".";
    var permil = "‰";
    var perp = "⊥";
    var pertenk = "‱";
    var Pfr = "𝔓";
    var pfr = "𝔭";
    var Phi = "Φ";
    var phi = "φ";
    var phiv = "ϕ";
    var phmmat = "ℳ";
    var phone = "☎";
    var Pi = "Π";
    var pi = "π";
    var pitchfork = "⋔";
    var piv = "ϖ";
    var planck = "ℏ";
    var planckh = "ℎ";
    var plankv = "ℏ";
    var plusacir = "⨣";
    var plusb = "⊞";
    var pluscir = "⨢";
    var plus = "+";
    var plusdo = "∔";
    var plusdu = "⨥";
    var pluse = "⩲";
    var PlusMinus = "±";
    var plusmn = "±";
    var plussim = "⨦";
    var plustwo = "⨧";
    var pm = "±";
    var Poincareplane = "ℌ";
    var pointint = "⨕";
    var popf = "𝕡";
    var Popf = "ℙ";
    var pound = "£";
    var prap = "⪷";
    var Pr = "⪻";
    var pr = "≺";
    var prcue = "≼";
    var precapprox = "⪷";
    var prec = "≺";
    var preccurlyeq = "≼";
    var Precedes = "≺";
    var PrecedesEqual = "⪯";
    var PrecedesSlantEqual = "≼";
    var PrecedesTilde = "≾";
    var preceq = "⪯";
    var precnapprox = "⪹";
    var precneqq = "⪵";
    var precnsim = "⋨";
    var pre = "⪯";
    var prE = "⪳";
    var precsim = "≾";
    var prime = "′";
    var Prime = "″";
    var primes = "ℙ";
    var prnap = "⪹";
    var prnE = "⪵";
    var prnsim = "⋨";
    var prod = "∏";
    var Product = "∏";
    var profalar = "⌮";
    var profline = "⌒";
    var profsurf = "⌓";
    var prop = "∝";
    var Proportional = "∝";
    var Proportion = "∷";
    var propto = "∝";
    var prsim = "≾";
    var prurel = "⊰";
    var Pscr = "𝒫";
    var pscr = "𝓅";
    var Psi = "Ψ";
    var psi = "ψ";
    var puncsp = " ";
    var Qfr = "𝔔";
    var qfr = "𝔮";
    var qint = "⨌";
    var qopf = "𝕢";
    var Qopf = "ℚ";
    var qprime = "⁗";
    var Qscr = "𝒬";
    var qscr = "𝓆";
    var quaternions = "ℍ";
    var quatint = "⨖";
    var quest = "?";
    var questeq = "≟";
    var quot = "\"";
    var QUOT = "\"";
    var rAarr = "⇛";
    var race = "∽̱";
    var Racute = "Ŕ";
    var racute = "ŕ";
    var radic = "√";
    var raemptyv = "⦳";
    var rang = "⟩";
    var Rang = "⟫";
    var rangd = "⦒";
    var range = "⦥";
    var rangle = "⟩";
    var raquo = "»";
    var rarrap = "⥵";
    var rarrb = "⇥";
    var rarrbfs = "⤠";
    var rarrc = "⤳";
    var rarr = "→";
    var Rarr = "↠";
    var rArr = "⇒";
    var rarrfs = "⤞";
    var rarrhk = "↪";
    var rarrlp = "↬";
    var rarrpl = "⥅";
    var rarrsim = "⥴";
    var Rarrtl = "⤖";
    var rarrtl = "↣";
    var rarrw = "↝";
    var ratail = "⤚";
    var rAtail = "⤜";
    var ratio = "∶";
    var rationals = "ℚ";
    var rbarr = "⤍";
    var rBarr = "⤏";
    var RBarr = "⤐";
    var rbbrk = "❳";
    var rbrace = "}";
    var rbrack = "]";
    var rbrke = "⦌";
    var rbrksld = "⦎";
    var rbrkslu = "⦐";
    var Rcaron = "Ř";
    var rcaron = "ř";
    var Rcedil = "Ŗ";
    var rcedil = "ŗ";
    var rceil = "⌉";
    var rcub = "}";
    var Rcy = "Р";
    var rcy = "р";
    var rdca = "⤷";
    var rdldhar = "⥩";
    var rdquo = "”";
    var rdquor = "”";
    var rdsh = "↳";
    var real = "ℜ";
    var realine = "ℛ";
    var realpart = "ℜ";
    var reals = "ℝ";
    var Re = "ℜ";
    var rect = "▭";
    var reg = "®";
    var REG = "®";
    var ReverseElement = "∋";
    var ReverseEquilibrium = "⇋";
    var ReverseUpEquilibrium = "⥯";
    var rfisht = "⥽";
    var rfloor = "⌋";
    var rfr = "𝔯";
    var Rfr = "ℜ";
    var rHar = "⥤";
    var rhard = "⇁";
    var rharu = "⇀";
    var rharul = "⥬";
    var Rho = "Ρ";
    var rho = "ρ";
    var rhov = "ϱ";
    var RightAngleBracket = "⟩";
    var RightArrowBar = "⇥";
    var rightarrow = "→";
    var RightArrow = "→";
    var Rightarrow = "⇒";
    var RightArrowLeftArrow = "⇄";
    var rightarrowtail = "↣";
    var RightCeiling = "⌉";
    var RightDoubleBracket = "⟧";
    var RightDownTeeVector = "⥝";
    var RightDownVectorBar = "⥕";
    var RightDownVector = "⇂";
    var RightFloor = "⌋";
    var rightharpoondown = "⇁";
    var rightharpoonup = "⇀";
    var rightleftarrows = "⇄";
    var rightleftharpoons = "⇌";
    var rightrightarrows = "⇉";
    var rightsquigarrow = "↝";
    var RightTeeArrow = "↦";
    var RightTee = "⊢";
    var RightTeeVector = "⥛";
    var rightthreetimes = "⋌";
    var RightTriangleBar = "⧐";
    var RightTriangle = "⊳";
    var RightTriangleEqual = "⊵";
    var RightUpDownVector = "⥏";
    var RightUpTeeVector = "⥜";
    var RightUpVectorBar = "⥔";
    var RightUpVector = "↾";
    var RightVectorBar = "⥓";
    var RightVector = "⇀";
    var ring = "˚";
    var risingdotseq = "≓";
    var rlarr = "⇄";
    var rlhar = "⇌";
    var rlm = "‏";
    var rmoustache = "⎱";
    var rmoust = "⎱";
    var rnmid = "⫮";
    var roang = "⟭";
    var roarr = "⇾";
    var robrk = "⟧";
    var ropar = "⦆";
    var ropf = "𝕣";
    var Ropf = "ℝ";
    var roplus = "⨮";
    var rotimes = "⨵";
    var RoundImplies = "⥰";
    var rpar = ")";
    var rpargt = "⦔";
    var rppolint = "⨒";
    var rrarr = "⇉";
    var Rrightarrow = "⇛";
    var rsaquo = "›";
    var rscr = "𝓇";
    var Rscr = "ℛ";
    var rsh = "↱";
    var Rsh = "↱";
    var rsqb = "]";
    var rsquo = "’";
    var rsquor = "’";
    var rthree = "⋌";
    var rtimes = "⋊";
    var rtri = "▹";
    var rtrie = "⊵";
    var rtrif = "▸";
    var rtriltri = "⧎";
    var RuleDelayed = "⧴";
    var ruluhar = "⥨";
    var rx = "℞";
    var Sacute = "Ś";
    var sacute = "ś";
    var sbquo = "‚";
    var scap = "⪸";
    var Scaron = "Š";
    var scaron = "š";
    var Sc = "⪼";
    var sc = "≻";
    var sccue = "≽";
    var sce = "⪰";
    var scE = "⪴";
    var Scedil = "Ş";
    var scedil = "ş";
    var Scirc = "Ŝ";
    var scirc = "ŝ";
    var scnap = "⪺";
    var scnE = "⪶";
    var scnsim = "⋩";
    var scpolint = "⨓";
    var scsim = "≿";
    var Scy = "С";
    var scy = "с";
    var sdotb = "⊡";
    var sdot = "⋅";
    var sdote = "⩦";
    var searhk = "⤥";
    var searr = "↘";
    var seArr = "⇘";
    var searrow = "↘";
    var sect = "§";
    var semi = ";";
    var seswar = "⤩";
    var setminus = "∖";
    var setmn = "∖";
    var sext = "✶";
    var Sfr = "𝔖";
    var sfr = "𝔰";
    var sfrown = "⌢";
    var sharp = "♯";
    var SHCHcy = "Щ";
    var shchcy = "щ";
    var SHcy = "Ш";
    var shcy = "ш";
    var ShortDownArrow = "↓";
    var ShortLeftArrow = "←";
    var shortmid = "∣";
    var shortparallel = "∥";
    var ShortRightArrow = "→";
    var ShortUpArrow = "↑";
    var shy = "­";
    var Sigma = "Σ";
    var sigma = "σ";
    var sigmaf = "ς";
    var sigmav = "ς";
    var sim = "∼";
    var simdot = "⩪";
    var sime = "≃";
    var simeq = "≃";
    var simg = "⪞";
    var simgE = "⪠";
    var siml = "⪝";
    var simlE = "⪟";
    var simne = "≆";
    var simplus = "⨤";
    var simrarr = "⥲";
    var slarr = "←";
    var SmallCircle = "∘";
    var smallsetminus = "∖";
    var smashp = "⨳";
    var smeparsl = "⧤";
    var smid = "∣";
    var smile = "⌣";
    var smt = "⪪";
    var smte = "⪬";
    var smtes = "⪬︀";
    var SOFTcy = "Ь";
    var softcy = "ь";
    var solbar = "⌿";
    var solb = "⧄";
    var sol = "/";
    var Sopf = "𝕊";
    var sopf = "𝕤";
    var spades = "♠";
    var spadesuit = "♠";
    var spar = "∥";
    var sqcap = "⊓";
    var sqcaps = "⊓︀";
    var sqcup = "⊔";
    var sqcups = "⊔︀";
    var Sqrt = "√";
    var sqsub = "⊏";
    var sqsube = "⊑";
    var sqsubset = "⊏";
    var sqsubseteq = "⊑";
    var sqsup = "⊐";
    var sqsupe = "⊒";
    var sqsupset = "⊐";
    var sqsupseteq = "⊒";
    var square = "□";
    var Square = "□";
    var SquareIntersection = "⊓";
    var SquareSubset = "⊏";
    var SquareSubsetEqual = "⊑";
    var SquareSuperset = "⊐";
    var SquareSupersetEqual = "⊒";
    var SquareUnion = "⊔";
    var squarf = "▪";
    var squ = "□";
    var squf = "▪";
    var srarr = "→";
    var Sscr = "𝒮";
    var sscr = "𝓈";
    var ssetmn = "∖";
    var ssmile = "⌣";
    var sstarf = "⋆";
    var Star = "⋆";
    var star = "☆";
    var starf = "★";
    var straightepsilon = "ϵ";
    var straightphi = "ϕ";
    var strns = "¯";
    var sub = "⊂";
    var Sub = "⋐";
    var subdot = "⪽";
    var subE = "⫅";
    var sube = "⊆";
    var subedot = "⫃";
    var submult = "⫁";
    var subnE = "⫋";
    var subne = "⊊";
    var subplus = "⪿";
    var subrarr = "⥹";
    var subset = "⊂";
    var Subset = "⋐";
    var subseteq = "⊆";
    var subseteqq = "⫅";
    var SubsetEqual = "⊆";
    var subsetneq = "⊊";
    var subsetneqq = "⫋";
    var subsim = "⫇";
    var subsub = "⫕";
    var subsup = "⫓";
    var succapprox = "⪸";
    var succ = "≻";
    var succcurlyeq = "≽";
    var Succeeds = "≻";
    var SucceedsEqual = "⪰";
    var SucceedsSlantEqual = "≽";
    var SucceedsTilde = "≿";
    var succeq = "⪰";
    var succnapprox = "⪺";
    var succneqq = "⪶";
    var succnsim = "⋩";
    var succsim = "≿";
    var SuchThat = "∋";
    var sum = "∑";
    var Sum = "∑";
    var sung = "♪";
    var sup1 = "¹";
    var sup2 = "²";
    var sup3 = "³";
    var sup = "⊃";
    var Sup = "⋑";
    var supdot = "⪾";
    var supdsub = "⫘";
    var supE = "⫆";
    var supe = "⊇";
    var supedot = "⫄";
    var Superset = "⊃";
    var SupersetEqual = "⊇";
    var suphsol = "⟉";
    var suphsub = "⫗";
    var suplarr = "⥻";
    var supmult = "⫂";
    var supnE = "⫌";
    var supne = "⊋";
    var supplus = "⫀";
    var supset = "⊃";
    var Supset = "⋑";
    var supseteq = "⊇";
    var supseteqq = "⫆";
    var supsetneq = "⊋";
    var supsetneqq = "⫌";
    var supsim = "⫈";
    var supsub = "⫔";
    var supsup = "⫖";
    var swarhk = "⤦";
    var swarr = "↙";
    var swArr = "⇙";
    var swarrow = "↙";
    var swnwar = "⤪";
    var szlig = "ß";
    var Tab = "\t";
    var target = "⌖";
    var Tau = "Τ";
    var tau = "τ";
    var tbrk = "⎴";
    var Tcaron = "Ť";
    var tcaron = "ť";
    var Tcedil = "Ţ";
    var tcedil = "ţ";
    var Tcy = "Т";
    var tcy = "т";
    var tdot = "⃛";
    var telrec = "⌕";
    var Tfr = "𝔗";
    var tfr = "𝔱";
    var there4 = "∴";
    var therefore = "∴";
    var Therefore = "∴";
    var Theta = "Θ";
    var theta = "θ";
    var thetasym = "ϑ";
    var thetav = "ϑ";
    var thickapprox = "≈";
    var thicksim = "∼";
    var ThickSpace = "  ";
    var ThinSpace = " ";
    var thinsp = " ";
    var thkap = "≈";
    var thksim = "∼";
    var THORN = "Þ";
    var thorn = "þ";
    var tilde = "˜";
    var Tilde = "∼";
    var TildeEqual = "≃";
    var TildeFullEqual = "≅";
    var TildeTilde = "≈";
    var timesbar = "⨱";
    var timesb = "⊠";
    var times = "×";
    var timesd = "⨰";
    var tint = "∭";
    var toea = "⤨";
    var topbot = "⌶";
    var topcir = "⫱";
    var top = "⊤";
    var Topf = "𝕋";
    var topf = "𝕥";
    var topfork = "⫚";
    var tosa = "⤩";
    var tprime = "‴";
    var trade = "™";
    var TRADE = "™";
    var triangle = "▵";
    var triangledown = "▿";
    var triangleleft = "◃";
    var trianglelefteq = "⊴";
    var triangleq = "≜";
    var triangleright = "▹";
    var trianglerighteq = "⊵";
    var tridot = "◬";
    var trie = "≜";
    var triminus = "⨺";
    var TripleDot = "⃛";
    var triplus = "⨹";
    var trisb = "⧍";
    var tritime = "⨻";
    var trpezium = "⏢";
    var Tscr = "𝒯";
    var tscr = "𝓉";
    var TScy = "Ц";
    var tscy = "ц";
    var TSHcy = "Ћ";
    var tshcy = "ћ";
    var Tstrok = "Ŧ";
    var tstrok = "ŧ";
    var twixt = "≬";
    var twoheadleftarrow = "↞";
    var twoheadrightarrow = "↠";
    var Uacute = "Ú";
    var uacute = "ú";
    var uarr = "↑";
    var Uarr = "↟";
    var uArr = "⇑";
    var Uarrocir = "⥉";
    var Ubrcy = "Ў";
    var ubrcy = "ў";
    var Ubreve = "Ŭ";
    var ubreve = "ŭ";
    var Ucirc = "Û";
    var ucirc = "û";
    var Ucy = "У";
    var ucy = "у";
    var udarr = "⇅";
    var Udblac = "Ű";
    var udblac = "ű";
    var udhar = "⥮";
    var ufisht = "⥾";
    var Ufr = "𝔘";
    var ufr = "𝔲";
    var Ugrave = "Ù";
    var ugrave = "ù";
    var uHar = "⥣";
    var uharl = "↿";
    var uharr = "↾";
    var uhblk = "▀";
    var ulcorn = "⌜";
    var ulcorner = "⌜";
    var ulcrop = "⌏";
    var ultri = "◸";
    var Umacr = "Ū";
    var umacr = "ū";
    var uml = "¨";
    var UnderBar = "_";
    var UnderBrace = "⏟";
    var UnderBracket = "⎵";
    var UnderParenthesis = "⏝";
    var Union = "⋃";
    var UnionPlus = "⊎";
    var Uogon = "Ų";
    var uogon = "ų";
    var Uopf = "𝕌";
    var uopf = "𝕦";
    var UpArrowBar = "⤒";
    var uparrow = "↑";
    var UpArrow = "↑";
    var Uparrow = "⇑";
    var UpArrowDownArrow = "⇅";
    var updownarrow = "↕";
    var UpDownArrow = "↕";
    var Updownarrow = "⇕";
    var UpEquilibrium = "⥮";
    var upharpoonleft = "↿";
    var upharpoonright = "↾";
    var uplus = "⊎";
    var UpperLeftArrow = "↖";
    var UpperRightArrow = "↗";
    var upsi = "υ";
    var Upsi = "ϒ";
    var upsih = "ϒ";
    var Upsilon = "Υ";
    var upsilon = "υ";
    var UpTeeArrow = "↥";
    var UpTee = "⊥";
    var upuparrows = "⇈";
    var urcorn = "⌝";
    var urcorner = "⌝";
    var urcrop = "⌎";
    var Uring = "Ů";
    var uring = "ů";
    var urtri = "◹";
    var Uscr = "𝒰";
    var uscr = "𝓊";
    var utdot = "⋰";
    var Utilde = "Ũ";
    var utilde = "ũ";
    var utri = "▵";
    var utrif = "▴";
    var uuarr = "⇈";
    var Uuml = "Ü";
    var uuml = "ü";
    var uwangle = "⦧";
    var vangrt = "⦜";
    var varepsilon = "ϵ";
    var varkappa = "ϰ";
    var varnothing = "∅";
    var varphi = "ϕ";
    var varpi = "ϖ";
    var varpropto = "∝";
    var varr = "↕";
    var vArr = "⇕";
    var varrho = "ϱ";
    var varsigma = "ς";
    var varsubsetneq = "⊊︀";
    var varsubsetneqq = "⫋︀";
    var varsupsetneq = "⊋︀";
    var varsupsetneqq = "⫌︀";
    var vartheta = "ϑ";
    var vartriangleleft = "⊲";
    var vartriangleright = "⊳";
    var vBar = "⫨";
    var Vbar = "⫫";
    var vBarv = "⫩";
    var Vcy = "В";
    var vcy = "в";
    var vdash = "⊢";
    var vDash = "⊨";
    var Vdash = "⊩";
    var VDash = "⊫";
    var Vdashl = "⫦";
    var veebar = "⊻";
    var vee = "∨";
    var Vee = "⋁";
    var veeeq = "≚";
    var vellip = "⋮";
    var verbar = "|";
    var Verbar = "‖";
    var vert = "|";
    var Vert = "‖";
    var VerticalBar = "∣";
    var VerticalLine = "|";
    var VerticalSeparator = "❘";
    var VerticalTilde = "≀";
    var VeryThinSpace = " ";
    var Vfr = "𝔙";
    var vfr = "𝔳";
    var vltri = "⊲";
    var vnsub = "⊂⃒";
    var vnsup = "⊃⃒";
    var Vopf = "𝕍";
    var vopf = "𝕧";
    var vprop = "∝";
    var vrtri = "⊳";
    var Vscr = "𝒱";
    var vscr = "𝓋";
    var vsubnE = "⫋︀";
    var vsubne = "⊊︀";
    var vsupnE = "⫌︀";
    var vsupne = "⊋︀";
    var Vvdash = "⊪";
    var vzigzag = "⦚";
    var Wcirc = "Ŵ";
    var wcirc = "ŵ";
    var wedbar = "⩟";
    var wedge = "∧";
    var Wedge = "⋀";
    var wedgeq = "≙";
    var weierp = "℘";
    var Wfr = "𝔚";
    var wfr = "𝔴";
    var Wopf = "𝕎";
    var wopf = "𝕨";
    var wp = "℘";
    var wr = "≀";
    var wreath = "≀";
    var Wscr = "𝒲";
    var wscr = "𝓌";
    var xcap = "⋂";
    var xcirc = "◯";
    var xcup = "⋃";
    var xdtri = "▽";
    var Xfr = "𝔛";
    var xfr = "𝔵";
    var xharr = "⟷";
    var xhArr = "⟺";
    var Xi = "Ξ";
    var xi = "ξ";
    var xlarr = "⟵";
    var xlArr = "⟸";
    var xmap = "⟼";
    var xnis = "⋻";
    var xodot = "⨀";
    var Xopf = "𝕏";
    var xopf = "𝕩";
    var xoplus = "⨁";
    var xotime = "⨂";
    var xrarr = "⟶";
    var xrArr = "⟹";
    var Xscr = "𝒳";
    var xscr = "𝓍";
    var xsqcup = "⨆";
    var xuplus = "⨄";
    var xutri = "△";
    var xvee = "⋁";
    var xwedge = "⋀";
    var Yacute = "Ý";
    var yacute = "ý";
    var YAcy = "Я";
    var yacy = "я";
    var Ycirc = "Ŷ";
    var ycirc = "ŷ";
    var Ycy = "Ы";
    var ycy = "ы";
    var yen = "¥";
    var Yfr = "𝔜";
    var yfr = "𝔶";
    var YIcy = "Ї";
    var yicy = "ї";
    var Yopf = "𝕐";
    var yopf = "𝕪";
    var Yscr = "𝒴";
    var yscr = "𝓎";
    var YUcy = "Ю";
    var yucy = "ю";
    var yuml = "ÿ";
    var Yuml = "Ÿ";
    var Zacute = "Ź";
    var zacute = "ź";
    var Zcaron = "Ž";
    var zcaron = "ž";
    var Zcy = "З";
    var zcy = "з";
    var Zdot = "Ż";
    var zdot = "ż";
    var zeetrf = "ℨ";
    var ZeroWidthSpace = "​";
    var Zeta = "Ζ";
    var zeta = "ζ";
    var zfr = "𝔷";
    var Zfr = "ℨ";
    var ZHcy = "Ж";
    var zhcy = "ж";
    var zigrarr = "⇝";
    var zopf = "𝕫";
    var Zopf = "ℤ";
    var Zscr = "𝒵";
    var zscr = "𝓏";
    var zwj = "‍";
    var zwnj = "‌";
    var require$$0 = {
    	Aacute: Aacute,
    	aacute: aacute,
    	Abreve: Abreve,
    	abreve: abreve,
    	ac: ac,
    	acd: acd,
    	acE: acE,
    	Acirc: Acirc,
    	acirc: acirc,
    	acute: acute,
    	Acy: Acy,
    	acy: acy,
    	AElig: AElig,
    	aelig: aelig,
    	af: af,
    	Afr: Afr,
    	afr: afr,
    	Agrave: Agrave,
    	agrave: agrave,
    	alefsym: alefsym,
    	aleph: aleph,
    	Alpha: Alpha,
    	alpha: alpha,
    	Amacr: Amacr,
    	amacr: amacr,
    	amalg: amalg,
    	amp: amp,
    	AMP: AMP,
    	andand: andand,
    	And: And,
    	and: and,
    	andd: andd,
    	andslope: andslope,
    	andv: andv,
    	ang: ang,
    	ange: ange,
    	angle: angle,
    	angmsdaa: angmsdaa,
    	angmsdab: angmsdab,
    	angmsdac: angmsdac,
    	angmsdad: angmsdad,
    	angmsdae: angmsdae,
    	angmsdaf: angmsdaf,
    	angmsdag: angmsdag,
    	angmsdah: angmsdah,
    	angmsd: angmsd,
    	angrt: angrt,
    	angrtvb: angrtvb,
    	angrtvbd: angrtvbd,
    	angsph: angsph,
    	angst: angst,
    	angzarr: angzarr,
    	Aogon: Aogon,
    	aogon: aogon,
    	Aopf: Aopf,
    	aopf: aopf,
    	apacir: apacir,
    	ap: ap,
    	apE: apE,
    	ape: ape,
    	apid: apid,
    	apos: apos,
    	ApplyFunction: ApplyFunction,
    	approx: approx,
    	approxeq: approxeq,
    	Aring: Aring,
    	aring: aring,
    	Ascr: Ascr,
    	ascr: ascr,
    	Assign: Assign,
    	ast: ast,
    	asymp: asymp,
    	asympeq: asympeq,
    	Atilde: Atilde,
    	atilde: atilde,
    	Auml: Auml,
    	auml: auml,
    	awconint: awconint,
    	awint: awint,
    	backcong: backcong,
    	backepsilon: backepsilon,
    	backprime: backprime,
    	backsim: backsim,
    	backsimeq: backsimeq,
    	Backslash: Backslash,
    	Barv: Barv,
    	barvee: barvee,
    	barwed: barwed,
    	Barwed: Barwed,
    	barwedge: barwedge,
    	bbrk: bbrk,
    	bbrktbrk: bbrktbrk,
    	bcong: bcong,
    	Bcy: Bcy,
    	bcy: bcy,
    	bdquo: bdquo,
    	becaus: becaus,
    	because: because,
    	Because: Because,
    	bemptyv: bemptyv,
    	bepsi: bepsi,
    	bernou: bernou,
    	Bernoullis: Bernoullis,
    	Beta: Beta,
    	beta: beta,
    	beth: beth,
    	between: between,
    	Bfr: Bfr,
    	bfr: bfr,
    	bigcap: bigcap,
    	bigcirc: bigcirc,
    	bigcup: bigcup,
    	bigodot: bigodot,
    	bigoplus: bigoplus,
    	bigotimes: bigotimes,
    	bigsqcup: bigsqcup,
    	bigstar: bigstar,
    	bigtriangledown: bigtriangledown,
    	bigtriangleup: bigtriangleup,
    	biguplus: biguplus,
    	bigvee: bigvee,
    	bigwedge: bigwedge,
    	bkarow: bkarow,
    	blacklozenge: blacklozenge,
    	blacksquare: blacksquare,
    	blacktriangle: blacktriangle,
    	blacktriangledown: blacktriangledown,
    	blacktriangleleft: blacktriangleleft,
    	blacktriangleright: blacktriangleright,
    	blank: blank,
    	blk12: blk12,
    	blk14: blk14,
    	blk34: blk34,
    	block: block$1,
    	bne: bne,
    	bnequiv: bnequiv,
    	bNot: bNot,
    	bnot: bnot,
    	Bopf: Bopf,
    	bopf: bopf,
    	bot: bot,
    	bottom: bottom,
    	bowtie: bowtie,
    	boxbox: boxbox,
    	boxdl: boxdl,
    	boxdL: boxdL,
    	boxDl: boxDl,
    	boxDL: boxDL,
    	boxdr: boxdr,
    	boxdR: boxdR,
    	boxDr: boxDr,
    	boxDR: boxDR,
    	boxh: boxh,
    	boxH: boxH,
    	boxhd: boxhd,
    	boxHd: boxHd,
    	boxhD: boxhD,
    	boxHD: boxHD,
    	boxhu: boxhu,
    	boxHu: boxHu,
    	boxhU: boxhU,
    	boxHU: boxHU,
    	boxminus: boxminus,
    	boxplus: boxplus,
    	boxtimes: boxtimes,
    	boxul: boxul,
    	boxuL: boxuL,
    	boxUl: boxUl,
    	boxUL: boxUL,
    	boxur: boxur,
    	boxuR: boxuR,
    	boxUr: boxUr,
    	boxUR: boxUR,
    	boxv: boxv,
    	boxV: boxV,
    	boxvh: boxvh,
    	boxvH: boxvH,
    	boxVh: boxVh,
    	boxVH: boxVH,
    	boxvl: boxvl,
    	boxvL: boxvL,
    	boxVl: boxVl,
    	boxVL: boxVL,
    	boxvr: boxvr,
    	boxvR: boxvR,
    	boxVr: boxVr,
    	boxVR: boxVR,
    	bprime: bprime,
    	breve: breve,
    	Breve: Breve,
    	brvbar: brvbar,
    	bscr: bscr,
    	Bscr: Bscr,
    	bsemi: bsemi,
    	bsim: bsim,
    	bsime: bsime,
    	bsolb: bsolb,
    	bsol: bsol,
    	bsolhsub: bsolhsub,
    	bull: bull,
    	bullet: bullet,
    	bump: bump,
    	bumpE: bumpE,
    	bumpe: bumpe,
    	Bumpeq: Bumpeq,
    	bumpeq: bumpeq,
    	Cacute: Cacute,
    	cacute: cacute,
    	capand: capand,
    	capbrcup: capbrcup,
    	capcap: capcap,
    	cap: cap,
    	Cap: Cap,
    	capcup: capcup,
    	capdot: capdot,
    	CapitalDifferentialD: CapitalDifferentialD,
    	caps: caps,
    	caret: caret,
    	caron: caron,
    	Cayleys: Cayleys,
    	ccaps: ccaps,
    	Ccaron: Ccaron,
    	ccaron: ccaron,
    	Ccedil: Ccedil,
    	ccedil: ccedil,
    	Ccirc: Ccirc,
    	ccirc: ccirc,
    	Cconint: Cconint,
    	ccups: ccups,
    	ccupssm: ccupssm,
    	Cdot: Cdot,
    	cdot: cdot,
    	cedil: cedil,
    	Cedilla: Cedilla,
    	cemptyv: cemptyv,
    	cent: cent,
    	centerdot: centerdot,
    	CenterDot: CenterDot,
    	cfr: cfr,
    	Cfr: Cfr,
    	CHcy: CHcy,
    	chcy: chcy,
    	check: check,
    	checkmark: checkmark,
    	Chi: Chi,
    	chi: chi,
    	circ: circ,
    	circeq: circeq,
    	circlearrowleft: circlearrowleft,
    	circlearrowright: circlearrowright,
    	circledast: circledast,
    	circledcirc: circledcirc,
    	circleddash: circleddash,
    	CircleDot: CircleDot,
    	circledR: circledR,
    	circledS: circledS,
    	CircleMinus: CircleMinus,
    	CirclePlus: CirclePlus,
    	CircleTimes: CircleTimes,
    	cir: cir,
    	cirE: cirE,
    	cire: cire,
    	cirfnint: cirfnint,
    	cirmid: cirmid,
    	cirscir: cirscir,
    	ClockwiseContourIntegral: ClockwiseContourIntegral,
    	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
    	CloseCurlyQuote: CloseCurlyQuote,
    	clubs: clubs,
    	clubsuit: clubsuit,
    	colon: colon,
    	Colon: Colon,
    	Colone: Colone,
    	colone: colone,
    	coloneq: coloneq,
    	comma: comma,
    	commat: commat,
    	comp: comp,
    	compfn: compfn,
    	complement: complement,
    	complexes: complexes,
    	cong: cong,
    	congdot: congdot,
    	Congruent: Congruent,
    	conint: conint,
    	Conint: Conint,
    	ContourIntegral: ContourIntegral,
    	copf: copf,
    	Copf: Copf,
    	coprod: coprod,
    	Coproduct: Coproduct,
    	copy: copy,
    	COPY: COPY,
    	copysr: copysr,
    	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
    	crarr: crarr,
    	cross: cross,
    	Cross: Cross,
    	Cscr: Cscr,
    	cscr: cscr,
    	csub: csub,
    	csube: csube,
    	csup: csup,
    	csupe: csupe,
    	ctdot: ctdot,
    	cudarrl: cudarrl,
    	cudarrr: cudarrr,
    	cuepr: cuepr,
    	cuesc: cuesc,
    	cularr: cularr,
    	cularrp: cularrp,
    	cupbrcap: cupbrcap,
    	cupcap: cupcap,
    	CupCap: CupCap,
    	cup: cup,
    	Cup: Cup,
    	cupcup: cupcup,
    	cupdot: cupdot,
    	cupor: cupor,
    	cups: cups,
    	curarr: curarr,
    	curarrm: curarrm,
    	curlyeqprec: curlyeqprec,
    	curlyeqsucc: curlyeqsucc,
    	curlyvee: curlyvee,
    	curlywedge: curlywedge,
    	curren: curren,
    	curvearrowleft: curvearrowleft,
    	curvearrowright: curvearrowright,
    	cuvee: cuvee,
    	cuwed: cuwed,
    	cwconint: cwconint,
    	cwint: cwint,
    	cylcty: cylcty,
    	dagger: dagger,
    	Dagger: Dagger,
    	daleth: daleth,
    	darr: darr,
    	Darr: Darr,
    	dArr: dArr,
    	dash: dash,
    	Dashv: Dashv,
    	dashv: dashv,
    	dbkarow: dbkarow,
    	dblac: dblac,
    	Dcaron: Dcaron,
    	dcaron: dcaron,
    	Dcy: Dcy,
    	dcy: dcy,
    	ddagger: ddagger,
    	ddarr: ddarr,
    	DD: DD,
    	dd: dd,
    	DDotrahd: DDotrahd,
    	ddotseq: ddotseq,
    	deg: deg,
    	Del: Del,
    	Delta: Delta,
    	delta: delta,
    	demptyv: demptyv,
    	dfisht: dfisht,
    	Dfr: Dfr,
    	dfr: dfr,
    	dHar: dHar,
    	dharl: dharl,
    	dharr: dharr,
    	DiacriticalAcute: DiacriticalAcute,
    	DiacriticalDot: DiacriticalDot,
    	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
    	DiacriticalGrave: DiacriticalGrave,
    	DiacriticalTilde: DiacriticalTilde,
    	diam: diam,
    	diamond: diamond,
    	Diamond: Diamond,
    	diamondsuit: diamondsuit,
    	diams: diams,
    	die: die,
    	DifferentialD: DifferentialD,
    	digamma: digamma,
    	disin: disin,
    	div: div,
    	divide: divide,
    	divideontimes: divideontimes,
    	divonx: divonx,
    	DJcy: DJcy,
    	djcy: djcy,
    	dlcorn: dlcorn,
    	dlcrop: dlcrop,
    	dollar: dollar,
    	Dopf: Dopf,
    	dopf: dopf,
    	Dot: Dot,
    	dot: dot,
    	DotDot: DotDot,
    	doteq: doteq,
    	doteqdot: doteqdot,
    	DotEqual: DotEqual,
    	dotminus: dotminus,
    	dotplus: dotplus,
    	dotsquare: dotsquare,
    	doublebarwedge: doublebarwedge,
    	DoubleContourIntegral: DoubleContourIntegral,
    	DoubleDot: DoubleDot,
    	DoubleDownArrow: DoubleDownArrow,
    	DoubleLeftArrow: DoubleLeftArrow,
    	DoubleLeftRightArrow: DoubleLeftRightArrow,
    	DoubleLeftTee: DoubleLeftTee,
    	DoubleLongLeftArrow: DoubleLongLeftArrow,
    	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
    	DoubleLongRightArrow: DoubleLongRightArrow,
    	DoubleRightArrow: DoubleRightArrow,
    	DoubleRightTee: DoubleRightTee,
    	DoubleUpArrow: DoubleUpArrow,
    	DoubleUpDownArrow: DoubleUpDownArrow,
    	DoubleVerticalBar: DoubleVerticalBar,
    	DownArrowBar: DownArrowBar,
    	downarrow: downarrow,
    	DownArrow: DownArrow,
    	Downarrow: Downarrow,
    	DownArrowUpArrow: DownArrowUpArrow,
    	DownBreve: DownBreve,
    	downdownarrows: downdownarrows,
    	downharpoonleft: downharpoonleft,
    	downharpoonright: downharpoonright,
    	DownLeftRightVector: DownLeftRightVector,
    	DownLeftTeeVector: DownLeftTeeVector,
    	DownLeftVectorBar: DownLeftVectorBar,
    	DownLeftVector: DownLeftVector,
    	DownRightTeeVector: DownRightTeeVector,
    	DownRightVectorBar: DownRightVectorBar,
    	DownRightVector: DownRightVector,
    	DownTeeArrow: DownTeeArrow,
    	DownTee: DownTee,
    	drbkarow: drbkarow,
    	drcorn: drcorn,
    	drcrop: drcrop,
    	Dscr: Dscr,
    	dscr: dscr,
    	DScy: DScy,
    	dscy: dscy,
    	dsol: dsol,
    	Dstrok: Dstrok,
    	dstrok: dstrok,
    	dtdot: dtdot,
    	dtri: dtri,
    	dtrif: dtrif,
    	duarr: duarr,
    	duhar: duhar,
    	dwangle: dwangle,
    	DZcy: DZcy,
    	dzcy: dzcy,
    	dzigrarr: dzigrarr,
    	Eacute: Eacute,
    	eacute: eacute,
    	easter: easter,
    	Ecaron: Ecaron,
    	ecaron: ecaron,
    	Ecirc: Ecirc,
    	ecirc: ecirc,
    	ecir: ecir,
    	ecolon: ecolon,
    	Ecy: Ecy,
    	ecy: ecy,
    	eDDot: eDDot,
    	Edot: Edot,
    	edot: edot,
    	eDot: eDot,
    	ee: ee,
    	efDot: efDot,
    	Efr: Efr,
    	efr: efr,
    	eg: eg,
    	Egrave: Egrave,
    	egrave: egrave,
    	egs: egs,
    	egsdot: egsdot,
    	el: el,
    	Element: Element,
    	elinters: elinters,
    	ell: ell,
    	els: els,
    	elsdot: elsdot,
    	Emacr: Emacr,
    	emacr: emacr,
    	empty: empty,
    	emptyset: emptyset,
    	EmptySmallSquare: EmptySmallSquare,
    	emptyv: emptyv,
    	EmptyVerySmallSquare: EmptyVerySmallSquare,
    	emsp13: emsp13,
    	emsp14: emsp14,
    	emsp: emsp,
    	ENG: ENG,
    	eng: eng,
    	ensp: ensp,
    	Eogon: Eogon,
    	eogon: eogon,
    	Eopf: Eopf,
    	eopf: eopf,
    	epar: epar,
    	eparsl: eparsl,
    	eplus: eplus,
    	epsi: epsi,
    	Epsilon: Epsilon,
    	epsilon: epsilon,
    	epsiv: epsiv,
    	eqcirc: eqcirc,
    	eqcolon: eqcolon,
    	eqsim: eqsim,
    	eqslantgtr: eqslantgtr,
    	eqslantless: eqslantless,
    	Equal: Equal,
    	equals: equals,
    	EqualTilde: EqualTilde,
    	equest: equest,
    	Equilibrium: Equilibrium,
    	equiv: equiv,
    	equivDD: equivDD,
    	eqvparsl: eqvparsl,
    	erarr: erarr,
    	erDot: erDot,
    	escr: escr,
    	Escr: Escr,
    	esdot: esdot,
    	Esim: Esim,
    	esim: esim,
    	Eta: Eta,
    	eta: eta,
    	ETH: ETH,
    	eth: eth,
    	Euml: Euml,
    	euml: euml,
    	euro: euro,
    	excl: excl,
    	exist: exist,
    	Exists: Exists,
    	expectation: expectation,
    	exponentiale: exponentiale,
    	ExponentialE: ExponentialE,
    	fallingdotseq: fallingdotseq,
    	Fcy: Fcy,
    	fcy: fcy,
    	female: female,
    	ffilig: ffilig,
    	fflig: fflig,
    	ffllig: ffllig,
    	Ffr: Ffr,
    	ffr: ffr,
    	filig: filig,
    	FilledSmallSquare: FilledSmallSquare,
    	FilledVerySmallSquare: FilledVerySmallSquare,
    	fjlig: fjlig,
    	flat: flat,
    	fllig: fllig,
    	fltns: fltns,
    	fnof: fnof,
    	Fopf: Fopf,
    	fopf: fopf,
    	forall: forall,
    	ForAll: ForAll,
    	fork: fork,
    	forkv: forkv,
    	Fouriertrf: Fouriertrf,
    	fpartint: fpartint,
    	frac12: frac12,
    	frac13: frac13,
    	frac14: frac14,
    	frac15: frac15,
    	frac16: frac16,
    	frac18: frac18,
    	frac23: frac23,
    	frac25: frac25,
    	frac34: frac34,
    	frac35: frac35,
    	frac38: frac38,
    	frac45: frac45,
    	frac56: frac56,
    	frac58: frac58,
    	frac78: frac78,
    	frasl: frasl,
    	frown: frown,
    	fscr: fscr,
    	Fscr: Fscr,
    	gacute: gacute,
    	Gamma: Gamma,
    	gamma: gamma,
    	Gammad: Gammad,
    	gammad: gammad,
    	gap: gap,
    	Gbreve: Gbreve,
    	gbreve: gbreve,
    	Gcedil: Gcedil,
    	Gcirc: Gcirc,
    	gcirc: gcirc,
    	Gcy: Gcy,
    	gcy: gcy,
    	Gdot: Gdot,
    	gdot: gdot,
    	ge: ge,
    	gE: gE,
    	gEl: gEl,
    	gel: gel,
    	geq: geq,
    	geqq: geqq,
    	geqslant: geqslant,
    	gescc: gescc,
    	ges: ges,
    	gesdot: gesdot,
    	gesdoto: gesdoto,
    	gesdotol: gesdotol,
    	gesl: gesl,
    	gesles: gesles,
    	Gfr: Gfr,
    	gfr: gfr,
    	gg: gg,
    	Gg: Gg,
    	ggg: ggg,
    	gimel: gimel,
    	GJcy: GJcy,
    	gjcy: gjcy,
    	gla: gla,
    	gl: gl,
    	glE: glE,
    	glj: glj,
    	gnap: gnap,
    	gnapprox: gnapprox,
    	gne: gne,
    	gnE: gnE,
    	gneq: gneq,
    	gneqq: gneqq,
    	gnsim: gnsim,
    	Gopf: Gopf,
    	gopf: gopf,
    	grave: grave,
    	GreaterEqual: GreaterEqual,
    	GreaterEqualLess: GreaterEqualLess,
    	GreaterFullEqual: GreaterFullEqual,
    	GreaterGreater: GreaterGreater,
    	GreaterLess: GreaterLess,
    	GreaterSlantEqual: GreaterSlantEqual,
    	GreaterTilde: GreaterTilde,
    	Gscr: Gscr,
    	gscr: gscr,
    	gsim: gsim,
    	gsime: gsime,
    	gsiml: gsiml,
    	gtcc: gtcc,
    	gtcir: gtcir,
    	gt: gt,
    	GT: GT,
    	Gt: Gt,
    	gtdot: gtdot,
    	gtlPar: gtlPar,
    	gtquest: gtquest,
    	gtrapprox: gtrapprox,
    	gtrarr: gtrarr,
    	gtrdot: gtrdot,
    	gtreqless: gtreqless,
    	gtreqqless: gtreqqless,
    	gtrless: gtrless,
    	gtrsim: gtrsim,
    	gvertneqq: gvertneqq,
    	gvnE: gvnE,
    	Hacek: Hacek,
    	hairsp: hairsp,
    	half: half,
    	hamilt: hamilt,
    	HARDcy: HARDcy,
    	hardcy: hardcy,
    	harrcir: harrcir,
    	harr: harr,
    	hArr: hArr,
    	harrw: harrw,
    	Hat: Hat,
    	hbar: hbar,
    	Hcirc: Hcirc,
    	hcirc: hcirc,
    	hearts: hearts,
    	heartsuit: heartsuit,
    	hellip: hellip,
    	hercon: hercon,
    	hfr: hfr,
    	Hfr: Hfr,
    	HilbertSpace: HilbertSpace,
    	hksearow: hksearow,
    	hkswarow: hkswarow,
    	hoarr: hoarr,
    	homtht: homtht,
    	hookleftarrow: hookleftarrow,
    	hookrightarrow: hookrightarrow,
    	hopf: hopf,
    	Hopf: Hopf,
    	horbar: horbar,
    	HorizontalLine: HorizontalLine,
    	hscr: hscr,
    	Hscr: Hscr,
    	hslash: hslash,
    	Hstrok: Hstrok,
    	hstrok: hstrok,
    	HumpDownHump: HumpDownHump,
    	HumpEqual: HumpEqual,
    	hybull: hybull,
    	hyphen: hyphen,
    	Iacute: Iacute,
    	iacute: iacute,
    	ic: ic,
    	Icirc: Icirc,
    	icirc: icirc,
    	Icy: Icy,
    	icy: icy,
    	Idot: Idot,
    	IEcy: IEcy,
    	iecy: iecy,
    	iexcl: iexcl,
    	iff: iff,
    	ifr: ifr,
    	Ifr: Ifr,
    	Igrave: Igrave,
    	igrave: igrave,
    	ii: ii,
    	iiiint: iiiint,
    	iiint: iiint,
    	iinfin: iinfin,
    	iiota: iiota,
    	IJlig: IJlig,
    	ijlig: ijlig,
    	Imacr: Imacr,
    	imacr: imacr,
    	image: image$1,
    	ImaginaryI: ImaginaryI,
    	imagline: imagline,
    	imagpart: imagpart,
    	imath: imath,
    	Im: Im,
    	imof: imof,
    	imped: imped,
    	Implies: Implies,
    	incare: incare,
    	"in": "∈",
    	infin: infin,
    	infintie: infintie,
    	inodot: inodot,
    	intcal: intcal,
    	int: int,
    	Int: Int,
    	integers: integers,
    	Integral: Integral,
    	intercal: intercal,
    	Intersection: Intersection,
    	intlarhk: intlarhk,
    	intprod: intprod,
    	InvisibleComma: InvisibleComma,
    	InvisibleTimes: InvisibleTimes,
    	IOcy: IOcy,
    	iocy: iocy,
    	Iogon: Iogon,
    	iogon: iogon,
    	Iopf: Iopf,
    	iopf: iopf,
    	Iota: Iota,
    	iota: iota,
    	iprod: iprod,
    	iquest: iquest,
    	iscr: iscr,
    	Iscr: Iscr,
    	isin: isin,
    	isindot: isindot,
    	isinE: isinE,
    	isins: isins,
    	isinsv: isinsv,
    	isinv: isinv,
    	it: it,
    	Itilde: Itilde,
    	itilde: itilde,
    	Iukcy: Iukcy,
    	iukcy: iukcy,
    	Iuml: Iuml,
    	iuml: iuml,
    	Jcirc: Jcirc,
    	jcirc: jcirc,
    	Jcy: Jcy,
    	jcy: jcy,
    	Jfr: Jfr,
    	jfr: jfr,
    	jmath: jmath,
    	Jopf: Jopf,
    	jopf: jopf,
    	Jscr: Jscr,
    	jscr: jscr,
    	Jsercy: Jsercy,
    	jsercy: jsercy,
    	Jukcy: Jukcy,
    	jukcy: jukcy,
    	Kappa: Kappa,
    	kappa: kappa,
    	kappav: kappav,
    	Kcedil: Kcedil,
    	kcedil: kcedil,
    	Kcy: Kcy,
    	kcy: kcy,
    	Kfr: Kfr,
    	kfr: kfr,
    	kgreen: kgreen,
    	KHcy: KHcy,
    	khcy: khcy,
    	KJcy: KJcy,
    	kjcy: kjcy,
    	Kopf: Kopf,
    	kopf: kopf,
    	Kscr: Kscr,
    	kscr: kscr,
    	lAarr: lAarr,
    	Lacute: Lacute,
    	lacute: lacute,
    	laemptyv: laemptyv,
    	lagran: lagran,
    	Lambda: Lambda,
    	lambda: lambda,
    	lang: lang,
    	Lang: Lang,
    	langd: langd,
    	langle: langle,
    	lap: lap,
    	Laplacetrf: Laplacetrf,
    	laquo: laquo,
    	larrb: larrb,
    	larrbfs: larrbfs,
    	larr: larr,
    	Larr: Larr,
    	lArr: lArr,
    	larrfs: larrfs,
    	larrhk: larrhk,
    	larrlp: larrlp,
    	larrpl: larrpl,
    	larrsim: larrsim,
    	larrtl: larrtl,
    	latail: latail,
    	lAtail: lAtail,
    	lat: lat,
    	late: late,
    	lates: lates,
    	lbarr: lbarr,
    	lBarr: lBarr,
    	lbbrk: lbbrk,
    	lbrace: lbrace,
    	lbrack: lbrack,
    	lbrke: lbrke,
    	lbrksld: lbrksld,
    	lbrkslu: lbrkslu,
    	Lcaron: Lcaron,
    	lcaron: lcaron,
    	Lcedil: Lcedil,
    	lcedil: lcedil,
    	lceil: lceil,
    	lcub: lcub,
    	Lcy: Lcy,
    	lcy: lcy,
    	ldca: ldca,
    	ldquo: ldquo,
    	ldquor: ldquor,
    	ldrdhar: ldrdhar,
    	ldrushar: ldrushar,
    	ldsh: ldsh,
    	le: le,
    	lE: lE,
    	LeftAngleBracket: LeftAngleBracket,
    	LeftArrowBar: LeftArrowBar,
    	leftarrow: leftarrow,
    	LeftArrow: LeftArrow,
    	Leftarrow: Leftarrow,
    	LeftArrowRightArrow: LeftArrowRightArrow,
    	leftarrowtail: leftarrowtail,
    	LeftCeiling: LeftCeiling,
    	LeftDoubleBracket: LeftDoubleBracket,
    	LeftDownTeeVector: LeftDownTeeVector,
    	LeftDownVectorBar: LeftDownVectorBar,
    	LeftDownVector: LeftDownVector,
    	LeftFloor: LeftFloor,
    	leftharpoondown: leftharpoondown,
    	leftharpoonup: leftharpoonup,
    	leftleftarrows: leftleftarrows,
    	leftrightarrow: leftrightarrow,
    	LeftRightArrow: LeftRightArrow,
    	Leftrightarrow: Leftrightarrow,
    	leftrightarrows: leftrightarrows,
    	leftrightharpoons: leftrightharpoons,
    	leftrightsquigarrow: leftrightsquigarrow,
    	LeftRightVector: LeftRightVector,
    	LeftTeeArrow: LeftTeeArrow,
    	LeftTee: LeftTee,
    	LeftTeeVector: LeftTeeVector,
    	leftthreetimes: leftthreetimes,
    	LeftTriangleBar: LeftTriangleBar,
    	LeftTriangle: LeftTriangle,
    	LeftTriangleEqual: LeftTriangleEqual,
    	LeftUpDownVector: LeftUpDownVector,
    	LeftUpTeeVector: LeftUpTeeVector,
    	LeftUpVectorBar: LeftUpVectorBar,
    	LeftUpVector: LeftUpVector,
    	LeftVectorBar: LeftVectorBar,
    	LeftVector: LeftVector,
    	lEg: lEg,
    	leg: leg,
    	leq: leq,
    	leqq: leqq,
    	leqslant: leqslant,
    	lescc: lescc,
    	les: les,
    	lesdot: lesdot,
    	lesdoto: lesdoto,
    	lesdotor: lesdotor,
    	lesg: lesg,
    	lesges: lesges,
    	lessapprox: lessapprox,
    	lessdot: lessdot,
    	lesseqgtr: lesseqgtr,
    	lesseqqgtr: lesseqqgtr,
    	LessEqualGreater: LessEqualGreater,
    	LessFullEqual: LessFullEqual,
    	LessGreater: LessGreater,
    	lessgtr: lessgtr,
    	LessLess: LessLess,
    	lesssim: lesssim,
    	LessSlantEqual: LessSlantEqual,
    	LessTilde: LessTilde,
    	lfisht: lfisht,
    	lfloor: lfloor,
    	Lfr: Lfr,
    	lfr: lfr,
    	lg: lg,
    	lgE: lgE,
    	lHar: lHar,
    	lhard: lhard,
    	lharu: lharu,
    	lharul: lharul,
    	lhblk: lhblk,
    	LJcy: LJcy,
    	ljcy: ljcy,
    	llarr: llarr,
    	ll: ll,
    	Ll: Ll,
    	llcorner: llcorner,
    	Lleftarrow: Lleftarrow,
    	llhard: llhard,
    	lltri: lltri,
    	Lmidot: Lmidot,
    	lmidot: lmidot,
    	lmoustache: lmoustache,
    	lmoust: lmoust,
    	lnap: lnap,
    	lnapprox: lnapprox,
    	lne: lne,
    	lnE: lnE,
    	lneq: lneq,
    	lneqq: lneqq,
    	lnsim: lnsim,
    	loang: loang,
    	loarr: loarr,
    	lobrk: lobrk,
    	longleftarrow: longleftarrow,
    	LongLeftArrow: LongLeftArrow,
    	Longleftarrow: Longleftarrow,
    	longleftrightarrow: longleftrightarrow,
    	LongLeftRightArrow: LongLeftRightArrow,
    	Longleftrightarrow: Longleftrightarrow,
    	longmapsto: longmapsto,
    	longrightarrow: longrightarrow,
    	LongRightArrow: LongRightArrow,
    	Longrightarrow: Longrightarrow,
    	looparrowleft: looparrowleft,
    	looparrowright: looparrowright,
    	lopar: lopar,
    	Lopf: Lopf,
    	lopf: lopf,
    	loplus: loplus,
    	lotimes: lotimes,
    	lowast: lowast,
    	lowbar: lowbar,
    	LowerLeftArrow: LowerLeftArrow,
    	LowerRightArrow: LowerRightArrow,
    	loz: loz,
    	lozenge: lozenge,
    	lozf: lozf,
    	lpar: lpar,
    	lparlt: lparlt,
    	lrarr: lrarr,
    	lrcorner: lrcorner,
    	lrhar: lrhar,
    	lrhard: lrhard,
    	lrm: lrm,
    	lrtri: lrtri,
    	lsaquo: lsaquo,
    	lscr: lscr,
    	Lscr: Lscr,
    	lsh: lsh,
    	Lsh: Lsh,
    	lsim: lsim,
    	lsime: lsime,
    	lsimg: lsimg,
    	lsqb: lsqb,
    	lsquo: lsquo,
    	lsquor: lsquor,
    	Lstrok: Lstrok,
    	lstrok: lstrok,
    	ltcc: ltcc,
    	ltcir: ltcir,
    	lt: lt,
    	LT: LT,
    	Lt: Lt,
    	ltdot: ltdot,
    	lthree: lthree,
    	ltimes: ltimes,
    	ltlarr: ltlarr,
    	ltquest: ltquest,
    	ltri: ltri,
    	ltrie: ltrie,
    	ltrif: ltrif,
    	ltrPar: ltrPar,
    	lurdshar: lurdshar,
    	luruhar: luruhar,
    	lvertneqq: lvertneqq,
    	lvnE: lvnE,
    	macr: macr,
    	male: male,
    	malt: malt,
    	maltese: maltese,
    	"Map": "⤅",
    	map: map$1,
    	mapsto: mapsto,
    	mapstodown: mapstodown,
    	mapstoleft: mapstoleft,
    	mapstoup: mapstoup,
    	marker: marker,
    	mcomma: mcomma,
    	Mcy: Mcy,
    	mcy: mcy,
    	mdash: mdash,
    	mDDot: mDDot,
    	measuredangle: measuredangle,
    	MediumSpace: MediumSpace,
    	Mellintrf: Mellintrf,
    	Mfr: Mfr,
    	mfr: mfr,
    	mho: mho,
    	micro: micro,
    	midast: midast,
    	midcir: midcir,
    	mid: mid,
    	middot: middot,
    	minusb: minusb,
    	minus: minus,
    	minusd: minusd,
    	minusdu: minusdu,
    	MinusPlus: MinusPlus,
    	mlcp: mlcp,
    	mldr: mldr,
    	mnplus: mnplus,
    	models: models,
    	Mopf: Mopf,
    	mopf: mopf,
    	mp: mp,
    	mscr: mscr,
    	Mscr: Mscr,
    	mstpos: mstpos,
    	Mu: Mu,
    	mu: mu,
    	multimap: multimap,
    	mumap: mumap,
    	nabla: nabla,
    	Nacute: Nacute,
    	nacute: nacute,
    	nang: nang,
    	nap: nap,
    	napE: napE,
    	napid: napid,
    	napos: napos,
    	napprox: napprox,
    	natural: natural,
    	naturals: naturals,
    	natur: natur,
    	nbsp: nbsp,
    	nbump: nbump,
    	nbumpe: nbumpe,
    	ncap: ncap,
    	Ncaron: Ncaron,
    	ncaron: ncaron,
    	Ncedil: Ncedil,
    	ncedil: ncedil,
    	ncong: ncong,
    	ncongdot: ncongdot,
    	ncup: ncup,
    	Ncy: Ncy,
    	ncy: ncy,
    	ndash: ndash,
    	nearhk: nearhk,
    	nearr: nearr,
    	neArr: neArr,
    	nearrow: nearrow,
    	ne: ne,
    	nedot: nedot,
    	NegativeMediumSpace: NegativeMediumSpace,
    	NegativeThickSpace: NegativeThickSpace,
    	NegativeThinSpace: NegativeThinSpace,
    	NegativeVeryThinSpace: NegativeVeryThinSpace,
    	nequiv: nequiv,
    	nesear: nesear,
    	nesim: nesim,
    	NestedGreaterGreater: NestedGreaterGreater,
    	NestedLessLess: NestedLessLess,
    	NewLine: NewLine,
    	nexist: nexist,
    	nexists: nexists,
    	Nfr: Nfr,
    	nfr: nfr,
    	ngE: ngE,
    	nge: nge,
    	ngeq: ngeq,
    	ngeqq: ngeqq,
    	ngeqslant: ngeqslant,
    	nges: nges,
    	nGg: nGg,
    	ngsim: ngsim,
    	nGt: nGt,
    	ngt: ngt,
    	ngtr: ngtr,
    	nGtv: nGtv,
    	nharr: nharr,
    	nhArr: nhArr,
    	nhpar: nhpar,
    	ni: ni,
    	nis: nis,
    	nisd: nisd,
    	niv: niv,
    	NJcy: NJcy,
    	njcy: njcy,
    	nlarr: nlarr,
    	nlArr: nlArr,
    	nldr: nldr,
    	nlE: nlE,
    	nle: nle,
    	nleftarrow: nleftarrow,
    	nLeftarrow: nLeftarrow,
    	nleftrightarrow: nleftrightarrow,
    	nLeftrightarrow: nLeftrightarrow,
    	nleq: nleq,
    	nleqq: nleqq,
    	nleqslant: nleqslant,
    	nles: nles,
    	nless: nless,
    	nLl: nLl,
    	nlsim: nlsim,
    	nLt: nLt,
    	nlt: nlt,
    	nltri: nltri,
    	nltrie: nltrie,
    	nLtv: nLtv,
    	nmid: nmid,
    	NoBreak: NoBreak,
    	NonBreakingSpace: NonBreakingSpace,
    	nopf: nopf,
    	Nopf: Nopf,
    	Not: Not,
    	not: not,
    	NotCongruent: NotCongruent,
    	NotCupCap: NotCupCap,
    	NotDoubleVerticalBar: NotDoubleVerticalBar,
    	NotElement: NotElement,
    	NotEqual: NotEqual,
    	NotEqualTilde: NotEqualTilde,
    	NotExists: NotExists,
    	NotGreater: NotGreater,
    	NotGreaterEqual: NotGreaterEqual,
    	NotGreaterFullEqual: NotGreaterFullEqual,
    	NotGreaterGreater: NotGreaterGreater,
    	NotGreaterLess: NotGreaterLess,
    	NotGreaterSlantEqual: NotGreaterSlantEqual,
    	NotGreaterTilde: NotGreaterTilde,
    	NotHumpDownHump: NotHumpDownHump,
    	NotHumpEqual: NotHumpEqual,
    	notin: notin,
    	notindot: notindot,
    	notinE: notinE,
    	notinva: notinva,
    	notinvb: notinvb,
    	notinvc: notinvc,
    	NotLeftTriangleBar: NotLeftTriangleBar,
    	NotLeftTriangle: NotLeftTriangle,
    	NotLeftTriangleEqual: NotLeftTriangleEqual,
    	NotLess: NotLess,
    	NotLessEqual: NotLessEqual,
    	NotLessGreater: NotLessGreater,
    	NotLessLess: NotLessLess,
    	NotLessSlantEqual: NotLessSlantEqual,
    	NotLessTilde: NotLessTilde,
    	NotNestedGreaterGreater: NotNestedGreaterGreater,
    	NotNestedLessLess: NotNestedLessLess,
    	notni: notni,
    	notniva: notniva,
    	notnivb: notnivb,
    	notnivc: notnivc,
    	NotPrecedes: NotPrecedes,
    	NotPrecedesEqual: NotPrecedesEqual,
    	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
    	NotReverseElement: NotReverseElement,
    	NotRightTriangleBar: NotRightTriangleBar,
    	NotRightTriangle: NotRightTriangle,
    	NotRightTriangleEqual: NotRightTriangleEqual,
    	NotSquareSubset: NotSquareSubset,
    	NotSquareSubsetEqual: NotSquareSubsetEqual,
    	NotSquareSuperset: NotSquareSuperset,
    	NotSquareSupersetEqual: NotSquareSupersetEqual,
    	NotSubset: NotSubset,
    	NotSubsetEqual: NotSubsetEqual,
    	NotSucceeds: NotSucceeds,
    	NotSucceedsEqual: NotSucceedsEqual,
    	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
    	NotSucceedsTilde: NotSucceedsTilde,
    	NotSuperset: NotSuperset,
    	NotSupersetEqual: NotSupersetEqual,
    	NotTilde: NotTilde,
    	NotTildeEqual: NotTildeEqual,
    	NotTildeFullEqual: NotTildeFullEqual,
    	NotTildeTilde: NotTildeTilde,
    	NotVerticalBar: NotVerticalBar,
    	nparallel: nparallel,
    	npar: npar,
    	nparsl: nparsl,
    	npart: npart,
    	npolint: npolint,
    	npr: npr,
    	nprcue: nprcue,
    	nprec: nprec,
    	npreceq: npreceq,
    	npre: npre,
    	nrarrc: nrarrc,
    	nrarr: nrarr,
    	nrArr: nrArr,
    	nrarrw: nrarrw,
    	nrightarrow: nrightarrow,
    	nRightarrow: nRightarrow,
    	nrtri: nrtri,
    	nrtrie: nrtrie,
    	nsc: nsc,
    	nsccue: nsccue,
    	nsce: nsce,
    	Nscr: Nscr,
    	nscr: nscr,
    	nshortmid: nshortmid,
    	nshortparallel: nshortparallel,
    	nsim: nsim,
    	nsime: nsime,
    	nsimeq: nsimeq,
    	nsmid: nsmid,
    	nspar: nspar,
    	nsqsube: nsqsube,
    	nsqsupe: nsqsupe,
    	nsub: nsub,
    	nsubE: nsubE,
    	nsube: nsube,
    	nsubset: nsubset,
    	nsubseteq: nsubseteq,
    	nsubseteqq: nsubseteqq,
    	nsucc: nsucc,
    	nsucceq: nsucceq,
    	nsup: nsup,
    	nsupE: nsupE,
    	nsupe: nsupe,
    	nsupset: nsupset,
    	nsupseteq: nsupseteq,
    	nsupseteqq: nsupseteqq,
    	ntgl: ntgl,
    	Ntilde: Ntilde,
    	ntilde: ntilde,
    	ntlg: ntlg,
    	ntriangleleft: ntriangleleft,
    	ntrianglelefteq: ntrianglelefteq,
    	ntriangleright: ntriangleright,
    	ntrianglerighteq: ntrianglerighteq,
    	Nu: Nu,
    	nu: nu,
    	num: num,
    	numero: numero,
    	numsp: numsp,
    	nvap: nvap,
    	nvdash: nvdash,
    	nvDash: nvDash,
    	nVdash: nVdash,
    	nVDash: nVDash,
    	nvge: nvge,
    	nvgt: nvgt,
    	nvHarr: nvHarr,
    	nvinfin: nvinfin,
    	nvlArr: nvlArr,
    	nvle: nvle,
    	nvlt: nvlt,
    	nvltrie: nvltrie,
    	nvrArr: nvrArr,
    	nvrtrie: nvrtrie,
    	nvsim: nvsim,
    	nwarhk: nwarhk,
    	nwarr: nwarr,
    	nwArr: nwArr,
    	nwarrow: nwarrow,
    	nwnear: nwnear,
    	Oacute: Oacute,
    	oacute: oacute,
    	oast: oast,
    	Ocirc: Ocirc,
    	ocirc: ocirc,
    	ocir: ocir,
    	Ocy: Ocy,
    	ocy: ocy,
    	odash: odash,
    	Odblac: Odblac,
    	odblac: odblac,
    	odiv: odiv,
    	odot: odot,
    	odsold: odsold,
    	OElig: OElig,
    	oelig: oelig,
    	ofcir: ofcir,
    	Ofr: Ofr,
    	ofr: ofr,
    	ogon: ogon,
    	Ograve: Ograve,
    	ograve: ograve,
    	ogt: ogt,
    	ohbar: ohbar,
    	ohm: ohm,
    	oint: oint,
    	olarr: olarr,
    	olcir: olcir,
    	olcross: olcross,
    	oline: oline,
    	olt: olt,
    	Omacr: Omacr,
    	omacr: omacr,
    	Omega: Omega,
    	omega: omega,
    	Omicron: Omicron,
    	omicron: omicron,
    	omid: omid,
    	ominus: ominus,
    	Oopf: Oopf,
    	oopf: oopf,
    	opar: opar,
    	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
    	OpenCurlyQuote: OpenCurlyQuote,
    	operp: operp,
    	oplus: oplus,
    	orarr: orarr,
    	Or: Or,
    	or: or,
    	ord: ord,
    	order: order,
    	orderof: orderof,
    	ordf: ordf,
    	ordm: ordm,
    	origof: origof,
    	oror: oror,
    	orslope: orslope,
    	orv: orv,
    	oS: oS,
    	Oscr: Oscr,
    	oscr: oscr,
    	Oslash: Oslash,
    	oslash: oslash,
    	osol: osol,
    	Otilde: Otilde,
    	otilde: otilde,
    	otimesas: otimesas,
    	Otimes: Otimes,
    	otimes: otimes,
    	Ouml: Ouml,
    	ouml: ouml,
    	ovbar: ovbar,
    	OverBar: OverBar,
    	OverBrace: OverBrace,
    	OverBracket: OverBracket,
    	OverParenthesis: OverParenthesis,
    	para: para,
    	parallel: parallel,
    	par: par,
    	parsim: parsim,
    	parsl: parsl,
    	part: part,
    	PartialD: PartialD,
    	Pcy: Pcy,
    	pcy: pcy,
    	percnt: percnt,
    	period: period,
    	permil: permil,
    	perp: perp,
    	pertenk: pertenk,
    	Pfr: Pfr,
    	pfr: pfr,
    	Phi: Phi,
    	phi: phi,
    	phiv: phiv,
    	phmmat: phmmat,
    	phone: phone,
    	Pi: Pi,
    	pi: pi,
    	pitchfork: pitchfork,
    	piv: piv,
    	planck: planck,
    	planckh: planckh,
    	plankv: plankv,
    	plusacir: plusacir,
    	plusb: plusb,
    	pluscir: pluscir,
    	plus: plus,
    	plusdo: plusdo,
    	plusdu: plusdu,
    	pluse: pluse,
    	PlusMinus: PlusMinus,
    	plusmn: plusmn,
    	plussim: plussim,
    	plustwo: plustwo,
    	pm: pm,
    	Poincareplane: Poincareplane,
    	pointint: pointint,
    	popf: popf,
    	Popf: Popf,
    	pound: pound,
    	prap: prap,
    	Pr: Pr,
    	pr: pr,
    	prcue: prcue,
    	precapprox: precapprox,
    	prec: prec,
    	preccurlyeq: preccurlyeq,
    	Precedes: Precedes,
    	PrecedesEqual: PrecedesEqual,
    	PrecedesSlantEqual: PrecedesSlantEqual,
    	PrecedesTilde: PrecedesTilde,
    	preceq: preceq,
    	precnapprox: precnapprox,
    	precneqq: precneqq,
    	precnsim: precnsim,
    	pre: pre,
    	prE: prE,
    	precsim: precsim,
    	prime: prime,
    	Prime: Prime,
    	primes: primes,
    	prnap: prnap,
    	prnE: prnE,
    	prnsim: prnsim,
    	prod: prod,
    	Product: Product,
    	profalar: profalar,
    	profline: profline,
    	profsurf: profsurf,
    	prop: prop,
    	Proportional: Proportional,
    	Proportion: Proportion,
    	propto: propto,
    	prsim: prsim,
    	prurel: prurel,
    	Pscr: Pscr,
    	pscr: pscr,
    	Psi: Psi,
    	psi: psi,
    	puncsp: puncsp,
    	Qfr: Qfr,
    	qfr: qfr,
    	qint: qint,
    	qopf: qopf,
    	Qopf: Qopf,
    	qprime: qprime,
    	Qscr: Qscr,
    	qscr: qscr,
    	quaternions: quaternions,
    	quatint: quatint,
    	quest: quest,
    	questeq: questeq,
    	quot: quot,
    	QUOT: QUOT,
    	rAarr: rAarr,
    	race: race,
    	Racute: Racute,
    	racute: racute,
    	radic: radic,
    	raemptyv: raemptyv,
    	rang: rang,
    	Rang: Rang,
    	rangd: rangd,
    	range: range,
    	rangle: rangle,
    	raquo: raquo,
    	rarrap: rarrap,
    	rarrb: rarrb,
    	rarrbfs: rarrbfs,
    	rarrc: rarrc,
    	rarr: rarr,
    	Rarr: Rarr,
    	rArr: rArr,
    	rarrfs: rarrfs,
    	rarrhk: rarrhk,
    	rarrlp: rarrlp,
    	rarrpl: rarrpl,
    	rarrsim: rarrsim,
    	Rarrtl: Rarrtl,
    	rarrtl: rarrtl,
    	rarrw: rarrw,
    	ratail: ratail,
    	rAtail: rAtail,
    	ratio: ratio,
    	rationals: rationals,
    	rbarr: rbarr,
    	rBarr: rBarr,
    	RBarr: RBarr,
    	rbbrk: rbbrk,
    	rbrace: rbrace,
    	rbrack: rbrack,
    	rbrke: rbrke,
    	rbrksld: rbrksld,
    	rbrkslu: rbrkslu,
    	Rcaron: Rcaron,
    	rcaron: rcaron,
    	Rcedil: Rcedil,
    	rcedil: rcedil,
    	rceil: rceil,
    	rcub: rcub,
    	Rcy: Rcy,
    	rcy: rcy,
    	rdca: rdca,
    	rdldhar: rdldhar,
    	rdquo: rdquo,
    	rdquor: rdquor,
    	rdsh: rdsh,
    	real: real,
    	realine: realine,
    	realpart: realpart,
    	reals: reals,
    	Re: Re,
    	rect: rect,
    	reg: reg,
    	REG: REG,
    	ReverseElement: ReverseElement,
    	ReverseEquilibrium: ReverseEquilibrium,
    	ReverseUpEquilibrium: ReverseUpEquilibrium,
    	rfisht: rfisht,
    	rfloor: rfloor,
    	rfr: rfr,
    	Rfr: Rfr,
    	rHar: rHar,
    	rhard: rhard,
    	rharu: rharu,
    	rharul: rharul,
    	Rho: Rho,
    	rho: rho,
    	rhov: rhov,
    	RightAngleBracket: RightAngleBracket,
    	RightArrowBar: RightArrowBar,
    	rightarrow: rightarrow,
    	RightArrow: RightArrow,
    	Rightarrow: Rightarrow,
    	RightArrowLeftArrow: RightArrowLeftArrow,
    	rightarrowtail: rightarrowtail,
    	RightCeiling: RightCeiling,
    	RightDoubleBracket: RightDoubleBracket,
    	RightDownTeeVector: RightDownTeeVector,
    	RightDownVectorBar: RightDownVectorBar,
    	RightDownVector: RightDownVector,
    	RightFloor: RightFloor,
    	rightharpoondown: rightharpoondown,
    	rightharpoonup: rightharpoonup,
    	rightleftarrows: rightleftarrows,
    	rightleftharpoons: rightleftharpoons,
    	rightrightarrows: rightrightarrows,
    	rightsquigarrow: rightsquigarrow,
    	RightTeeArrow: RightTeeArrow,
    	RightTee: RightTee,
    	RightTeeVector: RightTeeVector,
    	rightthreetimes: rightthreetimes,
    	RightTriangleBar: RightTriangleBar,
    	RightTriangle: RightTriangle,
    	RightTriangleEqual: RightTriangleEqual,
    	RightUpDownVector: RightUpDownVector,
    	RightUpTeeVector: RightUpTeeVector,
    	RightUpVectorBar: RightUpVectorBar,
    	RightUpVector: RightUpVector,
    	RightVectorBar: RightVectorBar,
    	RightVector: RightVector,
    	ring: ring,
    	risingdotseq: risingdotseq,
    	rlarr: rlarr,
    	rlhar: rlhar,
    	rlm: rlm,
    	rmoustache: rmoustache,
    	rmoust: rmoust,
    	rnmid: rnmid,
    	roang: roang,
    	roarr: roarr,
    	robrk: robrk,
    	ropar: ropar,
    	ropf: ropf,
    	Ropf: Ropf,
    	roplus: roplus,
    	rotimes: rotimes,
    	RoundImplies: RoundImplies,
    	rpar: rpar,
    	rpargt: rpargt,
    	rppolint: rppolint,
    	rrarr: rrarr,
    	Rrightarrow: Rrightarrow,
    	rsaquo: rsaquo,
    	rscr: rscr,
    	Rscr: Rscr,
    	rsh: rsh,
    	Rsh: Rsh,
    	rsqb: rsqb,
    	rsquo: rsquo,
    	rsquor: rsquor,
    	rthree: rthree,
    	rtimes: rtimes,
    	rtri: rtri,
    	rtrie: rtrie,
    	rtrif: rtrif,
    	rtriltri: rtriltri,
    	RuleDelayed: RuleDelayed,
    	ruluhar: ruluhar,
    	rx: rx,
    	Sacute: Sacute,
    	sacute: sacute,
    	sbquo: sbquo,
    	scap: scap,
    	Scaron: Scaron,
    	scaron: scaron,
    	Sc: Sc,
    	sc: sc,
    	sccue: sccue,
    	sce: sce,
    	scE: scE,
    	Scedil: Scedil,
    	scedil: scedil,
    	Scirc: Scirc,
    	scirc: scirc,
    	scnap: scnap,
    	scnE: scnE,
    	scnsim: scnsim,
    	scpolint: scpolint,
    	scsim: scsim,
    	Scy: Scy,
    	scy: scy,
    	sdotb: sdotb,
    	sdot: sdot,
    	sdote: sdote,
    	searhk: searhk,
    	searr: searr,
    	seArr: seArr,
    	searrow: searrow,
    	sect: sect,
    	semi: semi,
    	seswar: seswar,
    	setminus: setminus,
    	setmn: setmn,
    	sext: sext,
    	Sfr: Sfr,
    	sfr: sfr,
    	sfrown: sfrown,
    	sharp: sharp,
    	SHCHcy: SHCHcy,
    	shchcy: shchcy,
    	SHcy: SHcy,
    	shcy: shcy,
    	ShortDownArrow: ShortDownArrow,
    	ShortLeftArrow: ShortLeftArrow,
    	shortmid: shortmid,
    	shortparallel: shortparallel,
    	ShortRightArrow: ShortRightArrow,
    	ShortUpArrow: ShortUpArrow,
    	shy: shy,
    	Sigma: Sigma,
    	sigma: sigma,
    	sigmaf: sigmaf,
    	sigmav: sigmav,
    	sim: sim,
    	simdot: simdot,
    	sime: sime,
    	simeq: simeq,
    	simg: simg,
    	simgE: simgE,
    	siml: siml,
    	simlE: simlE,
    	simne: simne,
    	simplus: simplus,
    	simrarr: simrarr,
    	slarr: slarr,
    	SmallCircle: SmallCircle,
    	smallsetminus: smallsetminus,
    	smashp: smashp,
    	smeparsl: smeparsl,
    	smid: smid,
    	smile: smile,
    	smt: smt,
    	smte: smte,
    	smtes: smtes,
    	SOFTcy: SOFTcy,
    	softcy: softcy,
    	solbar: solbar,
    	solb: solb,
    	sol: sol,
    	Sopf: Sopf,
    	sopf: sopf,
    	spades: spades,
    	spadesuit: spadesuit,
    	spar: spar,
    	sqcap: sqcap,
    	sqcaps: sqcaps,
    	sqcup: sqcup,
    	sqcups: sqcups,
    	Sqrt: Sqrt,
    	sqsub: sqsub,
    	sqsube: sqsube,
    	sqsubset: sqsubset,
    	sqsubseteq: sqsubseteq,
    	sqsup: sqsup,
    	sqsupe: sqsupe,
    	sqsupset: sqsupset,
    	sqsupseteq: sqsupseteq,
    	square: square,
    	Square: Square,
    	SquareIntersection: SquareIntersection,
    	SquareSubset: SquareSubset,
    	SquareSubsetEqual: SquareSubsetEqual,
    	SquareSuperset: SquareSuperset,
    	SquareSupersetEqual: SquareSupersetEqual,
    	SquareUnion: SquareUnion,
    	squarf: squarf,
    	squ: squ,
    	squf: squf,
    	srarr: srarr,
    	Sscr: Sscr,
    	sscr: sscr,
    	ssetmn: ssetmn,
    	ssmile: ssmile,
    	sstarf: sstarf,
    	Star: Star,
    	star: star,
    	starf: starf,
    	straightepsilon: straightepsilon,
    	straightphi: straightphi,
    	strns: strns,
    	sub: sub,
    	Sub: Sub,
    	subdot: subdot,
    	subE: subE,
    	sube: sube,
    	subedot: subedot,
    	submult: submult,
    	subnE: subnE,
    	subne: subne,
    	subplus: subplus,
    	subrarr: subrarr,
    	subset: subset,
    	Subset: Subset,
    	subseteq: subseteq,
    	subseteqq: subseteqq,
    	SubsetEqual: SubsetEqual,
    	subsetneq: subsetneq,
    	subsetneqq: subsetneqq,
    	subsim: subsim,
    	subsub: subsub,
    	subsup: subsup,
    	succapprox: succapprox,
    	succ: succ,
    	succcurlyeq: succcurlyeq,
    	Succeeds: Succeeds,
    	SucceedsEqual: SucceedsEqual,
    	SucceedsSlantEqual: SucceedsSlantEqual,
    	SucceedsTilde: SucceedsTilde,
    	succeq: succeq,
    	succnapprox: succnapprox,
    	succneqq: succneqq,
    	succnsim: succnsim,
    	succsim: succsim,
    	SuchThat: SuchThat,
    	sum: sum,
    	Sum: Sum,
    	sung: sung,
    	sup1: sup1,
    	sup2: sup2,
    	sup3: sup3,
    	sup: sup,
    	Sup: Sup,
    	supdot: supdot,
    	supdsub: supdsub,
    	supE: supE,
    	supe: supe,
    	supedot: supedot,
    	Superset: Superset,
    	SupersetEqual: SupersetEqual,
    	suphsol: suphsol,
    	suphsub: suphsub,
    	suplarr: suplarr,
    	supmult: supmult,
    	supnE: supnE,
    	supne: supne,
    	supplus: supplus,
    	supset: supset,
    	Supset: Supset,
    	supseteq: supseteq,
    	supseteqq: supseteqq,
    	supsetneq: supsetneq,
    	supsetneqq: supsetneqq,
    	supsim: supsim,
    	supsub: supsub,
    	supsup: supsup,
    	swarhk: swarhk,
    	swarr: swarr,
    	swArr: swArr,
    	swarrow: swarrow,
    	swnwar: swnwar,
    	szlig: szlig,
    	Tab: Tab,
    	target: target,
    	Tau: Tau,
    	tau: tau,
    	tbrk: tbrk,
    	Tcaron: Tcaron,
    	tcaron: tcaron,
    	Tcedil: Tcedil,
    	tcedil: tcedil,
    	Tcy: Tcy,
    	tcy: tcy,
    	tdot: tdot,
    	telrec: telrec,
    	Tfr: Tfr,
    	tfr: tfr,
    	there4: there4,
    	therefore: therefore,
    	Therefore: Therefore,
    	Theta: Theta,
    	theta: theta,
    	thetasym: thetasym,
    	thetav: thetav,
    	thickapprox: thickapprox,
    	thicksim: thicksim,
    	ThickSpace: ThickSpace,
    	ThinSpace: ThinSpace,
    	thinsp: thinsp,
    	thkap: thkap,
    	thksim: thksim,
    	THORN: THORN,
    	thorn: thorn,
    	tilde: tilde,
    	Tilde: Tilde,
    	TildeEqual: TildeEqual,
    	TildeFullEqual: TildeFullEqual,
    	TildeTilde: TildeTilde,
    	timesbar: timesbar,
    	timesb: timesb,
    	times: times,
    	timesd: timesd,
    	tint: tint,
    	toea: toea,
    	topbot: topbot,
    	topcir: topcir,
    	top: top,
    	Topf: Topf,
    	topf: topf,
    	topfork: topfork,
    	tosa: tosa,
    	tprime: tprime,
    	trade: trade,
    	TRADE: TRADE,
    	triangle: triangle,
    	triangledown: triangledown,
    	triangleleft: triangleleft,
    	trianglelefteq: trianglelefteq,
    	triangleq: triangleq,
    	triangleright: triangleright,
    	trianglerighteq: trianglerighteq,
    	tridot: tridot,
    	trie: trie,
    	triminus: triminus,
    	TripleDot: TripleDot,
    	triplus: triplus,
    	trisb: trisb,
    	tritime: tritime,
    	trpezium: trpezium,
    	Tscr: Tscr,
    	tscr: tscr,
    	TScy: TScy,
    	tscy: tscy,
    	TSHcy: TSHcy,
    	tshcy: tshcy,
    	Tstrok: Tstrok,
    	tstrok: tstrok,
    	twixt: twixt,
    	twoheadleftarrow: twoheadleftarrow,
    	twoheadrightarrow: twoheadrightarrow,
    	Uacute: Uacute,
    	uacute: uacute,
    	uarr: uarr,
    	Uarr: Uarr,
    	uArr: uArr,
    	Uarrocir: Uarrocir,
    	Ubrcy: Ubrcy,
    	ubrcy: ubrcy,
    	Ubreve: Ubreve,
    	ubreve: ubreve,
    	Ucirc: Ucirc,
    	ucirc: ucirc,
    	Ucy: Ucy,
    	ucy: ucy,
    	udarr: udarr,
    	Udblac: Udblac,
    	udblac: udblac,
    	udhar: udhar,
    	ufisht: ufisht,
    	Ufr: Ufr,
    	ufr: ufr,
    	Ugrave: Ugrave,
    	ugrave: ugrave,
    	uHar: uHar,
    	uharl: uharl,
    	uharr: uharr,
    	uhblk: uhblk,
    	ulcorn: ulcorn,
    	ulcorner: ulcorner,
    	ulcrop: ulcrop,
    	ultri: ultri,
    	Umacr: Umacr,
    	umacr: umacr,
    	uml: uml,
    	UnderBar: UnderBar,
    	UnderBrace: UnderBrace,
    	UnderBracket: UnderBracket,
    	UnderParenthesis: UnderParenthesis,
    	Union: Union,
    	UnionPlus: UnionPlus,
    	Uogon: Uogon,
    	uogon: uogon,
    	Uopf: Uopf,
    	uopf: uopf,
    	UpArrowBar: UpArrowBar,
    	uparrow: uparrow,
    	UpArrow: UpArrow,
    	Uparrow: Uparrow,
    	UpArrowDownArrow: UpArrowDownArrow,
    	updownarrow: updownarrow,
    	UpDownArrow: UpDownArrow,
    	Updownarrow: Updownarrow,
    	UpEquilibrium: UpEquilibrium,
    	upharpoonleft: upharpoonleft,
    	upharpoonright: upharpoonright,
    	uplus: uplus,
    	UpperLeftArrow: UpperLeftArrow,
    	UpperRightArrow: UpperRightArrow,
    	upsi: upsi,
    	Upsi: Upsi,
    	upsih: upsih,
    	Upsilon: Upsilon,
    	upsilon: upsilon,
    	UpTeeArrow: UpTeeArrow,
    	UpTee: UpTee,
    	upuparrows: upuparrows,
    	urcorn: urcorn,
    	urcorner: urcorner,
    	urcrop: urcrop,
    	Uring: Uring,
    	uring: uring,
    	urtri: urtri,
    	Uscr: Uscr,
    	uscr: uscr,
    	utdot: utdot,
    	Utilde: Utilde,
    	utilde: utilde,
    	utri: utri,
    	utrif: utrif,
    	uuarr: uuarr,
    	Uuml: Uuml,
    	uuml: uuml,
    	uwangle: uwangle,
    	vangrt: vangrt,
    	varepsilon: varepsilon,
    	varkappa: varkappa,
    	varnothing: varnothing,
    	varphi: varphi,
    	varpi: varpi,
    	varpropto: varpropto,
    	varr: varr,
    	vArr: vArr,
    	varrho: varrho,
    	varsigma: varsigma,
    	varsubsetneq: varsubsetneq,
    	varsubsetneqq: varsubsetneqq,
    	varsupsetneq: varsupsetneq,
    	varsupsetneqq: varsupsetneqq,
    	vartheta: vartheta,
    	vartriangleleft: vartriangleleft,
    	vartriangleright: vartriangleright,
    	vBar: vBar,
    	Vbar: Vbar,
    	vBarv: vBarv,
    	Vcy: Vcy,
    	vcy: vcy,
    	vdash: vdash,
    	vDash: vDash,
    	Vdash: Vdash,
    	VDash: VDash,
    	Vdashl: Vdashl,
    	veebar: veebar,
    	vee: vee,
    	Vee: Vee,
    	veeeq: veeeq,
    	vellip: vellip,
    	verbar: verbar,
    	Verbar: Verbar,
    	vert: vert,
    	Vert: Vert,
    	VerticalBar: VerticalBar,
    	VerticalLine: VerticalLine,
    	VerticalSeparator: VerticalSeparator,
    	VerticalTilde: VerticalTilde,
    	VeryThinSpace: VeryThinSpace,
    	Vfr: Vfr,
    	vfr: vfr,
    	vltri: vltri,
    	vnsub: vnsub,
    	vnsup: vnsup,
    	Vopf: Vopf,
    	vopf: vopf,
    	vprop: vprop,
    	vrtri: vrtri,
    	Vscr: Vscr,
    	vscr: vscr,
    	vsubnE: vsubnE,
    	vsubne: vsubne,
    	vsupnE: vsupnE,
    	vsupne: vsupne,
    	Vvdash: Vvdash,
    	vzigzag: vzigzag,
    	Wcirc: Wcirc,
    	wcirc: wcirc,
    	wedbar: wedbar,
    	wedge: wedge,
    	Wedge: Wedge,
    	wedgeq: wedgeq,
    	weierp: weierp,
    	Wfr: Wfr,
    	wfr: wfr,
    	Wopf: Wopf,
    	wopf: wopf,
    	wp: wp,
    	wr: wr,
    	wreath: wreath,
    	Wscr: Wscr,
    	wscr: wscr,
    	xcap: xcap,
    	xcirc: xcirc,
    	xcup: xcup,
    	xdtri: xdtri,
    	Xfr: Xfr,
    	xfr: xfr,
    	xharr: xharr,
    	xhArr: xhArr,
    	Xi: Xi,
    	xi: xi,
    	xlarr: xlarr,
    	xlArr: xlArr,
    	xmap: xmap,
    	xnis: xnis,
    	xodot: xodot,
    	Xopf: Xopf,
    	xopf: xopf,
    	xoplus: xoplus,
    	xotime: xotime,
    	xrarr: xrarr,
    	xrArr: xrArr,
    	Xscr: Xscr,
    	xscr: xscr,
    	xsqcup: xsqcup,
    	xuplus: xuplus,
    	xutri: xutri,
    	xvee: xvee,
    	xwedge: xwedge,
    	Yacute: Yacute,
    	yacute: yacute,
    	YAcy: YAcy,
    	yacy: yacy,
    	Ycirc: Ycirc,
    	ycirc: ycirc,
    	Ycy: Ycy,
    	ycy: ycy,
    	yen: yen,
    	Yfr: Yfr,
    	yfr: yfr,
    	YIcy: YIcy,
    	yicy: yicy,
    	Yopf: Yopf,
    	yopf: yopf,
    	Yscr: Yscr,
    	yscr: yscr,
    	YUcy: YUcy,
    	yucy: yucy,
    	yuml: yuml,
    	Yuml: Yuml,
    	Zacute: Zacute,
    	zacute: zacute,
    	Zcaron: Zcaron,
    	zcaron: zcaron,
    	Zcy: Zcy,
    	zcy: zcy,
    	Zdot: Zdot,
    	zdot: zdot,
    	zeetrf: zeetrf,
    	ZeroWidthSpace: ZeroWidthSpace,
    	Zeta: Zeta,
    	zeta: zeta,
    	zfr: zfr,
    	Zfr: Zfr,
    	ZHcy: ZHcy,
    	zhcy: zhcy,
    	zigrarr: zigrarr,
    	zopf: zopf,
    	Zopf: Zopf,
    	Zscr: Zscr,
    	zscr: zscr,
    	zwj: zwj,
    	zwnj: zwnj
    };

    /*eslint quotes:0*/
    var entities$1 = require$$0;

    var regex$4=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

    var mdurl$1 = {};

    var encodeCache = {};


    // Create a lookup array where anything but characters in `chars` string
    // and alphanumeric chars is percent-encoded.
    //
    function getEncodeCache(exclude) {
      var i, ch, cache = encodeCache[exclude];
      if (cache) { return cache; }

      cache = encodeCache[exclude] = [];

      for (i = 0; i < 128; i++) {
        ch = String.fromCharCode(i);

        if (/^[0-9a-z]$/i.test(ch)) {
          // always allow unencoded alphanumeric characters
          cache.push(ch);
        } else {
          cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
        }
      }

      for (i = 0; i < exclude.length; i++) {
        cache[exclude.charCodeAt(i)] = exclude[i];
      }

      return cache;
    }


    // Encode unsafe characters with percent-encoding, skipping already
    // encoded sequences.
    //
    //  - string       - string to encode
    //  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
    //  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
    //
    function encode$1(string, exclude, keepEscaped) {
      var i, l, code, nextCode, cache,
          result = '';

      if (typeof exclude !== 'string') {
        // encode(string, keepEscaped)
        keepEscaped  = exclude;
        exclude = encode$1.defaultChars;
      }

      if (typeof keepEscaped === 'undefined') {
        keepEscaped = true;
      }

      cache = getEncodeCache(exclude);

      for (i = 0, l = string.length; i < l; i++) {
        code = string.charCodeAt(i);

        if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
          if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
            result += string.slice(i, i + 3);
            i += 2;
            continue;
          }
        }

        if (code < 128) {
          result += cache[code];
          continue;
        }

        if (code >= 0xD800 && code <= 0xDFFF) {
          if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
            nextCode = string.charCodeAt(i + 1);
            if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
              result += encodeURIComponent(string[i] + string[i + 1]);
              i++;
              continue;
            }
          }
          result += '%EF%BF%BD';
          continue;
        }

        result += encodeURIComponent(string[i]);
      }

      return result;
    }

    encode$1.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
    encode$1.componentChars = "-_.!~*'()";


    var encode_1 = encode$1;

    /* eslint-disable no-bitwise */

    var decodeCache = {};

    function getDecodeCache(exclude) {
      var i, ch, cache = decodeCache[exclude];
      if (cache) { return cache; }

      cache = decodeCache[exclude] = [];

      for (i = 0; i < 128; i++) {
        ch = String.fromCharCode(i);
        cache.push(ch);
      }

      for (i = 0; i < exclude.length; i++) {
        ch = exclude.charCodeAt(i);
        cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
      }

      return cache;
    }


    // Decode percent-encoded string.
    //
    function decode$1(string, exclude) {
      var cache;

      if (typeof exclude !== 'string') {
        exclude = decode$1.defaultChars;
      }

      cache = getDecodeCache(exclude);

      return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
        var i, l, b1, b2, b3, b4, chr,
            result = '';

        for (i = 0, l = seq.length; i < l; i += 3) {
          b1 = parseInt(seq.slice(i + 1, i + 3), 16);

          if (b1 < 0x80) {
            result += cache[b1];
            continue;
          }

          if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
            // 110xxxxx 10xxxxxx
            b2 = parseInt(seq.slice(i + 4, i + 6), 16);

            if ((b2 & 0xC0) === 0x80) {
              chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

              if (chr < 0x80) {
                result += '\ufffd\ufffd';
              } else {
                result += String.fromCharCode(chr);
              }

              i += 3;
              continue;
            }
          }

          if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
            // 1110xxxx 10xxxxxx 10xxxxxx
            b2 = parseInt(seq.slice(i + 4, i + 6), 16);
            b3 = parseInt(seq.slice(i + 7, i + 9), 16);

            if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
              chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

              if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
                result += '\ufffd\ufffd\ufffd';
              } else {
                result += String.fromCharCode(chr);
              }

              i += 6;
              continue;
            }
          }

          if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
            // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
            b2 = parseInt(seq.slice(i + 4, i + 6), 16);
            b3 = parseInt(seq.slice(i + 7, i + 9), 16);
            b4 = parseInt(seq.slice(i + 10, i + 12), 16);

            if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
              chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

              if (chr < 0x10000 || chr > 0x10FFFF) {
                result += '\ufffd\ufffd\ufffd\ufffd';
              } else {
                chr -= 0x10000;
                result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
              }

              i += 9;
              continue;
            }
          }

          result += '\ufffd';
        }

        return result;
      });
    }


    decode$1.defaultChars   = ';/?:@&=+$,#';
    decode$1.componentChars = '';


    var decode_1 = decode$1;

    var format = function format(url) {
      var result = '';

      result += url.protocol || '';
      result += url.slashes ? '//' : '';
      result += url.auth ? url.auth + '@' : '';

      if (url.hostname && url.hostname.indexOf(':') !== -1) {
        // ipv6 address
        result += '[' + url.hostname + ']';
      } else {
        result += url.hostname || '';
      }

      result += url.port ? ':' + url.port : '';
      result += url.pathname || '';
      result += url.search || '';
      result += url.hash || '';

      return result;
    };

    //
    // Changes from joyent/node:
    //
    // 1. No leading slash in paths,
    //    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
    //
    // 2. Backslashes are not replaced with slashes,
    //    so `http:\\example.org\` is treated like a relative path
    //
    // 3. Trailing colon is treated like a part of the path,
    //    i.e. in `http://example.org:foo` pathname is `:foo`
    //
    // 4. Nothing is URL-encoded in the resulting object,
    //    (in joyent/node some chars in auth and paths are encoded)
    //
    // 5. `url.parse()` does not have `parseQueryString` argument
    //
    // 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
    //    which can be constructed using other parts of the url.
    //


    function Url() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.pathname = null;
    }

    // Reference: RFC 3986, RFC 1808, RFC 2396

    // define these here so at least they only have to be
    // compiled once on the first module load.
    var protocolPattern = /^([a-z0-9.+-]+:)/i,
        portPattern = /:[0-9]*$/,

        // Special case for a simple path URL
        simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

        // RFC 2396: characters reserved for delimiting URLs.
        // We actually just auto-escape these.
        delims = [ '<', '>', '"', '`', ' ', '\r', '\n', '\t' ],

        // RFC 2396: characters not allowed for various reasons.
        unwise = [ '{', '}', '|', '\\', '^', '`' ].concat(delims),

        // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
        autoEscape = [ '\'' ].concat(unwise),
        // Characters that are never ever allowed in a hostname.
        // Note that any invalid chars are also handled, but these
        // are the ones that are *expected* to be seen, so we fast-path
        // them.
        nonHostChars = [ '%', '/', '?', ';', '#' ].concat(autoEscape),
        hostEndingChars = [ '/', '?', '#' ],
        hostnameMaxLen = 255,
        hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
        hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        // protocols that can allow "unsafe" and "unwise" chars.
        /* eslint-disable no-script-url */
        // protocols that never have a hostname.
        hostlessProtocol = {
          'javascript': true,
          'javascript:': true
        },
        // protocols that always contain a // bit.
        slashedProtocol = {
          'http': true,
          'https': true,
          'ftp': true,
          'gopher': true,
          'file': true,
          'http:': true,
          'https:': true,
          'ftp:': true,
          'gopher:': true,
          'file:': true
        };
        /* eslint-enable no-script-url */

    function urlParse(url, slashesDenoteHost) {
      if (url && url instanceof Url) { return url; }

      var u = new Url();
      u.parse(url, slashesDenoteHost);
      return u;
    }

    Url.prototype.parse = function(url, slashesDenoteHost) {
      var i, l, lowerProto, hec, slashes,
          rest = url;

      // trim before proceeding.
      // This is to support parse stuff like "  http://foo.com  \n"
      rest = rest.trim();

      if (!slashesDenoteHost && url.split('#').length === 1) {
        // Try fast path regexp
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
          }
          return this;
        }
      }

      var proto = protocolPattern.exec(rest);
      if (proto) {
        proto = proto[0];
        lowerProto = proto.toLowerCase();
        this.protocol = proto;
        rest = rest.substr(proto.length);
      }

      // figure out if it's got a host
      // user@server is *always* interpreted as a hostname, and url
      // resolution will treat //foo/bar as host=foo,path=bar because that's
      // how the browser resolves relative URLs.
      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        slashes = rest.substr(0, 2) === '//';
        if (slashes && !(proto && hostlessProtocol[proto])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }

      if (!hostlessProtocol[proto] &&
          (slashes || (proto && !slashedProtocol[proto]))) {

        // there's a hostname.
        // the first instance of /, ?, ;, or # ends the host.
        //
        // If there is an @ in the hostname, then non-host chars *are* allowed
        // to the left of the last @ sign, unless some host-ending character
        // comes *before* the @-sign.
        // URLs are obnoxious.
        //
        // ex:
        // http://a@b@c/ => user:a@b host:c
        // http://a@b?@c => user:a host:c path:/?@c

        // v0.12 TODO(isaacs): This is not quite how Chrome does things.
        // Review our test case against browsers more comprehensively.

        // find the first instance of any hostEndingChars
        var hostEnd = -1;
        for (i = 0; i < hostEndingChars.length; i++) {
          hec = rest.indexOf(hostEndingChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }

        // at this point, either we have an explicit point where the
        // auth portion cannot go past, or the last @ char is the decider.
        var auth, atSign;
        if (hostEnd === -1) {
          // atSign can be anywhere.
          atSign = rest.lastIndexOf('@');
        } else {
          // atSign must be in auth portion.
          // http://a@b/c@d => host:b auth:a path:/c@d
          atSign = rest.lastIndexOf('@', hostEnd);
        }

        // Now we have a portion which is definitely the auth.
        // Pull that off.
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = auth;
        }

        // the host is the remaining to the left of the first non-host char
        hostEnd = -1;
        for (i = 0; i < nonHostChars.length; i++) {
          hec = rest.indexOf(nonHostChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        // if we still have not hit it, then the entire thing is a host.
        if (hostEnd === -1) {
          hostEnd = rest.length;
        }

        if (rest[hostEnd - 1] === ':') { hostEnd--; }
        var host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);

        // pull out port.
        this.parseHost(host);

        // we've indicated that there is a hostname,
        // so even if it's empty, it has to be present.
        this.hostname = this.hostname || '';

        // if hostname begins with [ and ends with ]
        // assume that it's an IPv6 address.
        var ipv6Hostname = this.hostname[0] === '[' &&
            this.hostname[this.hostname.length - 1] === ']';

        // validate a little.
        if (!ipv6Hostname) {
          var hostparts = this.hostname.split(/\./);
          for (i = 0, l = hostparts.length; i < l; i++) {
            var part = hostparts[i];
            if (!part) { continue; }
            if (!part.match(hostnamePartPattern)) {
              var newpart = '';
              for (var j = 0, k = part.length; j < k; j++) {
                if (part.charCodeAt(j) > 127) {
                  // we replace non-ASCII char with a temporary placeholder
                  // we need this to make sure size of hostname is not
                  // broken by replacing non-ASCII by nothing
                  newpart += 'x';
                } else {
                  newpart += part[j];
                }
              }
              // we test again with ASCII char only
              if (!newpart.match(hostnamePartPattern)) {
                var validParts = hostparts.slice(0, i);
                var notHost = hostparts.slice(i + 1);
                var bit = part.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = notHost.join('.') + rest;
                }
                this.hostname = validParts.join('.');
                break;
              }
            }
          }
        }

        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = '';
        }

        // strip [ and ] from the hostname
        // the host field still retains them, though
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        }
      }

      // chop off from the tail first.
      var hash = rest.indexOf('#');
      if (hash !== -1) {
        // got a fragment string.
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
      }
      var qm = rest.indexOf('?');
      if (qm !== -1) {
        this.search = rest.substr(qm);
        rest = rest.slice(0, qm);
      }
      if (rest) { this.pathname = rest; }
      if (slashedProtocol[lowerProto] &&
          this.hostname && !this.pathname) {
        this.pathname = '';
      }

      return this;
    };

    Url.prototype.parseHost = function(host) {
      var port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ':') {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host) { this.hostname = host; }
    };

    var parse = urlParse;

    mdurl$1.encode = encode_1;
    mdurl$1.decode = decode_1;
    mdurl$1.format = format;
    mdurl$1.parse  = parse;

    var uc_micro = {};

    var regex$3=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

    var regex$2=/[\0-\x1F\x7F-\x9F]/;

    var regex$1=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

    var regex=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

    uc_micro.Any = regex$3;
    uc_micro.Cc  = regex$2;
    uc_micro.Cf  = regex$1;
    uc_micro.P   = regex$4;
    uc_micro.Z   = regex;

    (function (exports) {


    function _class(obj) { return Object.prototype.toString.call(obj); }

    function isString(obj) { return _class(obj) === '[object String]'; }

    var _hasOwnProperty = Object.prototype.hasOwnProperty;

    function has(object, key) {
      return _hasOwnProperty.call(object, key);
    }

    // Merge objects
    //
    function assign(obj /*from1, from2, from3, ...*/) {
      var sources = Array.prototype.slice.call(arguments, 1);

      sources.forEach(function (source) {
        if (!source) { return; }

        if (typeof source !== 'object') {
          throw new TypeError(source + 'must be object');
        }

        Object.keys(source).forEach(function (key) {
          obj[key] = source[key];
        });
      });

      return obj;
    }

    // Remove element from array and put another array at those position.
    // Useful for some operations with tokens
    function arrayReplaceAt(src, pos, newElements) {
      return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
    }

    ////////////////////////////////////////////////////////////////////////////////

    function isValidEntityCode(c) {
      /*eslint no-bitwise:0*/
      // broken sequence
      if (c >= 0xD800 && c <= 0xDFFF) { return false; }
      // never used
      if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
      if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
      // control codes
      if (c >= 0x00 && c <= 0x08) { return false; }
      if (c === 0x0B) { return false; }
      if (c >= 0x0E && c <= 0x1F) { return false; }
      if (c >= 0x7F && c <= 0x9F) { return false; }
      // out of range
      if (c > 0x10FFFF) { return false; }
      return true;
    }

    function fromCodePoint(c) {
      /*eslint no-bitwise:0*/
      if (c > 0xffff) {
        c -= 0x10000;
        var surrogate1 = 0xd800 + (c >> 10),
            surrogate2 = 0xdc00 + (c & 0x3ff);

        return String.fromCharCode(surrogate1, surrogate2);
      }
      return String.fromCharCode(c);
    }


    var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
    var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
    var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

    var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;

    var entities = entities$1;

    function replaceEntityPattern(match, name) {
      var code = 0;

      if (has(entities, name)) {
        return entities[name];
      }

      if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
        code = name[1].toLowerCase() === 'x' ?
          parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);

        if (isValidEntityCode(code)) {
          return fromCodePoint(code);
        }
      }

      return match;
    }

    /*function replaceEntities(str) {
      if (str.indexOf('&') < 0) { return str; }

      return str.replace(ENTITY_RE, replaceEntityPattern);
    }*/

    function unescapeMd(str) {
      if (str.indexOf('\\') < 0) { return str; }
      return str.replace(UNESCAPE_MD_RE, '$1');
    }

    function unescapeAll(str) {
      if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

      return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
        if (escaped) { return escaped; }
        return replaceEntityPattern(match, entity);
      });
    }

    ////////////////////////////////////////////////////////////////////////////////

    var HTML_ESCAPE_TEST_RE = /[&<>"]/;
    var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
    var HTML_REPLACEMENTS = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    };

    function replaceUnsafeChar(ch) {
      return HTML_REPLACEMENTS[ch];
    }

    function escapeHtml(str) {
      if (HTML_ESCAPE_TEST_RE.test(str)) {
        return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
      }
      return str;
    }

    ////////////////////////////////////////////////////////////////////////////////

    var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

    function escapeRE(str) {
      return str.replace(REGEXP_ESCAPE_RE, '\\$&');
    }

    ////////////////////////////////////////////////////////////////////////////////

    function isSpace(code) {
      switch (code) {
        case 0x09:
        case 0x20:
          return true;
      }
      return false;
    }

    // Zs (unicode class) || [\t\f\v\r\n]
    function isWhiteSpace(code) {
      if (code >= 0x2000 && code <= 0x200A) { return true; }
      switch (code) {
        case 0x09: // \t
        case 0x0A: // \n
        case 0x0B: // \v
        case 0x0C: // \f
        case 0x0D: // \r
        case 0x20:
        case 0xA0:
        case 0x1680:
        case 0x202F:
        case 0x205F:
        case 0x3000:
          return true;
      }
      return false;
    }

    ////////////////////////////////////////////////////////////////////////////////

    /*eslint-disable max-len*/
    var UNICODE_PUNCT_RE = regex$4;

    // Currently without astral characters support.
    function isPunctChar(ch) {
      return UNICODE_PUNCT_RE.test(ch);
    }


    // Markdown ASCII punctuation characters.
    //
    // !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
    // http://spec.commonmark.org/0.15/#ascii-punctuation-character
    //
    // Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
    //
    function isMdAsciiPunct(ch) {
      switch (ch) {
        case 0x21/* ! */:
        case 0x22/* " */:
        case 0x23/* # */:
        case 0x24/* $ */:
        case 0x25/* % */:
        case 0x26/* & */:
        case 0x27/* ' */:
        case 0x28/* ( */:
        case 0x29/* ) */:
        case 0x2A/* * */:
        case 0x2B/* + */:
        case 0x2C/* , */:
        case 0x2D/* - */:
        case 0x2E/* . */:
        case 0x2F/* / */:
        case 0x3A/* : */:
        case 0x3B/* ; */:
        case 0x3C/* < */:
        case 0x3D/* = */:
        case 0x3E/* > */:
        case 0x3F/* ? */:
        case 0x40/* @ */:
        case 0x5B/* [ */:
        case 0x5C/* \ */:
        case 0x5D/* ] */:
        case 0x5E/* ^ */:
        case 0x5F/* _ */:
        case 0x60/* ` */:
        case 0x7B/* { */:
        case 0x7C/* | */:
        case 0x7D/* } */:
        case 0x7E/* ~ */:
          return true;
        default:
          return false;
      }
    }

    // Hepler to unify [reference labels].
    //
    function normalizeReference(str) {
      // Trim and collapse whitespace
      //
      str = str.trim().replace(/\s+/g, ' ');

      // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
      // fixed in v12 (couldn't find any details).
      //
      // So treat this one as a special case
      // (remove this when node v10 is no longer supported).
      //
      if ('ẞ'.toLowerCase() === 'Ṿ') {
        str = str.replace(/ẞ/g, 'ß');
      }

      // .toLowerCase().toUpperCase() should get rid of all differences
      // between letter variants.
      //
      // Simple .toLowerCase() doesn't normalize 125 code points correctly,
      // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
      // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
      // uppercased versions).
      //
      // Here's an example showing how it happens. Lets take greek letter omega:
      // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
      //
      // Unicode entries:
      // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
      // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
      // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
      // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
      //
      // Case-insensitive comparison should treat all of them as equivalent.
      //
      // But .toLowerCase() doesn't change ϑ (it's already lowercase),
      // and .toUpperCase() doesn't change ϴ (already uppercase).
      //
      // Applying first lower then upper case normalizes any character:
      // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
      //
      // Note: this is equivalent to unicode case folding; unicode normalization
      // is a different step that is not required here.
      //
      // Final result should be uppercased, because it's later stored in an object
      // (this avoid a conflict with Object.prototype members,
      // most notably, `__proto__`)
      //
      return str.toLowerCase().toUpperCase();
    }

    ////////////////////////////////////////////////////////////////////////////////

    // Re-export libraries commonly used in both markdown-it and its plugins,
    // so plugins won't have to depend on them explicitly, which reduces their
    // bundled size (e.g. a browser build).
    //
    exports.lib                 = {};
    exports.lib.mdurl           = mdurl$1;
    exports.lib.ucmicro         = uc_micro;

    exports.assign              = assign;
    exports.isString            = isString;
    exports.has                 = has;
    exports.unescapeMd          = unescapeMd;
    exports.unescapeAll         = unescapeAll;
    exports.isValidEntityCode   = isValidEntityCode;
    exports.fromCodePoint       = fromCodePoint;
    // exports.replaceEntities     = replaceEntities;
    exports.escapeHtml          = escapeHtml;
    exports.arrayReplaceAt      = arrayReplaceAt;
    exports.isSpace             = isSpace;
    exports.isWhiteSpace        = isWhiteSpace;
    exports.isMdAsciiPunct      = isMdAsciiPunct;
    exports.isPunctChar         = isPunctChar;
    exports.escapeRE            = escapeRE;
    exports.normalizeReference  = normalizeReference;
    }(utils$1));

    var helpers$1 = {};

    var parse_link_label = function parseLinkLabel(state, start, disableNested) {
      var level, found, marker, prevPos,
          labelEnd = -1,
          max = state.posMax,
          oldPos = state.pos;

      state.pos = start + 1;
      level = 1;

      while (state.pos < max) {
        marker = state.src.charCodeAt(state.pos);
        if (marker === 0x5D /* ] */) {
          level--;
          if (level === 0) {
            found = true;
            break;
          }
        }

        prevPos = state.pos;
        state.md.inline.skipToken(state);
        if (marker === 0x5B /* [ */) {
          if (prevPos === state.pos - 1) {
            // increase level if we find text `[`, which is not a part of any token
            level++;
          } else if (disableNested) {
            state.pos = oldPos;
            return -1;
          }
        }
      }

      if (found) {
        labelEnd = state.pos;
      }

      // restore old state
      state.pos = oldPos;

      return labelEnd;
    };

    var unescapeAll$2 = utils$1.unescapeAll;


    var parse_link_destination = function parseLinkDestination(str, pos, max) {
      var code, level,
          lines = 0,
          start = pos,
          result = {
            ok: false,
            pos: 0,
            lines: 0,
            str: ''
          };

      if (str.charCodeAt(pos) === 0x3C /* < */) {
        pos++;
        while (pos < max) {
          code = str.charCodeAt(pos);
          if (code === 0x0A /* \n */) { return result; }
          if (code === 0x3C /* < */) { return result; }
          if (code === 0x3E /* > */) {
            result.pos = pos + 1;
            result.str = unescapeAll$2(str.slice(start + 1, pos));
            result.ok = true;
            return result;
          }
          if (code === 0x5C /* \ */ && pos + 1 < max) {
            pos += 2;
            continue;
          }

          pos++;
        }

        // no closing '>'
        return result;
      }

      // this should be ... } else { ... branch

      level = 0;
      while (pos < max) {
        code = str.charCodeAt(pos);

        if (code === 0x20) { break; }

        // ascii control characters
        if (code < 0x20 || code === 0x7F) { break; }

        if (code === 0x5C /* \ */ && pos + 1 < max) {
          if (str.charCodeAt(pos + 1) === 0x20) { break; }
          pos += 2;
          continue;
        }

        if (code === 0x28 /* ( */) {
          level++;
          if (level > 32) { return result; }
        }

        if (code === 0x29 /* ) */) {
          if (level === 0) { break; }
          level--;
        }

        pos++;
      }

      if (start === pos) { return result; }
      if (level !== 0) { return result; }

      result.str = unescapeAll$2(str.slice(start, pos));
      result.lines = lines;
      result.pos = pos;
      result.ok = true;
      return result;
    };

    var unescapeAll$1 = utils$1.unescapeAll;


    var parse_link_title = function parseLinkTitle(str, pos, max) {
      var code,
          marker,
          lines = 0,
          start = pos,
          result = {
            ok: false,
            pos: 0,
            lines: 0,
            str: ''
          };

      if (pos >= max) { return result; }

      marker = str.charCodeAt(pos);

      if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return result; }

      pos++;

      // if opening marker is "(", switch it to closing marker ")"
      if (marker === 0x28) { marker = 0x29; }

      while (pos < max) {
        code = str.charCodeAt(pos);
        if (code === marker) {
          result.pos = pos + 1;
          result.lines = lines;
          result.str = unescapeAll$1(str.slice(start + 1, pos));
          result.ok = true;
          return result;
        } else if (code === 0x28 /* ( */ && marker === 0x29 /* ) */) {
          return result;
        } else if (code === 0x0A) {
          lines++;
        } else if (code === 0x5C /* \ */ && pos + 1 < max) {
          pos++;
          if (str.charCodeAt(pos) === 0x0A) {
            lines++;
          }
        }

        pos++;
      }

      return result;
    };

    helpers$1.parseLinkLabel       = parse_link_label;
    helpers$1.parseLinkDestination = parse_link_destination;
    helpers$1.parseLinkTitle       = parse_link_title;

    /**
     * class Renderer
     *
     * Generates HTML from parsed token stream. Each instance has independent
     * copy of rules. Those can be rewritten with ease. Also, you can add new
     * rules if you create plugin and adds new token types.
     **/


    var assign$1          = utils$1.assign;
    var unescapeAll     = utils$1.unescapeAll;
    var escapeHtml      = utils$1.escapeHtml;


    ////////////////////////////////////////////////////////////////////////////////

    var default_rules = {};


    default_rules.code_inline = function (tokens, idx, options, env, slf) {
      var token = tokens[idx];

      return  '<code' + slf.renderAttrs(token) + '>' +
              escapeHtml(tokens[idx].content) +
              '</code>';
    };


    default_rules.code_block = function (tokens, idx, options, env, slf) {
      var token = tokens[idx];

      return  '<pre' + slf.renderAttrs(token) + '><code>' +
              escapeHtml(tokens[idx].content) +
              '</code></pre>\n';
    };


    default_rules.fence = function (tokens, idx, options, env, slf) {
      var token = tokens[idx],
          info = token.info ? unescapeAll(token.info).trim() : '',
          langName = '',
          langAttrs = '',
          highlighted, i, arr, tmpAttrs, tmpToken;

      if (info) {
        arr = info.split(/(\s+)/g);
        langName = arr[0];
        langAttrs = arr.slice(2).join('');
      }

      if (options.highlight) {
        highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
      } else {
        highlighted = escapeHtml(token.content);
      }

      if (highlighted.indexOf('<pre') === 0) {
        return highlighted + '\n';
      }

      // If language exists, inject class gently, without modifying original token.
      // May be, one day we will add .deepClone() for token and simplify this part, but
      // now we prefer to keep things local.
      if (info) {
        i        = token.attrIndex('class');
        tmpAttrs = token.attrs ? token.attrs.slice() : [];

        if (i < 0) {
          tmpAttrs.push([ 'class', options.langPrefix + langName ]);
        } else {
          tmpAttrs[i] = tmpAttrs[i].slice();
          tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
        }

        // Fake token just to render attributes
        tmpToken = {
          attrs: tmpAttrs
        };

        return  '<pre><code' + slf.renderAttrs(tmpToken) + '>'
              + highlighted
              + '</code></pre>\n';
      }


      return  '<pre><code' + slf.renderAttrs(token) + '>'
            + highlighted
            + '</code></pre>\n';
    };


    default_rules.image = function (tokens, idx, options, env, slf) {
      var token = tokens[idx];

      // "alt" attr MUST be set, even if empty. Because it's mandatory and
      // should be placed on proper position for tests.
      //
      // Replace content with actual value

      token.attrs[token.attrIndex('alt')][1] =
        slf.renderInlineAsText(token.children, options, env);

      return slf.renderToken(tokens, idx, options);
    };


    default_rules.hardbreak = function (tokens, idx, options /*, env */) {
      return options.xhtmlOut ? '<br />\n' : '<br>\n';
    };
    default_rules.softbreak = function (tokens, idx, options /*, env */) {
      return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
    };


    default_rules.text = function (tokens, idx /*, options, env */) {
      return escapeHtml(tokens[idx].content);
    };


    default_rules.html_block = function (tokens, idx /*, options, env */) {
      return tokens[idx].content;
    };
    default_rules.html_inline = function (tokens, idx /*, options, env */) {
      return tokens[idx].content;
    };


    /**
     * new Renderer()
     *
     * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
     **/
    function Renderer$1() {

      /**
       * Renderer#rules -> Object
       *
       * Contains render rules for tokens. Can be updated and extended.
       *
       * ##### Example
       *
       * ```javascript
       * var md = require('markdown-it')();
       *
       * md.renderer.rules.strong_open  = function () { return '<b>'; };
       * md.renderer.rules.strong_close = function () { return '</b>'; };
       *
       * var result = md.renderInline(...);
       * ```
       *
       * Each rule is called as independent static function with fixed signature:
       *
       * ```javascript
       * function my_token_render(tokens, idx, options, env, renderer) {
       *   // ...
       *   return renderedHTML;
       * }
       * ```
       *
       * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
       * for more details and examples.
       **/
      this.rules = assign$1({}, default_rules);
    }


    /**
     * Renderer.renderAttrs(token) -> String
     *
     * Render token attributes to string.
     **/
    Renderer$1.prototype.renderAttrs = function renderAttrs(token) {
      var i, l, result;

      if (!token.attrs) { return ''; }

      result = '';

      for (i = 0, l = token.attrs.length; i < l; i++) {
        result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
      }

      return result;
    };


    /**
     * Renderer.renderToken(tokens, idx, options) -> String
     * - tokens (Array): list of tokens
     * - idx (Numbed): token index to render
     * - options (Object): params of parser instance
     *
     * Default token renderer. Can be overriden by custom function
     * in [[Renderer#rules]].
     **/
    Renderer$1.prototype.renderToken = function renderToken(tokens, idx, options) {
      var nextToken,
          result = '',
          needLf = false,
          token = tokens[idx];

      // Tight list paragraphs
      if (token.hidden) {
        return '';
      }

      // Insert a newline between hidden paragraph and subsequent opening
      // block-level tag.
      //
      // For example, here we should insert a newline before blockquote:
      //  - a
      //    >
      //
      if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
        result += '\n';
      }

      // Add token name, e.g. `<img`
      result += (token.nesting === -1 ? '</' : '<') + token.tag;

      // Encode attributes, e.g. `<img src="foo"`
      result += this.renderAttrs(token);

      // Add a slash for self-closing tags, e.g. `<img src="foo" /`
      if (token.nesting === 0 && options.xhtmlOut) {
        result += ' /';
      }

      // Check if we need to add a newline after this tag
      if (token.block) {
        needLf = true;

        if (token.nesting === 1) {
          if (idx + 1 < tokens.length) {
            nextToken = tokens[idx + 1];

            if (nextToken.type === 'inline' || nextToken.hidden) {
              // Block-level tag containing an inline tag.
              //
              needLf = false;

            } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
              // Opening tag + closing tag of the same type. E.g. `<li></li>`.
              //
              needLf = false;
            }
          }
        }
      }

      result += needLf ? '>\n' : '>';

      return result;
    };


    /**
     * Renderer.renderInline(tokens, options, env) -> String
     * - tokens (Array): list on block tokens to render
     * - options (Object): params of parser instance
     * - env (Object): additional data from parsed input (references, for example)
     *
     * The same as [[Renderer.render]], but for single token of `inline` type.
     **/
    Renderer$1.prototype.renderInline = function (tokens, options, env) {
      var type,
          result = '',
          rules = this.rules;

      for (var i = 0, len = tokens.length; i < len; i++) {
        type = tokens[i].type;

        if (typeof rules[type] !== 'undefined') {
          result += rules[type](tokens, i, options, env, this);
        } else {
          result += this.renderToken(tokens, i, options);
        }
      }

      return result;
    };


    /** internal
     * Renderer.renderInlineAsText(tokens, options, env) -> String
     * - tokens (Array): list on block tokens to render
     * - options (Object): params of parser instance
     * - env (Object): additional data from parsed input (references, for example)
     *
     * Special kludge for image `alt` attributes to conform CommonMark spec.
     * Don't try to use it! Spec requires to show `alt` content with stripped markup,
     * instead of simple escaping.
     **/
    Renderer$1.prototype.renderInlineAsText = function (tokens, options, env) {
      var result = '';

      for (var i = 0, len = tokens.length; i < len; i++) {
        if (tokens[i].type === 'text') {
          result += tokens[i].content;
        } else if (tokens[i].type === 'image') {
          result += this.renderInlineAsText(tokens[i].children, options, env);
        } else if (tokens[i].type === 'softbreak') {
          result += '\n';
        }
      }

      return result;
    };


    /**
     * Renderer.render(tokens, options, env) -> String
     * - tokens (Array): list on block tokens to render
     * - options (Object): params of parser instance
     * - env (Object): additional data from parsed input (references, for example)
     *
     * Takes token stream and generates HTML. Probably, you will never need to call
     * this method directly.
     **/
    Renderer$1.prototype.render = function (tokens, options, env) {
      var i, len, type,
          result = '',
          rules = this.rules;

      for (i = 0, len = tokens.length; i < len; i++) {
        type = tokens[i].type;

        if (type === 'inline') {
          result += this.renderInline(tokens[i].children, options, env);
        } else if (typeof rules[type] !== 'undefined') {
          result += rules[tokens[i].type](tokens, i, options, env, this);
        } else {
          result += this.renderToken(tokens, i, options, env);
        }
      }

      return result;
    };

    var renderer = Renderer$1;

    /**
     * class Ruler
     *
     * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
     * [[MarkdownIt#inline]] to manage sequences of functions (rules):
     *
     * - keep rules in defined order
     * - assign the name to each rule
     * - enable/disable rules
     * - add/replace rules
     * - allow assign rules to additional named chains (in the same)
     * - cacheing lists of active rules
     *
     * You will not need use this class directly until write plugins. For simple
     * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
     * [[MarkdownIt.use]].
     **/


    /**
     * new Ruler()
     **/
    function Ruler$3() {
      // List of added rules. Each element is:
      //
      // {
      //   name: XXX,
      //   enabled: Boolean,
      //   fn: Function(),
      //   alt: [ name2, name3 ]
      // }
      //
      this.__rules__ = [];

      // Cached rule chains.
      //
      // First level - chain name, '' for default.
      // Second level - diginal anchor for fast filtering by charcodes.
      //
      this.__cache__ = null;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Helper methods, should not be used directly


    // Find rule index by name
    //
    Ruler$3.prototype.__find__ = function (name) {
      for (var i = 0; i < this.__rules__.length; i++) {
        if (this.__rules__[i].name === name) {
          return i;
        }
      }
      return -1;
    };


    // Build rules lookup cache
    //
    Ruler$3.prototype.__compile__ = function () {
      var self = this;
      var chains = [ '' ];

      // collect unique names
      self.__rules__.forEach(function (rule) {
        if (!rule.enabled) { return; }

        rule.alt.forEach(function (altName) {
          if (chains.indexOf(altName) < 0) {
            chains.push(altName);
          }
        });
      });

      self.__cache__ = {};

      chains.forEach(function (chain) {
        self.__cache__[chain] = [];
        self.__rules__.forEach(function (rule) {
          if (!rule.enabled) { return; }

          if (chain && rule.alt.indexOf(chain) < 0) { return; }

          self.__cache__[chain].push(rule.fn);
        });
      });
    };


    /**
     * Ruler.at(name, fn [, options])
     * - name (String): rule name to replace.
     * - fn (Function): new rule function.
     * - options (Object): new rule options (not mandatory).
     *
     * Replace rule by name with new function & options. Throws error if name not
     * found.
     *
     * ##### Options:
     *
     * - __alt__ - array with names of "alternate" chains.
     *
     * ##### Example
     *
     * Replace existing typographer replacement rule with new one:
     *
     * ```javascript
     * var md = require('markdown-it')();
     *
     * md.core.ruler.at('replacements', function replace(state) {
     *   //...
     * });
     * ```
     **/
    Ruler$3.prototype.at = function (name, fn, options) {
      var index = this.__find__(name);
      var opt = options || {};

      if (index === -1) { throw new Error('Parser rule not found: ' + name); }

      this.__rules__[index].fn = fn;
      this.__rules__[index].alt = opt.alt || [];
      this.__cache__ = null;
    };


    /**
     * Ruler.before(beforeName, ruleName, fn [, options])
     * - beforeName (String): new rule will be added before this one.
     * - ruleName (String): name of added rule.
     * - fn (Function): rule function.
     * - options (Object): rule options (not mandatory).
     *
     * Add new rule to chain before one with given name. See also
     * [[Ruler.after]], [[Ruler.push]].
     *
     * ##### Options:
     *
     * - __alt__ - array with names of "alternate" chains.
     *
     * ##### Example
     *
     * ```javascript
     * var md = require('markdown-it')();
     *
     * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
     *   //...
     * });
     * ```
     **/
    Ruler$3.prototype.before = function (beforeName, ruleName, fn, options) {
      var index = this.__find__(beforeName);
      var opt = options || {};

      if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

      this.__rules__.splice(index, 0, {
        name: ruleName,
        enabled: true,
        fn: fn,
        alt: opt.alt || []
      });

      this.__cache__ = null;
    };


    /**
     * Ruler.after(afterName, ruleName, fn [, options])
     * - afterName (String): new rule will be added after this one.
     * - ruleName (String): name of added rule.
     * - fn (Function): rule function.
     * - options (Object): rule options (not mandatory).
     *
     * Add new rule to chain after one with given name. See also
     * [[Ruler.before]], [[Ruler.push]].
     *
     * ##### Options:
     *
     * - __alt__ - array with names of "alternate" chains.
     *
     * ##### Example
     *
     * ```javascript
     * var md = require('markdown-it')();
     *
     * md.inline.ruler.after('text', 'my_rule', function replace(state) {
     *   //...
     * });
     * ```
     **/
    Ruler$3.prototype.after = function (afterName, ruleName, fn, options) {
      var index = this.__find__(afterName);
      var opt = options || {};

      if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

      this.__rules__.splice(index + 1, 0, {
        name: ruleName,
        enabled: true,
        fn: fn,
        alt: opt.alt || []
      });

      this.__cache__ = null;
    };

    /**
     * Ruler.push(ruleName, fn [, options])
     * - ruleName (String): name of added rule.
     * - fn (Function): rule function.
     * - options (Object): rule options (not mandatory).
     *
     * Push new rule to the end of chain. See also
     * [[Ruler.before]], [[Ruler.after]].
     *
     * ##### Options:
     *
     * - __alt__ - array with names of "alternate" chains.
     *
     * ##### Example
     *
     * ```javascript
     * var md = require('markdown-it')();
     *
     * md.core.ruler.push('my_rule', function replace(state) {
     *   //...
     * });
     * ```
     **/
    Ruler$3.prototype.push = function (ruleName, fn, options) {
      var opt = options || {};

      this.__rules__.push({
        name: ruleName,
        enabled: true,
        fn: fn,
        alt: opt.alt || []
      });

      this.__cache__ = null;
    };


    /**
     * Ruler.enable(list [, ignoreInvalid]) -> Array
     * - list (String|Array): list of rule names to enable.
     * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
     *
     * Enable rules with given names. If any rule name not found - throw Error.
     * Errors can be disabled by second param.
     *
     * Returns list of found rule names (if no exception happened).
     *
     * See also [[Ruler.disable]], [[Ruler.enableOnly]].
     **/
    Ruler$3.prototype.enable = function (list, ignoreInvalid) {
      if (!Array.isArray(list)) { list = [ list ]; }

      var result = [];

      // Search by name and enable
      list.forEach(function (name) {
        var idx = this.__find__(name);

        if (idx < 0) {
          if (ignoreInvalid) { return; }
          throw new Error('Rules manager: invalid rule name ' + name);
        }
        this.__rules__[idx].enabled = true;
        result.push(name);
      }, this);

      this.__cache__ = null;
      return result;
    };


    /**
     * Ruler.enableOnly(list [, ignoreInvalid])
     * - list (String|Array): list of rule names to enable (whitelist).
     * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
     *
     * Enable rules with given names, and disable everything else. If any rule name
     * not found - throw Error. Errors can be disabled by second param.
     *
     * See also [[Ruler.disable]], [[Ruler.enable]].
     **/
    Ruler$3.prototype.enableOnly = function (list, ignoreInvalid) {
      if (!Array.isArray(list)) { list = [ list ]; }

      this.__rules__.forEach(function (rule) { rule.enabled = false; });

      this.enable(list, ignoreInvalid);
    };


    /**
     * Ruler.disable(list [, ignoreInvalid]) -> Array
     * - list (String|Array): list of rule names to disable.
     * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
     *
     * Disable rules with given names. If any rule name not found - throw Error.
     * Errors can be disabled by second param.
     *
     * Returns list of found rule names (if no exception happened).
     *
     * See also [[Ruler.enable]], [[Ruler.enableOnly]].
     **/
    Ruler$3.prototype.disable = function (list, ignoreInvalid) {
      if (!Array.isArray(list)) { list = [ list ]; }

      var result = [];

      // Search by name and disable
      list.forEach(function (name) {
        var idx = this.__find__(name);

        if (idx < 0) {
          if (ignoreInvalid) { return; }
          throw new Error('Rules manager: invalid rule name ' + name);
        }
        this.__rules__[idx].enabled = false;
        result.push(name);
      }, this);

      this.__cache__ = null;
      return result;
    };


    /**
     * Ruler.getRules(chainName) -> Array
     *
     * Return array of active functions (rules) for given chain name. It analyzes
     * rules configuration, compiles caches if not exists and returns result.
     *
     * Default chain name is `''` (empty string). It can't be skipped. That's
     * done intentionally, to keep signature monomorphic for high speed.
     **/
    Ruler$3.prototype.getRules = function (chainName) {
      if (this.__cache__ === null) {
        this.__compile__();
      }

      // Chain can be empty, if rules disabled. But we still have to return Array.
      return this.__cache__[chainName] || [];
    };

    var ruler = Ruler$3;

    // https://spec.commonmark.org/0.29/#line-ending
    var NEWLINES_RE  = /\r\n?|\n/g;
    var NULL_RE      = /\0/g;


    var normalize = function normalize(state) {
      var str;

      // Normalize newlines
      str = state.src.replace(NEWLINES_RE, '\n');

      // Replace NULL characters
      str = str.replace(NULL_RE, '\uFFFD');

      state.src = str;
    };

    var block = function block(state) {
      var token;

      if (state.inlineMode) {
        token          = new state.Token('inline', '', 0);
        token.content  = state.src;
        token.map      = [ 0, 1 ];
        token.children = [];
        state.tokens.push(token);
      } else {
        state.md.block.parse(state.src, state.md, state.env, state.tokens);
      }
    };

    var inline = function inline(state) {
      var tokens = state.tokens, tok, i, l;

      // Parse inlines
      for (i = 0, l = tokens.length; i < l; i++) {
        tok = tokens[i];
        if (tok.type === 'inline') {
          state.md.inline.parse(tok.content, state.md, state.env, tok.children);
        }
      }
    };

    var arrayReplaceAt = utils$1.arrayReplaceAt;


    function isLinkOpen$1(str) {
      return /^<a[>\s]/i.test(str);
    }
    function isLinkClose$1(str) {
      return /^<\/a\s*>/i.test(str);
    }


    var linkify$1 = function linkify(state) {
      var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos,
          level, htmlLinkLevel, url, fullUrl, urlText,
          blockTokens = state.tokens,
          links;

      if (!state.md.options.linkify) { return; }

      for (j = 0, l = blockTokens.length; j < l; j++) {
        if (blockTokens[j].type !== 'inline' ||
            !state.md.linkify.pretest(blockTokens[j].content)) {
          continue;
        }

        tokens = blockTokens[j].children;

        htmlLinkLevel = 0;

        // We scan from the end, to keep position when new tags added.
        // Use reversed logic in links start/end match
        for (i = tokens.length - 1; i >= 0; i--) {
          currentToken = tokens[i];

          // Skip content of markdown links
          if (currentToken.type === 'link_close') {
            i--;
            while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
              i--;
            }
            continue;
          }

          // Skip content of html tag links
          if (currentToken.type === 'html_inline') {
            if (isLinkOpen$1(currentToken.content) && htmlLinkLevel > 0) {
              htmlLinkLevel--;
            }
            if (isLinkClose$1(currentToken.content)) {
              htmlLinkLevel++;
            }
          }
          if (htmlLinkLevel > 0) { continue; }

          if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {

            text = currentToken.content;
            links = state.md.linkify.match(text);

            // Now split string to nodes
            nodes = [];
            level = currentToken.level;
            lastPos = 0;

            // forbid escape sequence at the start of the string,
            // this avoids http\://example.com/ from being linkified as
            // http:<a href="//example.com/">//example.com/</a>
            if (links.length > 0 &&
                links[0].index === 0 &&
                i > 0 &&
                tokens[i - 1].type === 'text_special') {
              links = links.slice(1);
            }

            for (ln = 0; ln < links.length; ln++) {
              url = links[ln].url;
              fullUrl = state.md.normalizeLink(url);
              if (!state.md.validateLink(fullUrl)) { continue; }

              urlText = links[ln].text;

              // Linkifier might send raw hostnames like "example.com", where url
              // starts with domain name. So we prepend http:// in those cases,
              // and remove it afterwards.
              //
              if (!links[ln].schema) {
                urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
              } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
                urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
              } else {
                urlText = state.md.normalizeLinkText(urlText);
              }

              pos = links[ln].index;

              if (pos > lastPos) {
                token         = new state.Token('text', '', 0);
                token.content = text.slice(lastPos, pos);
                token.level   = level;
                nodes.push(token);
              }

              token         = new state.Token('link_open', 'a', 1);
              token.attrs   = [ [ 'href', fullUrl ] ];
              token.level   = level++;
              token.markup  = 'linkify';
              token.info    = 'auto';
              nodes.push(token);

              token         = new state.Token('text', '', 0);
              token.content = urlText;
              token.level   = level;
              nodes.push(token);

              token         = new state.Token('link_close', 'a', -1);
              token.level   = --level;
              token.markup  = 'linkify';
              token.info    = 'auto';
              nodes.push(token);

              lastPos = links[ln].lastIndex;
            }
            if (lastPos < text.length) {
              token         = new state.Token('text', '', 0);
              token.content = text.slice(lastPos);
              token.level   = level;
              nodes.push(token);
            }

            // replace current node
            blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
          }
        }
      }
    };

    // TODO:
    // - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
    // - multiplications 2 x 4 -> 2 × 4

    var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

    // Workaround for phantomjs - need regex without /g flag,
    // or root check will fail every second time
    var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;

    var SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
    var SCOPED_ABBR = {
      c: '©',
      r: '®',
      tm: '™'
    };

    function replaceFn(match, name) {
      return SCOPED_ABBR[name.toLowerCase()];
    }

    function replace_scoped(inlineTokens) {
      var i, token, inside_autolink = 0;

      for (i = inlineTokens.length - 1; i >= 0; i--) {
        token = inlineTokens[i];

        if (token.type === 'text' && !inside_autolink) {
          token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
        }

        if (token.type === 'link_open' && token.info === 'auto') {
          inside_autolink--;
        }

        if (token.type === 'link_close' && token.info === 'auto') {
          inside_autolink++;
        }
      }
    }

    function replace_rare(inlineTokens) {
      var i, token, inside_autolink = 0;

      for (i = inlineTokens.length - 1; i >= 0; i--) {
        token = inlineTokens[i];

        if (token.type === 'text' && !inside_autolink) {
          if (RARE_RE.test(token.content)) {
            token.content = token.content
              .replace(/\+-/g, '±')
              // .., ..., ....... -> …
              // but ?..... & !..... -> ?.. & !..
              .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
              .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
              // em-dash
              .replace(/(^|[^-])---(?=[^-]|$)/mg, '$1\u2014')
              // en-dash
              .replace(/(^|\s)--(?=\s|$)/mg, '$1\u2013')
              .replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, '$1\u2013');
          }
        }

        if (token.type === 'link_open' && token.info === 'auto') {
          inside_autolink--;
        }

        if (token.type === 'link_close' && token.info === 'auto') {
          inside_autolink++;
        }
      }
    }


    var replacements = function replace(state) {
      var blkIdx;

      if (!state.md.options.typographer) { return; }

      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

        if (state.tokens[blkIdx].type !== 'inline') { continue; }

        if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
          replace_scoped(state.tokens[blkIdx].children);
        }

        if (RARE_RE.test(state.tokens[blkIdx].content)) {
          replace_rare(state.tokens[blkIdx].children);
        }

      }
    };

    var isWhiteSpace$1   = utils$1.isWhiteSpace;
    var isPunctChar$1    = utils$1.isPunctChar;
    var isMdAsciiPunct$1 = utils$1.isMdAsciiPunct;

    var QUOTE_TEST_RE = /['"]/;
    var QUOTE_RE = /['"]/g;
    var APOSTROPHE = '\u2019'; /* ’ */


    function replaceAt(str, index, ch) {
      return str.slice(0, index) + ch + str.slice(index + 1);
    }

    function process_inlines(tokens, state) {
      var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar,
          isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace,
          canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;

      stack = [];

      for (i = 0; i < tokens.length; i++) {
        token = tokens[i];

        thisLevel = tokens[i].level;

        for (j = stack.length - 1; j >= 0; j--) {
          if (stack[j].level <= thisLevel) { break; }
        }
        stack.length = j + 1;

        if (token.type !== 'text') { continue; }

        text = token.content;
        pos = 0;
        max = text.length;

        /*eslint no-labels:0,block-scoped-var:0*/
        OUTER:
        while (pos < max) {
          QUOTE_RE.lastIndex = pos;
          t = QUOTE_RE.exec(text);
          if (!t) { break; }

          canOpen = canClose = true;
          pos = t.index + 1;
          isSingle = (t[0] === "'");

          // Find previous character,
          // default to space if it's the beginning of the line
          //
          lastChar = 0x20;

          if (t.index - 1 >= 0) {
            lastChar = text.charCodeAt(t.index - 1);
          } else {
            for (j = i - 1; j >= 0; j--) {
              if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20
              if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'

              lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
              break;
            }
          }

          // Find next character,
          // default to space if it's the end of the line
          //
          nextChar = 0x20;

          if (pos < max) {
            nextChar = text.charCodeAt(pos);
          } else {
            for (j = i + 1; j < tokens.length; j++) {
              if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20
              if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'

              nextChar = tokens[j].content.charCodeAt(0);
              break;
            }
          }

          isLastPunctChar = isMdAsciiPunct$1(lastChar) || isPunctChar$1(String.fromCharCode(lastChar));
          isNextPunctChar = isMdAsciiPunct$1(nextChar) || isPunctChar$1(String.fromCharCode(nextChar));

          isLastWhiteSpace = isWhiteSpace$1(lastChar);
          isNextWhiteSpace = isWhiteSpace$1(nextChar);

          if (isNextWhiteSpace) {
            canOpen = false;
          } else if (isNextPunctChar) {
            if (!(isLastWhiteSpace || isLastPunctChar)) {
              canOpen = false;
            }
          }

          if (isLastWhiteSpace) {
            canClose = false;
          } else if (isLastPunctChar) {
            if (!(isNextWhiteSpace || isNextPunctChar)) {
              canClose = false;
            }
          }

          if (nextChar === 0x22 /* " */ && t[0] === '"') {
            if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
              // special case: 1"" - count first quote as an inch
              canClose = canOpen = false;
            }
          }

          if (canOpen && canClose) {
            // Replace quotes in the middle of punctuation sequence, but not
            // in the middle of the words, i.e.:
            //
            // 1. foo " bar " baz - not replaced
            // 2. foo-"-bar-"-baz - replaced
            // 3. foo"bar"baz     - not replaced
            //
            canOpen = isLastPunctChar;
            canClose = isNextPunctChar;
          }

          if (!canOpen && !canClose) {
            // middle of word
            if (isSingle) {
              token.content = replaceAt(token.content, t.index, APOSTROPHE);
            }
            continue;
          }

          if (canClose) {
            // this could be a closing quote, rewind the stack to get a match
            for (j = stack.length - 1; j >= 0; j--) {
              item = stack[j];
              if (stack[j].level < thisLevel) { break; }
              if (item.single === isSingle && stack[j].level === thisLevel) {
                item = stack[j];

                if (isSingle) {
                  openQuote = state.md.options.quotes[2];
                  closeQuote = state.md.options.quotes[3];
                } else {
                  openQuote = state.md.options.quotes[0];
                  closeQuote = state.md.options.quotes[1];
                }

                // replace token.content *before* tokens[item.token].content,
                // because, if they are pointing at the same token, replaceAt
                // could mess up indices when quote length != 1
                token.content = replaceAt(token.content, t.index, closeQuote);
                tokens[item.token].content = replaceAt(
                  tokens[item.token].content, item.pos, openQuote);

                pos += closeQuote.length - 1;
                if (item.token === i) { pos += openQuote.length - 1; }

                text = token.content;
                max = text.length;

                stack.length = j;
                continue OUTER;
              }
            }
          }

          if (canOpen) {
            stack.push({
              token: i,
              pos: t.index,
              single: isSingle,
              level: thisLevel
            });
          } else if (canClose && isSingle) {
            token.content = replaceAt(token.content, t.index, APOSTROPHE);
          }
        }
      }
    }


    var smartquotes = function smartquotes(state) {
      /*eslint max-depth:0*/
      var blkIdx;

      if (!state.md.options.typographer) { return; }

      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

        if (state.tokens[blkIdx].type !== 'inline' ||
            !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
          continue;
        }

        process_inlines(state.tokens[blkIdx].children, state);
      }
    };

    var text_join = function text_join(state) {
      var j, l, tokens, curr, max, last,
          blockTokens = state.tokens;

      for (j = 0, l = blockTokens.length; j < l; j++) {
        if (blockTokens[j].type !== 'inline') continue;

        tokens = blockTokens[j].children;
        max = tokens.length;

        for (curr = 0; curr < max; curr++) {
          if (tokens[curr].type === 'text_special') {
            tokens[curr].type = 'text';
          }
        }

        for (curr = last = 0; curr < max; curr++) {
          if (tokens[curr].type === 'text' &&
              curr + 1 < max &&
              tokens[curr + 1].type === 'text') {

            // collapse two adjacent text nodes
            tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
          } else {
            if (curr !== last) { tokens[last] = tokens[curr]; }

            last++;
          }
        }

        if (curr !== last) {
          tokens.length = last;
        }
      }
    };

    /**
     * class Token
     **/

    /**
     * new Token(type, tag, nesting)
     *
     * Create new token and fill passed properties.
     **/
    function Token$3(type, tag, nesting) {
      /**
       * Token#type -> String
       *
       * Type of the token (string, e.g. "paragraph_open")
       **/
      this.type     = type;

      /**
       * Token#tag -> String
       *
       * html tag name, e.g. "p"
       **/
      this.tag      = tag;

      /**
       * Token#attrs -> Array
       *
       * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
       **/
      this.attrs    = null;

      /**
       * Token#map -> Array
       *
       * Source map info. Format: `[ line_begin, line_end ]`
       **/
      this.map      = null;

      /**
       * Token#nesting -> Number
       *
       * Level change (number in {-1, 0, 1} set), where:
       *
       * -  `1` means the tag is opening
       * -  `0` means the tag is self-closing
       * - `-1` means the tag is closing
       **/
      this.nesting  = nesting;

      /**
       * Token#level -> Number
       *
       * nesting level, the same as `state.level`
       **/
      this.level    = 0;

      /**
       * Token#children -> Array
       *
       * An array of child nodes (inline and img tokens)
       **/
      this.children = null;

      /**
       * Token#content -> String
       *
       * In a case of self-closing tag (code, html, fence, etc.),
       * it has contents of this tag.
       **/
      this.content  = '';

      /**
       * Token#markup -> String
       *
       * '*' or '_' for emphasis, fence string for fence, etc.
       **/
      this.markup   = '';

      /**
       * Token#info -> String
       *
       * Additional information:
       *
       * - Info string for "fence" tokens
       * - The value "auto" for autolink "link_open" and "link_close" tokens
       * - The string value of the item marker for ordered-list "list_item_open" tokens
       **/
      this.info     = '';

      /**
       * Token#meta -> Object
       *
       * A place for plugins to store an arbitrary data
       **/
      this.meta     = null;

      /**
       * Token#block -> Boolean
       *
       * True for block-level tokens, false for inline tokens.
       * Used in renderer to calculate line breaks
       **/
      this.block    = false;

      /**
       * Token#hidden -> Boolean
       *
       * If it's true, ignore this element when rendering. Used for tight lists
       * to hide paragraphs.
       **/
      this.hidden   = false;
    }


    /**
     * Token.attrIndex(name) -> Number
     *
     * Search attribute index by name.
     **/
    Token$3.prototype.attrIndex = function attrIndex(name) {
      var attrs, i, len;

      if (!this.attrs) { return -1; }

      attrs = this.attrs;

      for (i = 0, len = attrs.length; i < len; i++) {
        if (attrs[i][0] === name) { return i; }
      }
      return -1;
    };


    /**
     * Token.attrPush(attrData)
     *
     * Add `[ name, value ]` attribute to list. Init attrs if necessary
     **/
    Token$3.prototype.attrPush = function attrPush(attrData) {
      if (this.attrs) {
        this.attrs.push(attrData);
      } else {
        this.attrs = [ attrData ];
      }
    };


    /**
     * Token.attrSet(name, value)
     *
     * Set `name` attribute to `value`. Override old value if exists.
     **/
    Token$3.prototype.attrSet = function attrSet(name, value) {
      var idx = this.attrIndex(name),
          attrData = [ name, value ];

      if (idx < 0) {
        this.attrPush(attrData);
      } else {
        this.attrs[idx] = attrData;
      }
    };


    /**
     * Token.attrGet(name)
     *
     * Get the value of attribute `name`, or null if it does not exist.
     **/
    Token$3.prototype.attrGet = function attrGet(name) {
      var idx = this.attrIndex(name), value = null;
      if (idx >= 0) {
        value = this.attrs[idx][1];
      }
      return value;
    };


    /**
     * Token.attrJoin(name, value)
     *
     * Join value to existing attribute via space. Or create new attribute if not
     * exists. Useful to operate with token classes.
     **/
    Token$3.prototype.attrJoin = function attrJoin(name, value) {
      var idx = this.attrIndex(name);

      if (idx < 0) {
        this.attrPush([ name, value ]);
      } else {
        this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
      }
    };


    var token = Token$3;

    var Token$2 = token;


    function StateCore(src, md, env) {
      this.src = src;
      this.env = env;
      this.tokens = [];
      this.inlineMode = false;
      this.md = md; // link to parser instance
    }

    // re-export Token class to use in core rules
    StateCore.prototype.Token = Token$2;


    var state_core = StateCore;

    /** internal
     * class Core
     *
     * Top-level rules executor. Glues block/inline parsers and does intermediate
     * transformations.
     **/


    var Ruler$2  = ruler;


    var _rules$2 = [
      [ 'normalize',      normalize      ],
      [ 'block',          block          ],
      [ 'inline',         inline         ],
      [ 'linkify',        linkify$1        ],
      [ 'replacements',   replacements   ],
      [ 'smartquotes',    smartquotes    ],
      // `text_join` finds `text_special` tokens (for escape sequences)
      // and joins them with the rest of the text
      [ 'text_join',      text_join      ]
    ];


    /**
     * new Core()
     **/
    function Core() {
      /**
       * Core#ruler -> Ruler
       *
       * [[Ruler]] instance. Keep configuration of core rules.
       **/
      this.ruler = new Ruler$2();

      for (var i = 0; i < _rules$2.length; i++) {
        this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
      }
    }


    /**
     * Core.process(state)
     *
     * Executes core chain rules.
     **/
    Core.prototype.process = function (state) {
      var i, l, rules;

      rules = this.ruler.getRules('');

      for (i = 0, l = rules.length; i < l; i++) {
        rules[i](state);
      }
    };

    Core.prototype.State = state_core;


    var parser_core = Core;

    var isSpace$a = utils$1.isSpace;


    function getLine(state, line) {
      var pos = state.bMarks[line] + state.tShift[line],
          max = state.eMarks[line];

      return state.src.slice(pos, max);
    }

    function escapedSplit(str) {
      var result = [],
          pos = 0,
          max = str.length,
          ch,
          isEscaped = false,
          lastPos = 0,
          current = '';

      ch  = str.charCodeAt(pos);

      while (pos < max) {
        if (ch === 0x7c/* | */) {
          if (!isEscaped) {
            // pipe separating cells, '|'
            result.push(current + str.substring(lastPos, pos));
            current = '';
            lastPos = pos + 1;
          } else {
            // escaped pipe, '\|'
            current += str.substring(lastPos, pos - 1);
            lastPos = pos;
          }
        }

        isEscaped = (ch === 0x5c/* \ */);
        pos++;

        ch = str.charCodeAt(pos);
      }

      result.push(current + str.substring(lastPos));

      return result;
    }


    var table = function table(state, startLine, endLine, silent) {
      var ch, lineText, pos, i, l, nextLine, columns, columnCount, token,
          aligns, t, tableLines, tbodyLines, oldParentType, terminate,
          terminatorRules, firstCh, secondCh;

      // should have at least two lines
      if (startLine + 2 > endLine) { return false; }

      nextLine = startLine + 1;

      if (state.sCount[nextLine] < state.blkIndent) { return false; }

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[nextLine] - state.blkIndent >= 4) { return false; }

      // first character of the second line should be '|', '-', ':',
      // and no other characters are allowed but spaces;
      // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      if (pos >= state.eMarks[nextLine]) { return false; }

      firstCh = state.src.charCodeAt(pos++);
      if (firstCh !== 0x7C/* | */ && firstCh !== 0x2D/* - */ && firstCh !== 0x3A/* : */) { return false; }

      if (pos >= state.eMarks[nextLine]) { return false; }

      secondCh = state.src.charCodeAt(pos++);
      if (secondCh !== 0x7C/* | */ && secondCh !== 0x2D/* - */ && secondCh !== 0x3A/* : */ && !isSpace$a(secondCh)) {
        return false;
      }

      // if first character is '-', then second character must not be a space
      // (due to parsing ambiguity with list)
      if (firstCh === 0x2D/* - */ && isSpace$a(secondCh)) { return false; }

      while (pos < state.eMarks[nextLine]) {
        ch = state.src.charCodeAt(pos);

        if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace$a(ch)) { return false; }

        pos++;
      }

      lineText = getLine(state, startLine + 1);

      columns = lineText.split('|');
      aligns = [];
      for (i = 0; i < columns.length; i++) {
        t = columns[i].trim();
        if (!t) {
          // allow empty columns before and after table, but not in between columns;
          // e.g. allow ` |---| `, disallow ` ---||--- `
          if (i === 0 || i === columns.length - 1) {
            continue;
          } else {
            return false;
          }
        }

        if (!/^:?-+:?$/.test(t)) { return false; }
        if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
          aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
        } else if (t.charCodeAt(0) === 0x3A/* : */) {
          aligns.push('left');
        } else {
          aligns.push('');
        }
      }

      lineText = getLine(state, startLine).trim();
      if (lineText.indexOf('|') === -1) { return false; }
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }
      columns = escapedSplit(lineText);
      if (columns.length && columns[0] === '') columns.shift();
      if (columns.length && columns[columns.length - 1] === '') columns.pop();

      // header row will define an amount of columns in the entire table,
      // and align row should be exactly the same (the rest of the rows can differ)
      columnCount = columns.length;
      if (columnCount === 0 || columnCount !== aligns.length) { return false; }

      if (silent) { return true; }

      oldParentType = state.parentType;
      state.parentType = 'table';

      // use 'blockquote' lists for termination because it's
      // the most similar to tables
      terminatorRules = state.md.block.ruler.getRules('blockquote');

      token     = state.push('table_open', 'table', 1);
      token.map = tableLines = [ startLine, 0 ];

      token     = state.push('thead_open', 'thead', 1);
      token.map = [ startLine, startLine + 1 ];

      token     = state.push('tr_open', 'tr', 1);
      token.map = [ startLine, startLine + 1 ];

      for (i = 0; i < columns.length; i++) {
        token          = state.push('th_open', 'th', 1);
        if (aligns[i]) {
          token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
        }

        token          = state.push('inline', '', 0);
        token.content  = columns[i].trim();
        token.children = [];

        token          = state.push('th_close', 'th', -1);
      }

      token     = state.push('tr_close', 'tr', -1);
      token     = state.push('thead_close', 'thead', -1);

      for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) { break; }

        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }

        if (terminate) { break; }
        lineText = getLine(state, nextLine).trim();
        if (!lineText) { break; }
        if (state.sCount[nextLine] - state.blkIndent >= 4) { break; }
        columns = escapedSplit(lineText);
        if (columns.length && columns[0] === '') columns.shift();
        if (columns.length && columns[columns.length - 1] === '') columns.pop();

        if (nextLine === startLine + 2) {
          token     = state.push('tbody_open', 'tbody', 1);
          token.map = tbodyLines = [ startLine + 2, 0 ];
        }

        token     = state.push('tr_open', 'tr', 1);
        token.map = [ nextLine, nextLine + 1 ];

        for (i = 0; i < columnCount; i++) {
          token          = state.push('td_open', 'td', 1);
          if (aligns[i]) {
            token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
          }

          token          = state.push('inline', '', 0);
          token.content  = columns[i] ? columns[i].trim() : '';
          token.children = [];

          token          = state.push('td_close', 'td', -1);
        }
        token = state.push('tr_close', 'tr', -1);
      }

      if (tbodyLines) {
        token = state.push('tbody_close', 'tbody', -1);
        tbodyLines[1] = nextLine;
      }

      token = state.push('table_close', 'table', -1);
      tableLines[1] = nextLine;

      state.parentType = oldParentType;
      state.line = nextLine;
      return true;
    };

    var code = function code(state, startLine, endLine/*, silent*/) {
      var nextLine, last, token;

      if (state.sCount[startLine] - state.blkIndent < 4) { return false; }

      last = nextLine = startLine + 1;

      while (nextLine < endLine) {
        if (state.isEmpty(nextLine)) {
          nextLine++;
          continue;
        }

        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          nextLine++;
          last = nextLine;
          continue;
        }
        break;
      }

      state.line = last;

      token         = state.push('code_block', 'code', 0);
      token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + '\n';
      token.map     = [ startLine, state.line ];

      return true;
    };

    var fence = function fence(state, startLine, endLine, silent) {
      var marker, len, params, nextLine, mem, token, markup,
          haveEndMarker = false,
          pos = state.bMarks[startLine] + state.tShift[startLine],
          max = state.eMarks[startLine];

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      if (pos + 3 > max) { return false; }

      marker = state.src.charCodeAt(pos);

      if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
        return false;
      }

      // scan marker length
      mem = pos;
      pos = state.skipChars(pos, marker);

      len = pos - mem;

      if (len < 3) { return false; }

      markup = state.src.slice(mem, pos);
      params = state.src.slice(pos, max);

      if (marker === 0x60 /* ` */) {
        if (params.indexOf(String.fromCharCode(marker)) >= 0) {
          return false;
        }
      }

      // Since start is found, we can report success here in validation mode
      if (silent) { return true; }

      // search end of block
      nextLine = startLine;

      for (;;) {
        nextLine++;
        if (nextLine >= endLine) {
          // unclosed block should be autoclosed by end of document.
          // also block seems to be autoclosed by end of parent
          break;
        }

        pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];

        if (pos < max && state.sCount[nextLine] < state.blkIndent) {
          // non-empty line with negative indent should stop the list:
          // - ```
          //  test
          break;
        }

        if (state.src.charCodeAt(pos) !== marker) { continue; }

        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          // closing fence should be indented less than 4 spaces
          continue;
        }

        pos = state.skipChars(pos, marker);

        // closing code fence must be at least as long as the opening one
        if (pos - mem < len) { continue; }

        // make sure tail has spaces only
        pos = state.skipSpaces(pos);

        if (pos < max) { continue; }

        haveEndMarker = true;
        // found!
        break;
      }

      // If a fence has heading spaces, they should be removed from its inner block
      len = state.sCount[startLine];

      state.line = nextLine + (haveEndMarker ? 1 : 0);

      token         = state.push('fence', 'code', 0);
      token.info    = params;
      token.content = state.getLines(startLine + 1, nextLine, len, true);
      token.markup  = markup;
      token.map     = [ startLine, state.line ];

      return true;
    };

    var isSpace$9 = utils$1.isSpace;


    var blockquote = function blockquote(state, startLine, endLine, silent) {
      var adjustTab,
          ch,
          i,
          initial,
          l,
          lastLineEmpty,
          lines,
          nextLine,
          offset,
          oldBMarks,
          oldBSCount,
          oldIndent,
          oldParentType,
          oldSCount,
          oldTShift,
          spaceAfterMarker,
          terminate,
          terminatorRules,
          token,
          isOutdented,
          oldLineMax = state.lineMax,
          pos = state.bMarks[startLine] + state.tShift[startLine],
          max = state.eMarks[startLine];

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      // check the block quote marker
      if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

      // we know that it's going to be a valid blockquote,
      // so no point trying to find the end of it in silent mode
      if (silent) { return true; }

      // set offset past spaces and ">"
      initial = offset = state.sCount[startLine] + 1;

      // skip one optional space after '>'
      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
        // ' >   test '
        //     ^ -- position start of line here:
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
        spaceAfterMarker = true;

        if ((state.bsCount[startLine] + offset) % 4 === 3) {
          // '  >\t  test '
          //       ^ -- position start of line here (tab has width===1)
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          // ' >\t  test '
          //    ^ -- position start of line here + shift bsCount slightly
          //         to make extra space appear
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }

      oldBMarks = [ state.bMarks[startLine] ];
      state.bMarks[startLine] = pos;

      while (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (isSpace$9(ch)) {
          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }

        pos++;
      }

      oldBSCount = [ state.bsCount[startLine] ];
      state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);

      lastLineEmpty = pos >= max;

      oldSCount = [ state.sCount[startLine] ];
      state.sCount[startLine] = offset - initial;

      oldTShift = [ state.tShift[startLine] ];
      state.tShift[startLine] = pos - state.bMarks[startLine];

      terminatorRules = state.md.block.ruler.getRules('blockquote');

      oldParentType = state.parentType;
      state.parentType = 'blockquote';

      // Search the end of the block
      //
      // Block ends with either:
      //  1. an empty line outside:
      //     ```
      //     > test
      //
      //     ```
      //  2. an empty line inside:
      //     ```
      //     >
      //     test
      //     ```
      //  3. another tag:
      //     ```
      //     > test
      //      - - -
      //     ```
      for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
        // check if it's outdented, i.e. it's inside list item and indented
        // less than said list item:
        //
        // ```
        // 1. anything
        //    > current blockquote
        // 2. checking this line
        // ```
        isOutdented = state.sCount[nextLine] < state.blkIndent;

        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];

        if (pos >= max) {
          // Case 1: line is not inside the blockquote, and this line is empty.
          break;
        }

        if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !isOutdented) {
          // This line is inside the blockquote.

          // set offset past spaces and ">"
          initial = offset = state.sCount[nextLine] + 1;

          // skip one optional space after '>'
          if (state.src.charCodeAt(pos) === 0x20 /* space */) {
            // ' >   test '
            //     ^ -- position start of line here:
            pos++;
            initial++;
            offset++;
            adjustTab = false;
            spaceAfterMarker = true;
          } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
            spaceAfterMarker = true;

            if ((state.bsCount[nextLine] + offset) % 4 === 3) {
              // '  >\t  test '
              //       ^ -- position start of line here (tab has width===1)
              pos++;
              initial++;
              offset++;
              adjustTab = false;
            } else {
              // ' >\t  test '
              //    ^ -- position start of line here + shift bsCount slightly
              //         to make extra space appear
              adjustTab = true;
            }
          } else {
            spaceAfterMarker = false;
          }

          oldBMarks.push(state.bMarks[nextLine]);
          state.bMarks[nextLine] = pos;

          while (pos < max) {
            ch = state.src.charCodeAt(pos);

            if (isSpace$9(ch)) {
              if (ch === 0x09) {
                offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
              } else {
                offset++;
              }
            } else {
              break;
            }

            pos++;
          }

          lastLineEmpty = pos >= max;

          oldBSCount.push(state.bsCount[nextLine]);
          state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] = offset - initial;

          oldTShift.push(state.tShift[nextLine]);
          state.tShift[nextLine] = pos - state.bMarks[nextLine];
          continue;
        }

        // Case 2: line is not inside the blockquote, and the last line was empty.
        if (lastLineEmpty) { break; }

        // Case 3: another tag found.
        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }

        if (terminate) {
          // Quirk to enforce "hard termination mode" for paragraphs;
          // normally if you call `tokenize(state, startLine, nextLine)`,
          // paragraphs will look below nextLine for paragraph continuation,
          // but if blockquote is terminated by another tag, they shouldn't
          state.lineMax = nextLine;

          if (state.blkIndent !== 0) {
            // state.blkIndent was non-zero, we now set it to zero,
            // so we need to re-calculate all offsets to appear as
            // if indent wasn't changed
            oldBMarks.push(state.bMarks[nextLine]);
            oldBSCount.push(state.bsCount[nextLine]);
            oldTShift.push(state.tShift[nextLine]);
            oldSCount.push(state.sCount[nextLine]);
            state.sCount[nextLine] -= state.blkIndent;
          }

          break;
        }

        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);

        // A negative indentation means that this is a paragraph continuation
        //
        state.sCount[nextLine] = -1;
      }

      oldIndent = state.blkIndent;
      state.blkIndent = 0;

      token        = state.push('blockquote_open', 'blockquote', 1);
      token.markup = '>';
      token.map    = lines = [ startLine, 0 ];

      state.md.block.tokenize(state, startLine, nextLine);

      token        = state.push('blockquote_close', 'blockquote', -1);
      token.markup = '>';

      state.lineMax = oldLineMax;
      state.parentType = oldParentType;
      lines[1] = state.line;

      // Restore original tShift; this might not be necessary since the parser
      // has already been here, but just to make sure we can do that.
      for (i = 0; i < oldTShift.length; i++) {
        state.bMarks[i + startLine] = oldBMarks[i];
        state.tShift[i + startLine] = oldTShift[i];
        state.sCount[i + startLine] = oldSCount[i];
        state.bsCount[i + startLine] = oldBSCount[i];
      }
      state.blkIndent = oldIndent;

      return true;
    };

    var isSpace$8 = utils$1.isSpace;


    var hr = function hr(state, startLine, endLine, silent) {
      var marker, cnt, ch, token,
          pos = state.bMarks[startLine] + state.tShift[startLine],
          max = state.eMarks[startLine];

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      marker = state.src.charCodeAt(pos++);

      // Check hr marker
      if (marker !== 0x2A/* * */ &&
          marker !== 0x2D/* - */ &&
          marker !== 0x5F/* _ */) {
        return false;
      }

      // markers can be mixed with spaces, but there should be at least 3 of them

      cnt = 1;
      while (pos < max) {
        ch = state.src.charCodeAt(pos++);
        if (ch !== marker && !isSpace$8(ch)) { return false; }
        if (ch === marker) { cnt++; }
      }

      if (cnt < 3) { return false; }

      if (silent) { return true; }

      state.line = startLine + 1;

      token        = state.push('hr', 'hr', 0);
      token.map    = [ startLine, state.line ];
      token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

      return true;
    };

    var isSpace$7 = utils$1.isSpace;


    // Search `[-+*][\n ]`, returns next pos after marker on success
    // or -1 on fail.
    function skipBulletListMarker(state, startLine) {
      var marker, pos, max, ch;

      pos = state.bMarks[startLine] + state.tShift[startLine];
      max = state.eMarks[startLine];

      marker = state.src.charCodeAt(pos++);
      // Check bullet
      if (marker !== 0x2A/* * */ &&
          marker !== 0x2D/* - */ &&
          marker !== 0x2B/* + */) {
        return -1;
      }

      if (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (!isSpace$7(ch)) {
          // " -test " - is not a list item
          return -1;
        }
      }

      return pos;
    }

    // Search `\d+[.)][\n ]`, returns next pos after marker on success
    // or -1 on fail.
    function skipOrderedListMarker(state, startLine) {
      var ch,
          start = state.bMarks[startLine] + state.tShift[startLine],
          pos = start,
          max = state.eMarks[startLine];

      // List marker should have at least 2 chars (digit + dot)
      if (pos + 1 >= max) { return -1; }

      ch = state.src.charCodeAt(pos++);

      if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

      for (;;) {
        // EOL -> fail
        if (pos >= max) { return -1; }

        ch = state.src.charCodeAt(pos++);

        if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {

          // List marker should have no more than 9 digits
          // (prevents integer overflow in browsers)
          if (pos - start >= 10) { return -1; }

          continue;
        }

        // found valid marker
        if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
          break;
        }

        return -1;
      }


      if (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (!isSpace$7(ch)) {
          // " 1.test " - is not a list item
          return -1;
        }
      }
      return pos;
    }

    function markTightParagraphs(state, idx) {
      var i, l,
          level = state.level + 2;

      for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
        if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
          state.tokens[i + 2].hidden = true;
          state.tokens[i].hidden = true;
          i += 2;
        }
      }
    }


    var list = function list(state, startLine, endLine, silent) {
      var ch,
          contentStart,
          i,
          indent,
          indentAfterMarker,
          initial,
          isOrdered,
          itemLines,
          l,
          listLines,
          listTokIdx,
          markerCharCode,
          markerValue,
          max,
          nextLine,
          offset,
          oldListIndent,
          oldParentType,
          oldSCount,
          oldTShift,
          oldTight,
          pos,
          posAfterMarker,
          prevEmptyEnd,
          start,
          terminate,
          terminatorRules,
          token,
          isTerminatingParagraph = false,
          tight = true;

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      // Special case:
      //  - item 1
      //   - item 2
      //    - item 3
      //     - item 4
      //      - this one is a paragraph continuation
      if (state.listIndent >= 0 &&
          state.sCount[startLine] - state.listIndent >= 4 &&
          state.sCount[startLine] < state.blkIndent) {
        return false;
      }

      // limit conditions when list can interrupt
      // a paragraph (validation mode only)
      if (silent && state.parentType === 'paragraph') {
        // Next list item should still terminate previous list item;
        //
        // This code can fail if plugins use blkIndent as well as lists,
        // but I hope the spec gets fixed long before that happens.
        //
        if (state.sCount[startLine] >= state.blkIndent) {
          isTerminatingParagraph = true;
        }
      }

      // Detect list type and position after marker
      if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
        isOrdered = true;
        start = state.bMarks[startLine] + state.tShift[startLine];
        markerValue = Number(state.src.slice(start, posAfterMarker - 1));

        // If we're starting a new ordered list right after
        // a paragraph, it should start with 1.
        if (isTerminatingParagraph && markerValue !== 1) return false;

      } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
        isOrdered = false;

      } else {
        return false;
      }

      // If we're starting a new unordered list right after
      // a paragraph, first line should not be empty.
      if (isTerminatingParagraph) {
        if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
      }

      // We should terminate list on style change. Remember first one to compare.
      markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

      // For validation mode we can terminate immediately
      if (silent) { return true; }

      // Start list
      listTokIdx = state.tokens.length;

      if (isOrdered) {
        token       = state.push('ordered_list_open', 'ol', 1);
        if (markerValue !== 1) {
          token.attrs = [ [ 'start', markerValue ] ];
        }

      } else {
        token       = state.push('bullet_list_open', 'ul', 1);
      }

      token.map    = listLines = [ startLine, 0 ];
      token.markup = String.fromCharCode(markerCharCode);

      //
      // Iterate list items
      //

      nextLine = startLine;
      prevEmptyEnd = false;
      terminatorRules = state.md.block.ruler.getRules('list');

      oldParentType = state.parentType;
      state.parentType = 'list';

      while (nextLine < endLine) {
        pos = posAfterMarker;
        max = state.eMarks[nextLine];

        initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);

        while (pos < max) {
          ch = state.src.charCodeAt(pos);

          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[nextLine]) % 4;
          } else if (ch === 0x20) {
            offset++;
          } else {
            break;
          }

          pos++;
        }

        contentStart = pos;

        if (contentStart >= max) {
          // trimming space in "-    \n  3" case, indent is 1 here
          indentAfterMarker = 1;
        } else {
          indentAfterMarker = offset - initial;
        }

        // If we have more than 4 spaces, the indent is 1
        // (the rest is just indented code block)
        if (indentAfterMarker > 4) { indentAfterMarker = 1; }

        // "  -  test"
        //  ^^^^^ - calculating total length of this thing
        indent = initial + indentAfterMarker;

        // Run subparser & write tokens
        token        = state.push('list_item_open', 'li', 1);
        token.markup = String.fromCharCode(markerCharCode);
        token.map    = itemLines = [ startLine, 0 ];
        if (isOrdered) {
          token.info = state.src.slice(start, posAfterMarker - 1);
        }

        // change current state, then restore it after parser subcall
        oldTight = state.tight;
        oldTShift = state.tShift[startLine];
        oldSCount = state.sCount[startLine];

        //  - example list
        // ^ listIndent position will be here
        //   ^ blkIndent position will be here
        //
        oldListIndent = state.listIndent;
        state.listIndent = state.blkIndent;
        state.blkIndent = indent;

        state.tight = true;
        state.tShift[startLine] = contentStart - state.bMarks[startLine];
        state.sCount[startLine] = offset;

        if (contentStart >= max && state.isEmpty(startLine + 1)) {
          // workaround for this case
          // (list item is empty, list terminates before "foo"):
          // ~~~~~~~~
          //   -
          //
          //     foo
          // ~~~~~~~~
          state.line = Math.min(state.line + 2, endLine);
        } else {
          state.md.block.tokenize(state, startLine, endLine, true);
        }

        // If any of list item is tight, mark list as tight
        if (!state.tight || prevEmptyEnd) {
          tight = false;
        }
        // Item become loose if finish with empty line,
        // but we should filter last element, because it means list finish
        prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

        state.blkIndent = state.listIndent;
        state.listIndent = oldListIndent;
        state.tShift[startLine] = oldTShift;
        state.sCount[startLine] = oldSCount;
        state.tight = oldTight;

        token        = state.push('list_item_close', 'li', -1);
        token.markup = String.fromCharCode(markerCharCode);

        nextLine = startLine = state.line;
        itemLines[1] = nextLine;
        contentStart = state.bMarks[startLine];

        if (nextLine >= endLine) { break; }

        //
        // Try to check if list is terminated or continued.
        //
        if (state.sCount[nextLine] < state.blkIndent) { break; }

        // if it's indented more than 3 spaces, it should be a code block
        if (state.sCount[startLine] - state.blkIndent >= 4) { break; }

        // fail if terminating block found
        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) { break; }

        // fail if list has another type
        if (isOrdered) {
          posAfterMarker = skipOrderedListMarker(state, nextLine);
          if (posAfterMarker < 0) { break; }
          start = state.bMarks[nextLine] + state.tShift[nextLine];
        } else {
          posAfterMarker = skipBulletListMarker(state, nextLine);
          if (posAfterMarker < 0) { break; }
        }

        if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
      }

      // Finalize list
      if (isOrdered) {
        token = state.push('ordered_list_close', 'ol', -1);
      } else {
        token = state.push('bullet_list_close', 'ul', -1);
      }
      token.markup = String.fromCharCode(markerCharCode);

      listLines[1] = nextLine;
      state.line = nextLine;

      state.parentType = oldParentType;

      // mark paragraphs tight if needed
      if (tight) {
        markTightParagraphs(state, listTokIdx);
      }

      return true;
    };

    var normalizeReference$2   = utils$1.normalizeReference;
    var isSpace$6              = utils$1.isSpace;


    var reference = function reference(state, startLine, _endLine, silent) {
      var ch,
          destEndPos,
          destEndLineNo,
          endLine,
          href,
          i,
          l,
          label,
          labelEnd,
          oldParentType,
          res,
          start,
          str,
          terminate,
          terminatorRules,
          title,
          lines = 0,
          pos = state.bMarks[startLine] + state.tShift[startLine],
          max = state.eMarks[startLine],
          nextLine = startLine + 1;

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false; }

      // Simple check to quickly interrupt scan on [link](url) at the start of line.
      // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54
      while (++pos < max) {
        if (state.src.charCodeAt(pos) === 0x5D /* ] */ &&
            state.src.charCodeAt(pos - 1) !== 0x5C/* \ */) {
          if (pos + 1 === max) { return false; }
          if (state.src.charCodeAt(pos + 1) !== 0x3A/* : */) { return false; }
          break;
        }
      }

      endLine = state.lineMax;

      // jump line-by-line until empty one or EOF
      terminatorRules = state.md.block.ruler.getRules('reference');

      oldParentType = state.parentType;
      state.parentType = 'reference';

      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        // this would be a code block normally, but after paragraph
        // it's considered a lazy continuation regardless of what's there
        if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

        // quirk for blockquotes, this line should already be checked by that rule
        if (state.sCount[nextLine] < 0) { continue; }

        // Some tags can terminate paragraph without empty line.
        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) { break; }
      }

      str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      max = str.length;

      for (pos = 1; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 0x5B /* [ */) {
          return false;
        } else if (ch === 0x5D /* ] */) {
          labelEnd = pos;
          break;
        } else if (ch === 0x0A /* \n */) {
          lines++;
        } else if (ch === 0x5C /* \ */) {
          pos++;
          if (pos < max && str.charCodeAt(pos) === 0x0A) {
            lines++;
          }
        }
      }

      if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false; }

      // [label]:   destination   'title'
      //         ^^^ skip optional whitespace here
      for (pos = labelEnd + 2; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 0x0A) {
          lines++;
        } else if (isSpace$6(ch)) ; else {
          break;
        }
      }

      // [label]:   destination   'title'
      //            ^^^^^^^^^^^ parse this
      res = state.md.helpers.parseLinkDestination(str, pos, max);
      if (!res.ok) { return false; }

      href = state.md.normalizeLink(res.str);
      if (!state.md.validateLink(href)) { return false; }

      pos = res.pos;
      lines += res.lines;

      // save cursor state, we could require to rollback later
      destEndPos = pos;
      destEndLineNo = lines;

      // [label]:   destination   'title'
      //                       ^^^ skipping those spaces
      start = pos;
      for (; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 0x0A) {
          lines++;
        } else if (isSpace$6(ch)) ; else {
          break;
        }
      }

      // [label]:   destination   'title'
      //                          ^^^^^^^ parse this
      res = state.md.helpers.parseLinkTitle(str, pos, max);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        lines += res.lines;
      } else {
        title = '';
        pos = destEndPos;
        lines = destEndLineNo;
      }

      // skip trailing spaces until the rest of the line
      while (pos < max) {
        ch = str.charCodeAt(pos);
        if (!isSpace$6(ch)) { break; }
        pos++;
      }

      if (pos < max && str.charCodeAt(pos) !== 0x0A) {
        if (title) {
          // garbage at the end of the line after title,
          // but it could still be a valid reference if we roll back
          title = '';
          pos = destEndPos;
          lines = destEndLineNo;
          while (pos < max) {
            ch = str.charCodeAt(pos);
            if (!isSpace$6(ch)) { break; }
            pos++;
          }
        }
      }

      if (pos < max && str.charCodeAt(pos) !== 0x0A) {
        // garbage at the end of the line
        return false;
      }

      label = normalizeReference$2(str.slice(1, labelEnd));
      if (!label) {
        // CommonMark 0.20 disallows empty labels
        return false;
      }

      // Reference can not terminate anything. This check is for safety only.
      /*istanbul ignore if*/
      if (silent) { return true; }

      if (typeof state.env.references === 'undefined') {
        state.env.references = {};
      }
      if (typeof state.env.references[label] === 'undefined') {
        state.env.references[label] = { title: title, href: href };
      }

      state.parentType = oldParentType;

      state.line = startLine + lines + 1;
      return true;
    };

    var html_blocks = [
      'address',
      'article',
      'aside',
      'base',
      'basefont',
      'blockquote',
      'body',
      'caption',
      'center',
      'col',
      'colgroup',
      'dd',
      'details',
      'dialog',
      'dir',
      'div',
      'dl',
      'dt',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'frame',
      'frameset',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hr',
      'html',
      'iframe',
      'legend',
      'li',
      'link',
      'main',
      'menu',
      'menuitem',
      'nav',
      'noframes',
      'ol',
      'optgroup',
      'option',
      'p',
      'param',
      'section',
      'source',
      'summary',
      'table',
      'tbody',
      'td',
      'tfoot',
      'th',
      'thead',
      'title',
      'tr',
      'track',
      'ul'
    ];

    var html_re = {};

    var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

    var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
    var single_quoted = "'[^']*'";
    var double_quoted = '"[^"]*"';

    var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

    var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

    var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

    var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
    var comment     = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
    var processing  = '<[?][\\s\\S]*?[?]>';
    var declaration = '<![A-Z]+\\s+[^>]*>';
    var cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

    var HTML_TAG_RE$1 = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                            '|' + processing + '|' + declaration + '|' + cdata + ')');
    var HTML_OPEN_CLOSE_TAG_RE$1 = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

    html_re.HTML_TAG_RE = HTML_TAG_RE$1;
    html_re.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE$1;

    var block_names = html_blocks;
    var HTML_OPEN_CLOSE_TAG_RE = html_re.HTML_OPEN_CLOSE_TAG_RE;

    // An array of opening and corresponding closing sequences for html tags,
    // last argument defines whether it can terminate a paragraph or not
    //
    var HTML_SEQUENCES = [
      [ /^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true ],
      [ /^<!--/,        /-->/,   true ],
      [ /^<\?/,         /\?>/,   true ],
      [ /^<![A-Z]/,     />/,     true ],
      [ /^<!\[CDATA\[/, /\]\]>/, true ],
      [ new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true ],
      [ new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false ]
    ];


    var html_block = function html_block(state, startLine, endLine, silent) {
      var i, nextLine, token, lineText,
          pos = state.bMarks[startLine] + state.tShift[startLine],
          max = state.eMarks[startLine];

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      if (!state.md.options.html) { return false; }

      if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

      lineText = state.src.slice(pos, max);

      for (i = 0; i < HTML_SEQUENCES.length; i++) {
        if (HTML_SEQUENCES[i][0].test(lineText)) { break; }
      }

      if (i === HTML_SEQUENCES.length) { return false; }

      if (silent) {
        // true if this sequence can be a terminator, false otherwise
        return HTML_SEQUENCES[i][2];
      }

      nextLine = startLine + 1;

      // If we are here - we detected HTML block.
      // Let's roll down till block end.
      if (!HTML_SEQUENCES[i][1].test(lineText)) {
        for (; nextLine < endLine; nextLine++) {
          if (state.sCount[nextLine] < state.blkIndent) { break; }

          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          lineText = state.src.slice(pos, max);

          if (HTML_SEQUENCES[i][1].test(lineText)) {
            if (lineText.length !== 0) { nextLine++; }
            break;
          }
        }
      }

      state.line = nextLine;

      token         = state.push('html_block', '', 0);
      token.map     = [ startLine, nextLine ];
      token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

      return true;
    };

    var isSpace$5 = utils$1.isSpace;


    var heading = function heading(state, startLine, endLine, silent) {
      var ch, level, tmp, token,
          pos = state.bMarks[startLine] + state.tShift[startLine],
          max = state.eMarks[startLine];

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      ch  = state.src.charCodeAt(pos);

      if (ch !== 0x23/* # */ || pos >= max) { return false; }

      // count heading level
      level = 1;
      ch = state.src.charCodeAt(++pos);
      while (ch === 0x23/* # */ && pos < max && level <= 6) {
        level++;
        ch = state.src.charCodeAt(++pos);
      }

      if (level > 6 || (pos < max && !isSpace$5(ch))) { return false; }

      if (silent) { return true; }

      // Let's cut tails like '    ###  ' from the end of string

      max = state.skipSpacesBack(max, pos);
      tmp = state.skipCharsBack(max, 0x23, pos); // #
      if (tmp > pos && isSpace$5(state.src.charCodeAt(tmp - 1))) {
        max = tmp;
      }

      state.line = startLine + 1;

      token        = state.push('heading_open', 'h' + String(level), 1);
      token.markup = '########'.slice(0, level);
      token.map    = [ startLine, state.line ];

      token          = state.push('inline', '', 0);
      token.content  = state.src.slice(pos, max).trim();
      token.map      = [ startLine, state.line ];
      token.children = [];

      token        = state.push('heading_close', 'h' + String(level), -1);
      token.markup = '########'.slice(0, level);

      return true;
    };

    var lheading = function lheading(state, startLine, endLine/*, silent*/) {
      var content, terminate, i, l, token, pos, max, level, marker,
          nextLine = startLine + 1, oldParentType,
          terminatorRules = state.md.block.ruler.getRules('paragraph');

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

      oldParentType = state.parentType;
      state.parentType = 'paragraph'; // use paragraph to match terminatorRules

      // jump line-by-line until empty one or EOF
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        // this would be a code block normally, but after paragraph
        // it's considered a lazy continuation regardless of what's there
        if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

        //
        // Check for underline in setext header
        //
        if (state.sCount[nextLine] >= state.blkIndent) {
          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];

          if (pos < max) {
            marker = state.src.charCodeAt(pos);

            if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
              pos = state.skipChars(pos, marker);
              pos = state.skipSpaces(pos);

              if (pos >= max) {
                level = (marker === 0x3D/* = */ ? 1 : 2);
                break;
              }
            }
          }
        }

        // quirk for blockquotes, this line should already be checked by that rule
        if (state.sCount[nextLine] < 0) { continue; }

        // Some tags can terminate paragraph without empty line.
        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) { break; }
      }

      if (!level) {
        // Didn't find valid underline
        return false;
      }

      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

      state.line = nextLine + 1;

      token          = state.push('heading_open', 'h' + String(level), 1);
      token.markup   = String.fromCharCode(marker);
      token.map      = [ startLine, state.line ];

      token          = state.push('inline', '', 0);
      token.content  = content;
      token.map      = [ startLine, state.line - 1 ];
      token.children = [];

      token          = state.push('heading_close', 'h' + String(level), -1);
      token.markup   = String.fromCharCode(marker);

      state.parentType = oldParentType;

      return true;
    };

    var paragraph = function paragraph(state, startLine/*, endLine*/) {
      var content, terminate, i, l, token, oldParentType,
          nextLine = startLine + 1,
          terminatorRules = state.md.block.ruler.getRules('paragraph'),
          endLine = state.lineMax;

      oldParentType = state.parentType;
      state.parentType = 'paragraph';

      // jump line-by-line until empty one or EOF
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        // this would be a code block normally, but after paragraph
        // it's considered a lazy continuation regardless of what's there
        if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

        // quirk for blockquotes, this line should already be checked by that rule
        if (state.sCount[nextLine] < 0) { continue; }

        // Some tags can terminate paragraph without empty line.
        terminate = false;
        for (i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) { break; }
      }

      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

      state.line = nextLine;

      token          = state.push('paragraph_open', 'p', 1);
      token.map      = [ startLine, state.line ];

      token          = state.push('inline', '', 0);
      token.content  = content;
      token.map      = [ startLine, state.line ];
      token.children = [];

      token          = state.push('paragraph_close', 'p', -1);

      state.parentType = oldParentType;

      return true;
    };

    var Token$1 = token;
    var isSpace$4 = utils$1.isSpace;


    function StateBlock(src, md, env, tokens) {
      var ch, s, start, pos, len, indent, offset, indent_found;

      this.src = src;

      // link to parser instance
      this.md     = md;

      this.env = env;

      //
      // Internal state vartiables
      //

      this.tokens = tokens;

      this.bMarks = [];  // line begin offsets for fast jumps
      this.eMarks = [];  // line end offsets for fast jumps
      this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
      this.sCount = [];  // indents for each line (tabs expanded)

      // An amount of virtual spaces (tabs expanded) between beginning
      // of each line (bMarks) and real beginning of that line.
      //
      // It exists only as a hack because blockquotes override bMarks
      // losing information in the process.
      //
      // It's used only when expanding tabs, you can think about it as
      // an initial tab length, e.g. bsCount=21 applied to string `\t123`
      // means first tab should be expanded to 4-21%4 === 3 spaces.
      //
      this.bsCount = [];

      // block parser variables
      this.blkIndent  = 0; // required block content indent (for example, if we are
                           // inside a list, it would be positioned after list marker)
      this.line       = 0; // line index in src
      this.lineMax    = 0; // lines count
      this.tight      = false;  // loose/tight mode for lists
      this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
      this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

      // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
      // used in lists to determine if they interrupt a paragraph
      this.parentType = 'root';

      this.level = 0;

      // renderer
      this.result = '';

      // Create caches
      // Generate markers.
      s = this.src;
      indent_found = false;

      for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
        ch = s.charCodeAt(pos);

        if (!indent_found) {
          if (isSpace$4(ch)) {
            indent++;

            if (ch === 0x09) {
              offset += 4 - offset % 4;
            } else {
              offset++;
            }
            continue;
          } else {
            indent_found = true;
          }
        }

        if (ch === 0x0A || pos === len - 1) {
          if (ch !== 0x0A) { pos++; }
          this.bMarks.push(start);
          this.eMarks.push(pos);
          this.tShift.push(indent);
          this.sCount.push(offset);
          this.bsCount.push(0);

          indent_found = false;
          indent = 0;
          offset = 0;
          start = pos + 1;
        }
      }

      // Push fake entry to simplify cache bounds checks
      this.bMarks.push(s.length);
      this.eMarks.push(s.length);
      this.tShift.push(0);
      this.sCount.push(0);
      this.bsCount.push(0);

      this.lineMax = this.bMarks.length - 1; // don't count last fake line
    }

    // Push new token to "stream".
    //
    StateBlock.prototype.push = function (type, tag, nesting) {
      var token = new Token$1(type, tag, nesting);
      token.block = true;

      if (nesting < 0) this.level--; // closing tag
      token.level = this.level;
      if (nesting > 0) this.level++; // opening tag

      this.tokens.push(token);
      return token;
    };

    StateBlock.prototype.isEmpty = function isEmpty(line) {
      return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
    };

    StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
      for (var max = this.lineMax; from < max; from++) {
        if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
          break;
        }
      }
      return from;
    };

    // Skip spaces from given position.
    StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
      var ch;

      for (var max = this.src.length; pos < max; pos++) {
        ch = this.src.charCodeAt(pos);
        if (!isSpace$4(ch)) { break; }
      }
      return pos;
    };

    // Skip spaces from given position in reverse.
    StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
      if (pos <= min) { return pos; }

      while (pos > min) {
        if (!isSpace$4(this.src.charCodeAt(--pos))) { return pos + 1; }
      }
      return pos;
    };

    // Skip char codes from given position
    StateBlock.prototype.skipChars = function skipChars(pos, code) {
      for (var max = this.src.length; pos < max; pos++) {
        if (this.src.charCodeAt(pos) !== code) { break; }
      }
      return pos;
    };

    // Skip char codes reverse from given position - 1
    StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
      if (pos <= min) { return pos; }

      while (pos > min) {
        if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
      }
      return pos;
    };

    // cut lines range from source.
    StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
      var i, lineIndent, ch, first, last, queue, lineStart,
          line = begin;

      if (begin >= end) {
        return '';
      }

      queue = new Array(end - begin);

      for (i = 0; line < end; line++, i++) {
        lineIndent = 0;
        lineStart = first = this.bMarks[line];

        if (line + 1 < end || keepLastLF) {
          // No need for bounds check because we have fake entry on tail.
          last = this.eMarks[line] + 1;
        } else {
          last = this.eMarks[line];
        }

        while (first < last && lineIndent < indent) {
          ch = this.src.charCodeAt(first);

          if (isSpace$4(ch)) {
            if (ch === 0x09) {
              lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
            } else {
              lineIndent++;
            }
          } else if (first - lineStart < this.tShift[line]) {
            // patched tShift masked characters to look like spaces (blockquotes, list markers)
            lineIndent++;
          } else {
            break;
          }

          first++;
        }

        if (lineIndent > indent) {
          // partially expanding tabs in code blocks, e.g '\t\tfoobar'
          // with indent=2 becomes '  \tfoobar'
          queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
        } else {
          queue[i] = this.src.slice(first, last);
        }
      }

      return queue.join('');
    };

    // re-export Token class to use in block rules
    StateBlock.prototype.Token = Token$1;


    var state_block = StateBlock;

    /** internal
     * class ParserBlock
     *
     * Block-level tokenizer.
     **/


    var Ruler$1           = ruler;


    var _rules$1 = [
      // First 2 params - rule name & source. Secondary array - list of rules,
      // which can be terminated by this one.
      [ 'table',      table,      [ 'paragraph', 'reference' ] ],
      [ 'code',       code ],
      [ 'fence',      fence,      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
      [ 'blockquote', blockquote, [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
      [ 'hr',         hr,         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
      [ 'list',       list,       [ 'paragraph', 'reference', 'blockquote' ] ],
      [ 'reference',  reference ],
      [ 'html_block', html_block, [ 'paragraph', 'reference', 'blockquote' ] ],
      [ 'heading',    heading,    [ 'paragraph', 'reference', 'blockquote' ] ],
      [ 'lheading',   lheading ],
      [ 'paragraph',  paragraph ]
    ];


    /**
     * new ParserBlock()
     **/
    function ParserBlock$1() {
      /**
       * ParserBlock#ruler -> Ruler
       *
       * [[Ruler]] instance. Keep configuration of block rules.
       **/
      this.ruler = new Ruler$1();

      for (var i = 0; i < _rules$1.length; i++) {
        this.ruler.push(_rules$1[i][0], _rules$1[i][1], { alt: (_rules$1[i][2] || []).slice() });
      }
    }


    // Generate tokens for input range
    //
    ParserBlock$1.prototype.tokenize = function (state, startLine, endLine) {
      var ok, i,
          rules = this.ruler.getRules(''),
          len = rules.length,
          line = startLine,
          hasEmptyLines = false,
          maxNesting = state.md.options.maxNesting;

      while (line < endLine) {
        state.line = line = state.skipEmptyLines(line);
        if (line >= endLine) { break; }

        // Termination condition for nested calls.
        // Nested calls currently used for blockquotes & lists
        if (state.sCount[line] < state.blkIndent) { break; }

        // If nesting level exceeded - skip tail to the end. That's not ordinary
        // situation and we should not care about content.
        if (state.level >= maxNesting) {
          state.line = endLine;
          break;
        }

        // Try all possible rules.
        // On success, rule should:
        //
        // - update `state.line`
        // - update `state.tokens`
        // - return true

        for (i = 0; i < len; i++) {
          ok = rules[i](state, line, endLine, false);
          if (ok) { break; }
        }

        // set state.tight if we had an empty line before current tag
        // i.e. latest empty line should not count
        state.tight = !hasEmptyLines;

        // paragraph might "eat" one newline after it in nested lists
        if (state.isEmpty(state.line - 1)) {
          hasEmptyLines = true;
        }

        line = state.line;

        if (line < endLine && state.isEmpty(line)) {
          hasEmptyLines = true;
          line++;
          state.line = line;
        }
      }
    };


    /**
     * ParserBlock.parse(str, md, env, outTokens)
     *
     * Process input string and push block tokens into `outTokens`
     **/
    ParserBlock$1.prototype.parse = function (src, md, env, outTokens) {
      var state;

      if (!src) { return; }

      state = new this.State(src, md, env, outTokens);

      this.tokenize(state, state.line, state.lineMax);
    };


    ParserBlock$1.prototype.State = state_block;


    var parser_block = ParserBlock$1;

    // Rule to skip pure text
    // '{}$%@~+=:' reserved for extentions

    // !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

    // !!!! Don't confuse with "Markdown ASCII Punctuation" chars
    // http://spec.commonmark.org/0.15/#ascii-punctuation-character
    function isTerminatorChar(ch) {
      switch (ch) {
        case 0x0A/* \n */:
        case 0x21/* ! */:
        case 0x23/* # */:
        case 0x24/* $ */:
        case 0x25/* % */:
        case 0x26/* & */:
        case 0x2A/* * */:
        case 0x2B/* + */:
        case 0x2D/* - */:
        case 0x3A/* : */:
        case 0x3C/* < */:
        case 0x3D/* = */:
        case 0x3E/* > */:
        case 0x40/* @ */:
        case 0x5B/* [ */:
        case 0x5C/* \ */:
        case 0x5D/* ] */:
        case 0x5E/* ^ */:
        case 0x5F/* _ */:
        case 0x60/* ` */:
        case 0x7B/* { */:
        case 0x7D/* } */:
        case 0x7E/* ~ */:
          return true;
        default:
          return false;
      }
    }

    var text = function text(state, silent) {
      var pos = state.pos;

      while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
        pos++;
      }

      if (pos === state.pos) { return false; }

      if (!silent) { state.pending += state.src.slice(state.pos, pos); }

      state.pos = pos;

      return true;
    };

    // RFC3986: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;


    var linkify = function linkify(state, silent) {
      var pos, max, match, proto, link, url, fullUrl, token;

      if (!state.md.options.linkify) return false;
      if (state.linkLevel > 0) return false;

      pos = state.pos;
      max = state.posMax;

      if (pos + 3 > max) return false;
      if (state.src.charCodeAt(pos) !== 0x3A/* : */) return false;
      if (state.src.charCodeAt(pos + 1) !== 0x2F/* / */) return false;
      if (state.src.charCodeAt(pos + 2) !== 0x2F/* / */) return false;

      match = state.pending.match(SCHEME_RE);
      if (!match) return false;

      proto = match[1];

      link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
      if (!link) return false;

      url = link.url;

      // disallow '*' at the end of the link (conflicts with emphasis)
      url = url.replace(/\*+$/, '');

      fullUrl = state.md.normalizeLink(url);
      if (!state.md.validateLink(fullUrl)) return false;

      if (!silent) {
        state.pending = state.pending.slice(0, -proto.length);

        token         = state.push('link_open', 'a', 1);
        token.attrs   = [ [ 'href', fullUrl ] ];
        token.markup  = 'linkify';
        token.info    = 'auto';

        token         = state.push('text', '', 0);
        token.content = state.md.normalizeLinkText(url);

        token         = state.push('link_close', 'a', -1);
        token.markup  = 'linkify';
        token.info    = 'auto';
      }

      state.pos += url.length - proto.length;
      return true;
    };

    var isSpace$3 = utils$1.isSpace;


    var newline = function newline(state, silent) {
      var pmax, max, ws, pos = state.pos;

      if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

      pmax = state.pending.length - 1;
      max = state.posMax;

      // '  \n' -> hardbreak
      // Lookup in pending chars is bad practice! Don't copy to other rules!
      // Pending string is stored in concat mode, indexed lookups will cause
      // convertion to flat mode.
      if (!silent) {
        if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
          if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
            // Find whitespaces tail of pending chars.
            ws = pmax - 1;
            while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 0x20) ws--;

            state.pending = state.pending.slice(0, ws);
            state.push('hardbreak', 'br', 0);
          } else {
            state.pending = state.pending.slice(0, -1);
            state.push('softbreak', 'br', 0);
          }

        } else {
          state.push('softbreak', 'br', 0);
        }
      }

      pos++;

      // skip heading spaces for next line
      while (pos < max && isSpace$3(state.src.charCodeAt(pos))) { pos++; }

      state.pos = pos;
      return true;
    };

    var isSpace$2 = utils$1.isSpace;

    var ESCAPED = [];

    for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

    '\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
      .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });


    var _escape = function escape(state, silent) {
      var ch1, ch2, origStr, escapedStr, token, pos = state.pos, max = state.posMax;

      if (state.src.charCodeAt(pos) !== 0x5C/* \ */) return false;
      pos++;

      // '\' at the end of the inline block
      if (pos >= max) return false;

      ch1 = state.src.charCodeAt(pos);

      if (ch1 === 0x0A) {
        if (!silent) {
          state.push('hardbreak', 'br', 0);
        }

        pos++;
        // skip leading whitespaces from next line
        while (pos < max) {
          ch1 = state.src.charCodeAt(pos);
          if (!isSpace$2(ch1)) break;
          pos++;
        }

        state.pos = pos;
        return true;
      }

      escapedStr = state.src[pos];

      if (ch1 >= 0xD800 && ch1 <= 0xDBFF && pos + 1 < max) {
        ch2 = state.src.charCodeAt(pos + 1);

        if (ch2 >= 0xDC00 && ch2 <= 0xDFFF) {
          escapedStr += state.src[pos + 1];
          pos++;
        }
      }

      origStr = '\\' + escapedStr;

      if (!silent) {
        token = state.push('text_special', '', 0);

        if (ch1 < 256 && ESCAPED[ch1] !== 0) {
          token.content = escapedStr;
        } else {
          token.content = origStr;
        }

        token.markup = origStr;
        token.info   = 'escape';
      }

      state.pos = pos + 1;
      return true;
    };

    var backticks = function backtick(state, silent) {
      var start, max, marker, token, matchStart, matchEnd, openerLength, closerLength,
          pos = state.pos,
          ch = state.src.charCodeAt(pos);

      if (ch !== 0x60/* ` */) { return false; }

      start = pos;
      pos++;
      max = state.posMax;

      // scan marker length
      while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

      marker = state.src.slice(start, pos);
      openerLength = marker.length;

      if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
        if (!silent) state.pending += marker;
        state.pos += openerLength;
        return true;
      }

      matchStart = matchEnd = pos;

      // Nothing found in the cache, scan until the end of the line (or until marker is found)
      while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
        matchEnd = matchStart + 1;

        // scan marker length
        while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

        closerLength = matchEnd - matchStart;

        if (closerLength === openerLength) {
          // Found matching closer length.
          if (!silent) {
            token     = state.push('code_inline', 'code', 0);
            token.markup  = marker;
            token.content = state.src.slice(pos, matchStart)
              .replace(/\n/g, ' ')
              .replace(/^ (.+) $/, '$1');
          }
          state.pos = matchEnd;
          return true;
        }

        // Some different length found, put it in cache as upper limit of where closer can be found
        state.backticks[closerLength] = matchStart;
      }

      // Scanned through the end, didn't find anything
      state.backticksScanned = true;

      if (!silent) state.pending += marker;
      state.pos += openerLength;
      return true;
    };

    var strikethrough = {};

    // Insert each marker as a separate text token, and add it to delimiter list
    //
    strikethrough.tokenize = function strikethrough(state, silent) {
      var i, scanned, token, len, ch,
          start = state.pos,
          marker = state.src.charCodeAt(start);

      if (silent) { return false; }

      if (marker !== 0x7E/* ~ */) { return false; }

      scanned = state.scanDelims(state.pos, true);
      len = scanned.length;
      ch = String.fromCharCode(marker);

      if (len < 2) { return false; }

      if (len % 2) {
        token         = state.push('text', '', 0);
        token.content = ch;
        len--;
      }

      for (i = 0; i < len; i += 2) {
        token         = state.push('text', '', 0);
        token.content = ch + ch;

        state.delimiters.push({
          marker: marker,
          length: 0,     // disable "rule of 3" length checks meant for emphasis
          token:  state.tokens.length - 1,
          end:    -1,
          open:   scanned.can_open,
          close:  scanned.can_close
        });
      }

      state.pos += scanned.length;

      return true;
    };


    function postProcess$1(state, delimiters) {
      var i, j,
          startDelim,
          endDelim,
          token,
          loneMarkers = [],
          max = delimiters.length;

      for (i = 0; i < max; i++) {
        startDelim = delimiters[i];

        if (startDelim.marker !== 0x7E/* ~ */) {
          continue;
        }

        if (startDelim.end === -1) {
          continue;
        }

        endDelim = delimiters[startDelim.end];

        token         = state.tokens[startDelim.token];
        token.type    = 's_open';
        token.tag     = 's';
        token.nesting = 1;
        token.markup  = '~~';
        token.content = '';

        token         = state.tokens[endDelim.token];
        token.type    = 's_close';
        token.tag     = 's';
        token.nesting = -1;
        token.markup  = '~~';
        token.content = '';

        if (state.tokens[endDelim.token - 1].type === 'text' &&
            state.tokens[endDelim.token - 1].content === '~') {

          loneMarkers.push(endDelim.token - 1);
        }
      }

      // If a marker sequence has an odd number of characters, it's splitted
      // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
      // start of the sequence.
      //
      // So, we have to move all those markers after subsequent s_close tags.
      //
      while (loneMarkers.length) {
        i = loneMarkers.pop();
        j = i + 1;

        while (j < state.tokens.length && state.tokens[j].type === 's_close') {
          j++;
        }

        j--;

        if (i !== j) {
          token = state.tokens[j];
          state.tokens[j] = state.tokens[i];
          state.tokens[i] = token;
        }
      }
    }


    // Walk through delimiter list and replace text tokens with tags
    //
    strikethrough.postProcess = function strikethrough(state) {
      var curr,
          tokens_meta = state.tokens_meta,
          max = state.tokens_meta.length;

      postProcess$1(state, state.delimiters);

      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess$1(state, tokens_meta[curr].delimiters);
        }
      }
    };

    var emphasis = {};

    // Insert each marker as a separate text token, and add it to delimiter list
    //
    emphasis.tokenize = function emphasis(state, silent) {
      var i, scanned, token,
          start = state.pos,
          marker = state.src.charCodeAt(start);

      if (silent) { return false; }

      if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false; }

      scanned = state.scanDelims(state.pos, marker === 0x2A);

      for (i = 0; i < scanned.length; i++) {
        token         = state.push('text', '', 0);
        token.content = String.fromCharCode(marker);

        state.delimiters.push({
          // Char code of the starting marker (number).
          //
          marker: marker,

          // Total length of these series of delimiters.
          //
          length: scanned.length,

          // A position of the token this delimiter corresponds to.
          //
          token:  state.tokens.length - 1,

          // If this delimiter is matched as a valid opener, `end` will be
          // equal to its position, otherwise it's `-1`.
          //
          end:    -1,

          // Boolean flags that determine if this delimiter could open or close
          // an emphasis.
          //
          open:   scanned.can_open,
          close:  scanned.can_close
        });
      }

      state.pos += scanned.length;

      return true;
    };


    function postProcess(state, delimiters) {
      var i,
          startDelim,
          endDelim,
          token,
          ch,
          isStrong,
          max = delimiters.length;

      for (i = max - 1; i >= 0; i--) {
        startDelim = delimiters[i];

        if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
          continue;
        }

        // Process only opening markers
        if (startDelim.end === -1) {
          continue;
        }

        endDelim = delimiters[startDelim.end];

        // If the previous delimiter has the same marker and is adjacent to this one,
        // merge those into one strong delimiter.
        //
        // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
        //
        isStrong = i > 0 &&
                   delimiters[i - 1].end === startDelim.end + 1 &&
                   // check that first two markers match and adjacent
                   delimiters[i - 1].marker === startDelim.marker &&
                   delimiters[i - 1].token === startDelim.token - 1 &&
                   // check that last two markers are adjacent (we can safely assume they match)
                   delimiters[startDelim.end + 1].token === endDelim.token + 1;

        ch = String.fromCharCode(startDelim.marker);

        token         = state.tokens[startDelim.token];
        token.type    = isStrong ? 'strong_open' : 'em_open';
        token.tag     = isStrong ? 'strong' : 'em';
        token.nesting = 1;
        token.markup  = isStrong ? ch + ch : ch;
        token.content = '';

        token         = state.tokens[endDelim.token];
        token.type    = isStrong ? 'strong_close' : 'em_close';
        token.tag     = isStrong ? 'strong' : 'em';
        token.nesting = -1;
        token.markup  = isStrong ? ch + ch : ch;
        token.content = '';

        if (isStrong) {
          state.tokens[delimiters[i - 1].token].content = '';
          state.tokens[delimiters[startDelim.end + 1].token].content = '';
          i--;
        }
      }
    }


    // Walk through delimiter list and replace text tokens with tags
    //
    emphasis.postProcess = function emphasis(state) {
      var curr,
          tokens_meta = state.tokens_meta,
          max = state.tokens_meta.length;

      postProcess(state, state.delimiters);

      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess(state, tokens_meta[curr].delimiters);
        }
      }
    };

    var normalizeReference$1   = utils$1.normalizeReference;
    var isSpace$1              = utils$1.isSpace;


    var link = function link(state, silent) {
      var attrs,
          code,
          label,
          labelEnd,
          labelStart,
          pos,
          res,
          ref,
          token,
          href = '',
          title = '',
          oldPos = state.pos,
          max = state.posMax,
          start = state.pos,
          parseReference = true;

      if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false; }

      labelStart = state.pos + 1;
      labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

      // parser failed to find ']', so it's not a valid link
      if (labelEnd < 0) { return false; }

      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
        //
        // Inline link
        //

        // might have found a valid screenshot link, disable reference parsing
        parseReference = false;

        // [link](  <href>  "title"  )
        //        ^^ skipping these spaces
        pos++;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace$1(code) && code !== 0x0A) { break; }
        }
        if (pos >= max) { return false; }

        // [link](  <href>  "title"  )
        //          ^^^^^^ parsing link destination
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = '';
          }

          // [link](  <href>  "title"  )
          //                ^^ skipping these spaces
          start = pos;
          for (; pos < max; pos++) {
            code = state.src.charCodeAt(pos);
            if (!isSpace$1(code) && code !== 0x0A) { break; }
          }

          // [link](  <href>  "title"  )
          //                  ^^^^^^^ parsing link title
          res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
          if (pos < max && start !== pos && res.ok) {
            title = res.str;
            pos = res.pos;

            // [link](  <href>  "title"  )
            //                         ^^ skipping these spaces
            for (; pos < max; pos++) {
              code = state.src.charCodeAt(pos);
              if (!isSpace$1(code) && code !== 0x0A) { break; }
            }
          }
        }

        if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
          // parsing a valid screenshot link failed, fallback to reference
          parseReference = true;
        }
        pos++;
      }

      if (parseReference) {
        //
        // Link reference
        //
        if (typeof state.env.references === 'undefined') { return false; }

        if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }

        // covers label === '' and label === undefined
        // (collapsed reference link and screenshot reference link respectively)
        if (!label) { label = state.src.slice(labelStart, labelEnd); }

        ref = state.env.references[normalizeReference$1(label)];
        if (!ref) {
          state.pos = oldPos;
          return false;
        }
        href = ref.href;
        title = ref.title;
      }

      //
      // We found the end of the link, and know for a fact it's a valid link;
      // so all that's left to do is to call tokenizer.
      //
      if (!silent) {
        state.pos = labelStart;
        state.posMax = labelEnd;

        token        = state.push('link_open', 'a', 1);
        token.attrs  = attrs = [ [ 'href', href ] ];
        if (title) {
          attrs.push([ 'title', title ]);
        }

        state.linkLevel++;
        state.md.inline.tokenize(state);
        state.linkLevel--;

        token        = state.push('link_close', 'a', -1);
      }

      state.pos = pos;
      state.posMax = max;
      return true;
    };

    var normalizeReference   = utils$1.normalizeReference;
    var isSpace              = utils$1.isSpace;


    var image = function image(state, silent) {
      var attrs,
          code,
          content,
          label,
          labelEnd,
          labelStart,
          pos,
          ref,
          res,
          title,
          token,
          tokens,
          start,
          href = '',
          oldPos = state.pos,
          max = state.posMax;

      if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false; }
      if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false; }

      labelStart = state.pos + 2;
      labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

      // parser failed to find ']', so it's not a valid link
      if (labelEnd < 0) { return false; }

      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
        //
        // Inline link
        //

        // [link](  <href>  "title"  )
        //        ^^ skipping these spaces
        pos++;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) { break; }
        }
        if (pos >= max) { return false; }

        // [link](  <href>  "title"  )
        //          ^^^^^^ parsing link destination
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = '';
          }
        }

        // [link](  <href>  "title"  )
        //                ^^ skipping these spaces
        start = pos;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) { break; }
        }

        // [link](  <href>  "title"  )
        //                  ^^^^^^^ parsing link title
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;

          // [link](  <href>  "title"  )
          //                         ^^ skipping these spaces
          for (; pos < max; pos++) {
            code = state.src.charCodeAt(pos);
            if (!isSpace(code) && code !== 0x0A) { break; }
          }
        } else {
          title = '';
        }

        if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
          state.pos = oldPos;
          return false;
        }
        pos++;
      } else {
        //
        // Link reference
        //
        if (typeof state.env.references === 'undefined') { return false; }

        if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }

        // covers label === '' and label === undefined
        // (collapsed reference link and screenshot reference link respectively)
        if (!label) { label = state.src.slice(labelStart, labelEnd); }

        ref = state.env.references[normalizeReference(label)];
        if (!ref) {
          state.pos = oldPos;
          return false;
        }
        href = ref.href;
        title = ref.title;
      }

      //
      // We found the end of the link, and know for a fact it's a valid link;
      // so all that's left to do is to call tokenizer.
      //
      if (!silent) {
        content = state.src.slice(labelStart, labelEnd);

        state.md.inline.parse(
          content,
          state.md,
          state.env,
          tokens = []
        );

        token          = state.push('image', 'img', 0);
        token.attrs    = attrs = [ [ 'src', href ], [ 'alt', '' ] ];
        token.children = tokens;
        token.content  = content;

        if (title) {
          attrs.push([ 'title', title ]);
        }
      }

      state.pos = pos;
      state.posMax = max;
      return true;
    };

    /*eslint max-len:0*/
    var EMAIL_RE    = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
    var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;


    var autolink = function autolink(state, silent) {
      var url, fullUrl, token, ch, start, max,
          pos = state.pos;

      if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

      start = state.pos;
      max = state.posMax;

      for (;;) {
        if (++pos >= max) return false;

        ch = state.src.charCodeAt(pos);

        if (ch === 0x3C /* < */) return false;
        if (ch === 0x3E /* > */) break;
      }

      url = state.src.slice(start + 1, pos);

      if (AUTOLINK_RE.test(url)) {
        fullUrl = state.md.normalizeLink(url);
        if (!state.md.validateLink(fullUrl)) { return false; }

        if (!silent) {
          token         = state.push('link_open', 'a', 1);
          token.attrs   = [ [ 'href', fullUrl ] ];
          token.markup  = 'autolink';
          token.info    = 'auto';

          token         = state.push('text', '', 0);
          token.content = state.md.normalizeLinkText(url);

          token         = state.push('link_close', 'a', -1);
          token.markup  = 'autolink';
          token.info    = 'auto';
        }

        state.pos += url.length + 2;
        return true;
      }

      if (EMAIL_RE.test(url)) {
        fullUrl = state.md.normalizeLink('mailto:' + url);
        if (!state.md.validateLink(fullUrl)) { return false; }

        if (!silent) {
          token         = state.push('link_open', 'a', 1);
          token.attrs   = [ [ 'href', fullUrl ] ];
          token.markup  = 'autolink';
          token.info    = 'auto';

          token         = state.push('text', '', 0);
          token.content = state.md.normalizeLinkText(url);

          token         = state.push('link_close', 'a', -1);
          token.markup  = 'autolink';
          token.info    = 'auto';
        }

        state.pos += url.length + 2;
        return true;
      }

      return false;
    };

    var HTML_TAG_RE = html_re.HTML_TAG_RE;


    function isLinkOpen(str) {
      return /^<a[>\s]/i.test(str);
    }
    function isLinkClose(str) {
      return /^<\/a\s*>/i.test(str);
    }


    function isLetter(ch) {
      /*eslint no-bitwise:0*/
      var lc = ch | 0x20; // to lower case
      return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
    }


    var html_inline = function html_inline(state, silent) {
      var ch, match, max, token,
          pos = state.pos;

      if (!state.md.options.html) { return false; }

      // Check start
      max = state.posMax;
      if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
          pos + 2 >= max) {
        return false;
      }

      // Quick fail on second char
      ch = state.src.charCodeAt(pos + 1);
      if (ch !== 0x21/* ! */ &&
          ch !== 0x3F/* ? */ &&
          ch !== 0x2F/* / */ &&
          !isLetter(ch)) {
        return false;
      }

      match = state.src.slice(pos).match(HTML_TAG_RE);
      if (!match) { return false; }

      if (!silent) {
        token         = state.push('html_inline', '', 0);
        token.content = state.src.slice(pos, pos + match[0].length);

        if (isLinkOpen(token.content))  state.linkLevel++;
        if (isLinkClose(token.content)) state.linkLevel--;
      }
      state.pos += match[0].length;
      return true;
    };

    var entities          = entities$1;
    var has               = utils$1.has;
    var isValidEntityCode = utils$1.isValidEntityCode;
    var fromCodePoint     = utils$1.fromCodePoint;


    var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
    var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


    var entity = function entity(state, silent) {
      var ch, code, match, token, pos = state.pos, max = state.posMax;

      if (state.src.charCodeAt(pos) !== 0x26/* & */) return false;

      if (pos + 1 >= max) return false;

      ch = state.src.charCodeAt(pos + 1);

      if (ch === 0x23 /* # */) {
        match = state.src.slice(pos).match(DIGITAL_RE);
        if (match) {
          if (!silent) {
            code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);

            token         = state.push('text_special', '', 0);
            token.content = isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
            token.markup  = match[0];
            token.info    = 'entity';
          }
          state.pos += match[0].length;
          return true;
        }
      } else {
        match = state.src.slice(pos).match(NAMED_RE);
        if (match) {
          if (has(entities, match[1])) {
            if (!silent) {
              token         = state.push('text_special', '', 0);
              token.content = entities[match[1]];
              token.markup  = match[0];
              token.info    = 'entity';
            }
            state.pos += match[0].length;
            return true;
          }
        }
      }

      return false;
    };

    function processDelimiters(state, delimiters) {
      var closerIdx, openerIdx, closer, opener, minOpenerIdx, newMinOpenerIdx,
          isOddMatch, lastJump,
          openersBottom = {},
          max = delimiters.length;

      if (!max) return;

      // headerIdx is the first delimiter of the current (where closer is) delimiter run
      var headerIdx = 0;
      var lastTokenIdx = -2; // needs any value lower than -1
      var jumps = [];

      for (closerIdx = 0; closerIdx < max; closerIdx++) {
        closer = delimiters[closerIdx];

        jumps.push(0);

        // markers belong to same delimiter run if:
        //  - they have adjacent tokens
        //  - AND markers are the same
        //
        if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
          headerIdx = closerIdx;
        }

        lastTokenIdx = closer.token;

        // Length is only used for emphasis-specific "rule of 3",
        // if it's not defined (in strikethrough or 3rd party plugins),
        // we can default it to 0 to disable those checks.
        //
        closer.length = closer.length || 0;

        if (!closer.close) continue;

        // Previously calculated lower bounds (previous fails)
        // for each marker, each delimiter length modulo 3,
        // and for whether this closer can be an opener;
        // https://github.com/commonmark/cmark/commit/34250e12ccebdc6372b8b49c44fab57c72443460
        if (!openersBottom.hasOwnProperty(closer.marker)) {
          openersBottom[closer.marker] = [ -1, -1, -1, -1, -1, -1 ];
        }

        minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length % 3)];

        openerIdx = headerIdx - jumps[headerIdx] - 1;

        newMinOpenerIdx = openerIdx;

        for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
          opener = delimiters[openerIdx];

          if (opener.marker !== closer.marker) continue;

          if (opener.open && opener.end < 0) {

            isOddMatch = false;

            // from spec:
            //
            // If one of the delimiters can both open and close emphasis, then the
            // sum of the lengths of the delimiter runs containing the opening and
            // closing delimiters must not be a multiple of 3 unless both lengths
            // are multiples of 3.
            //
            if (opener.close || closer.open) {
              if ((opener.length + closer.length) % 3 === 0) {
                if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
                  isOddMatch = true;
                }
              }
            }

            if (!isOddMatch) {
              // If previous delimiter cannot be an opener, we can safely skip
              // the entire sequence in future checks. This is required to make
              // sure algorithm has linear complexity (see *_*_*_*_*_... case).
              //
              lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ?
                jumps[openerIdx - 1] + 1 :
                0;

              jumps[closerIdx] = closerIdx - openerIdx + lastJump;
              jumps[openerIdx] = lastJump;

              closer.open  = false;
              opener.end   = closerIdx;
              opener.close = false;
              newMinOpenerIdx = -1;
              // treat next token as start of run,
              // it optimizes skips in **<...>**a**<...>** pathological case
              lastTokenIdx = -2;
              break;
            }
          }
        }

        if (newMinOpenerIdx !== -1) {
          // If match for this delimiter run failed, we want to set lower bound for
          // future lookups. This is required to make sure algorithm has linear
          // complexity.
          //
          // See details here:
          // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
          //
          openersBottom[closer.marker][(closer.open ? 3 : 0) + ((closer.length || 0) % 3)] = newMinOpenerIdx;
        }
      }
    }


    var balance_pairs = function link_pairs(state) {
      var curr,
          tokens_meta = state.tokens_meta,
          max = state.tokens_meta.length;

      processDelimiters(state, state.delimiters);

      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          processDelimiters(state, tokens_meta[curr].delimiters);
        }
      }
    };

    var fragments_join = function fragments_join(state) {
      var curr, last,
          level = 0,
          tokens = state.tokens,
          max = state.tokens.length;

      for (curr = last = 0; curr < max; curr++) {
        // re-calculate levels after emphasis/strikethrough turns some text nodes
        // into opening/closing tags
        if (tokens[curr].nesting < 0) level--; // closing tag
        tokens[curr].level = level;
        if (tokens[curr].nesting > 0) level++; // opening tag

        if (tokens[curr].type === 'text' &&
            curr + 1 < max &&
            tokens[curr + 1].type === 'text') {

          // collapse two adjacent text nodes
          tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
        } else {
          if (curr !== last) { tokens[last] = tokens[curr]; }

          last++;
        }
      }

      if (curr !== last) {
        tokens.length = last;
      }
    };

    var Token          = token;
    var isWhiteSpace   = utils$1.isWhiteSpace;
    var isPunctChar    = utils$1.isPunctChar;
    var isMdAsciiPunct = utils$1.isMdAsciiPunct;


    function StateInline(src, md, env, outTokens) {
      this.src = src;
      this.env = env;
      this.md = md;
      this.tokens = outTokens;
      this.tokens_meta = Array(outTokens.length);

      this.pos = 0;
      this.posMax = this.src.length;
      this.level = 0;
      this.pending = '';
      this.pendingLevel = 0;

      // Stores { start: end } pairs. Useful for backtrack
      // optimization of pairs parse (emphasis, strikes).
      this.cache = {};

      // List of emphasis-like delimiters for current tag
      this.delimiters = [];

      // Stack of delimiter lists for upper level tags
      this._prev_delimiters = [];

      // backtick length => last seen position
      this.backticks = {};
      this.backticksScanned = false;

      // Counter used to disable inline linkify-it execution
      // inside <a> and markdown links
      this.linkLevel = 0;
    }


    // Flush pending text
    //
    StateInline.prototype.pushPending = function () {
      var token = new Token('text', '', 0);
      token.content = this.pending;
      token.level = this.pendingLevel;
      this.tokens.push(token);
      this.pending = '';
      return token;
    };


    // Push new token to "stream".
    // If pending text exists - flush it as text token
    //
    StateInline.prototype.push = function (type, tag, nesting) {
      if (this.pending) {
        this.pushPending();
      }

      var token = new Token(type, tag, nesting);
      var token_meta = null;

      if (nesting < 0) {
        // closing tag
        this.level--;
        this.delimiters = this._prev_delimiters.pop();
      }

      token.level = this.level;

      if (nesting > 0) {
        // opening tag
        this.level++;
        this._prev_delimiters.push(this.delimiters);
        this.delimiters = [];
        token_meta = { delimiters: this.delimiters };
      }

      this.pendingLevel = this.level;
      this.tokens.push(token);
      this.tokens_meta.push(token_meta);
      return token;
    };


    // Scan a sequence of emphasis-like markers, and determine whether
    // it can start an emphasis sequence or end an emphasis sequence.
    //
    //  - start - position to scan from (it should point at a valid marker);
    //  - canSplitWord - determine if these markers can be found inside a word
    //
    StateInline.prototype.scanDelims = function (start, canSplitWord) {
      var pos = start, lastChar, nextChar, count, can_open, can_close,
          isLastWhiteSpace, isLastPunctChar,
          isNextWhiteSpace, isNextPunctChar,
          left_flanking = true,
          right_flanking = true,
          max = this.posMax,
          marker = this.src.charCodeAt(start);

      // treat beginning of the line as a whitespace
      lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

      while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

      count = pos - start;

      // treat end of the line as a whitespace
      nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

      isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

      isLastWhiteSpace = isWhiteSpace(lastChar);
      isNextWhiteSpace = isWhiteSpace(nextChar);

      if (isNextWhiteSpace) {
        left_flanking = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          left_flanking = false;
        }
      }

      if (isLastWhiteSpace) {
        right_flanking = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          right_flanking = false;
        }
      }

      if (!canSplitWord) {
        can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
        can_close = right_flanking && (!left_flanking  || isNextPunctChar);
      } else {
        can_open  = left_flanking;
        can_close = right_flanking;
      }

      return {
        can_open:  can_open,
        can_close: can_close,
        length:    count
      };
    };


    // re-export Token class to use in block rules
    StateInline.prototype.Token = Token;


    var state_inline = StateInline;

    /** internal
     * class ParserInline
     *
     * Tokenizes paragraph content.
     **/


    var Ruler           = ruler;


    ////////////////////////////////////////////////////////////////////////////////
    // Parser rules

    var _rules = [
      [ 'text',            text ],
      [ 'linkify',         linkify ],
      [ 'newline',         newline ],
      [ 'escape',          _escape ],
      [ 'backticks',       backticks ],
      [ 'strikethrough',   strikethrough.tokenize ],
      [ 'emphasis',        emphasis.tokenize ],
      [ 'link',            link ],
      [ 'image',           image ],
      [ 'autolink',        autolink ],
      [ 'html_inline',     html_inline ],
      [ 'entity',          entity ]
    ];

    // `rule2` ruleset was created specifically for emphasis/strikethrough
    // post-processing and may be changed in the future.
    //
    // Don't use this for anything except pairs (plugins working with `balance_pairs`).
    //
    var _rules2 = [
      [ 'balance_pairs',   balance_pairs ],
      [ 'strikethrough',   strikethrough.postProcess ],
      [ 'emphasis',        emphasis.postProcess ],
      // rules for pairs separate '**' into its own text tokens, which may be left unused,
      // rule below merges unused segments back with the rest of the text
      [ 'fragments_join',  fragments_join ]
    ];


    /**
     * new ParserInline()
     **/
    function ParserInline$1() {
      var i;

      /**
       * ParserInline#ruler -> Ruler
       *
       * [[Ruler]] instance. Keep configuration of inline rules.
       **/
      this.ruler = new Ruler();

      for (i = 0; i < _rules.length; i++) {
        this.ruler.push(_rules[i][0], _rules[i][1]);
      }

      /**
       * ParserInline#ruler2 -> Ruler
       *
       * [[Ruler]] instance. Second ruler used for post-processing
       * (e.g. in emphasis-like rules).
       **/
      this.ruler2 = new Ruler();

      for (i = 0; i < _rules2.length; i++) {
        this.ruler2.push(_rules2[i][0], _rules2[i][1]);
      }
    }


    // Skip single token by running all rules in validation mode;
    // returns `true` if any rule reported success
    //
    ParserInline$1.prototype.skipToken = function (state) {
      var ok, i, pos = state.pos,
          rules = this.ruler.getRules(''),
          len = rules.length,
          maxNesting = state.md.options.maxNesting,
          cache = state.cache;


      if (typeof cache[pos] !== 'undefined') {
        state.pos = cache[pos];
        return;
      }

      if (state.level < maxNesting) {
        for (i = 0; i < len; i++) {
          // Increment state.level and decrement it later to limit recursion.
          // It's harmless to do here, because no tokens are created. But ideally,
          // we'd need a separate private state variable for this purpose.
          //
          state.level++;
          ok = rules[i](state, true);
          state.level--;

          if (ok) { break; }
        }
      } else {
        // Too much nesting, just skip until the end of the paragraph.
        //
        // NOTE: this will cause links to behave incorrectly in the following case,
        //       when an amount of `[` is exactly equal to `maxNesting + 1`:
        //
        //       [[[[[[[[[[[[[[[[[[[[[foo]()
        //
        // TODO: remove this workaround when CM standard will allow nested links
        //       (we can replace it by preventing links from being parsed in
        //       validation mode)
        //
        state.pos = state.posMax;
      }

      if (!ok) { state.pos++; }
      cache[pos] = state.pos;
    };


    // Generate tokens for input range
    //
    ParserInline$1.prototype.tokenize = function (state) {
      var ok, i,
          rules = this.ruler.getRules(''),
          len = rules.length,
          end = state.posMax,
          maxNesting = state.md.options.maxNesting;

      while (state.pos < end) {
        // Try all possible rules.
        // On success, rule should:
        //
        // - update `state.pos`
        // - update `state.tokens`
        // - return true

        if (state.level < maxNesting) {
          for (i = 0; i < len; i++) {
            ok = rules[i](state, false);
            if (ok) { break; }
          }
        }

        if (ok) {
          if (state.pos >= end) { break; }
          continue;
        }

        state.pending += state.src[state.pos++];
      }

      if (state.pending) {
        state.pushPending();
      }
    };


    /**
     * ParserInline.parse(str, md, env, outTokens)
     *
     * Process input string and push inline tokens into `outTokens`
     **/
    ParserInline$1.prototype.parse = function (str, md, env, outTokens) {
      var i, rules, len;
      var state = new this.State(str, md, env, outTokens);

      this.tokenize(state);

      rules = this.ruler2.getRules('');
      len = rules.length;

      for (i = 0; i < len; i++) {
        rules[i](state);
      }
    };


    ParserInline$1.prototype.State = state_inline;


    var parser_inline = ParserInline$1;

    var re = function (opts) {
      var re = {};
      opts = opts || {};

      // Use direct extract instead of `regenerate` to reduse browserified size
      re.src_Any = regex$3.source;
      re.src_Cc  = regex$2.source;
      re.src_Z   = regex.source;
      re.src_P   = regex$4.source;

      // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
      re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

      // \p{\Z\Cc} (white spaces + control)
      re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

      // Experimental. List of chars, completely prohibited in links
      // because can separate it from other part of text
      var text_separators = '[><\uff5c]';

      // All possible word characters (everything without punctuation, spaces & controls)
      // Defined via punctuation & spaces to save space
      // Should be something like \p{\L\N\S\M} (\w but without `_`)
      re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
      // The same as abothe but without [0-9]
      // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

      ////////////////////////////////////////////////////////////////////////////////

      re.src_ip4 =

        '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

      // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
      re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

      re.src_port =

        '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

      re.src_host_terminator =

        '(?=$|' + text_separators + '|' + re.src_ZPCc + ')' +
        '(?!' + (opts['---'] ? '-(?!--)|' : '-|') + '_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

      re.src_path =

        '(?:' +
          '[/?#]' +
            '(?:' +
              '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-;]).|' +
              '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
              '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
              '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
              '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
              "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
              "\\'(?=" + re.src_pseudo_letter + '|[-])|' +  // allow `I'm_king` if no pair found
              '\\.{2,}[a-zA-Z0-9%/&]|' + // google has many dots in "google search" links (#66, #81).
                                         // github has ... in commit range links,
                                         // Restrict to
                                         // - english
                                         // - percent-encoded
                                         // - parts of file path
                                         // - params separator
                                         // until more examples found.
              '\\.(?!' + re.src_ZCc + '|[.]|$)|' +
              (opts['---'] ?
                '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
                :
                '\\-+|'
              ) +
              ',(?!' + re.src_ZCc + '|$)|' +       // allow `,,,` in paths
              ';(?!' + re.src_ZCc + '|$)|' +       // allow `;` if not followed by space-like char
              '\\!+(?!' + re.src_ZCc + '|[!]|$)|' +  // allow `!!!` in paths, but not at the end
              '\\?(?!' + re.src_ZCc + '|[?]|$)' +
            ')+' +
          '|\\/' +
        ')?';

      // Allow anything in markdown spec, forbid quote (") at the first position
      // because emails enclosed in quotes are far more common
      re.src_email_name =

        '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';

      re.src_xn =

        'xn--[a-z0-9\\-]{1,59}';

      // More to read about domain names
      // http://serverfault.com/questions/638260/

      re.src_domain_root =

        // Allow letters & digits (http://test1)
        '(?:' +
          re.src_xn +
          '|' +
          re.src_pseudo_letter + '{1,63}' +
        ')';

      re.src_domain =

        '(?:' +
          re.src_xn +
          '|' +
          '(?:' + re.src_pseudo_letter + ')' +
          '|' +
          '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
        ')';

      re.src_host =

        '(?:' +
        // Don't need IP check, because digits are already allowed in normal domain names
        //   src_ip4 +
        // '|' +
          '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
        ')';

      re.tpl_host_fuzzy =

        '(?:' +
          re.src_ip4 +
        '|' +
          '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
        ')';

      re.tpl_host_no_ip_fuzzy =

        '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

      re.src_host_strict =

        re.src_host + re.src_host_terminator;

      re.tpl_host_fuzzy_strict =

        re.tpl_host_fuzzy + re.src_host_terminator;

      re.src_host_port_strict =

        re.src_host + re.src_port + re.src_host_terminator;

      re.tpl_host_port_fuzzy_strict =

        re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

      re.tpl_host_port_no_ip_fuzzy_strict =

        re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


      ////////////////////////////////////////////////////////////////////////////////
      // Main rules

      // Rude test fuzzy links by host, for quick deny
      re.tpl_host_fuzzy_test =

        'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

      re.tpl_email_fuzzy =

          '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' +
          '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

      re.tpl_link_fuzzy =
          // Fuzzy link can't be prepended with .:/\- and non punctuation.
          // but can start with > (markdown blockquote)
          '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
          '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

      re.tpl_link_no_ip_fuzzy =
          // Fuzzy link can't be prepended with .:/\- and non punctuation.
          // but can start with > (markdown blockquote)
          '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
          '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

      return re;
    };

    ////////////////////////////////////////////////////////////////////////////////
    // Helpers

    // Merge objects
    //
    function assign(obj /*from1, from2, from3, ...*/) {
      var sources = Array.prototype.slice.call(arguments, 1);

      sources.forEach(function (source) {
        if (!source) { return; }

        Object.keys(source).forEach(function (key) {
          obj[key] = source[key];
        });
      });

      return obj;
    }

    function _class(obj) { return Object.prototype.toString.call(obj); }
    function isString(obj) { return _class(obj) === '[object String]'; }
    function isObject(obj) { return _class(obj) === '[object Object]'; }
    function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
    function isFunction(obj) { return _class(obj) === '[object Function]'; }


    function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

    ////////////////////////////////////////////////////////////////////////////////


    var defaultOptions = {
      fuzzyLink: true,
      fuzzyEmail: true,
      fuzzyIP: false
    };


    function isOptionsObj(obj) {
      return Object.keys(obj || {}).reduce(function (acc, k) {
        return acc || defaultOptions.hasOwnProperty(k);
      }, false);
    }


    var defaultSchemas = {
      'http:': {
        validate: function (text, pos, self) {
          var tail = text.slice(pos);

          if (!self.re.http) {
            // compile lazily, because "host"-containing variables can change on tlds update.
            self.re.http =  new RegExp(
              '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
            );
          }
          if (self.re.http.test(tail)) {
            return tail.match(self.re.http)[0].length;
          }
          return 0;
        }
      },
      'https:':  'http:',
      'ftp:':    'http:',
      '//':      {
        validate: function (text, pos, self) {
          var tail = text.slice(pos);

          if (!self.re.no_http) {
          // compile lazily, because "host"-containing variables can change on tlds update.
            self.re.no_http =  new RegExp(
              '^' +
              self.re.src_auth +
              // Don't allow single-level domains, because of false positives like '//test'
              // with code comments
              '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
              self.re.src_port +
              self.re.src_host_terminator +
              self.re.src_path,

              'i'
            );
          }

          if (self.re.no_http.test(tail)) {
            // should not be `://` & `///`, that protects from errors in protocol name
            if (pos >= 3 && text[pos - 3] === ':') { return 0; }
            if (pos >= 3 && text[pos - 3] === '/') { return 0; }
            return tail.match(self.re.no_http)[0].length;
          }
          return 0;
        }
      },
      'mailto:': {
        validate: function (text, pos, self) {
          var tail = text.slice(pos);

          if (!self.re.mailto) {
            self.re.mailto =  new RegExp(
              '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
            );
          }
          if (self.re.mailto.test(tail)) {
            return tail.match(self.re.mailto)[0].length;
          }
          return 0;
        }
      }
    };

    /*eslint-disable max-len*/

    // RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
    var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

    // DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
    var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

    /*eslint-enable max-len*/

    ////////////////////////////////////////////////////////////////////////////////

    function resetScanCache(self) {
      self.__index__ = -1;
      self.__text_cache__   = '';
    }

    function createValidator(re) {
      return function (text, pos) {
        var tail = text.slice(pos);

        if (re.test(tail)) {
          return tail.match(re)[0].length;
        }
        return 0;
      };
    }

    function createNormalizer() {
      return function (match, self) {
        self.normalize(match);
      };
    }

    // Schemas compiler. Build regexps.
    //
    function compile(self) {

      // Load & clone RE patterns.
      var re$1 = self.re = re(self.__opts__);

      // Define dynamic patterns
      var tlds = self.__tlds__.slice();

      self.onCompile();

      if (!self.__tlds_replaced__) {
        tlds.push(tlds_2ch_src_re);
      }
      tlds.push(re$1.src_xn);

      re$1.src_tlds = tlds.join('|');

      function untpl(tpl) { return tpl.replace('%TLDS%', re$1.src_tlds); }

      re$1.email_fuzzy      = RegExp(untpl(re$1.tpl_email_fuzzy), 'i');
      re$1.link_fuzzy       = RegExp(untpl(re$1.tpl_link_fuzzy), 'i');
      re$1.link_no_ip_fuzzy = RegExp(untpl(re$1.tpl_link_no_ip_fuzzy), 'i');
      re$1.host_fuzzy_test  = RegExp(untpl(re$1.tpl_host_fuzzy_test), 'i');

      //
      // Compile each schema
      //

      var aliases = [];

      self.__compiled__ = {}; // Reset compiled data

      function schemaError(name, val) {
        throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
      }

      Object.keys(self.__schemas__).forEach(function (name) {
        var val = self.__schemas__[name];

        // skip disabled methods
        if (val === null) { return; }

        var compiled = { validate: null, link: null };

        self.__compiled__[name] = compiled;

        if (isObject(val)) {
          if (isRegExp(val.validate)) {
            compiled.validate = createValidator(val.validate);
          } else if (isFunction(val.validate)) {
            compiled.validate = val.validate;
          } else {
            schemaError(name, val);
          }

          if (isFunction(val.normalize)) {
            compiled.normalize = val.normalize;
          } else if (!val.normalize) {
            compiled.normalize = createNormalizer();
          } else {
            schemaError(name, val);
          }

          return;
        }

        if (isString(val)) {
          aliases.push(name);
          return;
        }

        schemaError(name, val);
      });

      //
      // Compile postponed aliases
      //

      aliases.forEach(function (alias) {
        if (!self.__compiled__[self.__schemas__[alias]]) {
          // Silently fail on missed schemas to avoid errons on disable.
          // schemaError(alias, self.__schemas__[alias]);
          return;
        }

        self.__compiled__[alias].validate =
          self.__compiled__[self.__schemas__[alias]].validate;
        self.__compiled__[alias].normalize =
          self.__compiled__[self.__schemas__[alias]].normalize;
      });

      //
      // Fake record for guessed links
      //
      self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

      //
      // Build schema condition
      //
      var slist = Object.keys(self.__compiled__)
                          .filter(function (name) {
                            // Filter disabled & fake schemas
                            return name.length > 0 && self.__compiled__[name];
                          })
                          .map(escapeRE)
                          .join('|');
      // (?!_) cause 1.5x slowdown
      self.re.schema_test     = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$1.src_ZPCc + '))(' + slist + ')', 'i');
      self.re.schema_search   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$1.src_ZPCc + '))(' + slist + ')', 'ig');
      self.re.schema_at_start = RegExp('^' + self.re.schema_search.source, 'i');

      self.re.pretest = RegExp(
        '(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@',
        'i'
      );

      //
      // Cleanup
      //

      resetScanCache(self);
    }

    /**
     * class Match
     *
     * Match result. Single element of array, returned by [[LinkifyIt#match]]
     **/
    function Match(self, shift) {
      var start = self.__index__,
          end   = self.__last_index__,
          text  = self.__text_cache__.slice(start, end);

      /**
       * Match#schema -> String
       *
       * Prefix (protocol) for matched string.
       **/
      this.schema    = self.__schema__.toLowerCase();
      /**
       * Match#index -> Number
       *
       * First position of matched string.
       **/
      this.index     = start + shift;
      /**
       * Match#lastIndex -> Number
       *
       * Next position after matched string.
       **/
      this.lastIndex = end + shift;
      /**
       * Match#raw -> String
       *
       * Matched string.
       **/
      this.raw       = text;
      /**
       * Match#text -> String
       *
       * Notmalized text of matched string.
       **/
      this.text      = text;
      /**
       * Match#url -> String
       *
       * Normalized url of matched string.
       **/
      this.url       = text;
    }

    function createMatch(self, shift) {
      var match = new Match(self, shift);

      self.__compiled__[match.schema].normalize(match, self);

      return match;
    }


    /**
     * class LinkifyIt
     **/

    /**
     * new LinkifyIt(schemas, options)
     * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
     * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
     *
     * Creates new linkifier instance with optional additional schemas.
     * Can be called without `new` keyword for convenience.
     *
     * By default understands:
     *
     * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
     * - "fuzzy" links and emails (example.com, foo@bar.com).
     *
     * `schemas` is an object, where each key/value describes protocol/rule:
     *
     * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
     *   for example). `linkify-it` makes shure that prefix is not preceeded with
     *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
     * - __value__ - rule to check tail after link prefix
     *   - _String_ - just alias to existing rule
     *   - _Object_
     *     - _validate_ - validator function (should return matched length on success),
     *       or `RegExp`.
     *     - _normalize_ - optional function to normalize text & url of matched result
     *       (for example, for @twitter mentions).
     *
     * `options`:
     *
     * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
     * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
     *   like version numbers. Default `false`.
     * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
     *
     **/
    function LinkifyIt$1(schemas, options) {
      if (!(this instanceof LinkifyIt$1)) {
        return new LinkifyIt$1(schemas, options);
      }

      if (!options) {
        if (isOptionsObj(schemas)) {
          options = schemas;
          schemas = {};
        }
      }

      this.__opts__           = assign({}, defaultOptions, options);

      // Cache last tested result. Used to skip repeating steps on next `match` call.
      this.__index__          = -1;
      this.__last_index__     = -1; // Next scan position
      this.__schema__         = '';
      this.__text_cache__     = '';

      this.__schemas__        = assign({}, defaultSchemas, schemas);
      this.__compiled__       = {};

      this.__tlds__           = tlds_default;
      this.__tlds_replaced__  = false;

      this.re = {};

      compile(this);
    }


    /** chainable
     * LinkifyIt#add(schema, definition)
     * - schema (String): rule name (fixed pattern prefix)
     * - definition (String|RegExp|Object): schema definition
     *
     * Add new rule definition. See constructor description for details.
     **/
    LinkifyIt$1.prototype.add = function add(schema, definition) {
      this.__schemas__[schema] = definition;
      compile(this);
      return this;
    };


    /** chainable
     * LinkifyIt#set(options)
     * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
     *
     * Set recognition options for links without schema.
     **/
    LinkifyIt$1.prototype.set = function set(options) {
      this.__opts__ = assign(this.__opts__, options);
      return this;
    };


    /**
     * LinkifyIt#test(text) -> Boolean
     *
     * Searches linkifiable pattern and returns `true` on success or `false` on fail.
     **/
    LinkifyIt$1.prototype.test = function test(text) {
      // Reset scan cache
      this.__text_cache__ = text;
      this.__index__      = -1;

      if (!text.length) { return false; }

      var m, ml, me, len, shift, next, re, tld_pos, at_pos;

      // try to scan for link with schema - that's the most simple rule
      if (this.re.schema_test.test(text)) {
        re = this.re.schema_search;
        re.lastIndex = 0;
        while ((m = re.exec(text)) !== null) {
          len = this.testSchemaAt(text, m[2], re.lastIndex);
          if (len) {
            this.__schema__     = m[2];
            this.__index__      = m.index + m[1].length;
            this.__last_index__ = m.index + m[0].length + len;
            break;
          }
        }
      }

      if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
        // guess schemaless links
        tld_pos = text.search(this.re.host_fuzzy_test);
        if (tld_pos >= 0) {
          // if tld is located after found link - no need to check fuzzy pattern
          if (this.__index__ < 0 || tld_pos < this.__index__) {
            if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

              shift = ml.index + ml[1].length;

              if (this.__index__ < 0 || shift < this.__index__) {
                this.__schema__     = '';
                this.__index__      = shift;
                this.__last_index__ = ml.index + ml[0].length;
              }
            }
          }
        }
      }

      if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
        // guess schemaless emails
        at_pos = text.indexOf('@');
        if (at_pos >= 0) {
          // We can't skip this check, because this cases are possible:
          // 192.168.1.1@gmail.com, my.in@example.com
          if ((me = text.match(this.re.email_fuzzy)) !== null) {

            shift = me.index + me[1].length;
            next  = me.index + me[0].length;

            if (this.__index__ < 0 || shift < this.__index__ ||
                (shift === this.__index__ && next > this.__last_index__)) {
              this.__schema__     = 'mailto:';
              this.__index__      = shift;
              this.__last_index__ = next;
            }
          }
        }
      }

      return this.__index__ >= 0;
    };


    /**
     * LinkifyIt#pretest(text) -> Boolean
     *
     * Very quick check, that can give false positives. Returns true if link MAY BE
     * can exists. Can be used for speed optimization, when you need to check that
     * link NOT exists.
     **/
    LinkifyIt$1.prototype.pretest = function pretest(text) {
      return this.re.pretest.test(text);
    };


    /**
     * LinkifyIt#testSchemaAt(text, name, position) -> Number
     * - text (String): text to scan
     * - name (String): rule (schema) name
     * - position (Number): text offset to check from
     *
     * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
     * at given position. Returns length of found pattern (0 on fail).
     **/
    LinkifyIt$1.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
      // If not supported schema check requested - terminate
      if (!this.__compiled__[schema.toLowerCase()]) {
        return 0;
      }
      return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
    };


    /**
     * LinkifyIt#match(text) -> Array|null
     *
     * Returns array of found link descriptions or `null` on fail. We strongly
     * recommend to use [[LinkifyIt#test]] first, for best speed.
     *
     * ##### Result match description
     *
     * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
     *   protocol-neutral  links.
     * - __index__ - offset of matched text
     * - __lastIndex__ - index of next char after mathch end
     * - __raw__ - matched text
     * - __text__ - normalized text
     * - __url__ - link, generated from matched text
     **/
    LinkifyIt$1.prototype.match = function match(text) {
      var shift = 0, result = [];

      // Try to take previous element from cache, if .test() called before
      if (this.__index__ >= 0 && this.__text_cache__ === text) {
        result.push(createMatch(this, shift));
        shift = this.__last_index__;
      }

      // Cut head if cache was used
      var tail = shift ? text.slice(shift) : text;

      // Scan string until end reached
      while (this.test(tail)) {
        result.push(createMatch(this, shift));

        tail = tail.slice(this.__last_index__);
        shift += this.__last_index__;
      }

      if (result.length) {
        return result;
      }

      return null;
    };


    /**
     * LinkifyIt#matchAtStart(text) -> Match|null
     *
     * Returns fully-formed (not fuzzy) link if it starts at the beginning
     * of the string, and null otherwise.
     **/
    LinkifyIt$1.prototype.matchAtStart = function matchAtStart(text) {
      // Reset scan cache
      this.__text_cache__ = text;
      this.__index__      = -1;

      if (!text.length) return null;

      var m = this.re.schema_at_start.exec(text);
      if (!m) return null;

      var len = this.testSchemaAt(text, m[2], m[0].length);
      if (!len) return null;

      this.__schema__     = m[2];
      this.__index__      = m.index + m[1].length;
      this.__last_index__ = m.index + m[0].length + len;

      return createMatch(this, 0);
    };


    /** chainable
     * LinkifyIt#tlds(list [, keepOld]) -> this
     * - list (Array): list of tlds
     * - keepOld (Boolean): merge with current list if `true` (`false` by default)
     *
     * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
     * to avoid false positives. By default this algorythm used:
     *
     * - hostname with any 2-letter root zones are ok.
     * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
     *   are ok.
     * - encoded (`xn--...`) root zones are ok.
     *
     * If list is replaced, then exact match for 2-chars root zones will be checked.
     **/
    LinkifyIt$1.prototype.tlds = function tlds(list, keepOld) {
      list = Array.isArray(list) ? list : [ list ];

      if (!keepOld) {
        this.__tlds__ = list.slice();
        this.__tlds_replaced__ = true;
        compile(this);
        return this;
      }

      this.__tlds__ = this.__tlds__.concat(list)
                                      .sort()
                                      .filter(function (el, idx, arr) {
                                        return el !== arr[idx - 1];
                                      })
                                      .reverse();

      compile(this);
      return this;
    };

    /**
     * LinkifyIt#normalize(match)
     *
     * Default normalizer (if schema does not define it's own).
     **/
    LinkifyIt$1.prototype.normalize = function normalize(match) {

      // Do minimal possible changes by default. Need to collect feedback prior
      // to move forward https://github.com/markdown-it/linkify-it/issues/1

      if (!match.schema) { match.url = 'http://' + match.url; }

      if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
        match.url = 'mailto:' + match.url;
      }
    };


    /**
     * LinkifyIt#onCompile()
     *
     * Override to modify basic RegExp-s.
     **/
    LinkifyIt$1.prototype.onCompile = function onCompile() {
    };


    var linkifyIt = LinkifyIt$1;

    /** Highest positive signed 32-bit float value */
    const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

    /** Bootstring parameters */
    const base = 36;
    const tMin = 1;
    const tMax = 26;
    const skew = 38;
    const damp = 700;
    const initialBias = 72;
    const initialN = 128; // 0x80
    const delimiter = '-'; // '\x2D'

    /** Regular expressions */
    const regexPunycode = /^xn--/;
    const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
    const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

    /** Error messages */
    const errors = {
    	'overflow': 'Overflow: input needs wider integers to process',
    	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    	'invalid-input': 'Invalid input'
    };

    /** Convenience screenshots */
    const baseMinusTMin = base - tMin;
    const floor = Math.floor;
    const stringFromCharCode = String.fromCharCode;

    /*--------------------------------------------------------------------------*/

    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
    function error(type) {
    	throw new RangeError(errors[type]);
    }

    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
    function map(array, callback) {
    	const result = [];
    	let length = array.length;
    	while (length--) {
    		result[length] = callback(array[length]);
    	}
    	return result;
    }

    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {String} A new string of characters returned by the callback
     * function.
     */
    function mapDomain(domain, callback) {
    	const parts = domain.split('@');
    	let result = '';
    	if (parts.length > 1) {
    		// In email addresses, only the domain name should be punycoded. Leave
    		// the local part (i.e. everything up to `@`) intact.
    		result = parts[0] + '@';
    		domain = parts[1];
    	}
    	// Avoid `split(regex)` for IE8 compatibility. See #17.
    	domain = domain.replace(regexSeparators, '\x2E');
    	const labels = domain.split('.');
    	const encoded = map(labels, callback).join('.');
    	return result + encoded;
    }

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
    function ucs2decode(string) {
    	const output = [];
    	let counter = 0;
    	const length = string.length;
    	while (counter < length) {
    		const value = string.charCodeAt(counter++);
    		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
    			// It's a high surrogate, and there is a next character.
    			const extra = string.charCodeAt(counter++);
    			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
    				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
    			} else {
    				// It's an unmatched surrogate; only append this code unit, in case the
    				// next code unit is the high surrogate of a surrogate pair.
    				output.push(value);
    				counter--;
    			}
    		} else {
    			output.push(value);
    		}
    	}
    	return output;
    }

    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
    const ucs2encode = codePoints => String.fromCodePoint(...codePoints);

    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
    const basicToDigit = function(codePoint) {
    	if (codePoint >= 0x30 && codePoint < 0x3A) {
    		return 26 + (codePoint - 0x30);
    	}
    	if (codePoint >= 0x41 && codePoint < 0x5B) {
    		return codePoint - 0x41;
    	}
    	if (codePoint >= 0x61 && codePoint < 0x7B) {
    		return codePoint - 0x61;
    	}
    	return base;
    };

    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
    const digitToBasic = function(digit, flag) {
    	//  0..25 map to ASCII a..z or A..Z
    	// 26..35 map to ASCII 0..9
    	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
    const adapt = function(delta, numPoints, firstTime) {
    	let k = 0;
    	delta = firstTime ? floor(delta / damp) : delta >> 1;
    	delta += floor(delta / numPoints);
    	for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
    		delta = floor(delta / baseMinusTMin);
    	}
    	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };

    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
    const decode = function(input) {
    	// Don't use UCS-2.
    	const output = [];
    	const inputLength = input.length;
    	let i = 0;
    	let n = initialN;
    	let bias = initialBias;

    	// Handle the basic code points: let `basic` be the number of input code
    	// points before the last delimiter, or `0` if there is none, then copy
    	// the first basic code points to the output.

    	let basic = input.lastIndexOf(delimiter);
    	if (basic < 0) {
    		basic = 0;
    	}

    	for (let j = 0; j < basic; ++j) {
    		// if it's not a basic code point
    		if (input.charCodeAt(j) >= 0x80) {
    			error('not-basic');
    		}
    		output.push(input.charCodeAt(j));
    	}

    	// Main decoding loop: start just after the last delimiter if any basic code
    	// points were copied; start at the beginning otherwise.

    	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

    		// `index` is the index of the next character to be consumed.
    		// Decode a generalized variable-length integer into `delta`,
    		// which gets added to `i`. The overflow checking is easier
    		// if we increase `i` as we go, then subtract off its starting
    		// value at the end to obtain `delta`.
    		const oldi = i;
    		for (let w = 1, k = base; /* no condition */; k += base) {

    			if (index >= inputLength) {
    				error('invalid-input');
    			}

    			const digit = basicToDigit(input.charCodeAt(index++));

    			if (digit >= base) {
    				error('invalid-input');
    			}
    			if (digit > floor((maxInt - i) / w)) {
    				error('overflow');
    			}

    			i += digit * w;
    			const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

    			if (digit < t) {
    				break;
    			}

    			const baseMinusT = base - t;
    			if (w > floor(maxInt / baseMinusT)) {
    				error('overflow');
    			}

    			w *= baseMinusT;

    		}

    		const out = output.length + 1;
    		bias = adapt(i - oldi, out, oldi == 0);

    		// `i` was supposed to wrap around from `out` to `0`,
    		// incrementing `n` each time, so we'll fix that now:
    		if (floor(i / out) > maxInt - n) {
    			error('overflow');
    		}

    		n += floor(i / out);
    		i %= out;

    		// Insert `n` at position `i` of the output.
    		output.splice(i++, 0, n);

    	}

    	return String.fromCodePoint(...output);
    };

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
    const encode = function(input) {
    	const output = [];

    	// Convert the input in UCS-2 to an array of Unicode code points.
    	input = ucs2decode(input);

    	// Cache the length.
    	const inputLength = input.length;

    	// Initialize the state.
    	let n = initialN;
    	let delta = 0;
    	let bias = initialBias;

    	// Handle the basic code points.
    	for (const currentValue of input) {
    		if (currentValue < 0x80) {
    			output.push(stringFromCharCode(currentValue));
    		}
    	}

    	const basicLength = output.length;
    	let handledCPCount = basicLength;

    	// `handledCPCount` is the number of code points that have been handled;
    	// `basicLength` is the number of basic code points.

    	// Finish the basic string with a delimiter unless it's empty.
    	if (basicLength) {
    		output.push(delimiter);
    	}

    	// Main encoding loop:
    	while (handledCPCount < inputLength) {

    		// All non-basic code points < n have been handled already. Find the next
    		// larger one:
    		let m = maxInt;
    		for (const currentValue of input) {
    			if (currentValue >= n && currentValue < m) {
    				m = currentValue;
    			}
    		}

    		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
    		// but guard against overflow.
    		const handledCPCountPlusOne = handledCPCount + 1;
    		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
    			error('overflow');
    		}

    		delta += (m - n) * handledCPCountPlusOne;
    		n = m;

    		for (const currentValue of input) {
    			if (currentValue < n && ++delta > maxInt) {
    				error('overflow');
    			}
    			if (currentValue === n) {
    				// Represent delta as a generalized variable-length integer.
    				let q = delta;
    				for (let k = base; /* no condition */; k += base) {
    					const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
    					if (q < t) {
    						break;
    					}
    					const qMinusT = q - t;
    					const baseMinusT = base - t;
    					output.push(
    						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
    					);
    					q = floor(qMinusT / baseMinusT);
    				}

    				output.push(stringFromCharCode(digitToBasic(q, 0)));
    				bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
    				delta = 0;
    				++handledCPCount;
    			}
    		}

    		++delta;
    		++n;

    	}
    	return output.join('');
    };

    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
    const toUnicode = function(input) {
    	return mapDomain(input, function(string) {
    		return regexPunycode.test(string)
    			? decode(string.slice(4).toLowerCase())
    			: string;
    	});
    };

    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
    const toASCII = function(input) {
    	return mapDomain(input, function(string) {
    		return regexNonASCII.test(string)
    			? 'xn--' + encode(string)
    			: string;
    	});
    };

    /*--------------------------------------------------------------------------*/

    /** Define the public API */
    const punycode$1 = {
    	/**
    	 * A string representing the current Punycode.js version number.
    	 * @memberOf punycode
    	 * @type String
    	 */
    	'version': '2.1.0',
    	/**
    	 * An object of methods to convert from JavaScript's internal character
    	 * representation (UCS-2) to Unicode code points, and back.
    	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
    	 * @memberOf punycode
    	 * @type Object
    	 */
    	'ucs2': {
    		'decode': ucs2decode,
    		'encode': ucs2encode
    	},
    	'decode': decode,
    	'encode': encode,
    	'toASCII': toASCII,
    	'toUnicode': toUnicode
    };

    var punycode_es6 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ucs2decode: ucs2decode,
        ucs2encode: ucs2encode,
        decode: decode,
        encode: encode,
        toASCII: toASCII,
        toUnicode: toUnicode,
        'default': punycode$1
    });

    var require$$8 = /*@__PURE__*/getAugmentedNamespace(punycode_es6);

    var _default = {
      options: {
        html:         false,        // Enable HTML tags in source
        xhtmlOut:     false,        // Use '/' to close single tags (<br />)
        breaks:       false,        // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks
        linkify:      false,        // autoconvert URL-like texts to links

        // Enable some language-neutral replacements + quotes beautification
        typographer:  false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,

        maxNesting:   100            // Internal protection, recursion limit
      },

      components: {

        core: {},
        block: {},
        inline: {}
      }
    };

    var zero = {
      options: {
        html:         false,        // Enable HTML tags in source
        xhtmlOut:     false,        // Use '/' to close single tags (<br />)
        breaks:       false,        // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks
        linkify:      false,        // autoconvert URL-like texts to links

        // Enable some language-neutral replacements + quotes beautification
        typographer:  false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,

        maxNesting:   20            // Internal protection, recursion limit
      },

      components: {

        core: {
          rules: [
            'normalize',
            'block',
            'inline',
            'text_join'
          ]
        },

        block: {
          rules: [
            'paragraph'
          ]
        },

        inline: {
          rules: [
            'text'
          ],
          rules2: [
            'balance_pairs',
            'fragments_join'
          ]
        }
      }
    };

    var commonmark = {
      options: {
        html:         true,         // Enable HTML tags in source
        xhtmlOut:     true,         // Use '/' to close single tags (<br />)
        breaks:       false,        // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks
        linkify:      false,        // autoconvert URL-like texts to links

        // Enable some language-neutral replacements + quotes beautification
        typographer:  false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,

        maxNesting:   20            // Internal protection, recursion limit
      },

      components: {

        core: {
          rules: [
            'normalize',
            'block',
            'inline',
            'text_join'
          ]
        },

        block: {
          rules: [
            'blockquote',
            'code',
            'fence',
            'heading',
            'hr',
            'html_block',
            'lheading',
            'list',
            'reference',
            'paragraph'
          ]
        },

        inline: {
          rules: [
            'autolink',
            'backticks',
            'emphasis',
            'entity',
            'escape',
            'html_inline',
            'image',
            'link',
            'newline',
            'text'
          ],
          rules2: [
            'balance_pairs',
            'emphasis',
            'fragments_join'
          ]
        }
      }
    };

    var utils        = utils$1;
    var helpers      = helpers$1;
    var Renderer     = renderer;
    var ParserCore   = parser_core;
    var ParserBlock  = parser_block;
    var ParserInline = parser_inline;
    var LinkifyIt    = linkifyIt;
    var mdurl        = mdurl$1;
    var punycode     = require$$8;


    var config = {
      default: _default,
      zero: zero,
      commonmark: commonmark
    };

    ////////////////////////////////////////////////////////////////////////////////
    //
    // This validator can prohibit more than really needed to prevent XSS. It's a
    // tradeoff to keep code simple and to be secure by default.
    //
    // If you need different setup - override validator method as you wish. Or
    // replace it with dummy function and use external sanitizer.
    //

    var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
    var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

    function validateLink(url) {
      // url should be normalized at this point, and existing entities are decoded
      var str = url.trim().toLowerCase();

      return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
    }

    ////////////////////////////////////////////////////////////////////////////////


    var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

    function normalizeLink(url) {
      var parsed = mdurl.parse(url, true);

      if (parsed.hostname) {
        // Encode hostnames in urls like:
        // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
        //
        // We don't encode unknown schemas, because it's likely that we encode
        // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
        //
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode.toASCII(parsed.hostname);
          } catch (er) { /**/ }
        }
      }

      return mdurl.encode(mdurl.format(parsed));
    }

    function normalizeLinkText(url) {
      var parsed = mdurl.parse(url, true);

      if (parsed.hostname) {
        // Encode hostnames in urls like:
        // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
        //
        // We don't encode unknown schemas, because it's likely that we encode
        // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
        //
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode.toUnicode(parsed.hostname);
          } catch (er) { /**/ }
        }
      }

      // add '%' to exclude list because of https://github.com/markdown-it/markdown-it/issues/720
      return mdurl.decode(mdurl.format(parsed), mdurl.decode.defaultChars + '%');
    }


    /**
     * class MarkdownIt
     *
     * Main parser/renderer class.
     *
     * ##### Usage
     *
     * ```javascript
     * // node.js, "classic" way:
     * var MarkdownIt = require('markdown-it'),
     *     md = new MarkdownIt();
     * var result = md.render('# markdown-it rulezz!');
     *
     * // node.js, the same, but with sugar:
     * var md = require('markdown-it')();
     * var result = md.render('# markdown-it rulezz!');
     *
     * // browser without AMD, added to "window" on script load
     * // Note, there are no dash.
     * var md = window.markdownit();
     * var result = md.render('# markdown-it rulezz!');
     * ```
     *
     * Single line rendering, without paragraph wrap:
     *
     * ```javascript
     * var md = require('markdown-it')();
     * var result = md.renderInline('__markdown-it__ rulezz!');
     * ```
     **/

    /**
     * new MarkdownIt([presetName, options])
     * - presetName (String): optional, `commonmark` / `zero`
     * - options (Object)
     *
     * Creates parser instanse with given config. Can be called without `new`.
     *
     * ##### presetName
     *
     * MarkdownIt provides named presets as a convenience to quickly
     * enable/disable active syntax rules and options for common use cases.
     *
     * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
     *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
     * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
     *   similar to GFM, used when no preset name given. Enables all available rules,
     *   but still without html, typographer & autolinker.
     * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
     *   all rules disabled. Useful to quickly setup your config via `.enable()`.
     *   For example, when you need only `bold` and `italic` markup and nothing else.
     *
     * ##### options:
     *
     * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
     *   That's not safe! You may need external sanitizer to protect output from XSS.
     *   It's better to extend features via plugins, instead of enabling HTML.
     * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
     *   (`<br />`). This is needed only for full CommonMark compatibility. In real
     *   world you will need HTML output.
     * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
     * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
     *   Can be useful for external highlighters.
     * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
     * - __typographer__  - `false`. Set `true` to enable [some language-neutral
     *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
     *   quotes beautification (smartquotes).
     * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
     *   pairs, when typographer enabled and smartquotes on. For example, you can
     *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
     *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
     * - __highlight__ - `null`. Highlighter function for fenced code blocks.
     *   Highlighter `function (str, lang)` should return escaped HTML. It can also
     *   return empty string if the source was not changed and should be escaped
     *   externaly. If result starts with <pre... internal wrapper is skipped.
     *
     * ##### Example
     *
     * ```javascript
     * // commonmark mode
     * var md = require('markdown-it')('commonmark');
     *
     * // default mode
     * var md = require('markdown-it')();
     *
     * // enable everything
     * var md = require('markdown-it')({
     *   html: true,
     *   linkify: true,
     *   typographer: true
     * });
     * ```
     *
     * ##### Syntax highlighting
     *
     * ```js
     * var hljs = require('highlight.js') // https://highlightjs.org/
     *
     * var md = require('markdown-it')({
     *   highlight: function (str, lang) {
     *     if (lang && hljs.getLanguage(lang)) {
     *       try {
     *         return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
     *       } catch (__) {}
     *     }
     *
     *     return ''; // use external default escaping
     *   }
     * });
     * ```
     *
     * Or with full wrapper override (if you need assign class to `<pre>`):
     *
     * ```javascript
     * var hljs = require('highlight.js') // https://highlightjs.org/
     *
     * // Actual default values
     * var md = require('markdown-it')({
     *   highlight: function (str, lang) {
     *     if (lang && hljs.getLanguage(lang)) {
     *       try {
     *         return '<pre class="hljs"><code>' +
     *                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
     *                '</code></pre>';
     *       } catch (__) {}
     *     }
     *
     *     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
     *   }
     * });
     * ```
     *
     **/
    function MarkdownIt(presetName, options) {
      if (!(this instanceof MarkdownIt)) {
        return new MarkdownIt(presetName, options);
      }

      if (!options) {
        if (!utils.isString(presetName)) {
          options = presetName || {};
          presetName = 'default';
        }
      }

      /**
       * MarkdownIt#inline -> ParserInline
       *
       * Instance of [[ParserInline]]. You may need it to add new rules when
       * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
       * [[MarkdownIt.enable]].
       **/
      this.inline = new ParserInline();

      /**
       * MarkdownIt#block -> ParserBlock
       *
       * Instance of [[ParserBlock]]. You may need it to add new rules when
       * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
       * [[MarkdownIt.enable]].
       **/
      this.block = new ParserBlock();

      /**
       * MarkdownIt#core -> Core
       *
       * Instance of [[Core]] chain executor. You may need it to add new rules when
       * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
       * [[MarkdownIt.enable]].
       **/
      this.core = new ParserCore();

      /**
       * MarkdownIt#renderer -> Renderer
       *
       * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
       * rules for new token types, generated by plugins.
       *
       * ##### Example
       *
       * ```javascript
       * var md = require('markdown-it')();
       *
       * function myToken(tokens, idx, options, env, self) {
       *   //...
       *   return result;
       * };
       *
       * md.renderer.rules['my_token'] = myToken
       * ```
       *
       * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
       **/
      this.renderer = new Renderer();

      /**
       * MarkdownIt#linkify -> LinkifyIt
       *
       * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
       * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
       * rule.
       **/
      this.linkify = new LinkifyIt();

      /**
       * MarkdownIt#validateLink(url) -> Boolean
       *
       * Link validation function. CommonMark allows too much in links. By default
       * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
       * except some embedded image types.
       *
       * You can change this behaviour:
       *
       * ```javascript
       * var md = require('markdown-it')();
       * // enable everything
       * md.validateLink = function () { return true; }
       * ```
       **/
      this.validateLink = validateLink;

      /**
       * MarkdownIt#normalizeLink(url) -> String
       *
       * Function used to encode link url to a machine-readable format,
       * which includes url-encoding, punycode, etc.
       **/
      this.normalizeLink = normalizeLink;

      /**
       * MarkdownIt#normalizeLinkText(url) -> String
       *
       * Function used to decode link url to a human-readable format`
       **/
      this.normalizeLinkText = normalizeLinkText;


      // Expose utils & helpers for easy acces from plugins

      /**
       * MarkdownIt#utils -> utils
       *
       * Assorted utility functions, useful to write plugins. See details
       * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
       **/
      this.utils = utils;

      /**
       * MarkdownIt#helpers -> helpers
       *
       * Link components parser functions, useful to write plugins. See details
       * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
       **/
      this.helpers = utils.assign({}, helpers);


      this.options = {};
      this.configure(presetName);

      if (options) { this.set(options); }
    }


    /** chainable
     * MarkdownIt.set(options)
     *
     * Set parser options (in the same format as in constructor). Probably, you
     * will never need it, but you can change options after constructor call.
     *
     * ##### Example
     *
     * ```javascript
     * var md = require('markdown-it')()
     *             .set({ html: true, breaks: true })
     *             .set({ typographer, true });
     * ```
     *
     * __Note:__ To achieve the best possible performance, don't modify a
     * `markdown-it` instance options on the fly. If you need multiple configurations
     * it's best to create multiple instances and initialize each with separate
     * config.
     **/
    MarkdownIt.prototype.set = function (options) {
      utils.assign(this.options, options);
      return this;
    };


    /** chainable, internal
     * MarkdownIt.configure(presets)
     *
     * Batch load of all options and compenent settings. This is internal method,
     * and you probably will not need it. But if you will - see available presets
     * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
     *
     * We strongly recommend to use presets instead of direct config loads. That
     * will give better compatibility with next versions.
     **/
    MarkdownIt.prototype.configure = function (presets) {
      var self = this, presetName;

      if (utils.isString(presets)) {
        presetName = presets;
        presets = config[presetName];
        if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
      }

      if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }

      if (presets.options) { self.set(presets.options); }

      if (presets.components) {
        Object.keys(presets.components).forEach(function (name) {
          if (presets.components[name].rules) {
            self[name].ruler.enableOnly(presets.components[name].rules);
          }
          if (presets.components[name].rules2) {
            self[name].ruler2.enableOnly(presets.components[name].rules2);
          }
        });
      }
      return this;
    };


    /** chainable
     * MarkdownIt.enable(list, ignoreInvalid)
     * - list (String|Array): rule name or list of rule names to enable
     * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
     *
     * Enable list or rules. It will automatically find appropriate components,
     * containing rules with given names. If rule not found, and `ignoreInvalid`
     * not set - throws exception.
     *
     * ##### Example
     *
     * ```javascript
     * var md = require('markdown-it')()
     *             .enable(['sub', 'sup'])
     *             .disable('smartquotes');
     * ```
     **/
    MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
      var result = [];

      if (!Array.isArray(list)) { list = [ list ]; }

      [ 'core', 'block', 'inline' ].forEach(function (chain) {
        result = result.concat(this[chain].ruler.enable(list, true));
      }, this);

      result = result.concat(this.inline.ruler2.enable(list, true));

      var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

      if (missed.length && !ignoreInvalid) {
        throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
      }

      return this;
    };


    /** chainable
     * MarkdownIt.disable(list, ignoreInvalid)
     * - list (String|Array): rule name or list of rule names to disable.
     * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
     *
     * The same as [[MarkdownIt.enable]], but turn specified rules off.
     **/
    MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
      var result = [];

      if (!Array.isArray(list)) { list = [ list ]; }

      [ 'core', 'block', 'inline' ].forEach(function (chain) {
        result = result.concat(this[chain].ruler.disable(list, true));
      }, this);

      result = result.concat(this.inline.ruler2.disable(list, true));

      var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

      if (missed.length && !ignoreInvalid) {
        throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
      }
      return this;
    };


    /** chainable
     * MarkdownIt.use(plugin, params)
     *
     * Load specified plugin with given params into current parser instance.
     * It's just a sugar to call `plugin(md, params)` with curring.
     *
     * ##### Example
     *
     * ```javascript
     * var iterator = require('markdown-it-for-inline');
     * var md = require('markdown-it')()
     *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
     *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
     *             });
     * ```
     **/
    MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
      var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
      plugin.apply(plugin, args);
      return this;
    };


    /** internal
     * MarkdownIt.parse(src, env) -> Array
     * - src (String): source string
     * - env (Object): environment sandbox
     *
     * Parse input string and return list of block tokens (special token type
     * "inline" will contain list of inline tokens). You should not call this
     * method directly, until you write custom renderer (for example, to produce
     * AST).
     *
     * `env` is used to pass data between "distributed" rules and return additional
     * metadata like reference info, needed for the renderer. It also can be used to
     * inject data in specific cases. Usually, you will be ok to pass `{}`,
     * and then pass updated object to renderer.
     **/
    MarkdownIt.prototype.parse = function (src, env) {
      if (typeof src !== 'string') {
        throw new Error('Input data should be a String');
      }

      var state = new this.core.State(src, this, env);

      this.core.process(state);

      return state.tokens;
    };


    /**
     * MarkdownIt.render(src [, env]) -> String
     * - src (String): source string
     * - env (Object): environment sandbox
     *
     * Render markdown string into html. It does all magic for you :).
     *
     * `env` can be used to inject additional metadata (`{}` by default).
     * But you will not need it with high probability. See also comment
     * in [[MarkdownIt.parse]].
     **/
    MarkdownIt.prototype.render = function (src, env) {
      env = env || {};

      return this.renderer.render(this.parse(src, env), this.options, env);
    };


    /** internal
     * MarkdownIt.parseInline(src, env) -> Array
     * - src (String): source string
     * - env (Object): environment sandbox
     *
     * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
     * block tokens list with the single `inline` element, containing parsed inline
     * tokens in `children` property. Also updates `env` object.
     **/
    MarkdownIt.prototype.parseInline = function (src, env) {
      var state = new this.core.State(src, this, env);

      state.inlineMode = true;
      this.core.process(state);

      return state.tokens;
    };

    const Content = ({}) => {
        const { screenshots, setScreenshots, screenshotsList } = useScreenshotsState();
        const [ webhookUrl, setWebhookUrl ] = React.useState();
        const [ isError, setIsError ] = React.useState(false);
        const [ isLoadingUrl, setIsLoadingUrl ] = React.useState(false);
        const [ isSaving, setIsSaving ] = React.useState(false);
        const [ isSaved, setIsSaved ] = React.useState(false);
        const [ version, setVersion ] = React.useState("0.0.0");
        const [ autoUpload, setAutoUpload ] = React.useState(false);
        const [ notifications, setNotifications ] = React.useState(false);
        const tries = React.useRef(0);

        async function saveWebhookUrl(webhookUrl) {
          setIsLoadingUrl(true);
          setIsSaving(true);
          setIsSaved(false);
          await PyInterop.setWebhookUrl(webhookUrl).then((res) => {
            if (res.result.toLowerCase().includes("invalid")) {
              setIsError(res.result);
            }else{
              setIsError(false);
              setWebhookUrl(res.result);
              setIsSaving(false);
              setIsSaved(true);
              setTimeout(() => { setIsSaved(false); }, 3000);
            }
            setIsLoadingUrl(false);
          });
        }

        async function reload() {
          try{

            await loadWebhookUrl(true);

            await PyInterop.getScreenshots().then((res) => {
                setScreenshots(res.result);
            });
          }catch(e){  
            PyInterop.log("Error in reload: " + e);
          }
        }

        async function loadWebhookUrl(force=true) {
          if (((webhookUrl == "" || webhookUrl == null || webhookUrl == "False") && isLoadingUrl == false) || force == true) {
            setIsLoadingUrl(true);
            await PyInterop.getWebhookUrl().then((res) => {

              if (res.result.toLowerCase().includes("invalid")) {
                setIsError(res.result);
              }else{
                setIsError(false);
                setWebhookUrl(res.result);
              }
              setIsLoadingUrl(false);
            });
          }
        }

        async function toggleAutoUpload(value){
          await PyInterop.setSetting("autoupload", value);
          setAutoUpload(value);
        }

        async function toggleNotifications(value){
          await PyInterop.setSetting("notifications", value);
          setNotifications(value);
        }

        async function loadSettings() {
          const version = await PyInterop.getSetting("version", "");
          setVersion(version);
          const autoupload = await PyInterop.getSetting("autoupload", "0");
          const notifications = await PyInterop.getSetting("notifications", "0");

          if(autoupload == 1 || autoupload == "1" || autoupload == "true" || autoupload == true){
            autoupload = true;
          }else{
            autoupload = false;
          }
          
          if(notifications == 1 || notifications == "1" || notifications == "true" || notifications == true){
            notifications = true;
          }else{
            notifications = false;
          }

          setAutoUpload(autoupload);
          setNotifications(notifications);
        }

        if(version == "0.0.0"){
          loadSettings();
        }

        loadWebhookUrl(false);

        if (Object.values(screenshots).length === 0 && tries.current < 10) {
            reload();
            tries.current++;
        }
        return (window.SP_REACT.createElement(React.Fragment, null,
            window.SP_REACT.createElement("style", null, `
        .deckshare-plugin-scope {
          width: inherit;
          height: inherit;

          flex: 1 1 1px;
          scroll-padding: 48px 0px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-content: stretch;
        }
        .deckshare-plugin-scope .${quickAccessControlsClasses.PanelSection} {
          padding: 0px;
        }

        .deckshare-plugin-scope .${gamepadDialogClasses.FieldChildren} {
          margin: 0px 16px;
        }
        
        .deckshare-plugin-scope .${gamepadDialogClasses.FieldLabel} {
          margin-left: 16px;
        }
      `),
      window.SP_REACT.createElement("div", { className: "deckshare-plugin-scope" },
        window.SP_REACT.createElement(PanelSection, { title: "settings" },                    
          window.SP_REACT.createElement(PanelSectionRow, null,
            window.SP_REACT.createElement(ToggleField, { checked: autoUpload, label: "Auto Share", onChange: (value) => toggleAutoUpload(value) }),
            window.SP_REACT.createElement(ToggleField, { checked: notifications, label: "Notifications", onChange: (value) => toggleNotifications(value) }),
            window.SP_REACT.createElement(TextField, { value: webhookUrl, layout: "below", onChange: (e) => { setWebhookUrl(e?.target.value); } } ),
            window.SP_REACT.createElement(ToggleField, { checked: isSaving, label: "Save Webhook Url", onChange: (e) => { saveWebhookUrl(webhookUrl); } }),
            //window.SP_REACT.createElement(ButtonItem, { layout: "below", onClick: () => saveWebhookUrl(webhookUrl) }, "Save"),
            (isError) ? (
              window.SP_REACT.createElement("div", { style: { textAlign: "center", margin: "14px 0px", padding: "0px 10px", fontSize: "12px", color: "red" } }, isError.toString())) : (""),
            (isSaving) ? (
              window.SP_REACT.createElement("div", { style: { textAlign: "center", margin: "14px 0px", padding: "0px 10px", fontSize: "12px", color: "yellow" } }, "Validating Webhook URL")) : (""),
            (isSaved) ? (
              window.SP_REACT.createElement("div", { style: { textAlign: "center", margin: "14px 0px", padding: "0px 10px", fontSize: "12px", color: "green" } }, "Successfully Saved Webhook URL")) : (""),
          )),
          window.SP_REACT.createElement(PanelSection, { title: "Recent Screenshots" },                    
          window.SP_REACT.createElement(PanelSectionRow, null,
              (screenshotsList.length == 0) ? (
                window.SP_REACT.createElement("div", { style: { textAlign: "center", margin: "14px 0px", padding: "0px 10px", fontSize: "12px" } }, "No screenshots found")) : (
                  window.SP_REACT.createElement(React.Fragment, null, screenshotsList.map((itm) => (
                    window.SP_REACT.createElement(ScreenshotLauncher, { screenshot: itm }))))),
          )),
          window.SP_REACT.createElement(PanelSection, { title: "Credits" },                    
          window.SP_REACT.createElement(PanelSectionRow, null,
              //window.SP_REACT.createElement(ButtonItem, { description: "Refresh the plugin", layout: "below", onClick: reload }, "Refresh"),
              window.SP_REACT.createElement(Field, { label: "Created with ❤️ by SmugZombie", layout: "below" }, ""),
              window.SP_REACT.createElement(Field, { label: "More Info: https://deckshare.zip", layout: "below" }, ""),
              window.SP_REACT.createElement(Field, { label: "Version: " + version, layout: "below" }, ""),
          ),
            
          ))));
    };
    
    var index = definePlugin((serverApi) => {
        PyInterop.setServer(serverApi);
        const state = new ScreenshotsState();
        PluginController.setup(serverApi, state);
        const loginHook = PluginController.initOnLogin();
        
        return {
            title: window.SP_REACT.createElement("div", { className: staticClasses.Title }, "DeckShare Screenshots"),
            content: (window.SP_REACT.createElement(ScreenshotsContextProvider, { screenshotsStateClass: state },
                window.SP_REACT.createElement(Content, { serverAPI: serverApi }))),
            icon: window.SP_REACT.createElement(IoApps, null),
            onDismount() {
                loginHook.unregister();
                serverApi.routerHook.removeRoute("/deckshare-plugin-config");
                PluginController.dismount();
            },
            alwaysRender: true
        };
    });

    return index;

})(SP_REACT);

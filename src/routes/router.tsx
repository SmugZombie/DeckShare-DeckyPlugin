import {
    SidebarNavigation
  } from "decky-frontend-lib"
  import { VFC } from "react"
  import { FaCog, FaInfo, FaCode, FaRegImages, FaRegListAlt } from "react-icons/fa"
  import { LogController } from "../controllers/logcontroller"
  import { DeveloperController } from "../controllers/developercontroller"
  import { ScreenshotManagerController } from "../controllers/screenshotmanagercontroller"
  import { SettingsController } from "../controllers/settingscontroller"
  import { AboutController } from "../controllers/aboutcontroller"
  
  const Router: VFC = () => {
    const pages = [
      {
        title: 'Screenshots',
        content: <ScreenshotManagerController />,
        icon: <FaRegImages/>,
        hideTitle: false
      },
      {
        title: 'Settings',
        content: <SettingsController />,
        icon: <FaCog/>,
        hideTitle: false
      },
      {
        title: 'Logs',
        content: <LogController />,
        icon: <FaRegListAlt/>,
        hideTitle: false
      },
      {
        title: 'Developer',
        content: <DeveloperController />,
        icon: <FaCode/>,
        hideTitle: false
      },
      {
        title: 'About',
        content: <AboutController />,
        icon: <FaInfo/>,
        hideTitle: false
      }
    ]
  
    return (
      <SidebarNavigation pages={pages} />
    )
  }
  
  export default Router
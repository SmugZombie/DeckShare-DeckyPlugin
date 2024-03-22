import {
    SidebarNavigation
  } from "decky-frontend-lib"
  import { VFC } from "react"
  import { FaClock, FaCog, FaInfo, FaPuzzlePiece, FaCode } from "react-icons/fa"
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
        icon: <FaClock/>,
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
        icon: <FaInfo/>,
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
        icon: <FaPuzzlePiece/>,
        hideTitle: false
      }
    ]
  
    return (
      <SidebarNavigation pages={pages} />
    )
  }
  
  export default Router
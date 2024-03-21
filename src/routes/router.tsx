import {
    SidebarNavigation
  } from "decky-frontend-lib"
  import { VFC } from "react"
  import { FaClock, FaCog, FaInfo, FaPuzzlePiece } from "react-icons/fa"
  
  const Router: VFC = () => {
    const pages = [
      {
        title: 'Screenshots',
        content: (
            <div>
                <h1>Screenshots</h1>
                <p>Test</p>
            </div>
        ),
        icon: <FaClock/>,
        hideTitle: false
      },
      {
        title: 'Settings',
        content: "Test2",
        icon: <FaCog/>,
        hideTitle: false
      },
      {
        title: 'Logs',
        content: "test2",
        icon: <FaInfo/>,
        hideTitle: false
      },
      {
        title: 'About',
        content: "test4",
        icon: <FaPuzzlePiece/>,
        hideTitle: false
      }
    ]
  
    return (
      <SidebarNavigation pages={pages} />
    )
  }
  
  export default Router
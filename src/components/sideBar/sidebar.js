import "./sidebar.css"
import { HomeIcon, AllIcon, BLogo, CreatePostAdd } from "../../assets/icons"

function Sidebar() {
  return (
    <>
      <div className="sideBar-container gap-y-2">
        <div className="sidebar-options">
          {" "}
          <BLogo />{" "}
        </div>
        <span className="sidebar-options gap-2">
          <AllIcon />
          <div className="sidebar-textResp">All</div>
        </span>
        <span className="sidebar-options gap-2">
          {" "}
          <HomeIcon />
          <div className="sidebar-textResp"> Home</div>
        </span>
        <span className="sidebar-optionsButtonRes">
          {" "}
          <CreatePostAdd />{" "}
        </span>
        <span className="sidebar-optionsButton">Create Post</span>
      </div>
    </>
  )
}

export default Sidebar

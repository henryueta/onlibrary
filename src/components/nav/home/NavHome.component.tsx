import Search from "../../search/Search.component";
import "./NavHome.component.css";
import onlibrary_logo from "../../../assets/imgs/logo/onlibrary_logo.png";
import { Link, useNavigate } from "react-router-dom";
import UserAccount from "../../account/user/UserAccount.component";
import Notification from "../../notification/Notification.component";
import useHandleAuth from "../../../hooks/usehandleAuth";

const NavHome = () => {

  const {authContext} = useHandleAuth();
  const onNavigate = useNavigate();

  return (
    <nav className="navHomeBar">
        <div className="logoContainer">
            <Link to="/">
                <img src={onlibrary_logo} alt="onlibrary_logo" />
            </Link>
        </div>
        <Search onSearch={(value,quantity,filter)=>{
          onNavigate("/search/"+value+"/"+filter)
        }} onChange={()=>{}} quantity={0}/>
        <div className="userOptionsContainer">
          {/* <button>
              <img src={notification_icon} alt="notification_icon" />
          </button> */}
          <Notification 
          type="comum"
          id={
            authContext.userId
            ? authContext.userId
            : ""
          }
          />
       
          <UserAccount/>  
          {/* <Link to={"/management/librCliary/choice"}>ck</Link> */}
        </div>
    </nav>
  )
}

export default NavHome

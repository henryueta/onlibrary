import Search from "../../search/Search.component";
import "./NavHome.component.css";
import onlibrary_logo from "../../../assets/imgs/logo/onlibrary_logo.png";
import notification_icon from "../../../assets/imgs/icons/notification_icon.png";
import favorite_icon from "../../../assets/imgs/icons/favorite_icon.png";
import user_icon from "../../../assets/imgs/icons/user_icon.png";
import { Link } from "react-router-dom";
import useHandleAuth from "../../../hooks/usehandleAuth";
import { useEffect } from "react";

const NavHome = () => {

  const {context} = useHandleAuth();

  useEffect(()=>{
  },[])

  return (
    <nav className="navHomeBar">
        <div className="logoContainer">
            <Link to="/">
                <img src={onlibrary_logo} alt="onlibrary_logo" />
            </Link>
        </div>
        <Search/>
        <div className="userOptionsContainer">
          <button>
              <img src={notification_icon} alt="notification_icon" />
          </button>
          <button>
              <img src={favorite_icon} alt="favorite_icon" />
          </button>
          {
            context.userStatus?.authStatus?.hasAuth
            ? <><p>{context.user?.username}</p> <Link to={"/management/library"}>Click</Link></> 
            : <Link to="/login">
            <img src={user_icon} alt="user_icon" />
              Entre ou cadastre-se
              </Link> 
          }        
        </div>
    </nav>
  )
}

export default NavHome

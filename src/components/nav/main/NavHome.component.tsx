import Search from "../../search/Search.component";
import "./NavHome.component.css";
import onlibrary_logo from "../../../assets/imgs/logo/onlibrary_logo.png";
import notification_icon from "../../../assets/imgs/icons/notification_icon.png";
import favorite_icon from "../../../assets/imgs/icons/favorite_icon.png";
import user_icon from "../../../assets/imgs/icons/user_icon.png";
import { Link } from "react-router-dom";

const NavHome = () => {

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
          <Link to="">
              <img src={user_icon} alt="user_icon" />
              <Link to={"/login"}>
                Entre ou cadastre-se
              </Link>
          </Link>         
        </div>
    </nav>
  )
}

export default NavHome

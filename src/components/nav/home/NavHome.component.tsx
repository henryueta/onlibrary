import Search from "../../search/Search.component";
import "./NavHome.component.css";
import onlibrary_logo from "../../../assets/imgs/logo/onlibrary_logo.png";
import notification_icon from "../../../assets/imgs/icons/notification_icon.png";
import favorite_icon from "../../../assets/imgs/icons/favorite_icon.png";
import { Link } from "react-router-dom";
import UserAccount from "../../account/user/UserAccount.component";

const NavHome = () => {


  return (
    <nav className="navHomeBar">
        <div className="logoContainer">
            <Link to="/">
                <img src={onlibrary_logo} alt="onlibrary_logo" />
            </Link>
        </div>
        <Search quantity={0}/>
        <div className="userOptionsContainer">
          <button>
              <img src={notification_icon} alt="notification_icon" />
          </button>
          <button>
              <img src={favorite_icon} alt="favorite_icon" />
          </button>
          <UserAccount/>  
        </div>
    </nav>
  )
}

export default NavHome

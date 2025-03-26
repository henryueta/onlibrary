import Search from "../search/Search.component";
import "./Nav.component.css";
import onlibrary_logo from "../../assets/imgs/logo/onlibrary_logo.png";
import notification_icon from "../../assets/imgs/icons/notification_icon.png";
import favorite_icon from "../../assets/imgs/icons/favorite_icon.png";
import user_icon from "../../assets/imgs/icons/user_icon.png";
import { Link } from "react-router-dom";

const Nav = () => {

  return (
    <nav className="navBar">
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
              <span>
                Entre ou cadastre-se
              </span>
          </Link>         
        </div>
    </nav>
  )
}

export default Nav

import { Link } from "react-router-dom";
import onlibrary_logo from "../../../assets/imgs/logo/onlibrary_logo.png";
import "./NavForm.component.css";

const NavForm = () => {
  return (
    <nav className="navFormBar">
        <div className="logoContainer">
        <Link to="/">
                <img src={onlibrary_logo} alt="onlibrary_logo" />
            </Link>
        </div>
    </nav>
  )
}

export default NavForm

import "./NavAdmin.component.css"
import libraryNotification_icon from "../../../../assets/imgs/icons/libraryNotification_icon.webp"
import library_icon from "../../../../assets/imgs/icons/library_icon.webp"

const NavAdmin = () => {
  return (
    <nav className="navAdmin">
        <div className="adminOptionsContainer">
            <img src={libraryNotification_icon} alt="admin_notification_icon" />
            <div className="currentLibraryContainer">
                <img src={library_icon} alt="admin_account_icon" />
                <span>Biblioteca Itaquera</span>
            </div>
        </div>
    </nav>
  )
}

export default NavAdmin

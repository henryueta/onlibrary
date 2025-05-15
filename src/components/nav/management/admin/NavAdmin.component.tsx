import "./NavAdmin.component.css";
import Notification from "../../../notification/Notification.component";
import Account from "../../../account/library/LibraryAccount.component";
import useHandleAuth from "../../../../hooks/usehandleAuth";


const NavAdmin = () => {

  const {authContext} = useHandleAuth();

  return (
    <nav className="navAdmin">
        <div className="adminOptionsContainer">
            <div className="NotificationContainer">

              <Notification type="admin" id={authContext.userId}/>
            </div>
            <div className="currentLibraryContainer">
                <Account/>
            </div>
        </div>
    </nav>
  )
}

export default NavAdmin

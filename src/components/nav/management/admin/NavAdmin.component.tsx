import "./NavAdmin.component.css";
import Notification from "../../../notification/Notification.component";
import Account from "../../../account/library/LibraryAccount.component";
import useHandleLibrary from "../../../../hooks/useHandleLibrary";
import useHandleAuth from "../../../../hooks/usehandleAuth";
import { useEffect } from "react";

const NavAdmin = () => {

  const {libraries} = useHandleLibrary()
  const {authContext} = useHandleAuth();


  return (
    <nav className="navAdmin">
        <div className="adminOptionsContainer">
            <div className="NotificationContainer">

              <Notification type="admin" id={authContext.userId || ""}/>
            </div>
            <div className="currentLibraryContainer">
                <Account libraries={libraries || []}/>
            </div>
        </div>
    </nav>
  )
}

export default NavAdmin

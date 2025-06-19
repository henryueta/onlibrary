import "./NavAdmin.component.css";
import Notification from "../../../notification/Notification.component";
import LibraryAccount from "../../../account/library/LibraryAccount.component";
import useHandleAuth from "../../../../hooks/usehandleAuth";
import { ManagementType } from "../../../../routes/management/Management.route";



const NavAdmin = ({management}:{management:ManagementType}) => {

  const {authContext} = useHandleAuth();


  return (
    <nav className="navAdmin">
      {
        management === "library"
        &&
        <div className="titlePageContainer">
          Sua Biblioteca
      </div>
      }
      

        <div className="adminOptionsContainer">
            <div className="NotificationContainer">
              <Notification type={
                management === "library"
                ? "biblioteca"
                : "admin"
              } id={authContext.userId}/>
            </div>
            <div className="currentLibraryContainer">
                <LibraryAccount/>
            </div>
        </div>
    </nav>
  )
}

export default NavAdmin

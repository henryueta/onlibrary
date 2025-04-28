import "./NavAdmin.component.css"
import libraryNotification_icon from "../../../../assets/imgs/icons/libraryNotification_icon.webp"
import library_icon from "../../../../assets/imgs/icons/library_icon.webp"
import Account from "../../../account/library/LibraryAccount.component"
import useHandleLibrary from "../../../../hooks/useHandleLibrary"
import { useEffect } from "react"

const NavAdmin = () => {

  const {onQueryLibraries,libraries} = useHandleLibrary()

  useEffect(()=>{
    onQueryLibraries("http://localhost:5600/auth/library")
  },[])

  return (
    <nav className="navAdmin">
        <div className="adminOptionsContainer">
            <img src={libraryNotification_icon} alt="admin_notification_icon" />
            <div className="currentLibraryContainer">
                <img src={library_icon} alt="admin_account_icon" />
                <Account libraries={libraries || []}/>
            </div>          
        </div>
    </nav>
  )
}

export default NavAdmin

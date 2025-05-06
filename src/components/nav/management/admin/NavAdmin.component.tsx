import "./NavAdmin.component.css"
import libraryNotification_icon from "../../../../assets/imgs/icons/libraryNotification_icon.webp"
import Account from "../../../account/library/LibraryAccount.component"
import useHandleLibrary from "../../../../hooks/useHandleLibrary"
import { useEffect } from "react"

const NavAdmin = () => {

  const {onQueryLibraries,libraries} = useHandleLibrary()

  useEffect(()=>{
    onQueryLibraries("http://localhost:5700/auth/library")
  },[])

  return (
    <nav className="navAdmin">
        <div className="adminOptionsContainer">
            <img src={libraryNotification_icon} alt="admin_notification_icon" />
            <div className="currentLibraryContainer">
                <Account libraries={libraries || []}/>
            </div>
        </div>
    </nav>
  )
}

export default NavAdmin

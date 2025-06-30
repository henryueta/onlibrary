import useHandleLibrary from "../../../hooks/useHandleLibrary";
import "./LibraryAccount.component.css"
import libraryOpenned_icon from "../../../assets/imgs/icons/libraryOpenned_icon.webp"
import libraryClosed_icon from "../../../assets/imgs/icons/libraryClosed_icon.webp"
import { useNavigate } from "react-router-dom";



const LibraryAccount = () => {

  const onNavigate = useNavigate();
  const {currentLibraryContext} = useHandleLibrary()



  return (
    <>
    <div className="currentLibraryAccountContainer" onClick={()=>onNavigate("/management/library/choice")}>
    <img src={
      !!currentLibraryContext.libraryId
      ? libraryOpenned_icon
      : libraryClosed_icon
    } alt="admin_account_icon" />
      <span>
        {
         !!currentLibraryContext.libraryName
         ? 
         currentLibraryContext.libraryName
         .slice(0,20)
         .concat(currentLibraryContext.libraryName.length > 20
          ? "..."
          : ""
         )
         : "Selecione sua biblioteca"}
      </span>
    </div>
    </>
  )
}

export default LibraryAccount

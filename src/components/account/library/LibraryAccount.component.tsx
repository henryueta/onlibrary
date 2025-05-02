import { useEffect, useState } from "react";
import useHandleLibrary, { LibraryProps } from "../../../hooks/useHandleLibrary";
import Dialog from "../../dialog/Dialog.component";
import "./LibraryAccount.component.css"
import libraryOpenned_icon from "../../../assets/imgs/icons/libraryOpenned_icon.webp"
import libraryClosed_icon from "../../../assets/imgs/icons/libraryClosed_icon.webp"

type AccountProps = Record<'libraries',LibraryProps[] |  null>;

const Account = ({libraries}:AccountProps) => {

  const {onLibraryId,currentLibraryContext} = useHandleLibrary()
  const [isAccountView,setIsAccountView] = useState<boolean>(false);
  const [currentLibrary,setCurrentLibrary] = useState<LibraryProps | null>(null);

  useEffect(()=>{
    !!libraries && currentLibraryContext
    && setCurrentLibrary(libraries.find((item)=>item.id === currentLibraryContext.libraryId) || null)
  },[libraries])

  useEffect(()=>{
    currentLibrary?.id 
    && onLibraryId(currentLibrary.id)
  },[currentLibrary])

  // useEffect(()=>{
  //   window.addEventListener('click',
  //     (e)=>{
  //      return isAccountView 
  //       && e.target !== 
  //       document.querySelector("dialog")
  //       && console.log("AA")
  //     }
  //     )
  // },[isAccountView])

  return (
    <>
   {
    isAccountView &&
    <Dialog title="Suas bibliotecas" onClose={()=>setIsAccountView(false)}>
      <section className="libraryAccountListSection">
          {
            libraries &&
            libraries.map((item)=>
              <div
              className={
                currentLibrary?.id === item.id
                ? "accountSelected"
                : ""
                }
               onClick={()=>setCurrentLibrary({
                id:item.id,
                name:item.name
              })} key={item.id}><img src={libraryOpenned_icon}/>{item.name}</div>
            )
          }
      </section>
      <section className="libraryAccountOptions">
          <button className="managementButton">Criar biblioteca</button>
      </section>
    </Dialog>
   }

    <div className="currentLibraryAccountContainer" onClick={()=>setIsAccountView(true)}>
    <img src={
      !!currentLibraryContext.libraryId
      ? libraryOpenned_icon
      : libraryClosed_icon
    } alt="admin_account_icon" />
      <span>
        {currentLibrary?.name 
        ? currentLibrary?.name.slice(0,currentLibrary.name.length-3).concat("...") 
        : "Selecione sua biblioteca"}
      </span>
    </div>
    {/* <Select defaultValue={{
        title:"Suas bibliotecas",
        value:"default"
    }}  list={
        !!libraries
        ? 
        libraries.map((item)=>{
          return {
            title:item.name,
            value:item.id
          }
        })
        :
        []
    } onSelect={(e)=>{}}>
    </Select> */}
    </>
  )
}

export default Account

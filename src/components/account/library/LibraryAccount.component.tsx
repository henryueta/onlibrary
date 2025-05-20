import { useEffect, useState } from "react";
import useHandleLibrary, { LibraryProps } from "../../../hooks/useHandleLibrary";
import Dialog from "../../dialog/Dialog.component";
import "./LibraryAccount.component.css"
import libraryOpenned_icon from "../../../assets/imgs/icons/libraryOpenned_icon.webp"
import libraryClosed_icon from "../../../assets/imgs/icons/libraryClosed_icon.webp"
import { useNavigate } from "react-router-dom";
import { path } from "../../../objects/path.object";
import Load from "../../load/Load.component"



const Account = () => {

  const onNavigate = useNavigate();
  const {onLibraryId,currentLibraryContext,onQueryLibraries,libraries,queryState} = useHandleLibrary()
  const [isAccountView,setIsAccountView] = useState<boolean>(false);
  const [currentLibrary,setCurrentLibrary] = useState<LibraryProps | null>(null);

  useEffect(()=>{
  },[queryState.isLoading])

  useEffect(()=>{
    isAccountView
    && onQueryLibraries("https://onlibrary-server-fkrn.vercel.app/auth/library")
  },[isAccountView])

  useEffect(()=>{
    !!libraries && currentLibraryContext
    && setCurrentLibrary(libraries.find((item)=>item.id === currentLibraryContext.libraryId) || null)
  },[libraries])

  console.log(libraries)

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
    {
      queryState.isLoading ? <div className="loadingDialogContainer">
          <Load loadState={queryState.isLoading}/>
        </div>
      :<section className="libraryAccountListSection">
          {
            !!libraries
            ? libraries.map((item)=>
            {
              return <div
              className={
                currentLibrary?.id === item.id
                ? "accountSelected"
                : ""
                }
               onClick={()=>setCurrentLibrary({
                id:item.id,
                nome:item.nome
              })} key={item.id}><img src={libraryOpenned_icon}/>{item.nome}</div>
            }
            )
            :<>Nenhuma biblioteca encontrada</>
          }
      </section>
    }
      <section className="libraryAccountOptions">
          <button onClick={()=>{
            setIsAccountView(false)
            onNavigate(path.onCreatePathParams("create_data_management",[
              {
                field:"type",
                param:"library"
              }
            ]))
          }} className="managementButton">Criar biblioteca</button>
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
        {currentLibrary?.nome
        ? currentLibrary?.nome.slice(0,currentLibrary.nome.length-3).concat("...")
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

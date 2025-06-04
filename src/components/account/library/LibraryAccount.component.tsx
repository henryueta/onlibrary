import {useState } from "react";
import useHandleLibrary, { LibraryProps } from "../../../hooks/useHandleLibrary";
import "./LibraryAccount.component.css"
import libraryOpenned_icon from "../../../assets/imgs/icons/libraryOpenned_icon.webp"
import libraryClosed_icon from "../../../assets/imgs/icons/libraryClosed_icon.webp"
import { useNavigate } from "react-router-dom";



const LibraryAccount = () => {

  const onNavigate = useNavigate();
  const {onLibraryId,currentLibraryContext,libraries,queryState} = useHandleLibrary()
  const [currentLibrary,setCurrentLibrary] = useState<LibraryProps | null>(null);

  // useEffect(()=>{
  //   alert(libraries)
  //   !!libraries && currentLibraryContext
  //   && setCurrentLibrary(libraries.find((item)=>item.id === currentLibraryContext.libraryId) || null)
  // },[libraries])


  return (
    <>
   {/* {
    isAccountView &&
    <Dialog 
    title="Suas bibliotecas"
    closeOnExternalClick={false}
     close={{
      onClose:()=>setIsAccountView(false),
      closeButton:false
     }}>
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
   } */}

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

export default LibraryAccount

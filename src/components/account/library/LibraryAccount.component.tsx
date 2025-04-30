import { useState } from "react";
import { LibraryProps } from "../../../hooks/useHandleLibrary";
import Dialog from "../../dialog/Dialog.component";
import "./LibraryAccount.component.css"

type AccountProps = Record<'libraries',LibraryProps[] |  null>;

const Account = ({libraries}:AccountProps) => {

  const [isAccountView,setIsAccountView] = useState<boolean>(false);

  return (
    <>
   {
    isAccountView &&
    <Dialog id="test" onClose={()=>setIsAccountView(false)}>
      teste
    </Dialog>
   }

    <button onClick={()=>setIsAccountView(true)}>
      Biblioteca Itaquera
    </button>
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

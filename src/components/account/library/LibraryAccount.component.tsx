import { LibraryProps } from "../../../hooks/useHandleLibrary";
import Select from "../../select/Select.component"
import "./LibraryAccount.component.css"

type AccountProps = Record<'libraries',LibraryProps[] |  null>;

const Account = ({libraries}:AccountProps) => {
  return (
    <Select defaultValue={{
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
    } onSelect={(e)=>console.log(e.target.value)}>
        
    </Select>
  )
}

export default Account

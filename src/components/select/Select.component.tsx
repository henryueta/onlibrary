import { useEffect, useState } from "react"

interface OptionProps {
    title:string,
    value:string | number
}

export interface SelectProps {
    list:OptionProps[]
    onSelect:(e:React.ChangeEvent<HTMLSelectElement>)=>void
}

const Select = ({list,onSelect}:SelectProps) => {
    const [optionList,setOptionList] = useState<OptionProps[]>([
        {
            title:"Todos",
            value:"Todos"
        }
    ]);
    
    useEffect(()=>{
        setOptionList(list)
    },[list])

  return (
    <select onChange={(e)=>onSelect(e)}>
            <option value="Todos">Todos</option>
        {
            optionList.map((item,index)=>
                <option key={index} value={item.value}>{item.title}</option>
            )
        }
    </select>
  )
}

export default Select

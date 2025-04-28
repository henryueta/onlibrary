import { useEffect, useState } from "react"

interface OptionProps {
    title:string,
    value:string | number
}

export interface SelectProps {
    defaultValue:OptionProps
    list:OptionProps[]
    onSelect:(e:React.ChangeEvent<HTMLSelectElement>)=>void
}

const Select = ({list,onSelect,defaultValue}:SelectProps) => {
    const [optionList,setOptionList] = useState<OptionProps[]>([
        {
            title:defaultValue.title,
            value:defaultValue.value
        }
    ]);
    
    useEffect(()=>{
        setOptionList(list)
    },[list])

  return (
    <select onChange={(e)=>onSelect(e)}>
            <option value={defaultValue.value}>{defaultValue.title}</option>
        {
            optionList.map((item,index)=>
                <option key={index} value={item.value}>{item.title}</option>
            )
        }
    </select>
  )
}

export default Select

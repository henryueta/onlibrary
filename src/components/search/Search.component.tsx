import "./Search.component.css";
import search_icon from "../../assets/imgs/icons/search_icon.png";
import { useEffect, useState } from "react";
import Select, { SelectProps } from "../select/Select.component";
// import useHandleSearch from "../../hooks/useHandleSearch";

interface SearchProps {
  filter?:SelectProps
  quantity:number,
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  onSearch:()=>void
}



const Search = ({filter,quantity,onSearch,onChange} : SearchProps) => {
  const [inputValue,setInputValue] = useState<string>("");
  const [selectValue,setSelectValue] = useState<string | number>("Todos");
  // const {onSearch} = useHandleSearch();

  // useEffect(()=>{
  // },[quantity])

  useEffect(()=>{
    console.log(selectValue)
  },[selectValue])


  return (
    <div className="searchContainer">
        <input type="search" value={inputValue} onChange={(e)=>{
          setInputValue(e.target.value)
          onChange(e)
        }}/>
        {
         !!filter 
         && <Select 
         defaultValue={{title:"todos",value:"todos"}}
          onSelect={(e)=>{
            filter.onSelect(e)
            setSelectValue(e.target.value)}} 
          list={filter.list}/> 
        }
        <button onClick={()=>{
          // onSearch(inputValue,quantity,selectValue)
          onSearch()
        }}>
            <img src={search_icon} alt="search_button" />
        </button>
    </div>
  )
}

export default Search

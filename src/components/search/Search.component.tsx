import "./Search.component.css";
import search_icon from "../../assets/imgs/icons/search_icon.png";
import { useEffect, useState } from "react";
import Select, { SelectProps } from "../select/Select.component";
import useHandleSearch from "../../hooks/useHandleSearch";
// import useHandleSearch from "../../hooks/useHandleSearch";

interface SearchProps {
  filter?:SelectProps
  quantity:number,
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  onSearch:(value:string,quantity?:number,filter?:string | number)=>void
}



const Search = ({filter,quantity,onSearch,onChange} : SearchProps) => {

  const {currentSearchContext} = useHandleSearch();
  const [inputValue,setInputValue] = useState<string>("");
  const [selectValue,setSelectValue] = useState<string | number>(
    currentSearchContext.searchContextState.filter
  );

  useEffect(()=>{
    !!currentSearchContext.searchContextState.currentValue.length
    &&
    setInputValue(currentSearchContext.searchContextState.currentValue)

  },[currentSearchContext.searchContextState.currentValue])

  useEffect(()=>{
      setSelectValue(currentSearchContext.searchContextState.filter)
  },[currentSearchContext.searchContextState.filter])


  return (
    <div className="searchContainer">
        <input 
        type="search" 
        value={inputValue} 
        onChange={(e)=>{
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
          inputValue.trim().length
          &&
          (()=>{
            currentSearchContext.setSearchContextState({
            type:"currentValueFilter",
            value:{
              currentValue: inputValue,
              filter:selectValue
            }
          })
           onSearch(inputValue,quantity,selectValue) 
          })()         
        }}>
            <img src={search_icon} alt="search_button" />
        </button>
        <div className="suggestionContainer">
            {/* <p>aaaaa</p> */}
            
        </div>
    </div>
  )
}

export default Search

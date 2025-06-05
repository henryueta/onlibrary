import "./Search.component.css";
import search_icon from "../../assets/imgs/icons/search_icon.png";
import { useEffect, useState } from "react";
import Select, { SelectProps } from "../select/Select.component";
import useHandleSearch from "../../hooks/useHandleSearch";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
// import useHandleSearch from "../../hooks/useHandleSearch";

interface SearchProps {
  filter?:SelectProps
  quantity:number,
  suggestion?:{
    active:boolean,
    url:string
  }
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  onSearch:(value:string,quantity?:number,filter?:string | number)=>void
}



const Search = ({filter,quantity,suggestion,onSearch,onChange} : SearchProps) => {

  const {currentSearchContext} = useHandleSearch();
  const {onAxiosQuery} = useAxios();
  const [inputValue,setInputValue] = useState<string>("");
  const [selectValue,setSelectValue] = useState<string | number>(
    currentSearchContext.searchContextState.filter
  );
  const [suggestionList,setSuggestionList] = useState<{
    sugestao:string,
    tipo:string
  }[]>();
  const [suggestionListView,setSuggestionListView] = useState<boolean>(false);
  const onNavigate = useNavigate();
  

  useEffect(()=>{
    !!currentSearchContext.searchContextState.currentValue.length
    &&
    setInputValue(currentSearchContext.searchContextState.currentValue)

  },[currentSearchContext.searchContextState.currentValue])

  useEffect(()=>{
      setSelectValue(currentSearchContext.searchContextState.filter)
  },[currentSearchContext.searchContextState.filter])

  useEffect(()=>{

    !!suggestion
    &&
    !!suggestion?.active
    &&
    !!suggestion.url.length
    &&
    !!inputValue.length
    &&
    onAxiosQuery("get",{
      url:suggestion.url+inputValue,
      type:{
        get:{}
      },
      onResolver:{
        then(result) {
          console.log(result.data)
          const suggestion_list_data = result.data as {
            sugestao:string,
            tipo:string
          }[]
          setSuggestionList(suggestion_list_data)
        },
        catch(error) {
          console.log(error)
        },
      }
    })

    !inputValue.length
    && 
    setSuggestionList([])

  },[inputValue])

  return (
    <div className="searchContainer">
        <input 
        onBlur={()=>{
          setTimeout(()=>{
            setSuggestionListView(false)
          },100)
        }}
        onFocus={()=>{
          setSuggestionListView(true)
        }}
        
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

        {
          !!suggestion
          &&
          !!suggestion?.active
          &&
          !!suggestionListView
          &&
          <div className="suggestionContainer"
          
          >
            {
              !!suggestionList?.length
              &&
              !suggestionList.find((item)=>item.sugestao === inputValue)
              &&
              suggestionList.map((item)=>{
                return (
                  <div className="suggestion"
                  onClick={()=>{
                    onNavigate(`/search/${item.sugestao}/${item.tipo}`)
                  }}>
                    <p>
                      {item.sugestao}
                    </p>
                  </div>
                )
              })
            }
            
        </div>
        }
    </div>
  )
}

export default Search

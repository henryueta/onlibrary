import "./Search.component.css";
import search_icon from "../../assets/imgs/icons/search_icon.png";
import { useEffect, useReducer, useState } from "react";
import Select, { SelectProps } from "../select/Select.component";
import useHandleSearch from "../../hooks/useHandleSearch";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner.component";

interface SearchProps {
  filter?:SelectProps
  quantity:number,
  hasSearchButton?:boolean
  suggestion?:{
    active:boolean,
    url:string
  }
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  onSearch:(value:string,quantity?:number,filter?:string | number)=>void
}

interface SearchLoadStateProps {
  timer:number,
  isLoading:boolean
}

const initialSearchLoadState:SearchLoadStateProps = {
    timer:0,
    isLoading:false
}

type SearchLoadAction = 
{
  type:"timer",
  value:number
}
|
{
  type:"load",
  value:boolean
}
|
{
  type:"timerLoad",
  value:{
    timer:number,
    isLoading:boolean
  }
}

const onHandleSearchLoadState = (state:SearchLoadStateProps,action:SearchLoadAction) =>{

  switch (action.type) {
    case "timer":
      return {...state,timer:action.value};
    case "load":
      return {...state,isLoading:action.value}
    case "timerLoad":
      return {...state,...{
        timer:action.value.timer,
        isLoading:action.value.isLoading
      }}
    default:
      return state;
  }

}

const Search = ({filter,quantity,hasSearchButton,suggestion,onSearch,onChange} : SearchProps) => {

  const {currentSearchContext,searchState,suggestionState,setSearchState} = useHandleSearch(suggestion);;
  const onNavigate = useNavigate();
  const [suggestionListView,setSuggestionListView] = useState<boolean>(false);
  const [searchLoadState,setSearchLoadState] = useReducer(onHandleSearchLoadState,initialSearchLoadState);

  useEffect(()=>{

    !hasSearchButton
    &&
    (()=>{
      setSearchLoadState({
        type:"load",
        value:true
      })
      clearTimeout(searchLoadState.timer)
      setSearchLoadState(
        {
          type:"timer",
          value:(
            setTimeout(()=>{
              onSearch(searchState.inputValue,quantity,searchState.selectValue)
              setSearchLoadState({
                type:"load",
                value:false
              })
          },1000)
          )
        }
      ) 
    })()

  },[searchState.inputValue])

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
        value={searchState.inputValue} 
        onChange={(e)=>{
          setSearchState({
            type:"input",
            value:e.target.value
          })  
          onChange(e)
        }}/>
        {
         !!filter 
         && <Select 
         defaultValue={{title:"todos",value:"todos"}}
          onSelect={(e)=>{
            filter.onSelect(e)
            setSearchState({
              type:"select",
              value:e.target.value
            })
          }} 
          list={filter.list}/> 
        }
        {
          !!hasSearchButton
          &&
          <button onClick={()=>{
            searchState.inputValue.trim().length
            &&
            (()=>{
              currentSearchContext.setSearchContextState({
              type:"currentValueFilterSearch",
              value:{
                currentValue: searchState.inputValue,
                filter:searchState.selectValue,
                isSearch:true
              }
            })
             onSearch(searchState.inputValue,quantity,searchState.selectValue) 
            })()         
          }}>
              <img src={search_icon} alt="search_button" />
          </button>
        }
        {
          !hasSearchButton
          &&
          !!searchLoadState.isLoading
          &&
          <div className="loadingSearchContainer">
            <Spinner/>
          </div>
        }
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
              !!suggestionState.list?.length
              &&
              !suggestionState.list.find((item)=>item.sugestao === searchState.inputValue)
              &&
              suggestionState.list.map((item,index)=>{
                return (
                  <div 
                  key={index}
                  className="suggestion"
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

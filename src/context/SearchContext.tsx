import { createContext, useEffect, useReducer } from "react"

interface SearchProps {
  searchContextState:SearchContextStateProps,
  setSearchContextState:React.ActionDispatch<[action: SearchContextActionType]>,
  onResetSearch:()=>void
}

const SearchContext = createContext({} as SearchProps)

interface SearchContextStateProps {
  currentValue:string,
  filter:string | number,
  isSearch:boolean
}

const initialSearchContextState:SearchContextStateProps = {
  currentValue:"",
  filter:"todos",
  isSearch:false
}

type SearchContextActionType =
{
  type:"currentValue",
  value:string
}
|
{
  type:"filter",
  value:string | number
}
|
{
  type:"search",
  value:boolean
}
|
{
  type:"currentValueFilterSearch",
  value:{
      currentValue:string,
      filter:string | number,
      isSearch:boolean
  }
}

const onHandleSearchContextState = (state:SearchContextStateProps,action:SearchContextActionType)=>{

  switch (action.type) {
    case "currentValue":  
      return {...state,currentValue:action.value}
    case "filter":
      return {...state,filter:action.value}
    case "search":
      return {...state,isSearch:action.value}
    case "currentValueFilterSearch":
      return {...state,...{
        currentValue:action.value.currentValue,
        filter:action.value.filter,
        isSearch:action.value.isSearch
      }}
    default:
      return state;
  }

}

const SearchProvider = ({children}:{children:React.ReactNode}) => {

    const [searchContextState,setSearchContextState] = useReducer(onHandleSearchContextState,initialSearchContextState);

    const onResetSearch = ()=>{
      setSearchContextState({
         type:"currentValueFilterSearch",
         value:{
          currentValue:"",
          filter:"todos",
          isSearch:false
         }
      })
    }

  return (
    <SearchContext.Provider value={{searchContextState,setSearchContextState,onResetSearch}}>
        {children}
    </SearchContext.Provider>

  )
}



export {
  SearchProvider,
  SearchContext,
}

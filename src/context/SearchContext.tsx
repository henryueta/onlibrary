import { createContext, useEffect, useReducer } from "react"

interface SearchProps {
  searchContextState:SearchContextStateProps,
  setSearchContextState:React.ActionDispatch<[action: SearchContextActionType]>,
  onResetSearch:()=>void
}

const SearchContext = createContext({} as SearchProps)

interface SearchContextStateProps {
  currentValue:string,
  filter:string | number
}

const initialSearchContextState:SearchContextStateProps = {
  currentValue:"",
  filter:"todos"
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
  type:"currentValueFilter",
  value:{
      currentValue:string,
      filter:string | number
  }
}

const onHandleSearchContextState = (state:SearchContextStateProps,action:SearchContextActionType)=>{

  switch (action.type) {
    case "currentValue":  
      return {...state,currentValue:action.value}
    case "filter":
      return {...state,filter:action.value}
    case "currentValueFilter":
      return {...state,...{
        currentValue:action.value.currentValue,
        filter:action.value.filter
      }}
    default:
      return state;
  }

}

const SearchProvider = ({children}:{children:React.ReactNode}) => {

    const [searchContextState,setSearchContextState] = useReducer(onHandleSearchContextState,initialSearchContextState);

    const onResetSearch = ()=>{
      setSearchContextState({
         type:"currentValueFilter",
         value:{
          currentValue:"",
          filter:"todos"
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

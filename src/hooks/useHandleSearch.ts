import { useContext, useEffect, useReducer } from "react"
import { SearchContext } from "../context/SearchContext"
import useAxios from "./useAxios"
import useHandleSuggestion from "./useHandleSuggestion"
import useHandlePath from "./useHandlePath"

interface SearchStateProps {
  inputValue:string,
  selectValue:string | number
}

type SearchActionProps = 
{
  type:"input",
  value:string
}
|
{
  type:"select",
  value:string | number
}
|
{
  type:"inputSelect",
  value:{
    inputValue:string,
    selectValue:string | number
  }
}

  const onHandleSearchState = (state:SearchStateProps,action:SearchActionProps)=>{

    switch (action.type) {
      case "input":
        return {...state,inputValue:action.value};
      case "select":
        return {...state,selectValue:action.value};
      case "inputSelect":
        return {...state,...{
          inputValue:action.value.inputValue,
          selectValue:action.value.selectValue
        }};
      default:
        return state;
    }

  }

const useHandleSearch = (suggestion?:{
  active:boolean,
  url:string
})=>{

    const {onAxiosQuery} = useAxios();
    const currentSearchContext = useContext(SearchContext)
    const {setSuggestionState,suggestionState} = useHandleSuggestion();
    const {currentPathContext} = useHandlePath();

    const initialSearchState:SearchStateProps = {
      inputValue:"",
      selectValue:currentSearchContext.searchContextState.filter
    }
    const [searchState,setSearchState] = useReducer(onHandleSearchState,initialSearchState);

      useEffect(()=>{
        currentSearchContext.onResetSearch();
        setSearchState({
          type:"inputSelect",
          value:{
            inputValue:"",
            selectValue:"todos"
          }
        })
      },[currentPathContext.pathName])
    
      useEffect(()=>{
        !!currentSearchContext.searchContextState.currentValue.length
        &&
        setSearchState({
          type:"input",
          value:currentSearchContext.searchContextState.currentValue
        })
    
      },[currentSearchContext.searchContextState.currentValue])
    
      useEffect(()=>{
          setSearchState({
            type:"select",
            value:currentSearchContext.searchContextState.filter
          })
      },[currentSearchContext.searchContextState.filter])
      

      
  useEffect(()=>{

    !!suggestion
    &&
    !!suggestion?.active
    &&
    !!suggestion.url.length
    &&
    !!searchState.inputValue.length
    &&
    onAxiosQuery("get",{
      url:suggestion.url+searchState.inputValue,
      type:{
        get:{}
      },
      onResolver:{
        then(result) {
          const suggestion_list_data = result.data as {
            sugestao:string,
            tipo:string
          }[]
          setSuggestionState({
            type:"list",
            value:suggestion_list_data
          })
        },
        catch(error) {
          console.log(error)
        },
      }
    })

    !searchState.inputValue.length
    && 
    setSuggestionState({
      type:"list",
      value:[]
    })


  },[searchState.inputValue])


    return {
        currentSearchContext,
        searchState,
        setSearchState,
        suggestionState
    }


}

export default useHandleSearch
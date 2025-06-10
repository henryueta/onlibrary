import { useContext, useEffect, useReducer } from "react"
import { SearchContext } from "../context/SearchContext"
import useAxios from "./useAxios"
import useHandleSuggestion from "./useHandleSuggestion"
import useHandlePath from "./useHandlePath"
import useHandleLibrary from "./useHandleLibrary"
import axios from "axios"


type SearchResultProps = Record<'titulo'|'capa'|'id',string>

interface SearchStateProps {
  inputValue:string,
  selectValue:string | number,
  result:SearchResultProps[]
  isSearch:boolean
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
type:"search",
  value:boolean
} 
|
{
  type:"result",
  value:SearchResultProps[]
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
      case "search":
        return {...state,isSearch:action.value};
      case "result":
        return {...state,result:action.value}
      case "inputSelect":
        return {...state,...{
          inputValue:action.value.inputValue,
          selectValue:action.value.selectValue,
          
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
    const {currentLibraryContext} = useHandleLibrary();
    const currentSearchContext = useContext(SearchContext)
    const {setSuggestionState,suggestionState} = useHandleSuggestion();
    const {currentPathContext} = useHandlePath();
    

    const initialSearchState:SearchStateProps = {
      inputValue:"",
      selectValue:currentSearchContext.searchContextState.filter,
      result:[],
      isSearch:false
    }
    const [searchState,setSearchState] = useReducer(onHandleSearchState,initialSearchState);

      useEffect(()=>{
        !!currentSearchContext.searchContextState.isSearch
        &&
        currentSearchContext.searchContextState.filter !== "todos"
        &&
        !!currentSearchContext.searchContextState.currentValue.length
        &&
        (()=>{
          console.log(currentSearchContext.searchContextState.currentValue)
              const source = axios.CancelToken.source();
          onAxiosQuery("get",{
            url:"http://localhost:3300/book/get/search/view?value="
            +currentSearchContext.searchContextState.currentValue+"&filter="
            +currentSearchContext.searchContextState.filter,
            type:{get:{}},
            onResolver:{
              then(result) {
                const result_data = result.data as SearchResultProps[]
                console.log(result)
                setSearchState({
                  type:"result",
                  value:result_data
                })
              },
              catch(error) {
                console.log(error)
              },
              
            }
          },source.token)

          currentSearchContext.setSearchContextState({
            type:"search",
            value:false
          })

          

        })()
        
      },[currentSearchContext.searchContextState.isSearch])

    

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
      
      const onSearch = ()=>{
      }
      
      useEffect(()=>{ 

        !!searchState.isSearch
        &&
        !!searchState.inputValue
        &&
        !!searchState.selectValue
        &&
        console.log("AAA")

      },[searchState])

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
        suggestionState,
        onSearch
    }


}

export default useHandleSearch
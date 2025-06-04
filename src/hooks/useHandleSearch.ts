import { useContext, useReducer } from "react"
import { SearchContext } from "../context/SearchContext"

    interface SearchStateProps {
        value:string,
        filter:string
    }

    const initialSearchState:SearchStateProps = {
        value:"",
        filter:"Todos"
    } 

    type SearchActionProps =
    {
        type:"value",
        value:string
    }
    |
    {
        type:"filter",
        value:string
    }
    |
    {
        type:"filterValue",
        value:{
            value:string,
            filter:string
        }
    }

    const onHandleSearchState = (state:SearchStateProps,action:SearchActionProps)=>{

        switch (action.type) {
            case "filter":
                return {...state,filter:action.value}
            case "value":
                return {...state,value:action.value}
            case "filterValue":
                return {...state,...{
                    value:action.value.value,
                    filter:action.value.filter
                }}
            default:
                return state;
        }

    }

const useHandleSearch = ()=>{

    const currentSearchContext = useContext(SearchContext)
    
    const [searchState,setSearchState] = useReducer(onHandleSearchState,initialSearchState);
    
    const onSearch = (search:SearchStateProps)=>{
        
        setSearchState({
            type:"filterValue",
            value:search
        })

    }   

    return {
        currentSearchContext,
        searchState,
        onSearch
    }


}

export default useHandleSearch
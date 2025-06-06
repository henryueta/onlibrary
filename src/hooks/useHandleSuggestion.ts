import { useReducer } from "react";

interface SuggestionProps {
    sugestao:string,
    tipo:string
  }

interface SuggestionStateProps {

    list:SuggestionProps[] | null,
    selectedSuggestion:SuggestionProps

}

const initialSuggestionState:SuggestionStateProps = {

    list:[],
    selectedSuggestion:{
        sugestao:"Todos",
        tipo:"todos"
    }

}

type SuggestionActionProps = 
{
    type:"list",
    value:SuggestionProps[]
}
|
{
    type:"select",
    value:SuggestionProps
}

const onHandleSuggestionState = (state:SuggestionStateProps,action:SuggestionActionProps)=>{

    switch (action.type) {
        case "list":
            return {...state,list:action.value};
        case "select":
            return {...state,selectedSuggestion:action.value}
        default:
            return state;
    }

}

const useHandleSuggestion = ()=>{

    const [suggestionState,setSuggestionState] = useReducer(onHandleSuggestionState,initialSuggestionState);


    return {
        suggestionState,
        setSuggestionState
    }

}

export default useHandleSuggestion
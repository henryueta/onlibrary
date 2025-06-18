import { useEffect, useReducer } from "react";
import { ActionQueryType, QueryStateProps } from "./useAxios";

export interface CommunicationStateProps {
    isErrorView:boolean,
    isSuccessView:boolean,
    isSent:boolean
  }
  
  const initialCommunicationState:CommunicationStateProps = {
    isErrorView:false,
    isSuccessView:false,
    isSent:false
  }
  
  type ActionCommunicationType =
  {
  
    type:'error',
    value:boolean
  
  } 
  |
  {
    type:"success",
    value:boolean
  }
  |
  {
    type:"submited",
    value:boolean
  }
  
  const handleCommunicationState = (state:CommunicationStateProps,action:ActionCommunicationType)=>{
    switch (action.type) {
              case "success":
                return {...state,isSuccessView:action.value}
              case "error":
                return {...state,isErrorView:action.value}
              case "submited":
                return {...state,isSent:action.value}
              default:
                return state
            }
  }

const initialFormCommunicationState:QueryStateProps = {
    success:{
        data:null,
        message:"",
        success:false
    },
    error:{
        error:"",
        message:"",
        status:0,
        data:""
    },
    isLoading:false
}


const handleFormCommunicationState = (state:QueryStateProps,action: ActionQueryType)=>{
        switch (action.type) {
            case "success":
                return {...state,success:action.value}
            case "error":
                return {...state,error:action.value}
            case "isLoading":
                return {...state,isLoading:action.value}
            default:
                return state
    }
}
  
const useCommunication = (formState:QueryStateProps)=>{

   const [communicationState,setCommunicationState] = useReducer(handleCommunicationState,initialCommunicationState);
   const [formCommunicationState,setFormCommunicationState] = useReducer(handleFormCommunicationState,initialFormCommunicationState)

   useEffect(()=>{
    console.log(formState.error)
    !!formState.error.message
    &&
      (()=>{
        setCommunicationState({
        type:"error",
        value:true
      })
      setCommunicationState({
        type:"submited",
        value:false
      })
      })()
  
  },[formState.error])

     useEffect(()=>{
        ///-------
        !!formState.success.message
        &&
        (()=>{
            setCommunicationState({
            type:"success",
            value:true
          })
    
          setCommunicationState({
            type:"submited",
            value:false
          })
    
        })()
      },[formState.success])

    return {
        communicationState,
        setCommunicationState
    }

}

export default useCommunication;
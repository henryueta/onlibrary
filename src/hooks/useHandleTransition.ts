import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom"

interface TransitionProps {
    children:React.ReactElement,
    state:TransitionStateProps
}

interface TransitionStateProps {
    isEmerging:boolean,
    isDisappearing:boolean,
    isFinished:boolean
}

const initialTransitionState:TransitionStateProps = {
    isEmerging:true,
    isDisappearing:false,
    isFinished:false
}

type TransitionActionType = 
{
    type:"emerge",
    value:{
        isEmerging:true,
        isDisappering:false,
        isFinished:false
    }
}
|
{
    type:"disappear",
    value:{
        isEmerging:false,
        isDisappering:true,
        isFinished:false
    }
}
|
{
   type:"finish",
    value:{
        isEmerging:false,
        isDisappering:false,
        isFinished:true
    } 
}

const handleTransitionState = (state:TransitionStateProps,action:TransitionActionType)=>{

        switch (action.type) {
            case "disappear":
                return {...state,...action.value} 
            case "emerge":
                return {...state,...action.value} 
            case "finish":
                return {...state,...action.value}                
            default:
                return state;
        }

}


const useHandleTransition = ()=>{
    const [transitionState,setTransitionState] = useReducer(handleTransitionState,initialTransitionState);
    const [transitionClass,setTransitionClass] = useState<"emerge" | "disappear">("emerge");
    
    const onNavigate = useNavigate();

    useEffect(()=>{

        !!transitionState.isEmerging
        &&
        setTransitionClass("emerge")

        !!transitionState.isDisappearing
        &&
        setTransitionClass("disappear")


    },[transitionState])

    const onTransition = (url:string)=>{

        setTransitionState({
            type:"disappear",
            value:{
                isDisappering:true,
                isEmerging:false,
                isFinished:false
            }
        })

        setTimeout(()=>{

            setTransitionState({
            type:"finish",
            value:{
                isDisappering:false,
                isEmerging:false,
                isFinished:true
            }
        })

            return !!transitionState.isFinished
            &&
            onNavigate(url)

        },5000)



    }

    return {
        onTransition,
        transitionClass
    }

}

export default useHandleTransition
import "./Transition.component.css"
import React, { useReducer } from "react"

interface TransitionProps {
    children:React.ReactElement
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

const Transition = ({children}:TransitionProps) => {

    const [transitionState,setTransitionState] = useReducer(handleTransitionState,initialTransitionState);


  return (
    <section className={
        !!transitionState.isEmerging
        ? "emerge"
        : "disappear"
    }>
        {children}
    </section>
  )
}

export default Transition

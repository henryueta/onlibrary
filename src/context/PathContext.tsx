import { createContext, useEffect, useReducer, useState } from "react";

interface PathProps{
  pathName:string,
  setPathName:React.Dispatch<React.SetStateAction<string>>,
  transitionClass:"emerge"|"disappear",
  transitionState:TransitionStateProps,
  setTransitionState:React.ActionDispatch<[action: TransitionActionType]>
}

const PathContext = createContext({} as PathProps);


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
        isEmerging:boolean,
        isDisappearing:boolean,
        isFinished:boolean
    }
}
|
{
    type:"disappear",
    value:{
        isEmerging:boolean,
        isDisappearing:boolean,
        isFinished:boolean
    }
}
|
{
   type:"finish",
    value:{
        isEmerging:boolean,
        isDisappearing:boolean,
        isFinished:boolean
    } 
}

const handleTransitionState = (state:TransitionStateProps,action:TransitionActionType)=>{

        switch (action.type) {
            case "disappear":
                return {...state,...{
                  isEmerging:action.value.isEmerging,
                  isDisappearing:action.value.isDisappearing,
                  isFinished:action.value.isFinished
                } 
              }
            case "emerge":
                return {...state,...{
                  isEmerging:action.value.isEmerging,
                  isDisappearing:action.value.isDisappearing,
                  isFinished:action.value.isFinished
                }  
              }
            case "finish":
                return {...state,...{
                  isEmerging:action.value.isEmerging,
                  isDisappearing:action.value.isDisappearing,
                  isFinished:action.value.isFinished
                }         
              }       
            default:
                return state;
        }

}


const PathProvider = ({children}:{children:React.ReactNode})=>{

    const [pathName,setPathName] = useState<string>("");
    const [transitionState,setTransitionState] = useReducer(handleTransitionState,initialTransitionState);
    const [transitionClass,setTransitionClass] = useState<"emerge" | "disappear">("emerge");

        useEffect(()=>{

           window.scrollTo(0, 0);

        },[pathName])

        useEffect(()=>{
          
            !!transitionState.isEmerging
            &&
            setTransitionClass("emerge")
    
            !!transitionState.isDisappearing
            &&
            (()=>{
            setTransitionClass("disappear")
            })()
        },[transitionState])
    
    

return (
  <PathContext.Provider value={
    {
      pathName,
      setPathName,
      transitionClass,
      transitionState,
      setTransitionState
    }
    }>
    {children}
  </PathContext.Provider>
)


}

export {
  PathContext,
  PathProvider
}

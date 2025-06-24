import React, { useEffect, useReducer, useState } from "react"
import { useRef } from "react"
import useHandlePath from "../../hooks/useHandlePath"
import "./Dialog.component.css"

interface DialogProps {
    close?:{
        onClose:()=>void,
        closeButton:boolean,
        timer:number
    },
    title?:React.ReactNode
    id?:string
    children:React.ReactNode,
    className?:string,
    closeClass?:string
    closeOnExternalClick:boolean
    hasBackgroundBlur?:boolean
}

interface DialogStateProps {
    close:boolean,
    view:boolean
}

const initialDialogState:DialogStateProps = {
    close:false,
    view:true
}

type DialogActionProps =
{
    type:"visual",
    value:{
        close:boolean,
        view:boolean
    }
}

const handleDialogState = (state:DialogStateProps,action:DialogActionProps)=>{
    switch (action.type) {
        case "visual":
            return {
                close:action.value.close,
                view:action.value.view
            }            
        default:
            return state
    }
}

const Dialog = ({close,title,id,children,className,closeOnExternalClick,closeClass,hasBackgroundBlur}:DialogProps) => {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [iscloseExternal,setIsCloseExternal] = useState<boolean>(false);
    const [dialogState,setDialogState] = useReducer(handleDialogState,initialDialogState);
    const {currentPathContext} = useHandlePath();
    const [dialogPath,setDialogPath] = useState<string>();

    useEffect(()=>{

        setDialogPath(currentPathContext.pathName)

    },[])

    useEffect(()=>{
        !!dialogPath
        &&
        dialogPath !== currentPathContext.pathName
        &&
        setDialogState({
            type:"visual",
            value:{
                close:true,
                view:false
            }
         })

    },[currentPathContext.pathName])

    useEffect(()=>{
        console.log(dialogState.view)
        !dialogState.view && !!close?.onClose
        &&
       (()=>{
         close?.onClose()
         
       })()

    },[dialogState.view])

    useEffect(()=>{

        closeOnExternalClick
        &&
        dialogRef.current 
        &&
        close?.onClose
        &&
        setTimeout(()=>{
                !iscloseExternal
                ? (()=>{
                    document.onclick = (e)=>{
                    const clickedElement = e.target as Node;
                    console.log(dialogRef.current?.contains(clickedElement))
                    !dialogRef.current?.contains(clickedElement)
                    &&
                    (()=>{
                        setIsCloseExternal(true)
                        setTimeout(()=>{
                             setDialogState({
                            type:"visual",
                            value:{
                                view:true,
                                close:true
                            }
                            })

                            setTimeout(()=>{
                            setDialogState({
                            type:"visual",
                            value:{
                                view:false,
                                close:true
                            }
                            })
                            },close.timer)


                        },80)
                        
                    })()
                }
                })()
                : (()=>{
                    
                })()

            },80)
        

    },[iscloseExternal])

  return (
    <>
    <dialog
        ref={dialogRef}
        id={id}
        className={
        `${ className || "dialogPane"} 
        ${ dialogState.close && closeClass
        ? !!className 
        ? className+" "+closeClass
        : " "+closeClass
        :""}`
        }>
          {
        
        <>
        <div className="dialogHeaderContainer">
            <div className="dialogTitleContainer">
                <>{title}</>
            </div>
            {
                !!close?.closeButton &&
            <div className="dialogCloseContainer">
                <button type="button" onClick={close.onClose}>
                    X
                </button>
            </div> 
            }   
        </div>
        <hr />
        </>
        }

        <div className="dialogContentContainer">
            {children}
        </div>


    </dialog>
        {
            hasBackgroundBlur
            &&
            <div className="backgroundBlurContainer">

            </div>
        }
    </>
  )
}

export default Dialog

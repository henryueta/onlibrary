import React, { useEffect, useState } from "react"
import { useRef } from "react"

interface DialogProps {
    onClose?:()=>void,
    title?:string
    id?:string
    children:React.ReactNode,
    className?:string,
    closeOnExternalClick:boolean
}

const Dialog = ({onClose,title,id,children,className,closeOnExternalClick}:DialogProps) => {

    const dialogRef = useRef<HTMLDialogElement>(null)
    const [iscloseExternal,setIsCloseExternal] = useState<boolean>(false);

    useEffect(()=>{

        closeOnExternalClick
        &&
        dialogRef.current 
        &&
        onClose
        &&
        setTimeout(()=>{
                !iscloseExternal
                ? (()=>{
                    document.onclick = (e)=>{
                    const clickedElement = e.target as Node;
                    !dialogRef.current?.contains(clickedElement)
                    &&
                    (()=>{
                        setIsCloseExternal(true)
                        setTimeout(()=>{
                            onClose()
                        },80)
                    })()
                }
                })()
                : (()=>{
                    document.onclick = ()=>{}
                })()

            },80)
        

    },[iscloseExternal])

  return (
    <dialog
        ref={dialogRef}
        id={id}
        className={!!className ? className : "dialogPane"}>
          {
        !!onClose &&
        <div className="dialogHeaderContainer">
            <div className="dialogTitleContainer">
                <h1>{title}</h1>
            </div>
            <div className="dialogCloseContainer">
                <button type="button" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
        }

        <div className="dialogContentContainer">
            {children}
        </div>


    </dialog>
  )
}

export default Dialog

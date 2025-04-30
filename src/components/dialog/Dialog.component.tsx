import React from "react"
import "./Dialog.component.css"

interface DialogProps {
    onClose?:()=>void,
    id?:string
    children:React.ReactNode
}

const Dialog = ({onClose,children,id}:DialogProps) => {
  return (
    <dialog className="dialogPane" id={id}>
        <div className="dialogContentContainer">
            {children}
        </div>
        
        {
        !!onClose &&
        <div className="dialogCloseContainer">
            <button onClick={onClose}>
                X
            </button>
        </div>
        }
      
    </dialog>
  )
}

export default Dialog

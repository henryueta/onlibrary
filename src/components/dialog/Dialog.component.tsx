import React from "react"
import "./Dialog.component.css"

interface DialogProps {
    onClose:()=>void,
    children:React.ReactNode
}

const Dialog = ({onClose,children}:DialogProps) => {
  return (
    <dialog className="dialogPane">
        <div className="dialogContentContainer">
            {children}
        </div>
        <div className="dialogCloseContainer">
            <button onClick={onClose}>
                X
            </button>
        </div>
    </dialog>
  )
}

export default Dialog

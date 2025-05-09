import React, { useEffect, useRef } from "react"
import "./Dialog.component.css"

interface DialogProps {
    onClose?:()=>void,
    title?:string
    id?:string
    children:React.ReactNode
}

const Dialog = ({onClose,title,id,children}:DialogProps) => {

  return (
    <dialog
        id={id}
        className="dialogPane">
          {
        !!onClose &&
        <div className="dialogHeaderContainer">
            <div className="dialogTitleContainer">
                <h1>{title}</h1>
            </div>
            <div className="dialogCloseContainer">
                <button onClick={onClose}>
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

import React, { useEffect, useRef } from "react"
import "./Dialog.component.css"

interface DialogProps {
    onClose?:()=>void,
    title?:string
    id?:string
    children:React.ReactNode,
    className?:string
}

const Dialog = ({onClose,title,id,children,className}:DialogProps) => {

  return (
    <dialog
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

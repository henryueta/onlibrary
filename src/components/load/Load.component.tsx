import { useEffect, useState } from "react";
import Dialog from "../dialog/Dialog.component"
import Spinner from "../spinner/Spinner.component";
import "./Load.component.css"

interface LoadProps{
  loadState:boolean,
  finalMessage?:string
}

const Load = ({loadState,finalMessage}:LoadProps) => {

    const [isLoading,setIsLoading] = useState(loadState);

    useEffect(()=>{
      setIsLoading(loadState)
    })

  return (
    <>
      {
        isLoading
        ? <Dialog 
        closeOnExternalClick={false}
        id="loadingDialog">
            <Spinner/>
          </Dialog>
        :
        isLoading && finalMessage
        ? <Dialog
        closeOnExternalClick={false}
        >

             { !!finalMessage
              &&
              isLoading
              ? <Spinner/>
              : <p>{finalMessage}</p> }


          </Dialog>
        : <></>
    }
    </>
  )
}

export default Load

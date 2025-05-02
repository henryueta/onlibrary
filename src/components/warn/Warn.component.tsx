import whiteWarning_icon from "../../../src/assets/imgs/icons/whiteWarning_icon.png"
import blackWarning_icon from "../../../src/assets/imgs/icons/blackWarning_icon.png"

import "./Warn.component.css"

interface WarnProps {
    warning:string | null,
    color:"black"|"white"
}

const Warn = ({warning,color}:WarnProps) => {
  return (
    <div className="warningMessage">
        {
            !!warning
            ?
            <>
                <img src={
                  color === "white" 
                  ? whiteWarning_icon
                  : color === "black"
                  ? blackWarning_icon
                  : whiteWarning_icon
                  } alt="whiteWarning_icon" />
                <p className="warn">{warning}</p>
            </>
            :
            <span className="defaultWarning"></span>
        }
    </div>
  )
}

export default Warn

import warning_icon from "../../../src/assets/imgs/icons/warning_icon.png"
import "./Warn.component.css"

interface WarnProps {
    warning:string | null,
}

const Warn = ({warning}:WarnProps) => {
  return (
    <div className="warningMessage">
        {
            !!warning
            ?
            <>
                <img src={warning_icon} alt="warning_icon" />
                <p className="warn">{warning}</p>
            </>
            :
            <span className="defaultWarning"></span>
        }
    </div>
  )
}

export default Warn

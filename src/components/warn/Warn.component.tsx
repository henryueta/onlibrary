import warning_icon from "../../../src/assets/imgs/icons/warning_icon.png"
import "./Warn.component.css"

interface WarnProps {
    warning:string | null
}

const Warn = ({warning}:WarnProps) => {
  return (
    <p className="warningMessage">
        {
            !!warning
            &&
            <>
                <img src={warning_icon} alt="warning_icon" />
                {warning}
            </>
        }
    </p>
  )
}

export default Warn

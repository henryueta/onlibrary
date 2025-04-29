import { Link } from "react-router-dom"
import "./TableCard.component.css"

export type TableCardProps = Record<'icon'|'title'|'quantity'|'redirectTo' ,string> & Record<'warning',boolean>

const TableCard = ({icon,quantity,redirectTo,title,warning}:TableCardProps) => {
  return (
    <div className="tableCardContainer">
         <Link to={redirectTo} >
        <div className="iconCardContainer">
          <img src={icon} alt={title+" icon"}/>
        </div>
        <div className="textCardContainer">
          <h1>
            {quantity}
          </h1>
          <p>
            {title}
          </p>
        </div>        
      </Link>
     {
        !!warning 
        &&  <div className="cardNotificationContainer">
               !
          </div> 
     }
    </div>
  )
}

export default TableCard

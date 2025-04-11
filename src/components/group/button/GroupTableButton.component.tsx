import { Link } from "react-router-dom";
import "./GroupTableButton.component.css";


type ButtonProps = Record<'icon'|'title'|'quantity'|'redirectTo',string>;

interface GroupTableButtonProps {
  buttonList:ButtonProps[]
}

const GroupTableButton = ({buttonList}:GroupTableButtonProps) => {
  return (
    <div className="buttonTableListContainer">
      {
        buttonList.map((item,index)=>
      <Link to={item.redirectTo} key={index}>
        <div className="iconButtonContainer">
          <img src={item.icon} alt={item.title+" icon"}/>
        </div>
        <div className="textButtonContainer">
          <h1>
            {item.quantity}
          </h1>
          <p>
            {item.title}
          </p>
        </div>
      </Link>
    )
      }
    </div>
  )
}

export default GroupTableButton

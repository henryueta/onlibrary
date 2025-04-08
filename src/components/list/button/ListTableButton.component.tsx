import { Link } from "react-router-dom";
import "./ListTableButton.component.css";


type ButtonProps = Record<'icon'|'title'|'quantity'|'redirectTo',string>;

interface ListTableButtonProps {
  buttonList:ButtonProps[]
}

const ListTableButton = ({buttonList}:ListTableButtonProps) => {
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

export default ListTableButton

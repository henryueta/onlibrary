import "./GroupTableCard.component.css";
import TableCard from "../../card/table/TableCard.component";
import { TableCardProps } from "../../card/table/TableCard.component";

interface GroupTableCardProps {
  cardList:TableCardProps[]
}

const GroupTableCard = ({cardList}:GroupTableCardProps) => {
  return (
    <div className="tableCardListContainer">
      {
        cardList.map((item,index)=>
          <TableCard 
            key={index} 
            icon={item.icon}
            quantity={item.quantity}
            warning={item.warning}
            redirectTo={item.redirectTo}
            title={item.title}
            />
    )
      }
      
    </div>
  )
}

export default GroupTableCard

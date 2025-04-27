import { ElementType } from "react";
import "./GroupBook.component.css";


type ItemProps = Record<'image'|'title',string>

interface GroupBookProps{
    title:string,
    itemList:ItemProps[]
    tag?:ElementType
}

const GroupBook = ({
    title,
    itemList
}:GroupBookProps) => {
  return (
    <section className="listBookSection">
        <div className="listBookTitleContainer">
            <h1>{title}</h1>
        </div>
        <div className="itemContainer">
        {
            itemList.map((item,index)=>
                <div key={index}>
                    <img src={item.image} alt={`${item.title}´s image`} />
                    <p>{item.title}</p>
                </div>
            )
            
        }
        </div>
    </section>
  )
}
export default GroupBook

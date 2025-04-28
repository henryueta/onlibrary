import "./GroupBook.component.css";
import BookCard from "../../card/book/BookCard.component";

type ItemProps = Record<'image'|'title',string>

interface GroupBookProps{
    title:string,
    itemList:ItemProps[]
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
                <BookCard image={item.image} title={item.title} key={index}></BookCard>
            )            
        }
        </div>
    </section>
  )
}
export default GroupBook

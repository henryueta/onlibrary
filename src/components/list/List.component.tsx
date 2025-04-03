import "./List.component.css";


type ItemProps = Record<'image'|'title',string>

interface ListProps{
    title:string,
    itemList:ItemProps[]
}

const List = ({
    title,
    itemList
}:ListProps) => {
  return (
    <section className="listSection">
        <div className="listTitleContainer">
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
export default List

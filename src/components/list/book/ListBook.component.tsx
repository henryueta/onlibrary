import { useState } from "react";
import "./ListBook.component.css";


type ItemProps = Record<'image'|'title',string>

interface ListBookProps{
    title:string,
    itemList:ItemProps[]
}

const ListBook = ({
    title,
    itemList
}:ListBookProps) => {
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
export default ListBook

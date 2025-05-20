import "./GroupBook.component.css";
import BookCard from "../../card/book/BookCard.component";
import { useEffect, useState } from "react";
import { BookTableQueryProps } from "../../../objects/table.object";
import useAxios from "../../../hooks/useAxios";

type ItemProps = Record<'image'|'title',string>

type CategoryProps = '';

interface GroupBookProps{
    title:string,
    category?:string,
    itemList:ItemProps[]
}

type bookCardProps = Pick<BookTableQueryProps,'capa'|'titulo'|'id'>[];

const GroupBook = ({
    title,
    itemList
}:GroupBookProps) => {

      const {onAxiosQuery} = useAxios()
      const [books,setBooks] = useState<bookCardProps | null>(null);

 useEffect(()=>{
    console.log(title)
    onAxiosQuery("get",{
      url:"http://localhost:5900/book/list",
      type:{
        get:{

        }
      },
      onResolver:{
        catch(error) {
          console.log(error)
        },
        then(result) {
          const bookList_data = result.data as bookCardProps
                setBooks(bookList_data)
        },
      }
    })
  },[])

  return (
    <section className="listBookSection">
        {
            !!books
            &&
            books.map((item,index)=>{
                return (
                    <div className="itemContainer">       
                        <BookCard 
                        image={itemList[index].image} 
                        title={item.titulo} 
                        id={item.id}
                        key={item.id}/>      
                    </div> 
                )
            })
        }
    </section>
  )
}
export default GroupBook

import "./GroupBook.component.css";
import BookCard from "../../card/book/BookCard.component";
import { useEffect, useState } from "react";
import { BookTableQueryProps } from "../../../objects/table.object";
import useAxios from "../../../hooks/useAxios";
import HeaderTitle from "../../header_title/HeaderTitle.component";
import blackArrow_icon from "../../../assets/imgs/icons/blackArrow_icon.png"

interface GroupBookProps{
    title:string,
    category?:string,
}

type bookCardProps = Pick<BookTableQueryProps,'imagem'|'titulo'|'id'>[];

const GroupBook = ({category,title}:GroupBookProps) => {

      const {onAxiosQuery} = useAxios()
      const [books,setBooks] = useState<bookCardProps | null>(null);

      const [currentListBook,setCurrentListBook] = useState<Record<'start'|'end',number>>({
        start:0,
        end:6
      });

          
 useEffect(()=>{
    onAxiosQuery("get",{
      url:"http://localhost:4200/book/list?categoria="+category,
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
    <>
    <section className="listBookSection">
      <div 
      className="changeListButtonContainer"
      id="setPreviousListContainer"
      >
          <button
          onClick={()=>{
            currentListBook.start > 0
            &&
            setCurrentListBook((prev)=>{
              return {
                start:prev.start-6,
                end:prev.start
              }  
            })

          }}>
          <img src={blackArrow_icon} alt="previous_arrow_icon" />
        </button>
      </div>
      <div className="itemListContainer">
        <HeaderTitle
        title={title}
        hasHrLine
        />
        <div className="itemContainer">  
          
        {
            !!books
            &&
            books.slice(currentListBook.start,currentListBook.end).map((item)=>{
                return (
                         
                        <BookCard 
                        image={{
                          url:item.imagem,
                          height:250,
                          width:156
                        }} 
                        title={item.titulo} 
                        id={item.id}
                        key={item.id}/>      
                    
                )
            })
        }
        </div> 
      </div>
        <div 
        className="changeListButtonContainer"
        id="setNextListContainer"
        >
          <button
          onClick={()=>{
            !!books?.length
            &&
            !(currentListBook.end === (books.length % 6 === 0 ? books.length : (Math.floor((books.length/6))*6)+6))
            &&
            setCurrentListBook((prev)=>{
              return {
                start:prev.end,
                end:prev.end+6
              }
            })
          }}
          >
            <img src={blackArrow_icon} alt="next_arrow_icon" />
          </button>
        </div>
    </section>
    </>
  )
}
export default GroupBook

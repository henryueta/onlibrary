import "./GroupBook.component.css";
import BookCard from "../../card/book/BookCard.component";
import { useEffect, useState } from "react";
import { BookTableQueryProps } from "../../../objects/table.object";
import useAxios from "../../../hooks/useAxios";

interface GroupBookProps{
    title:string,
    category?:string,
}

type bookCardProps = Pick<BookTableQueryProps,'capa'|'titulo'|'id'>[];

const GroupBook = ({
    title,
}:GroupBookProps) => {

      const {onAxiosQuery} = useAxios()
      const [books,setBooks] = useState<bookCardProps | null>(null);
      
          const [categories,setCategories] = useState<string[] | null>(null);
          const [randomChoice,setRandomChoice] = useState<number | null>(null);
      
          useEffect(()=>{
      
            onAxiosQuery("get",{
              url:"http://localhost:5900/category/get",
              type:{
                get:{
      
                }
              },
              onResolver:{
                then(result) {
                  const category_data = result.data as {nome:string}[]
                  setCategories( category_data.map((item)=>item.nome))
                },
                catch(error) {
                  console.log(error)
                },
              }
            })
      
          },[])
      
            useEffect(()=>{
              !!categories?.length
              &&
              (()=>{
              setRandomChoice(Math.floor(Math.random()*categories?.length-1))
            })()
      
            },[categories])
      
            useEffect(()=>{
              !!randomChoice && !!categories
              &&
              console.log(categories[randomChoice])
            },[randomChoice])

 useEffect(()=>{
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
      <div className="itemContainer">  
        {
            !!books
            &&
            books.map((item)=>{
                return (
                         
                        <BookCard 
                        image={{
                          url:item.capa,
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
    </section>
  )
}
export default GroupBook

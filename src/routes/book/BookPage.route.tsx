import FooterHome from "../../components/footer/home/FooterHome.component";
import Main from "../../components/main/Main.component";
import NavHome from "../../components/nav/home/NavHome.component";
import "./BookPage.route.css";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { BookTableQueryProps } from "../../objects/table.object";
import Word from "../../classes/word.class";
import Load from "../../components/load/Load.component";
import TableHome from "../../components/table/home/TableHome.component";
import useImageResizer from "../../hooks/useImageResizer";

interface TitleDescriptionProps {
  className?:string
  title:string,
  description:string
}

interface BookLibrariesProps {
  cep:string
endereco:string
fk_id_biblioteca:string
fk_id_livro:string
nome:string
quantidade:number
quantidade_disponivel:number
reserva_online:boolean
}

const TitleDescription = ({className,title,description}:TitleDescriptionProps)=>{

  return (
    <div className={className}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )

}

const BookPage = () => {

  const {id} = useParams();
  const {onAxiosQuery,queryState} = useAxios()
  const [bookData,setBookData] = useState<BookTableQueryProps | null>(null);
  const [bookLibraries,setBookLibraries] = useState<BookLibrariesProps[] | null>(null);
  const [bookCape,setBookCape] = useState<string>("");
  
    const {currentImage} = useImageResizer({
    url:bookCape,
    mimetype:"image/webp",
    name:"bookCape.webp",
    resize:{
      format:"WEBP",
      quality:80,
      width:344,
      height:550
    }
  });

   useEffect(()=>{
      !!bookData
      &&
      setBookCape(bookData?.capa)
    },[bookData])

    
    useEffect(()=>{
      !!currentImage
      &&
      setBookCape(currentImage)
    },[currentImage])

  useEffect(()=>{

    onAxiosQuery("get",{
      url:"https://onlibrary-server-fkrn.vercel.app/book/get?id="+id,
      type:{
        get:{
          
        }
      },
      onResolver:{
        then(result) {
          const book_data = result.data as BookTableQueryProps;
          setBookData(book_data)
        },
        catch(error) {
          console.log(error)
        },
      }
    })



    onAxiosQuery("get",{
      url:"https://onlibrary-server-fkrn.vercel.app/book/libraries?id="+id,
      type:{
        get:{

        }
      },
      onResolver:{
        then(result) {
          const bookLibraries_data = result.data as BookLibrariesProps[]
          setBookLibraries(bookLibraries_data)  
        },
        catch(error) {
          console.log(error)
        },
      }
    })

  },[id])

  useEffect(()=>{
      !!bookLibraries
      &&
      bookLibraries.map((item)=>console.log(Object.values(item)))
  },[bookLibraries])

  return (
    <>
    <NavHome/>
        <Main contentStyle={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            marginTop:"13rem",
            width:"100vw"
        }}>
          
    
             <section className="bookPageSection">
                  <Load loadState={queryState.isLoading}/>
            {  !!bookData
            && 
              <>
                <section className="bookDataSection">
                  <div className="capeContainer">
                        <img src={bookCape} alt="book_cape" />
                  </div>
                  <div className="bookInformationContainer">
                      <section className="headerSection">
                        <div className="titleContainer">
                            <h1>{bookData.titulo}</h1>
                        </div>
                        <div className="authorsContainer">
                            <h1>{bookData.autores.toString()}</h1>
                        </div>
                      </section>
                      <section className="descriptionSection">
                            <TitleDescription 
                            className="descriptionContainer"
                            title="Descrição"
                            description={bookData.descricao.slice(0,800).concat(". . . LER MAIS")}
                            />
                      </section>
                      <section className="bookAttributeSection">
                        {
                          Object.entries(bookData).map((item)=>{
                            return (
                              item[0] !== "capa" 
                              &&
                              item[0] !== "id"
                              &&
                              item[0] !== "titulo"
                              &&
                              item[0] !== "descricao"
                              &&
                               <TitleDescription 
                            title={
                              item[0] === item[0].toLowerCase()
                              ?new Word(item[0],"name").word || ""
                              : item[0]
                            }
                            description={item[1].toString()}
                            />
                            )
                          })
                        }
                      </section>
                  </div>
              </section>
              <section className="bookLibrarySection">

                {
                  !!bookLibraries?.length
                  &&
                  <TableHome
                  table={bookLibraries}
                  headers={
                     Object.entries(bookLibraries[0]).map((item)=>{
                      return (
                        item[0] !== "fk_id_biblioteca"
                        &&
                        item[0] !== "fk_id_livro"
                        &&
                        item[0] !== "reserva_online"
                        &&
                        new Word(item[0],"name").word as string
                      )
                    }).filter((item)=>item !== false)
                  }
                  data={
                    bookLibraries.map((item)=>{             
                    return Object.entries(item).map((item_data)=>{
                        return (
                            item_data[1]
                        )
                    }).filter((item_noFalse)=>item_noFalse!==false)
                  })
                  }
                  filter={["fk_id_biblioteca","fk_id_livro","fk_id_livro","reserva_online","0"]}
                  onClick={(data)=>alert(data)}
                />
                }

              </section>
              </>
            }
          </section>
           
        </Main>
    <FooterHome/>
    </>
  )
}

export default BookPage;

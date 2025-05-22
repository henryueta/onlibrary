import FooterHome from "../../components/footer/home/FooterHome.component";
import Main from "../../components/main/Main.component";
import NavHome from "../../components/nav/home/NavHome.component";
import "./BookPage.route.css";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useReducer } from "react";
import Word from "../../classes/word.class";
import Load from "../../components/load/Load.component";
import TableHome from "../../components/table/home/TableHome.component";
import Dialog from "../../components/dialog/Dialog.component";
import useHandleBook, { BookLibrariesProps, TitleDescriptionProps } from "../../hooks/useHandleBook";



const TitleDescription = ({className,title,description}:TitleDescriptionProps)=>{

  return (
    <div className={className}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )

}

  interface LibraryStateProps {
      libraryData:BookLibrariesProps | null,
      visible:{
        view:boolean,
        close:boolean,
      }
  }

  const initialLibraryState:LibraryStateProps = {

    libraryData: null,
    visible:{
      view:false,
      close:true,
    }

  }

  type ActionLibraryType = 
  {
    type:"libraryData",
    value:BookLibrariesProps
  } 
  |
  {
    type:"on",
    value:{
      view:boolean,
      close:boolean
    }
  }
  |
  {
    type:"off",
    value:{
      view:boolean,
      close:boolean
    }
  }
    

  const handleLibraryState = (state:LibraryStateProps,action:ActionLibraryType)=>{

    switch (action.type) {
       case "libraryData":
          return {...state,libraryData:action.value}
        case "on":
          return {...state,visible:action.value}
        case "off":
          return {...state,visible:action.value}
      default:
        return state
    }

  }

const BookPage = () => {

  const {id} = useParams();
  const {onAxiosQuery,queryState} = useAxios()
  const {bookState} = useHandleBook(!!id ? id : '' );
  
  const [libraryState,setLibraryState] = useReducer(handleLibraryState,initialLibraryState);
  
  return (
    <>
    {
      libraryState.visible.view
      &&
      <Dialog 
            className="libraryViewDialog"
            closeOnExternalClick={true}
            onClose={()=>{
              setLibraryState({
                type:"off",
                value:{
                  close:true,
                  view:false
                }
              })
            }}
            >
              {
                !!libraryState.libraryData
                  && (
                    <section className="libraryDataSection">
                      <div className="titleContainer">
                          <h1>Sobre a biblioteca</h1>
                      </div>
                      <TitleDescription 
                      title="Nome"
                      description={libraryState.libraryData.nome}
                      />
                      <TitleDescription 
                      title="Telefone"
                      description={libraryState.libraryData.telefone}
                      />
                      <TitleDescription 
                      title="Endereço"
                      description={libraryState.libraryData.endereco}
                      />
                      <TitleDescription 
                      title="CEP"
                      description={libraryState.libraryData.cep}
                      />

                    </section>
                  )
              }
        </Dialog>
    }
            
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
            {  !!bookState.data
            && 
              <>
                <section className="bookDataSection">
                  <div className="capeContainer">
                        <img src={bookState.cape} alt="book_cape" />
                  </div>
                  <div className="bookInformationContainer">
                      <section className="headerSection">
                        <div className="titleContainer">
                            <h1>{bookState.data.titulo}</h1>
                        </div>
                        <div className="authorsContainer">
                            <h1>{bookState.data.autores.toString()}</h1>
                        </div>
                      </section>
                      <section className="descriptionSection">
                            <TitleDescription 
                            className="descriptionContainer"
                            title="Descrição"
                            description={bookState.data.descricao.slice(0,800).concat(". . . LER MAIS")}
                            />
                      </section>
                      <section className="bookAttributeSection">
                        {
                          Object.entries(bookState.data).map((item)=>{
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
                  !!bookState.libraries?.length
                  &&
                  <TableHome
                  table={bookState.libraries}
                  headers={
                     Object.entries(bookState.libraries[0]).map((item)=>{
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
                    bookState.libraries.map((item)=>{             
                    return Object.entries(item).map((item_data)=>{
                        return (
                            item_data[1]
                        )
                    }).filter((item_noFalse)=>item_noFalse!==false)
                  })
                  }
                  filter={["telefone","fk_id_biblioteca","fk_id_livro","fk_id_livro","reserva_online","0"]}
                  onClick={(data)=>{
                    const current_libraryData = data as BookLibrariesProps
                    
                    onAxiosQuery("get",{
                      url:"http://localhost:5900/tables/data?id_biblioteca="+current_libraryData.fk_id_biblioteca+"&type=exemplary",
                      type:{
                        get:{

                        }
                      },
                      onResolver:{
                        then(result) {
                          console.log(result)
                        },
                        catch(error) {
                          console.log(error)
                        },
                      }
                    })

                    setLibraryState({
                      type:"on",
                      value:{
                        view:true,
                        close:false
                      }
                    })
                    setLibraryState({
                      type:"libraryData",
                      value:current_libraryData
                    })
                  }}
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

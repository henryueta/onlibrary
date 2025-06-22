import FooterHome from "../../components/footer/home/FooterHome.component";
import Main from "../../components/main/Main.component";
import NavHome from "../../components/nav/home/NavHome.component";
import "./BookPage.route.css";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useReducer, useState } from "react";
import Word from "../../classes/word.class";
import TableHome from "../../components/table/home/TableHome.component";
import useHandleBook, { BookLibrariesProps } from "../../hooks/useHandleBook";
import { ExemplaryTableQueryProps } from "../../objects/table.object";
import useHandleAuth from "../../hooks/usehandleAuth";
import TitleDescription from "../../components/title_description/TitleDescription.component";
import useHandlePath from "../../hooks/useHandlePath";

  interface LibraryStateProps {
      libraryData:BookLibrariesProps | null,
      visible:{
        view:boolean,
        close:boolean,
      },
      exemplaryQuantity:number | null
  }

  const initialLibraryState:LibraryStateProps = {

    libraryData: null,
    visible:{
      view:false,
      close:true,
    },
    exemplaryQuantity:0

  }

  type ActionLibraryType = 
  {
    type:"libraryData",
    value:BookLibrariesProps | null
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
  |
  {
    type:"exemplary",
    value:number | null
  }
    

  const handleLibraryState = (state:LibraryStateProps,action:ActionLibraryType)=>{

    switch (action.type) {
       case "libraryData":  
          return {...state,libraryData:action.value}
        case "on":
          return {...state,visible:action.value}
        case "off":
          return {...state,visible:action.value}
        case "exemplary":
          return {...state,exemplaryQuantity:action.value}
      default:
        return state
    }

  }

const BookPage = () => {

  const {id} = useParams();
  const {onAxiosQuery,queryState} = useAxios()
 const {bookState} = useHandleBook(!!id ? id : '' ,{width:344,height:550});
  const [reserveExemplaryQuantity,setReserveExemplaryQuantity] = useState<number>(1);
  const {authContext} = useHandleAuth();

  const {onTransition,currentPathContext} = useHandlePath();

  const [libraryState,setLibraryState] = useReducer(handleLibraryState,initialLibraryState);


  return (
    <>
    {/* {
      libraryState.visible.view
      &&
      <Dialog 
            title="Sobre a biblioteca"
            className="libraryViewDialog"
            closeOnExternalClick={false}
            onClose={()=>{
              setLibraryState({
                type:"off",
                value:{
                  close:true,
                  view:false
                }
              })
              setLibraryState({
                type:"libraryData",
                value:null
              })
              setLibraryState({
                type:"exemplary",
                value:null
              })
            }}
            >
              {
                !!libraryState.libraryData
                  && (
                    <section className="libraryDataSection">
                      
                      <div className="libraryDataContainer">

                        <div>
                          <TitleDescription 
                          title="Nome"
                          description={libraryState.libraryData.nome}
                          />
                        </div>

                       <div>
                        <TitleDescription 
                          title="Telefone"
                          description={libraryState.libraryData.telefone}
                          />
                       </div>

                        <div>
                          <TitleDescription 
                          title="Endereço"
                          description={libraryState.libraryData.endereco}
                          />
                        </div>

                        <div>
                          <TitleDescription 
                          title="CEP"
                          description={libraryState.libraryData.cep}
                          />
                        </div>
                       
                      </div>
                      <div className="reserveContainer">
                          <div className="dialogTable">
                              <table>
                              <thead>
                              <tr>
                                <th>Livro</th>
                                <th>Quantidade</th>
                              </tr>
                              <tr>
                                <td>Livro</td>
                                <td>
                                  <input 
                                  type="number" 
                                  value={reserveExemplaryQuantity}
                                  onChange={(e)=>{
                                    const current_numberValue = parseInt(e.target.value)
                                    typeof libraryState.exemplaryQuantity  === 'number'
                                    &&
                                    current_numberValue <= libraryState.exemplaryQuantity
                                    &&
                                    current_numberValue > 0
                                    &&
                                    setReserveExemplaryQuantity(current_numberValue)
                                  }}
                                  />
                                </td>
                              </tr>
                              </thead>
                          </table>
                          </div>
                      
                      </div>
                      <hr />
                      <div className="reserveOptionsContainer">
                        <div className="reserveCancelContainer">
                            <button className="cancelButton"
                            onClick={()=>{
                              setLibraryState({
                                type:"off",
                                value:{
                                  close:true,
                                  view:false
                                }
                              })
                                            }}>
                              Cancelar
                            </button>
                        </div>
                        <div className="reserveSubmitContainer">
                            {
                              libraryState.libraryData.reserva_online
                              ? 
                              <button className="acceptButton" onClick={()=>{
                                  !!authContext.userId

                                  ? onAxiosQuery("post",{
                                    url:"http://localhost:4200/reserve/post",
                                    type:{
                                      post:{
                                        data:{
                                          fk_id_biblioteca:libraryState.libraryData?.fk_id_biblioteca,
                                          fk_id_livro:id,
                                          fk_id_usuario:authContext.userId,
                                          quantidade_total:reserveExemplaryQuantity
                                        }
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
                                  : alert("Faça seu login");
                              }}>
                                Reservar
                              </button>

                              : <p>Esta biblioteca não aceita reservas online</p>
                            }
                        </div>
                      </div>
                    </section>
                  )
              }
        </Dialog>
    } */}
            
    <NavHome/>
        <Main contentStyle={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            marginTop:"13rem",
            width:"100vw",
            padding:"3.5rem 0rem 3.5rem 0rem"
        }}>
            
             <section className={"bookPageSection "+currentPathContext.transitionClass}>
                  {/* <Load loadState={queryState.isLoading}/> */}
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
                      <section className="reserveSection">
                          <button className="acceptButton"
                          onClick={()=>{
                            onTransition("/book/online_reserve/"+id,{
                              hasReplace:false
                            })
                            // !!authContext.userId
                            // ? onNavigate("/book/online_reserve/"+id)
                            // : onNavigate("/login")
                          }}>
                            Reservar
                          </button>
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
                              item[0] !== "imagem" 
                              &&
                              item[0] !== "id"
                              &&
                              item[0] !== "titulo"
                              &&
                              item[0] !== "descricao"
                              &&
                              item[0] !== "fk_id_biblioteca_livro"
                              &&
                              item[0] !== "fk_id_biblioteca"
                              &&
                               <TitleDescription 
                            title={
                              item[0] === item[0].toLowerCase()
                              ?new Word(item[0],"name").word || ""
                              : item[0]
                            }
                            description={
                              (typeof item[1] === "string" 
                              ||
                              typeof item[1] === "number")
                              && item[1]
                            }
                            />
                            )
                          })
                        }
                      </section>
                  </div>
              </section>
              <section className="bookLibrarySection">
                 <div className="titleContainer">
                      <h1>Bibliotecas disponíveis</h1>
                </div>       
                {
                  
                  !!bookState.libraries?.length
                  &&
                  <TableHome
                  table={bookState.libraries}
                  filter={["telefone","fk_id_biblioteca","fk_id_livro","fk_id_livro","reserva_online","0"]}
                  onClick={(data)=>{
                    const current_libraryData = data as BookLibrariesProps
                    
                    onAxiosQuery("get",{
                      url:"http://localhost:4200/exemplary/get?id_biblioteca="+current_libraryData.fk_id_biblioteca+"&id_livro="+id,
                      type:{
                        get:{

                        }
                      },
                      onResolver:{
                        then(result) {
                          const current_exemplaryListData = result.data as Pick<ExemplaryTableQueryProps,'situacao'>[];
                          const current_exemplaryQuantity = current_exemplaryListData.length
                          setReserveExemplaryQuantity(1)
                          setLibraryState({
                            type:"exemplary",
                            value:current_exemplaryQuantity
                          })
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

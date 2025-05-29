import { useNavigate, useParams } from "react-router-dom"
import NavHome from "../../components/nav/home/NavHome.component";
import "./OnlineReserve.route.css";
import useAxios from "../../hooks/useAxios";
import useHandleBook, { BookLibrariesProps, TitleDescriptionProps } from "../../hooks/useHandleBook";
import { useEffect, useReducer, useState } from "react";
import useHandleAuth from "../../hooks/usehandleAuth";
import TableHome from "../../components/table/home/TableHome.component";
import Word from "../../classes/word.class";
import { ExemplaryTableQueryProps } from "../../objects/table.object";
import useImageResizer from "../../hooks/useImageResizer";


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

const TitleDescription = ({className,title,description}:TitleDescriptionProps)=>{

  return (
    <div className={className}>
      {
        title.length
        ? <h1>{title}</h1>
        : null
      }
      <p>{description}</p>
    </div>
  )

}



const OnlineReserve = () => {

    const {id} = useParams();
    const {onAxiosQuery,queryState} = useAxios()
    const {bookState} = useHandleBook(!!id ? id : '' ,{width:156,height:250});
    const [reserveExemplaryQuantity,setReserveExemplaryQuantity] = useState<number>(1);
    const {authContext} = useHandleAuth();
    const onNavigate = useNavigate();
    const {getImage,currentImage} = useImageResizer()
    const [imageView,setImageView] = useState<string>();


  const [libraryState,setLibraryState] = useReducer(handleLibraryState,initialLibraryState);


  useEffect(()=>{
    !!bookState.data
    &&
    getImage({
    url:bookState.data.capa,
    mimetype:"image/webp",
    name:"bookImage.webp",
    resize:{
      format:"WEBP",
      height:250,
      width:156,
      quality:80
    }
  })

  },[bookState.data])

  useEffect(()=>{
    !!currentImage
    &&
    (()=>{
      setImageView(currentImage)
    })()
  },[currentImage])


  return (
    <>
    <NavHome/>
    <section className="onlineReserveSection">

      <div className="titleContainer">
        <h1>Finalizar reserva</h1>
      </div>

     <section className="reserveDataSection">
         <div className="libraryReserveDataContainer">
              <div className="titleContainer">
                <h1>Escolha de biblioteca</h1>
              </div>
              <div className="libraryReserveInfoContainer">
                {
                  // libraryState.libraryData 
                  // &&
                 <>
                   <TitleDescription 
                  title="Nome"
                  description={libraryState.libraryData?.nome || " - - - - - "}
                  />                
                  <TitleDescription 
                  title="Telefone"
                  description={libraryState.libraryData?.telefone || " - - - - - " }
                  />
                  <TitleDescription 
                  title="Endereço"
                  description={libraryState.libraryData?.endereco || " - - - - - " }
                  />     
                  <TitleDescription 
                  title="CEP"
                  description={libraryState.libraryData?.cep || " - - - - - " }
                  />   
                 </>
                  }
              </div>
        </div>

        <div className="reserveResumeContainer">
            <div className="titleContainer">
                <h1>Resumo da reserva</h1>
            </div>
            <div className="reserveInfoContainer">
                <div className="bookCapeReserveContainer">
                  <TitleDescription
                  title=""
                  description={
                    <img src={imageView} alt="book_cape" />
                  }
                  />
                </div>
                <div className="bookDataReserveContainer">
                <TitleDescription
                 title="Livro:"
                 description={bookState.data?.titulo || ""}
                />
                <TitleDescription
                 title="Lançamento:"
                 description={bookState.data?.ano_lancamento || ""}
                />
                  <div>
                    <TitleDescription
                    title="Quantidade:"
                    description={
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
                    }
                    />
                    <span style={{color:"red"}}>{"max: "+libraryState.exemplaryQuantity}</span>
                  </div>
                </div>        
          </div>
          <div className="reserveOptionsContainer">
                    <div className="reserveCancelContainer">
                      <button className="cancelButton"
                      onClick={()=>{
                        onNavigate("/book/"+id)
                      }}>
                        Cancelar 
                      </button>
                    </div>
                    <div className="reserveSubmitContainer">                  
                      <button className="acceptButton">
                        Finalizar reserva
                      </button>
                    </div>
                  </div>
              </div>
      </section>
      <section className="libraryTableListSection">
        <div className="titleContainer">
          <h1>Bibliotecas disponíveis</h1>
        </div>
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
                        url:"http://localhost:5900/exemplary/get?id_biblioteca="+current_libraryData.fk_id_biblioteca+"&id_livro="+id,
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
    </section>
    </>
  )
}

export default OnlineReserve

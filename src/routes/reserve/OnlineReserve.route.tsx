import { useNavigate, useParams } from "react-router-dom"
import NavHome from "../../components/nav/home/NavHome.component";
import "./OnlineReserve.route.css";
import useHandleBook from "../../hooks/useHandleBook";
import { useEffect, useState } from "react";
import useHandleAuth from "../../hooks/usehandleAuth";
import TableHome from "../../components/table/home/TableHome.component";
import useImageResizer from "../../hooks/useImageResizer";
import TitleDescription from "../../components/title_description/TitleDescription.component";
import HeaderTitle from "../../components/header_title/HeaderTitle.component";
import useHandleOnlineReserve from "../../hooks/useHandleOnlineReserve";
import Spinner from "../../components/spinner/Spinner.component";
import Communication from "../../components/communication/Communication.component";
import ServerMessage from "../../components/message/ServerMessage.component";
import NoData from "../../components/empty/NoData.component";

const OnlineReserve = () => {

    const {id} = useParams();
    const {bookState} = useHandleBook(!!id ? id : '');
    const {onlineReserveState,onGetLibraryData,onOnlineReserve,reserveQueryState} = useHandleOnlineReserve();
    const [reserveExemplaryQuantity,setReserveExemplaryQuantity] = useState<number>(1);
    const [noLibraryWarn,setNoLibraryWarn] = useState<boolean>(false);
    const {authContext} = useHandleAuth();
    const onNavigate = useNavigate();
    const {getImage,currentImage} = useImageResizer()
    const [imageView,setImageView] = useState<string>();



  useEffect(()=>{
    !!bookState.data
    &&
    getImage({
    url:bookState.data.imagem,
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

    {/* <HeaderTitle
      title="Finalizar reserva"
      /> */}

     <section className="reserveDataSection">
     <div className="reserveResumeContainer">
            {
              !!noLibraryWarn
              &&
              <ServerMessage
                  message="Escolha uma biblioteca para a reserva"
                  type="error"
                  onClose={()=>{
                      setNoLibraryWarn(false)
                  }}
              />
            }
            <HeaderTitle
              title="Resumo da reserva"
              hasHrLine
              />
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
                      typeof onlineReserveState.exemplaryQuantity  === 'number'
                      &&
                      current_numberValue <= onlineReserveState.exemplaryQuantity
                      &&
                      current_numberValue > 0
                      &&
                      setReserveExemplaryQuantity(current_numberValue)
                      }}
                      />
                    }
                    />
                    <span style={{color:"red"}}>{"max: "+onlineReserveState.exemplaryQuantity}</span>
                  </div>
                </div>        
          </div>
          <div className="reserveOptionsContainer">
              <div className="closeLibraryDialog">
                <button className="cancelButton"
                onClick={()=>{
                  onNavigate("/book/"+id)
                }}>
                  Cancelar 
                </button>
              </div>
              <div className="reserveSubmitContainer">                  
                <button
                onClick={()=>{
                  
                  !!authContext.userId
                  ?
                  !!id?.length
                  &&
                  !!onlineReserveState.libraryData?.fkIdBiblioteca
                  ?
                  onOnlineReserve(
                  onlineReserveState.libraryData.fkIdBiblioteca,
                  { 
                    id:id,
                    exemplary_quantity:reserveExemplaryQuantity,

                  })
                  : setNoLibraryWarn(true)
                  : null

                }}
                className="acceptButton">
                  {
                    reserveQueryState.isLoading
                    &&
                    onlineReserveState.exemplaryQuantity
                    && <Spinner/>
                  }
                    Finalizar reserva
                </button>
              </div>
          </div>
        </div>  
         <div className="libraryReserveDataContainer">
              <HeaderTitle
              title="Escolha de biblioteca"
              hasHrLine
              />
              <div className="libraryReserveInfoContainer">
                {
                  // onlineReserveState.libraryData 
                  // &&
                 <>
                   <TitleDescription 
                  title="Nome"
                  description={onlineReserveState.libraryData?.Nome || " - - - - - "}
                  />                
                  <TitleDescription 
                  title="Telefone"
                  description={onlineReserveState.libraryData?.Telefone || " - - - - - " }
                  />
                  <TitleDescription 
                  title="Endereço"
                  description={onlineReserveState.libraryData?.['Endereço'] || " - - - - - " }
                  />     
                  <TitleDescription 
                  title="CEP"
                  description={onlineReserveState.libraryData?.CEP || " - - - - - " }
                  />   
                 </>
                  }
              </div>
        </div>

        
      </section>
      <section className="libraryTableListSection">
        <div className="libraryTableListContainer">
          <HeaderTitle
          title="Bibliotecas disponíveis"
          hasHrLine
          />
          {
                    
                    !!bookState.libraries?.length
                    ?
                    <TableHome
                    table={bookState.libraries.filter((library)=>library['Reserva online'])}
                    filter={["telefone","fkIdBiblioteca","fkIdLivro","fk_id_livro","Reserva online","0"]}
                    onClick={(data)=>{
                      !!id?.length
                      &&
                      (()=>{
                        onGetLibraryData(data,id)
                        setReserveExemplaryQuantity(1)
                      })()

                    }}
                  />
                  : <NoData
                  dataType="Biblioteca"
                  gender="F"
                  />
                  }        
          </div>
      </section>     
    </section>

    <Communication
    formState={reserveQueryState}
    />
    </>
  )
}

export default OnlineReserve

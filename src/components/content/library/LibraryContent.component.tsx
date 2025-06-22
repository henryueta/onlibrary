import { useEffect, useState } from "react";
import "./LibraryContent.component.css"
import useHandleLibrary, { LibraryProps } from "../../../hooks/useHandleLibrary";
import HeaderTitle from "../../header_title/HeaderTitle.component"
import { useNavigate } from "react-router-dom";
import Spinner from "../../spinner/Spinner.component";
import useHandlePath from "../../../hooks/useHandlePath";


const LibraryContent = ({id}:{id:string}) => {
    const {onLibraryId,currentLibraryContext,onQueryLibraries,libraries,queryState} = useHandleLibrary()
    const [currentLibrary,setCurrentLibrary] = useState<LibraryProps | null>(null);
    const onNavigate = useNavigate();
    const {currentPathContext} = useHandlePath();

     useEffect(()=>{
        onQueryLibraries("https://onlibrary-api.onrender.com/api/biblioteca/minhas-bibliotecas")
      },[])
    
      useEffect(()=>{
        !!libraries && currentLibraryContext
        && setCurrentLibrary(libraries.find((item)=>item.id === currentLibraryContext.libraryId) || null)
      },[libraries])
    
      useEffect(()=>{
        currentLibrary?.id
        && onLibraryId(currentLibrary.id,currentLibrary.nome)
      },[currentLibrary])

  return (
    <section className={"libraryContentDataSection "+currentPathContext}>
        <section className="headerSection">
          <HeaderTitle
          title="Bibliotecas"
          />
          <button className="acceptButton"
          onClick={()=>{
            onNavigate("/register/library")
          }}>
            Criar biblioteca
          </button>
      </section>
      <section className="dataSection">
          <HeaderTitle
          title="Escolha sua biblioteca"
          hasHrLine
          />      
         
            {
              queryState.isLoading
              ? <div className="loadLibrariesContainer">
                  <Spinner/>
              </div>
            : <div className="dataContentContainer">
            {
              
                !!libraries?.length
                ? libraries.map((item)=>
                {
                  return <div
                //   className={
                //     currentLibrary?.id === item.id
                //     ? "accountSelected"
                //     : ""
                //     }
                  onClick={()=>{
                    setCurrentLibrary({
                    id:item.id,
                    nome:item.nome
                  })
                  setTimeout(()=>{
                    onNavigate("/management/library",{
                      
                    })
                  },500)
                }
                    
                  } key={item.id}>
                        <div className="nameContainer">
                        {/* <img src={libraryOpenned_icon}/> */}
                            <HeaderTitle
                            title=
                            {
                                item.nome.slice(0,40).concat(
                                item.nome.length > 40
                                ? " . . . "
                                : "")
                            }
                            />
                        </div>
                    </div>
                }
                )
                : <>Nenhuma biblioteca encontrada</>
              }
            </div>
            }
      </section>
    </section>
  )
}

export default LibraryContent

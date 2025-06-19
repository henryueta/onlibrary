import { useEffect, useState } from "react";
import useHandleLibrary, { LibraryProps } from "../../hooks/useHandleLibrary";
import "./LibraryChoice.route.css";
import Load from "../../components/load/Load.component";
import libraryOpenned_icon from "../../assets/imgs/icons/libraryOpenned_icon.webp"
import useHandleAuth from "../../hooks/usehandleAuth";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import onlibrary_logo from "../../assets/imgs/logo/onlibrary_logoBig.png";
import white_onlibrary_logo from "../../assets/imgs/logo/white_onlibrary_logo.png";
import { useNavigate } from "react-router-dom";

const LibraryChoice = () => {
  const {onLibraryId,currentLibraryContext,onQueryLibraries,libraries,queryState} = useHandleLibrary()
  const [currentLibrary,setCurrentLibrary] = useState<LibraryProps | null>(null);
  const [username,setUsername] = useState<string | null>(null)
  const {authContext} = useHandleAuth();
 const {onAxiosQuery} = useAxios();
  const onNavigate = useNavigate();

  useEffect(()=>{
    !!authContext.userId
    &&
    onAxiosQuery("get",
        {
            url:"http://localhost:4200/user/get/username?id="+authContext.userId,
            type:{
                get:{

                }
            },
            onResolver:{
                then(result) {
                    const username_data = result.data as {username:string}[]
                    setUsername(username_data[0].username)
                },
                catch(error) {
                    console.log(error)
                },
            }
        }
    )

},[authContext.userId])


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
    <section className="choiceLibrarySection">
       <Load loadState={queryState.isLoading}/>
        <div className="choiceLibraryContainer">
            <div className="welcomeContainer">
              <div className="logoContainer">
                <Link to="/">
                  <img src={white_onlibrary_logo} alt="onlibrary_logo" />
                </Link>
              </div>
              <div className="subTitleContainer">
                  <h1>
                    Escolha sua biblioteca
                  </h1>
              </div>
          </div>
            <div className="librariesListContainer">
            {
                !!libraries
                ? libraries.map((item)=>
                {
                  return <div
                  className={
                    currentLibrary?.id === item.id
                    ? "accountSelected"
                    : ""
                    }
                  onClick={()=>{
                    setCurrentLibrary({
                    id:item.id,
                    nome:item.nome
                  })
                  setTimeout(()=>{
                    onNavigate("/management/library",{
                      replace:true
                    })
                  },500)
                }
                    
                  } key={item.id}>
                    <img src={libraryOpenned_icon}/>
                    {item.nome.slice(0,40).concat(
                      item.nome.length > 40
                      ? " . . . "
                      : "")}
                    </div>
                }
                )
                :<>Nenhuma biblioteca encontrada</>
              }
            </div> 
            <div className="libraryChoiceOptionsContainer">
                <div className="createLibraryContainer">
                  <button className="acceptButton"
                  onClick={()=>{
                    onNavigate("/register/library",{
                      replace:true
                    })
                  }}>
                    Criar biblioteca
                  </button>
              </div>
            </div>
          
        </div>
    </section>
  )
}

export default LibraryChoice

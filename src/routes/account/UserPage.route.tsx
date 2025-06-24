import "./UserPage.route.css";
import NavHome from "../../components/nav/home/NavHome.component";
import UserContent from "../../components/content/user/UserContent.component";
import useHandleAuth from "../../hooks/usehandleAuth";
import { useParams } from "react-router-dom";
import OrderContent from "../../components/content/order/OrderContent.component";
import LibraryContent from "../../components/content/library/LibraryContent.component";
import useHandlePath from "../../hooks/useHandlePath";
import { path } from "../../objects/path.object";
import question_icon from "../../assets/imgs/icons/question_icon.png"
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const NavUser = ()=>{
  const {currentPathContext,onTransition} = useHandlePath();
  const [isAdmin,setIsAdmin] = useState<boolean>(false);
  const {authContext} = useHandleAuth();
  const {onAxiosQuery} = useAxios();
  
  useEffect(()=>{
    !!authContext.userId
    &&
    onAxiosQuery("get",{
      url:"https://onlibrary-api.onrender.com/api/usuario/"+authContext.userId,
      type:{
        get:{}
      },
      onResolver:{
        then(result) {
          const user_type = result.data as {data:{tipo:string}}
          console.log(user_type)
          setIsAdmin(!!(user_type.data.tipo.toLowerCase() !== 'comum'))
        },
        catch(error) {
          console.log(error)
        },
      }
    })

  },[authContext.userId])

  return (
    <nav className={"userNavBar "+"emerge"}>
      <div className="titleContainer">
          <h1>
            Sua conta
          </h1>
      </div>
      <span
      style={
        currentPathContext.pathName === "/user/info"
        ? {color:"var(--blue_var)"}
        : {}
      }
      onClick={()=>{
        onTransition("/user/info",{hasReplace:true})
      }}
      >
        Conta
      </span>
      <span
      style={
        currentPathContext.pathName === "/user/orders"
        ? {color:"var(--blue_var)"}
        : {}
      }
      onClick={()=>{
        onTransition("/user/orders",{hasReplace:true})
      }}
      >
        Pedidos e multas
      </span>
      <span
      style={
        currentPathContext.pathName === "/user/libraries"
        ? {color:"var(--blue_var)"}
        : {}
      }
      onClick={()=>{
        onTransition("/user/libraries",{hasReplace:true})
      }}
      >
        Biblioteca
      </span>
      {
        isAdmin
        &&
        <span 
      onClick={()=>{
        onTransition(path.onFindPath("global_management"),{hasReplace:true})
      }}
      >
        Administração
      </span>
      }
      <span

      onClick={()=>{
      
        const logoutAsk = confirm("Deseja sair de sua conta?")
        !!logoutAsk
        && (()=>{
          Cookies.remove("jwt")
          Cookies.remove("user_id")
          Cookies.remove("userStatus")
          Cookies.remove("library")
          authContext.onLogout()      
          onTransition("/",{
            hasReplace:true
          })
        })()

      }}
      style={{fontWeight:"bold"}}
      >
        Logout
      </span>
      
      
        <span 
        style={{
          position: "absolute",
          bottom: "5%",
        }}
        onClick={()=>{
          onTransition("/support",{hasReplace:true})
        }}
        >
          <img src={question_icon} alt="question_icon" />
          Suporte
        </span>
      
    </nav>
  )

}


const UserPage = () => {
  const {authContext} = useHandleAuth();
  const {type} = useParams();

  return (
    <>
      <NavHome/>
      <section className="userPageSection"> 
          <section className="userInfoSection">
            <NavUser/>
              <div className="userDataContainer">
                  <div className="dataContainer">
                    {
                      !!authContext.userId
                      &&
                      type
                      &&
                      type == "info"
                      ?
                      <UserContent id={authContext.userId}/>
                      :
                      type == "orders"
                      ?
                      <OrderContent id={authContext.userId}/>
                      : 
                      type == "libraries"
                      &&
                      <LibraryContent id={authContext.userId}/>
                    }
 
                  </div>
              </div>
          </section>
        </section>
       
    </>
  )
}

export default UserPage

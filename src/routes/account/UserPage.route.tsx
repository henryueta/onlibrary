import "./UserPage.route.css";
import NavHome from "../../components/nav/home/NavHome.component";
import UserContent from "../../components/content/user/UserContent.component";
import useHandleAuth from "../../hooks/usehandleAuth";
import { useNavigate } from "react-router-dom";


const UserPage = () => {
  const onNavigate = useNavigate();
  const {authContext} = useHandleAuth();
  return (
    <>
      <NavHome/>
      <section className="userPageSection">      
          
          <section className="userInfoSection">
              <div className="userOptionsContainer">
                <div className="titleContainer">
                  <h1>
                    Sua conta
                  </h1>
              </div>
                  <button>
                    Conta
                  </button>
                  <button>
                    Pedidos
                  </button>
                  <button>
                    Livros
                  </button>
                  <button 
                  onClick={()=>{
                    onNavigate("/management/library/choice")
                  }}>
                    Biblioteca
                  </button>
              </div>
              <div className="userDataContainer">
                  <div className="titleContainer">

                  </div>
                  <div className="dataContainer">
                    {
                      !!authContext.userId
                      &&
                      <UserContent id={authContext.userId}/>
                    }
 
                  </div>
              </div>
          </section>
        </section>
    </>
  )
}

export default UserPage

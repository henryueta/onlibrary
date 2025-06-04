import "./UserPage.route.css";
import NavHome from "../../components/nav/home/NavHome.component";
import UserContent from "../../components/content/user/UserContent.component";
import useHandleAuth from "../../hooks/usehandleAuth";
import { useNavigate, useParams } from "react-router-dom";
import OrderContent from "../../components/content/order/OrderContent.component";

const UserPage = () => {
  const onNavigate = useNavigate();
  const {authContext} = useHandleAuth();
  const {type} = useParams();

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
                  <button 
                  onClick={()=>{
                      onNavigate("/user/info")
                  }}>
                    Conta
                  </button>
                  <button 
                  onClick={()=>{
                    onNavigate("/user/orders")
                  }}>
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
                      type
                      &&
                      type == "info"
                      ?
                      <UserContent id={authContext.userId}/>
                      :
                      type == "orders"
                      && 
                      <OrderContent id={authContext.userId}/>
                    }
 
                  </div>
              </div>
          </section>
        </section>
    </>
  )
}

export default UserPage

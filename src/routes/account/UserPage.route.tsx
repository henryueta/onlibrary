import "./UserPage.route.css";
import NavHome from "../../components/nav/home/NavHome.component";
import UserContent from "../../components/content/user/UserContent.component";
import useHandleAuth from "../../hooks/usehandleAuth";
import { Link, useParams } from "react-router-dom";
import OrderContent from "../../components/content/order/OrderContent.component";
import LibraryContent from "../../components/content/library/LibraryContent.component";

const NavUser = ()=>{

  return (
    <nav className="userNavBar">
      <div className="titleContainer">
          <h1>
            Sua conta
          </h1>
      </div>
      <Link
      to={"/user/info"}
      replace
      >
        Conta
      </Link>
      <Link
      to={"/user/orders"}
      replace
      >
        Pedidos e multas
      </Link>
      <Link
      to={"/user/libraries"}
      replace
      >
        Biblioteca
      </Link>
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

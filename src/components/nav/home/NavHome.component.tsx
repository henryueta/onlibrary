import Search from "../../search/Search.component";
import "./NavHome.component.css";
import onlibrary_logo from "../../../assets/imgs/logo/onlibrary_logo.png";
import UserAccount from "../../account/user/UserAccount.component";
import Notification from "../../notification/Notification.component";
import useHandleAuth from "../../../hooks/usehandleAuth";
import useHandlePath from "../../../hooks/useHandlePath";

const NavHome = () => {

  const {authContext} = useHandleAuth();
  const {onTransition,currentPathContext} = useHandlePath()

  return (
    <nav className="navHomeBar">
        <div className="logoContainer">
            <span 
            onClick={()=>{
              currentPathContext.pathName !== "/"
              &&
              onTransition("/",{
                hasReplace:false
              })
            }}
            style={
              {
                cursor:"pointer"
              }
            }>
                <img src={onlibrary_logo} alt="onlibrary_logo" />
            </span>
        </div>
        <Search 
        placeholder="Pesquise por livros"
        hasSearchButton
        suggestion={{
          active:true,
          url:"https://onlibrary-api.onrender.com/api/livro/search/suggestions"
        }}
        onSearch={(value,quantity,filter)=>{
          console.log(quantity)
          onTransition("/search/"+value+"/"+filter,{
            hasReplace:false
          })
        }} onChange={()=>{
          
        }} quantity={0}/>
        <div className="userOptionsContainer">
          {
            authContext.userId
            &&
            <Notification 
              type="comum"
              id={
                authContext.userId
              }
            />
          }
       
          <UserAccount/>  
        </div>
    </nav>
  )
}

export default NavHome

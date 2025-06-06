import Search from "../../search/Search.component";
import "./NavHome.component.css";
import onlibrary_logo from "../../../assets/imgs/logo/onlibrary_logo.png";
import { Link, useNavigate } from "react-router-dom";
import UserAccount from "../../account/user/UserAccount.component";
import Notification from "../../notification/Notification.component";
import useHandleAuth from "../../../hooks/usehandleAuth";

const NavHome = () => {

  const {authContext} = useHandleAuth();
  const onNavigate = useNavigate();

  return (
    <nav className="navHomeBar">
        <div className="logoContainer">
            <Link to="/">
                <img src={onlibrary_logo} alt="onlibrary_logo" />
            </Link>
        </div>
        <Search 
        hasSearchButton
        suggestion={{
          active:true,
          url:"http://localhost:3300/suggestion/get?value="
        }}
        onSearch={(value,quantity,filter)=>{
          onNavigate("/search/"+value+"/"+filter)
        }} onChange={()=>{
          
        }} quantity={0}/>
        <div className="userOptionsContainer">
          <Notification 
          type="comum"
          id={
            authContext.userId
            ? authContext.userId
            : ""
          }
          />
       
          <UserAccount/>  
        </div>
    </nav>
  )
}

export default NavHome

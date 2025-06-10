import { Link, useNavigate } from "react-router-dom";
import useHandleAuth from "../../../hooks/usehandleAuth";
import blueUser_icon from "../../../assets/imgs/icons/blueUser_icon.png";
import userLogged_icon from "../../../assets/imgs/icons/userLogged_icon.png"
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import "./UserAccount.component.css"
import Dialog from "../../dialog/Dialog.component";

const UserAccount = () => {
    const {authContext} = useHandleAuth();
    const {onAxiosQuery} = useAxios();
    const [username,setUsername] = useState<string | null>(null)
  const [isAccountView,setIsAccountView] = useState<boolean>(false);
    const onNavigate = useNavigate();

    useEffect(()=>{
        !!authContext.userId
        &&
        onAxiosQuery("get",
            {
                url:"http://localhost:3300/user/get/username?id="+authContext.userId,
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
        console.log(authContext.userId)
    },[authContext.userId])


  return (
    <>

   
        <div className="userAccountContainer">
            {
                authContext.userStatus?.authStatus?.hasAuth
                ? 
                <>
                {
                // <Link to={"/management/library/choice"}>Click</Link>
            <div className="loggedAccountContainer" onClick={()=>{
                !!authContext.userId
                &&
                onNavigate("/user/info");
            }}> 
                    <img src={userLogged_icon} alt="user_icon"/>
                   {username}
                </div>
                 
            }
             {
        isAccountView
        &&
        <Dialog
        className="userAccountDialog"
        close={{
            closeButton:false,
            onClose:()=>setIsAccountView(false),
            timer:400
        }}
    closeOnExternalClick={true}
    
    >
        <div className="userAccountOptionsContainer">
            <ul>
                <li>
                    <Link to={"/management/library/choice"}>Sua biblioteca</Link>
                </li>
                <li>
                    <Link to={"#"}>Seus pedidos</Link>
                </li>
                <li>
                    <Link to={"#"}>Seu Perfil</Link>
                </li>
            </ul>
        </div>

    </Dialog>
    }
                </>
                : 
                <Link className="noLoggedAccountContainer" to="/login">
                    <img src={blueUser_icon} alt="user_icon" />
                    Entre ou cadastre-se
                </Link> 
            }  
        </div>
           
    </>

  )
}

export default UserAccount

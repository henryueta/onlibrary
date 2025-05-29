import { Link } from "react-router-dom";
import useHandleAuth from "../../../hooks/usehandleAuth";
import blueUser_icon from "../../../assets/imgs/icons/blueUser_icon.png";
import userLogged_icon from "../../../assets/imgs/icons/userLogged_icon.png"
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import "./UserAccount.component.css"

const UserAccount = () => {
    const {authContext} = useHandleAuth();
    const {onAxiosQuery} = useAxios();
    const [username,setUsername] = useState<string | null>(null)
    

    useEffect(()=>{
        !!authContext.userId
        &&
        onAxiosQuery("get",
            {
                url:"http://localhost:5900/user/get/username?id="+authContext.userId,
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

    const UserAccountOptios = ()=>{

        return (
            <div className="userAccountOptionsContainer">

            </div>  
        )

    }

  return (
    <div className="userAccountContainer">
        {
            authContext.userStatus?.authStatus?.hasAuth

            
            ? 
            <>
            {
            // <Link to={"/management/library/choice"}>Click</Link>
           <div className="loggedAccountContainer" onClick={()=>console.log("AAA")}> 
                <img src={userLogged_icon} alt="user_icon"/>
                P3nisvald0
            </div>
            
           }
            </>
            : 
            <Link className="noLoggedAccountContainer" to="/login">
                <img src={blueUser_icon} alt="user_icon" />
                Entre ou cadastre-se
            </Link> 
          }  
    </div>
  )
}

export default UserAccount

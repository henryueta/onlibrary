import { createContext, useEffect, useState } from "react";
import useHandleAuth from "../hooks/usehandleAuth";
import Cookies from "js-cookie";

export interface UserStatus{
    errorStatus:{
        hasError:boolean,
        errorValue:string
    },
    authStatus:{
        hasAuth:boolean,
        authValue:string
    }
}

interface AuthContextProps{
    userStatus:UserStatus | null
    setUserStatus:React.Dispatch<React.SetStateAction<UserStatus | null>>
    userId:string
    onLogout:()=>void
}

const AuthContext = createContext({} as AuthContextProps);


const AuthProvider = ({children}:{children:React.ReactNode})=>{

    const {onHandleStatus} = useHandleAuth();
    const [userStatus,setUserStatus] = useState<UserStatus | null>(onHandleStatus());
    const [userId,setUserId] = useState<string>("");


    useEffect(()=>{
        setUserId(
          (()=>{
          return  !!Cookies.get("user_id")
            ? JSON.parse(Cookies.get("user_id") || "{}").user_id
            : ""
        })()
      );
    },[Cookies.get("user_id")])

    const onLogout = ()=>{

        setUserId("")
        setUserStatus({
            authStatus:{
                authValue:"",
                hasAuth:false
            },
            errorStatus:{
                errorValue:"",
                hasError:false
            }
        })
    }

return (
    <AuthContext.Provider value={{userStatus,setUserStatus,userId,onLogout}}>
            {children}
    </AuthContext.Provider>
)

}


export {
    AuthContext,
    AuthProvider,
}

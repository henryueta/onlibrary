import { createContext, useEffect, useState } from "react";
import useHandleAuth, { UserProps } from "../hooks/usehandleAuth";
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
    user:UserProps | null,
    userId:string
}

const AuthContext = createContext({} as AuthContextProps);


const AuthProvider = ({children}:{children:React.ReactNode})=>{

    const {onHandleStatus,onHandleToken} = useHandleAuth();
    const [userStatus,setUserStatus] = useState<UserStatus | null>(onHandleStatus());
    const [user,setUSer] = useState<UserProps | null>(null);
    const [userId,setUserId] = useState<string>("")

    useEffect(()=>{
        setUserId(
          (()=>{
          return  !!Cookies.get("user_id")
            ? JSON.parse(Cookies.get("user_id") || "{}").user_id
            : ""
        })()
      );
    },[Cookies.get("user_id")])

    useEffect(()=>{
      console.log(userId)

    },[userId])

    useEffect(()=>{
        userStatus !== null
        ? setUSer(onHandleToken("KJK1").authResponse.data)
        : setUSer(onHandleToken("").authResponse.data);
    },[userStatus])

return (
    <AuthContext.Provider value={{userStatus,setUserStatus,user,userId}}>
            {children}
    </AuthContext.Provider>
)

}


export {
    AuthContext,
    AuthProvider,
}

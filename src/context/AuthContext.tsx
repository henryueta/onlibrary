import { createContext,useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useHandleAuth, { UserProps } from "../hooks/usehandleAuth";

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
    user:UserProps | null
}   

const AuthContext = createContext({} as AuthContextProps);


const AuthProvider = ({children}:{children:React.ReactNode})=>{
    
    const {onHandleStatus,onHandleToken} = useHandleAuth();
    const [userStatus,setUserStatus] = useState<UserStatus | null>(onHandleStatus());
    const [user,setUSer] = useState<UserProps | null>(null);

    useEffect(()=>{
        userStatus !== null
        ? setUSer(onHandleToken("KJK1").authResponse.data)
        : setUSer(onHandleToken("").authResponse.data);
    },[userStatus])    

return (
    <AuthContext.Provider value={{userStatus,setUserStatus,user}}>
            {children}
    </AuthContext.Provider>
)
    
}

const useAuthContext = ()=>{
    const context = useContext(AuthContext);
    return context;
}

export {
    AuthContext,
    AuthProvider,
}
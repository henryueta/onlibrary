import useHandleAuth from "../../hooks/usehandleAuth"
import { Navigate } from "react-router-dom";

const Private = ({children}:{children:React.ReactNode}) => {
    const {authContext} = useHandleAuth();
    

  return (
    
    authContext.userStatus?.authStatus?.hasAuth
    ? children
    : <Navigate to={"/"}/>
    
  )
}

export default Private

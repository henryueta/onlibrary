import useHandleAuth from "../../hooks/usehandleAuth"
import { Navigate } from "react-router-dom";

const Private = ({children}:{children:React.ReactElement}) => {
    const {context} = useHandleAuth();
    

  return (
    
    context.userStatus?.authStatus?.hasAuth
    ? children
    : <Navigate to={"/"}/>
    
  )
}

export default Private

import {useLocation} from "react-router-dom";
import {PathContext} from "../context/PathContext";
import {useContext,useEffect} from "react";

const useHandlePath = ()=>{

const currentPathContext = useContext(PathContext);
const location = useLocation();


useEffect(()=>{
    currentPathContext.setPathName(location.pathname)
},[location])


return {
  currentPathContext
}

}

export default useHandlePath;

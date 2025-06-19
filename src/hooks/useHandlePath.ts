import {useLocation} from "react-router-dom";
import {PathContext} from "../context/PathContext";
import {useContext,useEffect, useState} from "react";

const useHandlePath = (management?:"library"|"global")=>{

const currentPathContext = useContext(PathContext);
const [pathManagement,setPathManagement] = useState<string>();
const location = useLocation();

useEffect(()=>{

    //management/library/data/list
    //management/library/data/create
    //management/library/data/update
    //management/library
    !!management
    &&
  (()=>{
    
    const management_pathname = 
    management === "library"
    ? "Biblioteca"
    : "Administração"


    const pathManagementList = {
      "list":"/Gerenciamento/"+management_pathname+"/Listar/",
       "create":"/Gerenciamento/"+management_pathname+"/Criar/",
      "update":"/Gerenciamento/"+management_pathname+"/Atualizar/"
    }

      const managamentPath = Object.entries(pathManagementList).find((item)=>{

        
        return (
          location.pathname
          .replace("/management/"+management === "library"
            ? "library"
            : "global" 
            +"/","/")
          .includes(item[0])
        )

      })
      
      !!managamentPath
      ? setPathManagement(managamentPath[1])
      : setPathManagement("/Gerenciamento/"+management_pathname)
    
    })()
    


      
    currentPathContext.setPathName(location.pathname)
},[location.pathname])


return {
  currentPathContext,
  pathManagement
}

}

export default useHandlePath;

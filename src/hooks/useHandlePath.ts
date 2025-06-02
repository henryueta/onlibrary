import {useLocation, useParams} from "react-router-dom";
import {PathContext} from "../context/PathContext";
import {useContext,useEffect, useState} from "react";

const useHandlePath = ()=>{

const currentPathContext = useContext(PathContext);
const [pathManagement,setPathManagement] = useState<string>();
const location = useLocation();

useEffect(()=>{

    //management/library/data/list
    //management/library/data/create
    //management/library/data/update
    //management/library

    const pathManagementList = {

      "list":"/Gerenciamento/Biblioteca/Listar/",
       "create":"/Gerenciamento/Biblioteca/Criar/",
      "update":"/Gerenciamento/Biblioteca/Atualizar/"
    }

      const managamentPath = Object.entries(pathManagementList).find((item)=>{

        
        return (
          location.pathname
          .replace("/management/library/","/")
          .includes(item[0])
        )

      })
      
      !!managamentPath
      ? setPathManagement(managamentPath[1])
      : setPathManagement("/Gerenciamento/Biblioteca")

    currentPathContext.setPathName(location.pathname)
},[location.pathname])


return {
  currentPathContext,
  pathManagement
}

}

export default useHandlePath;

import { useLocation, useNavigate} from "react-router-dom";
import {PathContext} from "../context/PathContext";
import {useContext,useEffect, useState} from "react";

const useHandlePath = (management?:"library"|"global")=>{

const currentPathContext = useContext(PathContext);
const [pathManagement,setPathManagement] = useState<string>();
const onNavigate = useNavigate();

useEffect(()=>{

  currentPathContext.setTransitionState({
            type:"emerge",
            value:{
                isDisappearing:false,
                isEmerging:true,
                isFinished:false
            }
        })

},[])

  const onTransition = (url:string)=>{
        currentPathContext.setTransitionState({
            type:"disappear",
            value:{
                isDisappearing:true,
                isEmerging:false,
                isFinished:false
            }
        })
             setTimeout(()=>{

            currentPathContext.setTransitionState({
            type:"finish",
            value:{
                isDisappearing:false,
                isEmerging:false,
                isFinished:true
            }
        })
            
            onNavigate(url)
            

        },200)
        



    }



  // useEffect(()=>{

  //   navigationType !== "REPLACE"
  //   &&
  //   currentPathContext.setTransitionState({
  //     type:"emerge",
  //     value:{
  //       isEmerging:true,
  //       isDisappearing:false,
  //       isFinished:false
  //     }
  //   })

  // },[navigationType])
const location = useLocation();

useEffect(()=>{

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
  pathManagement,
  onTransition
}

}

export default useHandlePath;

import { FormDataProps, RegisterContext } from "../context/RegisterContext";
import useHandleAuth from "./usehandleAuth";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";

type StepIndex = 1|2|3;

const useHandleRegister = ()=>{

    
    const {authContext,onHandleStatus,onHandleAuth} = useHandleAuth();

    const authRegister = useContext(RegisterContext)

    useEffect(()=>{
        authRegister.registerData &&
        Object.keys(authRegister.registerData).length == 6 &&
        onHandleAuth("register",authRegister.registerData)
    },[authRegister.registerData])


    const onStep = (step:StepIndex,data:FormDataProps)=>{

        const checkStep = {
            1:(data:FormDataProps)=>{
                let current_cpf = 
                data?.cpf.split("")
                .filter((item)=>item !== "-" && item !== ".")
                .join("")
                .toString()               
                authRegister.setRegisterData({...authRegister.registerData,
                        nome:data?.nome,
                        sobrenome:data?.sobrenome ,
                        cpf: current_cpf } as FormDataProps
                )
            },
            2:(data:FormDataProps)=>{
                authRegister.setRegisterData({...authRegister.registerData,
                        email:data?.email,
                        username:data?.username} as FormDataProps
                    )
            },
            3:(data:FormDataProps)=>{
                authRegister.setRegisterData({...authRegister.registerData,
                    senha:data?.senha
                } as FormDataProps)
                Cookies.set("userStatus",JSON.stringify({
                  errorStatus:{
                    hasError:false,
                    errorValue:""
                  },
                  authStatus:{
                    hasAuth:true,
                    authValue:"KJK1"
                  } 
                }))
                authContext.setUserStatus(onHandleStatus())
            }
        }

        if( !!data){
            checkStep[step](data)
        }  
        
    }

    return {
        authRegister,
        onStep
    }

}

export default useHandleRegister
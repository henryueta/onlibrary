import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"
import user_model from "../models/user.json";
import axios from "axios";
import {  UserTableQueryProps } from "../objects/table.object";
import useAxios, { QueryErrorProps, QuerySuccessProps } from "./useAxios";

export type UserProps = Record<'id'|'name'|'lastName'|'cpf'|'username'|'email'|'telephone',string>;



interface QueryTokenProps {
    errorResponse:{
        hasError:boolean,
        errorValue:string
    },
    authResponse:{
        data:UserProps | null
    }
}

type HandleAuthProps = "register" | "login";

type AuthUserProp = Partial<UserTableQueryProps> & Partial<Record<'login',string>>

const useHandleAuth = ()=>{

    const authContext = useContext(AuthContext)
    const {onAxiosQuery,isLoading,querySuccess,queryError} = useAxios();
    const [authSuccess,setAuthSuccess] = useState<QuerySuccessProps | null>(null);
    const [authError,setAuthError] = useState<QueryErrorProps | null>(null)

    useEffect(()=>{
        setAuthSuccess(querySuccess)
    },[querySuccess])   

    useEffect(()=>{
        setAuthError(queryError)
    },[queryError])

    const onHandleAuth = (type:HandleAuthProps,data:AuthUserProp)=>{
        
        const handleTypes = {
            register:()=>{
             
                axios.post("https://onlibrary-api.onrender.com/api/auth/register",{
                    nome:data.nome,
                    email:data.email,
                    username:data.username,
                    senha:data.senha,
                    cpf:data.cpf,
                    sobrenome:data.sobrenome
                }).then((result)=>console.log(result))
                .catch((error)=>console.log(error))
            },
            login:()=>{
                axios.defaults.withCredentials = true;
                onAxiosQuery("post",{
                    url:"https://onlibrary-api.onrender.com/api/auth/login",
                    type:{
                        post:{
                            data:data
                        }
                    },
                    onResolver:{
                        then:(result)=>{
                           
                        },
                        catch:(error)=>{
                              
                        }
                    }
                })
            }
        }
        handleTypes[type]();

    }

    const onHandleStatus = ()=>{
        return JSON.parse(Cookies.get("userStatus") || "{}") || null 
    }

  

    const onHandleToken = (token:string):QueryTokenProps=>{
        return token.length > 0
        ?  {
            errorResponse:{
                errorValue:"",
                 hasError:false
            },
            authResponse:{
                data:user_model
            }
        }
        : {
            errorResponse:{
                errorValue:"",
                 hasError:false
            },
            authResponse:{
                data:null
            }
        }
    }

return {
    authContext,
    authSuccess,
    authError,
    onHandleAuth,
    isLoading,
    onHandleStatus,
    onHandleToken,
}


}

export default useHandleAuth
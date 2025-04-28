import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"
import user_model from "../models/user.json";
import axios,{AxiosError} from "axios";
import { TableQueryProps, UserTableQueryProps } from "../objects/table.object";
import useAxios from "./useAxios";

export type UserProps = Record<'id'|'name'|'lastName'|'cpf'|'username'|'email'|'telephone',string>;

export interface ErrorAuthProps {
    error:string
    message:string
    status:number
}

export interface SuccessAuthProps {
    data:{
        accessToken:string
    },
    message:string,
    success:boolean
}

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
    const [errorAuth,setErrorAuth] = useState<ErrorAuthProps | null>(null);
    const [successAuth,setSuccessAuth] = useState<SuccessAuthProps | null>(null)
    const {onAxiosQuery,isLoading} = useAxios();


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
                            const current_success = result.data as SuccessAuthProps
                            setSuccessAuth({
                                data:current_success.data,
                                message:current_success.message,
                                success:current_success.success
                            })
                        },
                        catch:(error)=>{
                            const current_error = error.response?.data as ErrorAuthProps
                                setErrorAuth({
                                    error:current_error.error,
                                    message:current_error.message,
                                    status:current_error.status
                                })    
                        }
                    }
                })
                // console.log(data)
                // axios.post("https://onlibrary-api.onrender.com/api/auth/login",{
                //     login:data.login,
                //     senha:data.senha
                // }).then((result)=>{
                //     console.log(result)
                //     setErrorAuth(null)
                // })
                // .catch((error)=>{
                //     setErrorAuth({
                //         error:error.response.data.error,
                //         message:error.response.data.message,
                //         status:error.response.data.status
                //     })
                //     console.warn(error)
                // });
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
    errorAuth,
    successAuth,
    onHandleAuth,
    isLoading,
    onHandleStatus,
    onHandleToken
}


}

export default useHandleAuth
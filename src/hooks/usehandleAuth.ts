import { useContext, useEffect, useReducer, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"
import user_model from "../models/user.json";
import axios from "axios";
import {  UserTableQueryProps } from "../objects/table.object";
import useAxios, { ActionQueryType, QueryStateProps } from "./useAxios";
import useHandleRegister from "./useHandleRegister";

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


type AuthStateProps = QueryStateProps;

const initialAuthState:AuthStateProps = {
    success:{
        data:null,
        message:"",
        success:false
    },
    error:{
        error:"",
        message:"",
        status:0
    },
    isLoading:false
}

type ActionAuthType = ActionQueryType

const onHandleAuthState = (state:AuthStateProps,action:ActionAuthType)=>{
        switch (action.type) {
            case "success":
                return {...state,success:action.value}
            case "error":
                return {...state,error:action.value}
            case "isLoading":
                return {...state,isLoading:action.value}
            default:
                return state
    }
}

const useHandleAuth = ()=>{

    const authContext = useContext(AuthContext)
    const {onAxiosQuery,queryState} = useAxios();

    const [authState,setAuthState] = useReducer(onHandleAuthState,initialAuthState);

    useEffect(()=>{
        setAuthState({
            type:"success",
            value:queryState.success
        })
    },[queryState.success])   

    useEffect(()=>{
        setAuthState({
            type:"error",
            value:queryState.error
        })
    },[queryState.error])

    useEffect(()=>{
        setAuthState({
            type:"isLoading",
            value:queryState.isLoading
        })
    },[queryState.isLoading])

    const onHandleAuth = (type:HandleAuthProps,data:AuthUserProp)=>{
        
        const handleTypes = {
            register:()=>{
                onAxiosQuery("post",{
                    url:"http://localhost:5700/create/account",
                    type:{
                        post:{
                        data:data
                        }
                    },
                    onResolver:{
                        then:(result)=>console.log(result),
                        catch:(error)=>console.log(error)
                    }
                })
                onAxiosQuery("post",{
                    url:"https://onlibrary-api.onrender.com/api/auth/register",
                    type:{
                        post:{
                            data:data
                        }
                    },
                    onResolver:{
                        then:(result)=>console.log(result),
                        catch:(error)=>console.log(error),
                    }
                })
            },
            login:()=>{
                axios.defaults.withCredentials = true;
                onAxiosQuery("post",{
                    url:"http://localhost:5700/check/account",
                    type:{
                        post:{
                            data:data
                        }
                    },
                    onResolver:{
                        then:(result)=>{
                            console.log(result.data)
                            Cookies.set("user_id",JSON.stringify({user_id:result.data.id}))
                        },
                        catch:(error)=>console.log(error)
                    }
                })
                onAxiosQuery("post",{
                    url:"https://onlibrary-api.onrender.com/api/auth/login",
                    type:{
                        post:{
                            data:data
                        }
                    },
                    onResolver:{
                        then:(result)=>{
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
                        },
                        catch:(error)=>{
                            console.log(error)  
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
    authState,
    onHandleAuth,
    queryState,
    onHandleStatus,
    onHandleToken,
}


}

export default useHandleAuth
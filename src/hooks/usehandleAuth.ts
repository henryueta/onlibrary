import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"
import user_model from "../models/user.json";

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

const useHandleAuth = ()=>{

    const context = useContext(AuthContext)


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
    context,
    onHandleStatus,
    onHandleToken
}


}

export default useHandleAuth
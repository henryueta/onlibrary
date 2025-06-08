import axios, { AxiosError, AxiosResponse, CancelToken } from "axios"
import { useEffect, useReducer } from "react";
import Cookies from "js-cookie";

type QueryType = "get" | "post" | "put" | "delete";

export interface QueryErrorProps {
    error:string
    message:string
    status:number
    data:string
}

export interface QuerySuccessProps {
    data:any,////////mudar tipagem
    message:string,
    success:boolean
}

interface AxiosQueryProps<T extends object>{
    url:string
    type:{
        get?:{
            id?:string,
            data?:T
        },
        post?:{
            data:T
        },
        put?:{
            id?:string,
            data:T
        },
        delete?:{
            id?:string
        }
    },
    onResolver:{
        then:(result:AxiosResponse)=>void,
        catch:(error:AxiosError)=>void
    }
}

export type ActionQueryType = {
    type: "success";
    value:QuerySuccessProps
  } |
  {
    type: "error";
    value:QueryErrorProps
  } |
  {
    type: "isLoading";
    value:boolean
  }

const handleQueryState = (state:QueryStateProps,action:ActionQueryType)=>{
    switch (action.type) {
            case "success":
              return {...state,success:action.value}
            case "error":
              return {...state,error:action.value};
            case "isLoading":
              return {...state,isLoading:action.value}
            default:
              return state
          }
}



export interface QueryStateProps {

    success:QuerySuccessProps,
    error:QueryErrorProps,
    isLoading:boolean

}

const initialQueryState:QueryStateProps = {

    success:{
        data:null,
        message:"",
        success:false
    },
    error:{
        error:"",
        message:"",
        status:0,
        data:""
    },
    isLoading:false

}

const useAxios = <T extends object>()=>{

const [queryState,setQueryState] = useReducer(handleQueryState,initialQueryState);


useEffect(()=>{
},[queryState.isLoading])

const onAxiosQuery = (type:QueryType,query:AxiosQueryProps<T>,cancelToken?:CancelToken)=>{
    setQueryState({
        type:"isLoading",
        value:true
    })
    const bearerCookie = JSON.parse(Cookies.get("jwt") || "{}") as {accessToken:string}
    let url:string = "";
    let id:string | null = null;
    let data:T | null = null;
    const axiosQueryList = {

        get:()=>{
            id = query.type.get?.id || null;
            data = query.type.get?.data || null;

            id && !data

                ? url = query.url+"&id="+id

                : !id && data

                ? url = query.url+"&data=" //mapear dados
                : url = query.url;
                
               (()=>{

                 axios.get(url,{
                    cancelToken:cancelToken,
                    headers:{
                         Authorization:`Bearer ${bearerCookie.accessToken}`
                    }
                })
                .then((result)=>query.onResolver.then(result))
                .catch((error)=>{
                    const axiosError = error as AxiosError
                    if(axiosError.isAxiosError){
                        query.onResolver.catch(axiosError)
                    }
                })
                .finally(()=>{
                    setQueryState({
                        type:"isLoading",
                        value:false
                    })
                })
               })()
        },
        put:()=>{
            axios.put(query.url,query.type.put?.data,{
                cancelToken:cancelToken,
                headers:{
                    Authorization:`Bearer ${bearerCookie.accessToken}`
                }
            })
            .then((result)=>{
                const current_success = result.data as QuerySuccessProps
                setQueryState({
                    type:"success",
                    value:{
                        data:current_success,
                        message:current_success.message,
                        success:current_success.success
                    }
                })
                
                query.onResolver.then(result)

            })
            .catch((error)=>{
                    const current_error = error.response?.data as QueryErrorProps
                setQueryState({
                        type:"error",
                        value:{
                            error:current_error.error,
                            message:current_error.message,
                            status:current_error.status,
                            data:error.response.data
                        }
                    })
                query.onResolver.catch(error)
            })
        },
        delete:()=>{
            (()=>{
                axios.delete(query.url,{
                withCredentials:true,
                headers:{
                    Authorization:`Bearer ${bearerCookie.accessToken}`
                    }
                })
                .then((result)=>{
                const current_success = result.data as QuerySuccessProps
                console.log(result)
                setQueryState({
                    type:"success",
                    value:{
                        data:current_success,
                        message:current_success.message,
                        success:current_success.success
                    }
                })
                
                query.onResolver.then(result)

            })
            .catch((error)=>{
                    const current_error = error.response?.data as QueryErrorProps
                setQueryState({
                        type:"error",
                        value:{
                            error:current_error.error,
                            message:current_error.message,
                            status:current_error.status,
                            data:error.response.data
                        }
                    })
                query.onResolver.catch(error)
            })
        })()
         

        },
        post:()=>{

            (()=>{
            axios.post(query.url,query.type.post?.data,{
                withCredentials:true,
                headers:{
                    Authorization:`Bearer ${bearerCookie.accessToken}`
                }
            })
            .then((result)=>{
                console.log(result.data)
                const current_success = result.data as QuerySuccessProps
                setQueryState({
                    type:"success",
                    value:{
                        data:current_success,
                        message:current_success.message,
                        success:current_success.success
                    }
                })
                query.onResolver.then(result)

            })
                .catch((error)=>{
                    console.log(error)
                    // const current_error = error.response?.data as QueryErrorProps
                    // console.log(error.response.data)
                    // setQueryState({
                    //     type:"error",
                    //     value:{
                    //         error:current_error.error,
                    //         message:current_error.message,
                    //         status:current_error.status,
                    //         data:error.response.data
                    //     }
                    // })
                    //"{"exemplares":["569b63bf-218f-424c-bcb4-ecc368192dcd","e0b27ddd-e3d4-42ac-9b9a-38d21ef7656d"],"fk_id_biblioteca":"68e6de0d-16ab-4841-af45-9a786a531b8e","fk_id_usuario_biblioteca":"005b07ac-8e33-4658-9f30-c913c87b8718","fk_id_bibliotecario":"b011be5e-4d07-4052-9763-6a6fb76e085a","situacao":"pendente"}"
                    const axiosError = error as AxiosError
                    query.onResolver.catch(axiosError)

                })
                .finally(()=>{
                    setQueryState({
                        type:"isLoading",
                        value:false
                    })
                })
            })()
        }

    }

    return axiosQueryList[type]()
}




return {
    onAxiosQuery,
    queryState
}

}

export default useAxios

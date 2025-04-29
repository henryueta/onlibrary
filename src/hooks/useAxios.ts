import axios, { AxiosError, AxiosResponse } from "axios"
import { useState } from "react";

type QueryType = "get" | "post" | "put" | "delete";

export interface QueryErrorProps {
    error:string
    message:string
    status:number
}

export interface QuerySuccessProps {
    data:any,////////
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

const useAxios = <T extends object>()=>{

const [isLoading,setIsLoading] = useState(false);
const [queryError,setqueryError] = useState<QueryErrorProps | null>(null);
const [querySuccess,setquerySuccess] = useState<QuerySuccessProps | null>(null)


const onAxiosQuery = (type:QueryType,query:AxiosQueryProps<T>)=>{
    setIsLoading(true)
   
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
                

                axios.get(url)
                .then((result)=>query.onResolver.then(result))
                .catch((error)=>{
                    const axiosError = error as AxiosError
                    if(axiosError.isAxiosError){
                        query.onResolver.catch(axiosError)
                    }
                })
                .finally(()=>{
                    setIsLoading(false)
                    console.log("fim")
                })
        },
        put:()=>{
            axios.put(query.url,{
                //data
            })
        },
        delete:()=>{
            axios.delete(query.url)

        },
        post:()=>{
            axios.post(query.url,query.type.post?.data)
            .then((result)=>{
                const current_success = result.data as QuerySuccessProps
                setquerySuccess({
                    data:current_success.data,
                    message:current_success.message,
                    success:current_success.success
                })
                query.onResolver.then(result)
            
            })
                .catch((error)=>{
                    const current_error = error.response?.data as QueryErrorProps
                    setqueryError({
                        error:current_error.error,
                        message:current_error.message,
                        status:current_error.status
                    })    
                    const axiosError = error as AxiosError
                    query.onResolver.catch(axiosError)
                    
                })
                .finally(()=>{
                    setIsLoading(false)
                    console.log("fim")
                })
        }

    } 

    return axiosQueryList[type]()
}



    
return {
    onAxiosQuery,
    querySuccess,
    queryError,
    isLoading,
    setIsLoading
}

}

export default useAxios
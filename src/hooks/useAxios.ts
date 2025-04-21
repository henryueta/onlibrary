import axios, { AxiosResponse } from "axios"

type QueryType = "get" | "post" | "put" | "delete";

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
        catch:(error:unknown)=>void
    }
}

const useAxios = <T extends object>()=>{

const onAxiosQuery = (type:QueryType,query:AxiosQueryProps<T>)=>{
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
                .catch((error)=>query.onResolver.catch(error))
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
            axios.post(query.url,{
                //data
            })
        }

    } 

    return axiosQueryList[type]()
}



    
return {
    onAxiosQuery
}

}

export default useAxios
import { useState } from "react"
import useAxios from "./useAxios";
import { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";
import Cookies from "js-cookie";

export interface LibraryProps{

    id:string,
    nome:string

}

const useHandleLibrary = ()=>{

    const [libraries,setLibraries] = useState<LibraryProps[] | null>(null);
    const currentLibraryContext = useContext(LibraryContext)

    const {onAxiosQuery,queryState} = useAxios();

    const onLibraryId = (id:string)=>{

        currentLibraryContext.setLibraryId(id)

    }


    const onQueryLibraries = (url:string)=>{
        // axios.defaults.withCredentials = true;
        onAxiosQuery("get",{
            url:url,
            type:{
                post:{
                    data:{
                        token:JSON.parse(Cookies.get("user_id") || "{}")
                    }
                }
            },
            onResolver:{
                then:(result)=>{
                    console.log(result)
                    const current_result = result.data.data as LibraryProps[]
                    setLibraries(current_result)
                },
                catch:(error)=>console.log(error)
            }

        })

    }

    return {
        libraries,
        onQueryLibraries,
        onLibraryId,
        currentLibraryContext,
        queryState
    }

}

export default useHandleLibrary

import { useEffect, useState } from "react"
import useAxios from "./useAxios";
import axios from "axios";
import { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";

export interface LibraryProps{

    id:string,
    name:string

}

const useHandleLibrary = ()=>{

    const [libraries,setLibraries] = useState<LibraryProps[] | null>(null);
    const currentLibraryContext = useContext(LibraryContext)
    
    const {onAxiosQuery} = useAxios();

    const onLibraryId = (id:string)=>{

        currentLibraryContext.setLibraryId(id)

    }

    const onQueryLibraries = (url:string)=>{
        axios.defaults.withCredentials = true;
        onAxiosQuery("get",{
            url:url,
            type:{
                get:{
                    
                }
            },
            onResolver:{
                then:(result)=>{
                    const current_result = result.data.libraries as LibraryProps[]
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
        currentLibraryContext
    }

}

export default useHandleLibrary
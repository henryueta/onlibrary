import { useState } from "react"
import useAxios from "./useAxios";
import axios from "axios";

export interface LibraryProps{

    id:string,
    name:string

}

const useHandleLibrary = ()=>{

    const [libraries,setLibraries] = useState<LibraryProps[] | null>(null);
    const {onAxiosQuery} = useAxios();

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
        onQueryLibraries
    }

}

export default useHandleLibrary
import { createContext, useEffect, useState } from "react"
import Cookies from "js-cookie"

interface LibraryContextProps {

    libraryId:string | null,
    libraryName:string | null,
    setLibraryId: React.Dispatch<React.SetStateAction<string | null>>
    setLibraryName:React.Dispatch<React.SetStateAction<string | null>>
}

const LibraryContext = createContext({} as LibraryContextProps)

const LibraryProvider = ({children}:{children:React.ReactNode}) => {

    const [libraryId,setLibraryId] = useState<string | null>(null);
    const [libraryName,setLibraryName] = useState<string | null>(null);

    useEffect(()=>{

        !!Cookies.get("library")
        &&
        (()=>{
            const library_data = JSON.parse(Cookies.get("library") || "{}" ) as {library_id:string,name:string}
            setLibraryId(library_data.library_id)
            setLibraryName(library_data.name)            
        })()

    },[])


  return (
    <LibraryContext.Provider value={{libraryId,libraryName,setLibraryId,setLibraryName}}>
        {children}
    </LibraryContext.Provider>
    )
}

export{
    LibraryContext,
    LibraryProvider
}

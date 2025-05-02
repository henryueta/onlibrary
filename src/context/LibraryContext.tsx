import { createContext, useEffect, useState } from "react"

interface LibraryContextProps {

    libraryId:string | null,
    setLibraryId: React.Dispatch<React.SetStateAction<string | null>>

}

const LibraryContext = createContext({} as LibraryContextProps)

const LibraryProvider = ({children}:{children:React.ReactNode}) => {

    const [libraryId,setLibraryId] = useState<string | null>(null);


  return (
    <LibraryContext.Provider value={{libraryId,setLibraryId}}>
        {children}
    </LibraryContext.Provider>
    )
}

export{
    LibraryContext,
    LibraryProvider
}

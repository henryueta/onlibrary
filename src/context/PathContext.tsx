import { createContext, useEffect, useState } from "react";

interface PathProps{
  pathName:string,
  setPathName:React.Dispatch<React.SetStateAction<string>>
}

const PathContext = createContext({} as PathProps);

const PathProvider = ({children}:{children:React.ReactNode})=>{

    const [pathName,setPathName] = useState<string>("");

    useEffect(()=>{
        console.log(pathName)
    },[pathName])

return (
  <PathContext.Provider value={{pathName,setPathName}}>
    {children}
  </PathContext.Provider>
)


}

export {
  PathContext,
  PathProvider
}

import { createContext,Dispatch,SetStateAction,useContext,useState } from "react"

  export type FormDataProps = Record<"nome"|"sobrenome"|"cpf"|"username"|"email"|"senha",string> | null

const RegisterContext = createContext({} as RegisterProps)

interface RegisterProps {
    registerData:FormDataProps | null
    setRegisterData:Dispatch<SetStateAction<FormDataProps>>
} 

const RegisterProvider = ({children}:{children:React.ReactNode}) => {

    const [registerData,setRegisterData] = useState<FormDataProps>(null);

  return (
    <RegisterContext.Provider value={{registerData,setRegisterData}}>
        {children}
    </RegisterContext.Provider>
  )
}

const useRegisterContext = ()=>{
    const context = useContext(RegisterContext);
    return context
}

export {
    RegisterContext,
    RegisterProvider,
    useRegisterContext
}

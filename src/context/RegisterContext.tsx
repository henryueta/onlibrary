import { createContext,Dispatch,SetStateAction,useState } from "react"

  export type FormDataProps = Record<"nome"|"sobrenome"|"cpf"|"username"|"email"|"senha",string> | null

interface RegisterProps {
    registerData:FormDataProps | null
    setRegisterData:Dispatch<SetStateAction<FormDataProps>>
} 

const RegisterContext = createContext({} as RegisterProps)



const RegisterProvider = ({children}:{children:React.ReactNode}) => {

    const [registerData,setRegisterData] = useState<FormDataProps>(null);

  return (
    <RegisterContext.Provider value={{registerData,setRegisterData}}>
        {children}
    </RegisterContext.Provider>
  )
}

export {
    RegisterContext,
    RegisterProvider
}

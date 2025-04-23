import { createContext,useContext,useEffect,useState } from "react"
import Cookies from "js-cookie";
import useHandleAuth from "../hooks/usehandleAuth";

type StepIndex = 1|2|3;

   type FirstDataProps = Record<"nome"|"sobrenome"|"cpf",string> 
   type SecondDataProps = Record<"username"|"email",string>
   type ThirdDataProps = Record<"senha",string>

  export type FormDataProps = Record<"nome"|"sobrenome"|"cpf"|"username"|"email"|"senha",string> | null

interface RegisterFormProps {
    isValidated:boolean,
    steps:[
        {
            isValidated:boolean,
            data:FirstDataProps | null
        },
        {
            isValidated:boolean,
            data:SecondDataProps | null
        },
        {
            isValidated:boolean,
            data:ThirdDataProps | null
        }
        
    ]

}

const RegisterContext = createContext({} as RegisterProps)

interface RegisterProps {
    registerData:FormDataProps | null
    onStep:(step:StepIndex,data:any)=>void
    formData:RegisterFormProps
} 

const RegisterProvider = ({children}:{children:React.ReactNode}) => {

    const [registerData,setRegisterData] = useState<FormDataProps>(null);
    const [formData,setFormData] = useState<RegisterFormProps>({
        isValidated:false,
        steps:[
            {
                isValidated:false,
                data:null
            },
            {
                isValidated:false,
                data:null
            },
            {
                isValidated:false,
                data:null
            }
        ]
    })
    const {context,onHandleStatus,onHandleAuth} = useHandleAuth();

    useEffect(()=>{
        registerData &&
        Object.keys(registerData).length == 6 &&
        onHandleAuth("register",registerData)
    },[registerData])

    const onStep = (step:StepIndex,data:FormDataProps)=>{

        const checkStep = {
            1:(data:FormDataProps)=>{
                let current_cpf = 
                data?.cpf.split("")
                .filter((item)=>item !== "-" && item !== ".")
                .join("")
                .toString()               
                setRegisterData({...registerData,
                        nome:data?.nome,
                        sobrenome:data?.sobrenome ,
                        cpf: current_cpf } as FormDataProps
                )
                setFormData({...formData,
                    steps:formData.steps.map((item,num)=>{
                        if(num === 0){
                            return {...item,data:data,isValidated:true}
                        }
                    })  } as RegisterFormProps)
            },
            2:(data:FormDataProps)=>{
                    setRegisterData({...registerData,
                        email:data?.email,
                        username:data?.username} as FormDataProps
                )
            },
            3:(data:FormDataProps)=>{
                setRegisterData({...registerData,
                    senha:data?.senha
                } as FormDataProps)
                Cookies.set("userStatus",JSON.stringify({
                  errorStatus:{
                    hasError:false,
                    errorValue:""
                  },
                  authStatus:{
                    hasAuth:true,
                    authValue:"KJK1"
                  } 
                }))
                context.setUserStatus(onHandleStatus())
            }
        }

        if( !!data){
            checkStep[step](data)
        }  
        
    }

  return (
    <RegisterContext.Provider value={{formData,registerData,onStep}}>
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

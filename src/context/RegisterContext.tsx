import { createContext,useContext,useEffect,useState } from "react"
import Cookies from "js-cookie";
import useHandleAuth from "../hooks/usehandleAuth";

type StepIndex = 1|2|3;

   type FirstDataProps = Record<"name_reg"|"lastName_reg"|"cpf_reg",string> 
   type SecondDataProps = Record<"username_reg"|"email_reg",string>
   type ThirdDataProps = Record<"password_reg",string>

   type FormDataProps = Record<"name_reg"|"lastName_reg"|"cpf_reg"|"username_reg"|"email_reg"|"password_reg",string> | null

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
    teste:FormDataProps | null
    onStep:(step:StepIndex,data:any)=>void
    formData:RegisterFormProps
} 

const RegisterProvider = ({children}:{children:React.ReactNode}) => {

    const [teste,setTeste] = useState<FormDataProps>(null);
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
    const {context,onHandleStatus} = useHandleAuth();

    useEffect(()=>{
        console.log(teste)
    },[teste])

    const onStep = (step:StepIndex,data:FormDataProps)=>{

        const checkStep = {
            1:(data:FormDataProps)=>{
                setTeste({...teste,
                        name_reg:data?.name_reg,
                        lastName_reg:data?.lastName_reg ,
                        cpf_reg: data?.cpf_reg } as FormDataProps
                )
                setFormData({...formData,
                    steps:formData.steps.map((item,num)=>{
                        if(num === 0){
                            return {...item,data:data,isValidated:true}
                        }
                    })  } as RegisterFormProps)
            },
            2:(data:FormDataProps)=>{
                    setTeste({...teste,
                        email_reg:data?.email_reg,
                        username_reg:data?.username_reg} as FormDataProps
                )
            },
            3:(data:FormDataProps)=>{
                
                setTeste({...teste,
                    password_reg:data?.password_reg
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
    <RegisterContext.Provider value={{formData,teste,onStep}}>
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

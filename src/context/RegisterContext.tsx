import { createContext,useContext,useEffect,useState } from "react"

type StepIndex = 1|2|3;



   type FirstDataProps = Record<"name_reg"|"lastName_reg"|"cpf_reg",string>
   type SecondDataProps = Record<"username_reg"|"email_reg"|"telephone_reg",string>
   type ThirdDataProps = Record<"password_reg",string>

   type FormDataProps = Record<"name_reg"|"lastName_reg"|"cpf_reg"|"username_reg"|"email_reg"|"telephone_reg"|"password_reg",string> | null

interface RegisterStepsProps{
    isValidated:boolean,
}


interface RegisterFormProps {

    isValidated:boolean;
    steps:[
        RegisterStepsProps,
        RegisterStepsProps,
        RegisterStepsProps
    ]

}

const RegisterContext = createContext({} as RegisterProps)

interface RegisterProps {
    teste:FormDataProps
    onStep:(step:StepIndex,data:any)=>void
} 

const RegisterProvider = ({children}:{children:React.ReactNode}) => {

    const [teste,setTeste] = useState<FormDataProps>(null);

    useEffect(()=>{
        console.log(teste)
    },[teste])

    // const [registerForm,setRegisterForm] = useState<RegisterFormProps>({
    //     isValidated:false,
    //     steps:[
    //         {
    //             isValidated:false,
    //         },
    //         {
    //             isValidated:false,
    //         },
    //         {
    //             isValidated:false,
    //         }
    //     ]
    // })
    type DataProps =  FirstDataProps|SecondDataProps|ThirdDataProps


    const onStep = (step:StepIndex,data:FormDataProps)=>{
        
        // const searchStep = registerForm.steps.find((item,number)=>{
        //     return number+1 === step
        // })

        const checkStep = {
            1:(data:FormDataProps)=>{
                setTeste({...teste,
                        name_reg:data?.name_reg,
                        lastName_reg:data?.lastName_reg ,
                        cpf_reg: data?.cpf_reg } as FormDataProps
                )
            },
            2:(data:FormDataProps)=>{
                setTeste({...teste,
                    email_reg:data?.email_reg,
                    username_reg:data?.username_reg,
                    telephone_reg: data?.telephone_reg} as FormDataProps
            )
            },
            3:(data:DataProps)=>{
                
            }
        }

        if( !!data){
            //requisição que devolverá true ou false
            //{
            //step:number
            //isValidated:boolean
            //}
            console.log(data)

              checkStep[step](data)
        }   

        // !!searchStep
        // && (
        //     setRegisterForm((prev)=>{
        //         return {
        //             ...prev,steps:{...prev.steps,
        //                 ...prev.steps
        //                 // prev.steps.map((item)=>{
        //                 //     return item.index === step 
        //                 //     ?  {item,data}
        //                 //     : item
        //                 // })
        //             }
        //         }
        //     })
        // )
        
        

    }

  return (
    <RegisterContext.Provider value={{teste,onStep}}>
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

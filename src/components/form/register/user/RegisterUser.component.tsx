import { useNavigate,useLocation } from "react-router-dom";
import "../../global/component/global.component.css"
import "./RegisterUser.component.css";
import userStep_icon from "../../../../assets/imgs/icons/userStep_icon.png";
import contact_icon from "../../../../assets/imgs/icons/contactStep_icon.png"
import password_icon from "../../../../assets/imgs/icons/passwordStep_icon.png"
import { useEffect } from "react";
import useHandleRegister from "../../../../hooks/useHandleRegister";


type RegisterStepProps = 1 | 2 | 3;



interface RegisterProps <T extends object>{

    children:React.ReactNode,
    registerStep:RegisterStepProps
    handleRegister:()=>boolean
}



const RegisterUser = <T extends object>({children,registerStep,handleRegister}:RegisterProps<T>) => {

    const onNavigate = useNavigate();
    const current_path = useLocation()
    const {authRegisterContext,registerSteps} = useHandleRegister()
    useEffect(()=>{
        !!!authRegisterContext.registerData
        && onNavigate(registerSteps[0])
    },[])
    

    const onRegisterNavigate = (step:number,type:"previous"|"next")=>{
        return type === "previous" 
        ? step === 0 ? "/login" : (()=>{
            
           return registerSteps[step-1]
        })()
        : step === 2 ? "" : "";
    }
    

    const onUseNavigate = ()=>{
        return handleRegister() && onNavigate(onRegisterNavigate(registerStep-1,"next")) 
    }

    const onSelectedStep = (current_step:number,selector_step:number):React.CSSProperties=>{
        return current_step === selector_step 
        ? {backgroundColor:"rgb(17, 104, 155)"}
        : {backgroundColor:"white"}
    }


  return (
    <section className="formSection">
       <div className="registerUserContainer">
            <div className="registerTitleContainer">
                <h1>Crie sua conta</h1>
            </div>
            <div className="registerDetailsContainer">
                <section className="stepSection">
                    <button >
                        <div style={
                                onSelectedStep(registerStep,1)
                            }>
                            <img src={userStep_icon} alt="" 
                            />
                        </div>
                        <span>
                            Informações pessoais
                        </span>
                    </button>
                    <button>
                        <div style={
                                onSelectedStep(registerStep,2)
                            }>
                            <img src={contact_icon} alt="" 
                            />
                        </div>
                        <span>
                            Informações de contato
                        </span>
                    </button>
                    <button>
                        <div style={
                                onSelectedStep(registerStep,3)
                            }>
                            <img src={password_icon} alt="" 
                            />
                        </div>
                        <span>
                            Criação de senha
                        </span>
                    </button>
                </section>
                <div className="formContainer">
                    <form onKeyDown={(e)=>{e.key == "Enter" &&
                            onUseNavigate()  
                        }}> 
                        {children}
                    </form>
                </div>
            </div>
            <div className="registerOptionsContainer">
                <button onClick={()=>onNavigate(onRegisterNavigate(registerStep-1,"previous"))}>
                    Voltar
                </button>
                <button onClick={onUseNavigate}
                >
                    Próximo
                </button>
            </div>
       </div>
    </section>
    //
  )
}

export default RegisterUser
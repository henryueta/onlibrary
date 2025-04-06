import { useNavigate } from "react-router-dom";
import "../global/global.component.css"
import "./Register.component.css";
import teste from "../../../assets/imgs/icons/image.png";
import { useEffect, useState } from "react";
import { useRegisterContext } from "../../../context/RegisterContext";

type RegisterStepProps = 1 | 2 | 3;

interface RegisterProps <T extends object>{

    children:React.ReactNode,
    registerStep:RegisterStepProps
    handleRegister:()=>boolean
}

const registerSteps = ["/register/step/name","/register/step/contact","/register/step/password"]

const onRegisterNavigate = (step:number,type:"previous"|"next")=>{
    return type === "previous" 
    ? step === 0 ? "/login" : (()=>{
        
       return registerSteps[step-1]
    })()
    : step === 2 ? "/" : registerSteps[step+1];
}

const Register = <T extends object>({children,registerStep,handleRegister}:RegisterProps<T>) => {
    const {formData} = useRegisterContext()
    const onNavigate = useNavigate();
    const [isComplete,setIsComplete] = useState(false);

    const onSelectedStep = (current_step:number,selector_step:number):React.CSSProperties=>{
        return current_step === selector_step 
        ? {backgroundColor:"rgb(17, 104, 155)"}
        : {backgroundColor:"white"}
    }

  return (
    <section className="formSection">
       <div className="registerContainer">
            <div className="registerTitleContainer">
                <h1>Crie sua conta</h1>
            </div>
            <div className="registerDetailsContainer">
                <section className="stepSection">
                    <button >
                        <div style={
                                onSelectedStep(registerStep,1)
                            }>
                            <img src={teste} alt="" 
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
                            <img src={teste} alt="" 
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
                            <img src={teste} alt="" 
                            />
                        </div>
                        <span>
                            Criação de senha
                        </span>
                    </button>
                </section>
                <div className="formContainer">
                    <form> 
                        {children}
                    </form>
                </div>
            </div>
            <div className="registerOptionsContainer">
                <button onClick={()=>onNavigate(onRegisterNavigate(registerStep-1,"previous"))}>
                    Voltar
                </button>
                <button onClick={()=>{
                    return handleRegister() && onNavigate(onRegisterNavigate(registerStep-1,"next")) 
                }}>
                    Próximo
                </button>
            </div>
       </div>
    </section>
    //
  )
}

export default Register

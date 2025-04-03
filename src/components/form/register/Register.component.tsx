import { useNavigate } from "react-router-dom";
import "../global/global.component.css"
import "./Register.component.css";

type RegisterStepProps = 1 | 2 | 3;

interface RegisterProps {

    children:React.ReactNode,
    registerStep:RegisterStepProps

}

const registerSteps = ["/register/step/name","/register/step/contact","/register/step/password"]

const onRegisterNavigate = (step:number,type:"previous"|"next")=>{
    return type === "previous" 
    ? step === 0 ? "/login" : registerSteps[step-1]
    : step === 2 ? "/" : registerSteps[step+1];
}

const Register = ({children,registerStep}:RegisterProps) => {

    const onNavigate = useNavigate();

  return (
    <section className="formSection">
       <div className="registerContainer">
            <div className="registerTitleContainer">
                <h1>Crie sua conta</h1>
            </div>
            <div className="registerDetailsContainer">
                <section className="stepSection">
                    <button>
                            <img src="" alt="" className="selectedStep"/>
                        <span>
                            Informações pessoais
                        </span>
                    </button>
                    <button>
                            <img src="" alt="" />
                        <span>
                            Informações de contato
                        </span>
                    </button>
                    <button>
                            <img src="" alt="" />
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
                <button onClick={()=>onNavigate(onRegisterNavigate(registerStep-1,"next"))}>
                    Próximo
                </button>
            </div>
       </div>
    </section>
  )
}

export default Register

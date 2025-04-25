import { useNavigate } from "react-router-dom";
import "../global/component/global.component.css"
import "./Login.component.css";
import Form from "../global/component/Form.component";

interface LoginProps{

    children:React.ReactNode
    handleLogin:()=>void

}

const Login = ({children,handleLogin}:LoginProps) => {
    
      const onNavigate = useNavigate();

    return (
    <section className="formSection">
        <div className="loginContainer">
            <div className="loginTitleContainer">
                <h1>
                Entre na sua conta
                </h1>
            </div>
            <div className="formContainer">
                <form onKeyDown={(e)=>{
                    e.key == "Enter" &&
                    handleLogin()
                }}>
                    {children}
                </form>
            </div>
            <div className="loginOptionsContainer">
                <button type="submit" onClick={handleLogin}>
                    Entrar
                </button>
                <button type="button" onClick={()=>onNavigate("/register/user/step/name")}>
                    Criar conta
                </button>
            </div>
        </div>
    </section>
  )
}

export default Login

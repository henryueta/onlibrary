import { useForm } from "react-hook-form"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import "../global/component/global.component.css"
import "./Login.component.css";

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
                <form>
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

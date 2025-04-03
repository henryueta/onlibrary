import { useForm } from "react-hook-form"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import "../global/global.component.css"
import "./Login.component.css";

const Login = () => {

    const onNavigate = useNavigate();

    const schema = z.object({
        usernameOrEmail:z.string().refine((val)=>val.trim().length > 0,{
            message:"campo username ou senha deve ser preenchido"
        }),
        password:z.string().refine((val)=>val.trim().length > 0,{
            message:"campo senha deve ser preenchido"
        })
    })

    type LoginProps = z.infer<typeof schema>

    const {register,formState,handleSubmit} = useForm<LoginProps>({
        resolver:zodResolver(schema),
        reValidateMode:"onSubmit",
        mode:"all"
    });
    const {errors} = formState;

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
                    <label htmlFor="">
                        <p>Username ou email</p>
                        <input type="text" {...register("usernameOrEmail",{
                            required:true
                        })}/>
                        <p>{errors.usernameOrEmail?.message}</p>
                    </label>
                    <label htmlFor="">
                        <p>Senha</p>
                        <input type="password" {...register("password",{
                            required:true
                        })}/>
                        <Link to={""}>
                            <span>
                                Esqueceu sua senha?
                            </span>
                        </Link>
                        <p>{errors.password?.message}</p>
                    </label>
                </form>
            </div>
            <div className="loginOptionsContainer">
                <button type="submit" onClick={()=>handleSubmit}>
                    Entrar
                </button>
                <button type="button" onClick={()=>onNavigate("/register/step/name")}>
                    Criar conta
                </button>
            </div>
        </div>
    </section>
  )
}

export default Login

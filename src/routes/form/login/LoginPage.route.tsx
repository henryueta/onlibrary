import { Link } from "react-router-dom"
import Login from "../../../components/form/login/Login.component"
import NavForm from "../../../components/nav/form/NavForm.component"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const LoginPage = () => {


  const schema = z.object({
      usernameOrEmail_login:z.string().refine((val)=>val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || val.match(/^[a-zA-Z0-9]{5,20}$/) && val.trim().length > 0,{
          message:"Campo username/email inválido"
      }),
      password_login:z.string().refine((val)=>val.trim().length >= 8,{
          message:"Campo senha inválido"
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
    <>
      <NavForm/>
      <Login handleLogin={handleSubmit((data)=>console.log(data))}>
        <label htmlFor="">
          <p>Username ou email</p>
          <input type="text" 
          {...register("usernameOrEmail_login",
            {required:true}
            )
          }/>
          <p>{errors.usernameOrEmail_login?.message}</p>
        </label>
        <label htmlFor="">
          <p>Senha</p>
          <input type="password" 
          {...register("password_login",
            {required:true}
            )
          }/>
          <Link to={""}>
            <span>
              Esqueceu sua senha?
            </span>
          </Link>
          <p>{errors.password_login?.message}</p>
        </label>
      </Login>
    </>
  )
}

export default LoginPage

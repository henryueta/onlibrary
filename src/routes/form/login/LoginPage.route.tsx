import { Link } from "react-router-dom"
import Login from "../../../components/form/login/Login.component"
import NavForm from "../../../components/nav/form/NavForm.component"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const LoginPage = () => {


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
    <>
      <NavForm/>
      <Login handleLogin={handleSubmit((data)=>console.log(data))}>
        <label htmlFor="">
          <p>Username ou email</p>
          <input type="text" 
          {...register("usernameOrEmail",
            {required:true}
            )
          }/>
          <p>{errors.usernameOrEmail?.message}</p>
        </label>
        <label htmlFor="">
          <p>Senha</p>
          <input type="password" 
          {...register("password",
            {required:true}
            )
          }/>
          <Link to={""}>
            <span>
              Esqueceu sua senha?
            </span>
          </Link>
          <p>{errors.password?.message}</p>
        </label>
      </Login>
    </>
  )
}

export default LoginPage

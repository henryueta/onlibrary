import { Link } from "react-router-dom"
import Login from "../../../components/form/login/Login.component"
import NavForm from "../../../components/nav/form/NavForm.component"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useHandleAuth from "../../../hooks/usehandleAuth";
import { schema } from "../../../schema/form.schema";
import Warn from "../../../components/warn/Warn.component";

type LoginProps = z.infer<typeof schema.schemaList.user.login>

const LoginPage = () => {

  const {register,formState,handleSubmit} = useForm<LoginProps>({
      resolver:zodResolver(schema.schemaList.user.login),
      reValidateMode:"onSubmit",
      mode:"all"
  });
  const {errors} = formState;
  const {onHandleAuth,errorAuth} = useHandleAuth();

  return (
    <>
      <NavForm/>
      <Login handleLogin={handleSubmit((data)=>onHandleAuth("login",data))}>
        <label htmlFor="">
          <p>Username ou email</p>
          <input type="text" 
          {...register("login",
            {required:true}
            )
          }/>
          <Warn warning={errors.login?.message || null}/>
        </label>
        <label htmlFor="">
          <p>Senha</p>
          <input type="password" 
          {...register("senha",
            {required:true}
            )
          }
          />
          <Link to={""}>
            <span>
              Esqueceu sua senha?
            </span>
          </Link>
          <Warn warning={errors.senha?.message || null}/>
        </label>
        <p>
          {
            !!errorAuth &&
                `Erro ${errorAuth.status}: ${errorAuth.message}`
          }
        </p>
      </Login>
    </>
  )
}

export default LoginPage

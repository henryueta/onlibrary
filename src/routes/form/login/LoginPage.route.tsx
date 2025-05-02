import { Link, useNavigate } from "react-router-dom"
import Login from "../../../components/form/login/Login.component"
import NavForm from "../../../components/nav/form/NavForm.component"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useHandleAuth from "../../../hooks/usehandleAuth";
import { schema } from "../../../schema/form.schema";
import Warn from "../../../components/warn/Warn.component";
import Load from "../../../components/load/Load.component";
import "../global/Form.route.css"
import { useEffect, useState } from "react";

type LoginProps = z.infer<typeof schema.schemaList.user.login>

const LoginPage = () => {

  const {register,formState,handleSubmit} = useForm<LoginProps>({
      resolver:zodResolver(schema.schemaList.user.login),
      reValidateMode:"onSubmit",
      mode:"all"
  });
  const {errors} = formState;
  const {onHandleAuth,queryState,authState} = useHandleAuth();
  const onNavigate = useNavigate();
  const [teste,setTeste] = useState<string[]>([]);

  useEffect(()=>{
    !!authState.success
    && authState.success.success 
    && onNavigate("/")
  },[authState.success])

  return (
    <>
      <NavForm/>
      <Login handleLogin={handleSubmit((data)=>{onHandleAuth("login",data)
      })}>
          <Load loadState={queryState.isLoading}/>
          <label>
              {
                teste.map((item)=>{
                 return <p>{item}</p>
                })
              }
          </label>

        <label htmlFor="">
          <p>Username ou email</p>
          <input type="text" 
          {...register("login",
            {required:true}
            )
          }/>
          <Warn color="white" warning={errors.login?.message || null}/>
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
          <Warn color="white" warning={errors.senha?.message || null}/>
        </label>
            <Warn 
            color="white"
            warning={authState.error.message ? `Erro ${authState.error.status} ${authState.error.message}` : null}/>              
      </Login>
    </>
  )
}

export default LoginPage

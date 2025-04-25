import RegisterUser from "../../../../../components/form/register/user/RegisterUser.component"
import NavForm from "../../../../../components/nav/form/NavForm.component"
import {useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../../../schema/form.schema";
import Warn from "../../../../../components/warn/Warn.component";
import useHandleRegister from "../../../../../hooks/useHandleRegister";
import { FormDataProps } from "../../../../../context/RegisterContext";

type RegisterStep3Props = z.infer<typeof schema.schemaList.user.register.step3>;

const ThirdRegisterStep = () => {

  const {onStep} = useHandleRegister();
  const {register,formState,handleSubmit} = useForm<RegisterStep3Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema.schemaList.user.register.step3)
  });

  const {isValid,errors} = formState

  return (
    <>
      <NavForm/>
      <RegisterUser registerStep={3} handleRegister={()=>{
      return isValid 
      ? (()=>{
        handleSubmit((data)=>{
          return onStep(3,{
            senha:data.senha
          } as FormDataProps)
        })()
        return true
      })()
      : (()=>{
        return false
      })()
    }}>
        <label htmlFor="password_id">
          <p>Senha:</p>
          <input type="password" id="password_id"
          {...register("senha")}/>
          <Warn warning={errors.senha?.message || null}/>         
        </label>
        <label htmlFor="repeatPassword_id">
          <p>Repita sua senha:</p>
          <input type="password" id="repeatPassword_id"
          {...register("repetir_senha")}/>
          <Warn warning={errors.repetir_senha?.message || null}/>         
        </label>
      </RegisterUser>
    </>
  )
}

export default ThirdRegisterStep

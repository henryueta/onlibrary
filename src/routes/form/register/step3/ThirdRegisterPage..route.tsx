import Register from "../../../../components/form/register/user/Register.component"
import NavForm from "../../../../components/nav/form/NavForm.component"
import {useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterContext } from "../../../../context/RegisterContext";
import { useEffect } from "react";

const schema = z.object({
    password_reg:z.string()
    .min(8,{message:"Campo senha deve ter 8 dígitos"}),
    repeatPassword_reg:z.string()
}).refine((data)=>data.repeatPassword_reg === data.password_reg,{
  message:"Senhas não coincídem",
  path:["repeatPassword_reg"]
}) 

type RegisterStep3Props = z.infer<typeof schema>;

const ThirdRegisterStep = () => {

  const {onStep} = useRegisterContext();
  const {register,formState,handleSubmit} = useForm<RegisterStep3Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema)
  });

  const {isValid,errors} = formState

  return (
    <>
      <NavForm/>
      <Register registerStep={3} handleRegister={()=>{
      return isValid 
      ? (()=>{
        handleSubmit((data)=>{
          return onStep(3,data)
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
          {...register("password_reg")}/>
          <p>{errors.password_reg?.message}</p>
        </label>
        <label htmlFor="repeatPassword_id">
          <p>Repita sua senha:</p>
          <input type="password" id="repeatPassword_id"
          {...register("repeatPassword_reg")}/>
          <p>{errors.repeatPassword_reg?.message}</p>
        </label>
      </Register>
    </>
  )
}

export default ThirdRegisterStep

import RegisterUser from "../../../../../components/form/register/user/RegisterUser.component"
import NavForm from "../../../../../components/nav/form/NavForm.component"
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterContext } from "../../../../../context/RegisterContext";
import { PatternFormat } from "react-number-format";

  const schema = z.object({
    username_reg:z.string().refine((val)=>val.match(/^(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){1,})[a-zA-Z0-9_]{3,20}$/) ,{
      message:"Username precisa ter números e letras"
    }),
    email_reg:z.string().refine((val)=>val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && val.trim().length > 0,{
      message:"Campo email inválido"
    })
  })

type RegisterStep2Props = z.infer<typeof schema>;

const SecondRegisterStep = () => {
  
  const {registerData,onStep} = useRegisterContext();
  const {control,register,formState,handleSubmit} = useForm<RegisterStep2Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema),
    defaultValues:{
      email_reg:registerData?.email_reg,
      username_reg:registerData?.username_reg 
    }
  });

  const {errors,isValid} = formState

  return (
    <>
      <NavForm/>
      <RegisterUser registerStep={2} handleRegister={()=>{
      return isValid 
      ? (()=>{
        handleSubmit((data)=>{
          return onStep(2,data)
        })()
        return true
      })()
      : (()=>{
        return false
      })()
    }}>
        <label htmlFor="username_id">
          <p>Username:</p>
          <input type="text" id="username_id" {...register("username_reg",{
            required:true
          })}/>
          <p>{errors.username_reg?.message}</p>
        </label>
        <label htmlFor="email_id">
          <p>Email:</p>
          <input type="email" id="email_id" {...register("email_reg",{
            required:true
          })}/>
          <p>{errors.email_reg?.message}</p>
        </label>
      </RegisterUser>
    </>

  )
}

export default SecondRegisterStep

import RegisterUser from "../../../../../components/form/register/user/RegisterUser.component"
import NavForm from "../../../../../components/nav/form/NavForm.component"
import {useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../../../schema/form.schema";
import Warn from "../../../../../components/warn/Warn.component";
import useHandleRegister from "../../../../../hooks/useHandleRegister";
import { FormDataProps } from "../../../../../context/RegisterContext";

type RegisterStep2Props = z.infer<typeof schema.schemaList.user.register.step2>;

const SecondRegisterStep = () => {
  
  const {authRegisterContext,onStep} = useHandleRegister();
  const {register,formState,handleSubmit} = useForm<RegisterStep2Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema.schemaList.user.register.step2),
    defaultValues:{
      email:authRegisterContext.registerData?.email,
      username:authRegisterContext.registerData?.username 
    }
  });

  const {errors,isValid} = formState

  return (
    <>
      <NavForm/>
      <RegisterUser registerStep={2} handleRegister={()=>{
      handleSubmit((data)=>{
        return onStep(2,data as FormDataProps)
      })()
      return isValid
    }}>
        <label htmlFor="username_id">
          <p>Username:</p>
          <input type="text" id="username_id" {...register("username",{
            required:true
          })}/>
          <Warn warning={errors.username?.message || null}/>
        </label>
        <label htmlFor="email_id">
          <p>Email:</p>
          <input type="email" id="email_id" {...register("email",{
            required:true
          })}/>
          <Warn warning={errors.email?.message || null}/>
        </label>
      </RegisterUser>
    </>

  )
}

export default SecondRegisterStep

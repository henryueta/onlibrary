import RegisterUser from "../../../../../components/form/register/user/RegisterUser.component"
import NavForm from "../../../../../components/nav/form/NavForm.component"
import {useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../../../schema/form.schema";
import Warn from "../../../../../components/warn/Warn.component";
import useHandleRegister from "../../../../../hooks/useHandleRegister";
import { FormDataProps } from "../../../../../context/RegisterContext";
import Load from "../../../../../components/load/Load.component";

type RegisterStep2Props = z.infer<typeof schema.schemaList.user.register.step2>;

const SecondRegisterStep = () => {
  
  const {authRegisterContext,onStep,queryState} = useHandleRegister();

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
        <Load loadState={queryState.isLoading}/>
        <label htmlFor="username_id">
          <p>Username:</p>
          <input autoFocus={true} type="text" id="username_id" {...register("username",{
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
        <Warn 
          warning={queryState.error.data ? `Erro ${queryState.error.data}` : null}/>   
      </RegisterUser>
    </>

  )
}

export default SecondRegisterStep

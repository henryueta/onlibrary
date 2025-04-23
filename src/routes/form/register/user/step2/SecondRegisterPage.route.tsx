import RegisterUser from "../../../../../components/form/register/user/RegisterUser.component"
import NavForm from "../../../../../components/nav/form/NavForm.component"
import {useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterContext } from "../../../../../context/RegisterContext";
import { schema } from "../../../../../schema/form.schema";

type RegisterStep2Props = z.infer<typeof schema.schemaList.user.register.step2>;

const SecondRegisterStep = () => {
  
  const {registerData,onStep} = useRegisterContext();
  const {control,register,formState,handleSubmit} = useForm<RegisterStep2Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema.schemaList.user.register.step2),
    defaultValues:{
      email:registerData?.email,
      username:registerData?.username 
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
          <input type="text" id="username_id" {...register("username",{
            required:true
          })}/>
          <p>{errors.username?.message}</p>
        </label>
        <label htmlFor="email_id">
          <p>Email:</p>
          <input type="email" id="email_id" {...register("email",{
            required:true
          })}/>
          <p>{errors.email?.message}</p>
        </label>
      </RegisterUser>
    </>

  )
}

export default SecondRegisterStep

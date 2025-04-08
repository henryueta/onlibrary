import Register from "../../../../components/form/register/user/Register.component"
import NavForm from "../../../../components/nav/form/NavForm.component"
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterContext } from "../../../../context/RegisterContext";
import { PatternFormat } from "react-number-format";

  const schema = z.object({
    username_reg:z.string().refine((val)=>val.match(/^(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){1,})[a-zA-Z0-9_]{3,20}$/) ,{
      message:"Username precisa ter números e letras"
    }),
    email_reg:z.string().refine((val)=>val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && val.trim().length > 0,{
      message:"Campo email inválido"
    }),
    telephone_reg:z.string().refine((val)=>val.trim().length > 0,{
      message:"Campo telefone deve ser preenchido"
    })
  })

type RegisterStep2Props = z.infer<typeof schema>;

const SecondRegisterStep = () => {
  
  const {teste,onStep} = useRegisterContext();
  const {control,register,formState,handleSubmit} = useForm<RegisterStep2Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema),
    defaultValues:{
      email_reg:teste?.email_reg,
      username_reg:teste?.username_reg ,
      telephone_reg:teste?.telephone_reg
    }
  });

  const {errors,isValid} = formState

  return (
    <>
      <NavForm/>
      <Register registerStep={2} handleRegister={()=>{
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
        <label htmlFor="">
          <p>Username:</p>
          <input type="text" {...register("username_reg",{
            required:true
          })}/>
          <p>{errors.username_reg?.message}</p>
        </label>
        <label htmlFor="">
          <p>Email:</p>
          <input type="email" {...register("email_reg",{
            required:true
          })}/>
          <p>{errors.email_reg?.message}</p>
        </label>
        <label htmlFor="">
          <p>Telefone(opcional):</p>
            <Controller
              name="telephone_reg"
              control={control}
              render={({field})=>(
              <PatternFormat {...field} format="+55 ## #####-####" mask="_" />
            )}
            >
            </Controller>
          <p>{errors.telephone_reg?.message}</p>
        </label>
      </Register>
    </>

  )
}

export default SecondRegisterStep

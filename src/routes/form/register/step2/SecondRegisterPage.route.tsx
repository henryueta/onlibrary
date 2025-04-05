import Register from "../../../../components/form/register/Register.component"
import NavForm from "../../../../components/nav/form/NavForm.component"
import {useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterContext } from "../../../../context/RegisterContext";

  const schema = z.object({
    username_reg:z.string().refine((val)=>val.trim().length > 0,{
      message:"Campo username deve ser preenchido"
    }),
    email_reg:z.string().refine((val)=>val.trim().length > 0,{
      message:"Campo email deve ser preenchido"
    }),
    telephone_reg:z.string().refine((val)=>val.trim().length > 0,{
      message:"Campo telefone deve ser preenchido"
    })
  })

type RegisterStep2Props = z.infer<typeof schema>;

const SecondRegisterStep = () => {
  
  const {teste,onStep} = useRegisterContext();
  const {register,formState,handleSubmit} = useForm<RegisterStep2Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema),
    defaultValues:{
      email_reg:teste?.email_reg,
      username_reg:teste?.username_reg,
      telephone_reg:teste?.telephone_reg
    }
  });

  const {errors} = formState

  return (
    <>
      <NavForm/>
      <Register registerStep={2} handleRegister={handleSubmit((data)=>{
      onStep(2,data)
      })}>
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
          <input type="text" {...register("telephone_reg",{
            required:true
          })}/>
          <p>{errors.telephone_reg?.message}</p>
        </label>
      </Register>
    </>

  )
}

export default SecondRegisterStep

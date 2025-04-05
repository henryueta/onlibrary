import "./FirstRegisterPage.route.css";
import Register from "../../../../components/form/register/Register.component";
import NavForm from "../../../../components/nav/form/NavForm.component";
import {useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useRegisterContext } from "../../../../context/RegisterContext";

const schema = z.object({
    name_reg:z.string().refine((val)=>{
      return val.trim().length > 0,{
      message:"Campo nome deve ser preenchido"
    }
    }),
    lastName_reg:z.string().refine((val)=>val.trim().length > 0,{
      message:"Campo sobrenome deve ser preenchido"
    }),
    cpf_reg:z.string().refine((val)=>val.match(/[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}/),{
      message:"Campo CPF inválido"
    })
})
type RegisterStep1Props = z.infer<typeof schema>;


const FirstRegisterStep = () => {

  const nameInput = useRef<HTMLInputElement >(null);
  const {teste,onStep} = useRegisterContext();
  const [isComplete,setIsComplete] = useState(false);
  useEffect(()=>{
    nameInput.current?.focus();

  },[])



  const {register,formState,handleSubmit} = useForm<RegisterStep1Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema),
    defaultValues:{
      name_reg:teste?.name_reg,
      lastName_reg:teste?.lastName_reg,
      cpf_reg:teste?.cpf_reg
    }
  });

  const {errors} = formState;

  // const teste = (data:RegisterStep1Props)=>{
  //     setIsComplete(!!data)
  //     console.log(isComplete)
  // }


  return (
   <>
    <NavForm/>
    <Register registerStep={1} handleRegister={handleSubmit((data)=>{
      onStep(1,data)
    })}>
        <label htmlFor="">
          <p>Nome:</p>
          <input type="text"
          {...register("name_reg",{
          })}
          />
          <p>{errors.name_reg?.message}</p>
        </label>
        <label htmlFor="">
            <p>Sobrenome:</p>
            <input type="text" {...register("lastName_reg",{
              required:true
            })} />
            <p>{errors.lastName_reg?.message}</p>
        </label>
        <label htmlFor="">
            <p>CPF:</p>
            <input type="text" {...register("cpf_reg",{
              required:true
            })}/>
            <p>{errors.cpf_reg?.message}</p>
        </label> 
      </Register> 
  </>
  )
}

export default FirstRegisterStep

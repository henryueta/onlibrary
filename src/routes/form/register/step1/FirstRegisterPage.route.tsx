import "./FirstRegisterPage.route.css";
import Register from "../../../../components/form/register/Register.component";
import NavForm from "../../../../components/nav/form/NavForm.component";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useRegisterContext } from "../../../../context/RegisterContext";
import { PatternFormat } from "react-number-format";

const schema = z.object({
    name_reg:z.string().refine((val)=>val.match(/[A-Z]{1}[a-z]/) && val.trim().length > 0,{
      message:"Campo nome inválido"
    }),
    lastName_reg:z.string().refine((val)=>val.match(/[A-Z]{1}[a-z]/) && val.trim().length > 0,{
      message:"Campo sobrenome inválido"
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



  const {register,control,formState,handleSubmit} = useForm<RegisterStep1Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema),
    defaultValues:{
      name_reg:teste?.name_reg,
      lastName_reg:teste?.lastName_reg,
      cpf_reg:teste?.cpf_reg
    }
  });

  const {errors,isValid} = formState;

  // const teste = (data:RegisterStep1Props)=>{
  //     setIsComplete(!!data)
  //     console.log(isComplete)
  // }
    // "@rollup/rollup-linux-x64-gnu": "^4.39.0",

  return (
   <>
    <NavForm/>
    <Register registerStep={1} handleRegister={()=>{
      return isValid 
      ? (()=>{
        handleSubmit((data)=>{
          return onStep(1,data)
        })()
        return true
      })()
      : (()=>{
        return false
      })()
    }}>
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
            <Controller
              name="cpf_reg"
              control={control}
              render={({field})=>(
              <PatternFormat {...field} format="###.###.###-##" mask="_" />
            )}
            >
            </Controller>
            {/* <input type="text" /> */}
            <p>{errors.cpf_reg?.message}</p>
        </label> 
      </Register> 
  </>
  )
}

export default FirstRegisterStep

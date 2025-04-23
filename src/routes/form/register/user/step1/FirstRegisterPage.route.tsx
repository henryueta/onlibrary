import "./FirstRegisterPage.route.css";
import RegisterUser from "../../../../../components/form/register/user/RegisterUser.component";
import NavForm from "../../../../../components/nav/form/NavForm.component";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useRegisterContext } from "../../../../../context/RegisterContext";
import { PatternFormat } from "react-number-format";
import { schema } from "../../../../../schema/form.schema";

type RegisterStep1Props = z.infer<typeof schema.schemaList.user.register.step1>;

const FirstRegisterStep = () => {

  const nameInput = useRef<HTMLInputElement >(null);
  const {registerData,onStep} = useRegisterContext();
  const [isComplete,setIsComplete] = useState(false);



  const {register,control,formState,handleSubmit} = useForm<RegisterStep1Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema.schemaList.user.register.step1),
    defaultValues:{
      nome:registerData?.nome,
      sobrenome:registerData?.sobrenome,
      cpf:registerData?.cpf
    }
  });

  const {errors,isValid} = formState;

  return (
   <>
    <NavForm/>
    <RegisterUser registerStep={1} handleRegister={()=>{
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
        <label htmlFor="name_id">
          <p>Nome:</p>
          <input type="text" id="name_id"
          {...register("nome",{
          })}
          />
          <p>{errors.nome?.message}</p>
        </label>
        <label htmlFor="lastName_id">
            <p>Sobrenome:</p>
            <input type="text" id="lastName_id" {...register("sobrenome",{
              required:true
            })} />
            <p>{errors.sobrenome?.message}</p>
        </label>
        <label htmlFor="cpf_id">
            <p>CPF:</p>
            <Controller
              name="cpf"
              control={control}
              render={({field})=>(
              <PatternFormat {...field} format="###.###.###-##" mask="_" id="cpf_id"/>
            )}
            >
            </Controller>
            {/* <input type="text" /> */} 
            <p>{errors.cpf?.message}</p>
        </label> 
      </RegisterUser> 
  </>
  )
}

export default FirstRegisterStep

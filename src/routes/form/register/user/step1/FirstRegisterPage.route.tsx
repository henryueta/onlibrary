import "./FirstRegisterPage.route.css";
import RegisterUser from "../../../../../components/form/register/user/RegisterUser.component";
import NavForm from "../../../../../components/nav/form/NavForm.component";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import { schema } from "../../../../../schema/form.schema";
import Warn from "../../../../../components/warn/Warn.component";
import useHandleRegister from "../../../../../hooks/useHandleRegister";
import { FormDataProps } from "../../../../../context/RegisterContext";
import Load from "../../../../../components/load/Load.component";
import { useEffect } from "react";

type RegisterStep1Props = z.infer<typeof schema.schemaList.user.register.step1>;

const FirstRegisterStep = () => {

  const {authRegisterContext,onStep,queryState} = useHandleRegister();


  const {register,control,formState,handleSubmit} = useForm<RegisterStep1Props>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schema.schemaList.user.register.step1),
    defaultValues:{
      nome:authRegisterContext.registerData?.nome,
      sobrenome:authRegisterContext.registerData?.sobrenome,
      cpf:authRegisterContext.registerData?.cpf
    }
  });

  const {errors,isValid} = formState;

  return (
   <>
    <NavForm/>
    <RegisterUser registerStep={1} handleRegister={()=>{
      handleSubmit((data)=>{
        return onStep(1,data as FormDataProps)
      })()
      return isValid
    }}>
        <Load loadState={queryState.isLoading}/>
        <label htmlFor="name_id">
          <p>Nome:</p>
          <input autoFocus={true} type="text" id="name_id"
          {...register("nome",{
          })}
          />
          <Warn color="white" warning={errors.nome?.message || null}/>
        </label>
        <label htmlFor="lastName_id">
            <p>Sobrenome:</p>
            <input type="text" id="lastName_id" {...register("sobrenome",{
              required:true
            })} />
            <Warn color="white" warning={errors.sobrenome?.message || null}/>
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
            <Warn color="white" warning={errors.cpf?.message || null}/>
        </label> 
            <Warn 
            color="white"
            warning={queryState.error.data ? `Erro ${queryState.error.data}` : null}/>  
      </RegisterUser> 
  </>
  )
}

export default FirstRegisterStep

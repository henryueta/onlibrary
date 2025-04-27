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

type RegisterStep1Props = z.infer<typeof schema.schemaList.user.register.step1>;

const FirstRegisterStep = () => {

  const {authRegisterContext,onStep} = useHandleRegister();

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
        <label htmlFor="name_id">
          <p>Nome:</p>
          <input type="text" id="name_id"
          {...register("nome",{
          })}
          />
          <Warn warning={errors.nome?.message || null}/>
        </label>
        <label htmlFor="lastName_id">
            <p>Sobrenome:</p>
            <input type="text" id="lastName_id" {...register("sobrenome",{
              required:true
            })} />
            <Warn warning={errors.sobrenome?.message || null}/>
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
            <Warn warning={errors.cpf?.message || null}/>
        </label> 
      </RegisterUser> 
  </>
  )
}

export default FirstRegisterStep

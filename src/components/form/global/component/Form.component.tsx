import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, DefaultValues, Path, useForm } from "react-hook-form";
import { z, ZodRawShape} from "zod";
import { TableQueryProps, TableType } from "../../../../objects/table.object";
import { useEffect, useState } from "react";
import { InputProps } from "../../../../objects/form.object";
import { PatternFormat } from "react-number-format";
import Warn from "../../../warn/Warn.component";
// import Select from "../../../select/Select.component";
import Select from "react-select"
import useHandleForm from "../../../../hooks/useHandleForm";

interface FormProps{
  formSchema:z.ZodObject<ZodRawShape> 
  typeOfData?:Exclude<TableType,"none">
  fields?:InputProps[]
  onSubmit:(data:{[x: string]:any})=>void
  defaultValues?:TableQueryProps
  orderPreference?:string[]
  buttonRef?:React.RefObject<HTMLButtonElement | null> 
}

// const preference = ["id","nome","idade"]

// const define = Object.entries(teste);

// preference.map((item,index)=>{
//   const a = define.find((item2,index2)=>{
//     return  define[index2][0] == item
//   })
// })

const Form = ({typeOfData,onSubmit,defaultValues,formSchema,fields,buttonRef}:FormProps) => {
  const schemaObject = formSchema
  
  
  const [formBase,setFormBase] = useState<InputProps[]>();
  const {form} = useHandleForm()

  useEffect(()=>{

    !!form 
    && 
    !!typeOfData
    ?setFormBase(form.formList.find((item)=>
      item.name === typeOfData
    )?.fields)
    : !!fields
    && setFormBase(fields);

    console.log(form.formList)
  },[form])


  type SchemaType = z.infer<typeof schemaObject>

 
  const [teste,setTeste] = useState<
  DefaultValues<{
    [x: string]: any;
}> | {
    [x: string]: any;
} | undefined>(undefined)

  useEffect(()=>{
    setTeste(defaultValues)
  },[defaultValues])

  const {register,formState,handleSubmit,control,setValue} = useForm<SchemaType>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schemaObject),
  });
  const {errors} = formState


  useEffect(()=>{
    buttonRef &&
    buttonRef.current &&
    buttonRef.current.addEventListener('click',()=>{
      handleSubmit((data:SchemaType)=>onSubmit(data))()
      })
  },[buttonRef])

 

  return (
    <form>
      {
      }
        {
          formBase && 
          formBase.map((item_input,index_input)=>
         {
          
              return (
              <label htmlFor={item_input!.id} key={index_input}>

                <div className="titleFieldContainer">
                  <p>
                    {
                      item_input!.title.concat(" :")
                    }
                  </p>
                </div>
                <div className="fieldContainer">    
                  <div className="fieldDataContainer">
                  {
                    item_input.tag === "select" && !!item_input.options
                    ? 
                     <Select
                    
                     placeholder={`Selecione ${item_input.title.toLowerCase()}`}
                     className="selectOptions" isMulti
                     options={item_input.options.list.map((item_option)=>{return {
                      value:item_option.id,
                      label:item_option.nome
                     }})}
                     onChange={(e)=>setValue(item_input.registerId,
                      e.map(item_currentOption=>item_currentOption.value)
                     )}
                     >
                     </Select>
                    :item_input!.tag === "input"
                    ? 
                    !!item_input!.maskFormat
                    ? 
                    <Controller
                    defaultValue={teste && teste[item_input!.registerId]}
                    name={item_input!.registerId}
                    control={control}
                    render={({field})=>
                      <PatternFormat {...field} format={item_input?.maskFormat || ""} mask={"_"}/>
                    }     
                    >
                    </Controller>
                    :<input 
                    value={teste && teste[item_input!.registerId]}
                    type={item_input!.type} 
                    id={item_input!.id} 
                    {...register(item_input!.registerId as Path<SchemaType>)}/>
                    : item_input!.tag === "textarea"
                    &&
                    <textarea id={item_input!.id} {...register(item_input!.registerId as Path<SchemaType>)}></textarea>
                    
                    
                  }
                  {
                    item_input.type !== "checkbox" &&
                    item_input.type !== "file" &&
                    item_input.tag !== "select"
                    && <></> 
                  }
                  </div>
                <div className="errorContainer">             
                {
                  errors
                  && Object.entries(errors).map((item,index)=>
                    {
                    return !!item[1]?.message && item[0] == item_input!.registerId
                    && <Warn color="black" key={index} warning={item[1].message.toString() || null}/>   
                    })
                  
                   
                }
                 </div>
              </div>
            </label> 
            )  
            }      
          )
          
        }
        {
          !!!buttonRef
          &&
         <div className="submitFormDataContainer">
            <button className="managementButton" type="submit" onClick={handleSubmit((data:SchemaType)=>onSubmit(data))}>
            Cadastrar
            </button>
         </div>
        }
       
    </form>
  )
}

export default Form

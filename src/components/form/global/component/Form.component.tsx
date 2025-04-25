import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Path, useForm } from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";
import { schema } from "../../../../schema/form.schema"; 
import { TableQueryProps, TableType } from "../../../../objects/table.object";
import { useEffect, useState } from "react";
import { form, FormListProps, InputProps } from "../../../../objects/form.object";
import { PatternFormat } from "react-number-format";
import Warn from "../../../warn/Warn.component";

interface FormProps{
  formSchema:ZodObject<ZodRawShape>
  typeOfData?:Exclude<TableType,"none">
  fields?:InputProps[]
  onSubmit:(data:{[x: string]:any})=>void
  defaultValues?:TableQueryProps
  orderPreference?:string[]
}

// const preference = ["id","nome","idade"]

// const define = Object.entries(teste);

// preference.map((item,index)=>{
//   const a = define.find((item2,index2)=>{
//     return  define[index2][0] == item
//   })
// })

const Form = ({typeOfData,onSubmit,defaultValues,formSchema,fields}:FormProps) => {
  const schemaObject = formSchema
  // schema.schemaList[typeOfData] as ZodObject<ZodRawShape>
  const [formBase,setFormBase] = useState<InputProps[]>();

  useEffect(()=>{
    !!form 
    && 
    !!typeOfData
    ?setFormBase(form.formList.find((item,index)=>
      item.name === typeOfData
    )?.fields)
    : !!fields
    && setFormBase(fields);
    
  },[form])

  type SchemaType = z.infer<typeof schemaObject>

  
  const {register,formState,handleSubmit,control} = useForm<SchemaType>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schemaObject),
    defaultValues:defaultValues || {}
  });
  const {errors} = formState

  return (
    <form>
        {
          formBase &&
          formBase?.length > 0 &&
          formBase?.map((item_input,index_input)=>
         {
              return (
              <label htmlFor={item_input!.id} key={index_input}>
                <p>
                  {
                    item_input!.title
                  }
                </p>

                  {
                    item_input!.tag === "input"
                    ? 
                    !!item_input!.maskFormat
                    ? 
                    <Controller
                    name={item_input!.registerId}
                    control={control}
                    render={({field})=>
                      <PatternFormat {...field} format={item_input?.maskFormat || ""} mask={"_"}/>
                    }     
                    >
                    </Controller>
                    :<input 
                    type={item_input!.type} 
                    id={item_input!.id} 
                    {...register(item_input!.registerId as Path<SchemaType>)}/>
                    : item_input!.tag === "textarea"
                    &&
                    <textarea id={item_input!.id} {...register(item_input!.registerId as Path<SchemaType>)}></textarea>
                  }

                {
                  Object.entries(errors).map((item,index)=>
                    {
                    return !!item[1]?.message && 
                    item[1].message && item[0] == item_input!.registerId
                    && <Warn key={index} warning={item[1].message.toString() || null}/>                 
                    })
                }
            </label> 
            )  
            }      
          )
          
        }
        <button type="submit" onClick={handleSubmit((data:SchemaType)=>onSubmit(data))}>
            Cadastrar
        </button>
    </form>
  )
}

export default Form

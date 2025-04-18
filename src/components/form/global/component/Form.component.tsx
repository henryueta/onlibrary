import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";
import { formSchema } from "../schema/form.schema";
import {object} from "../../../../global/objects/Object.object"
import { TableType } from "../../../table/global/table.global";

interface FormProps <T extends ZodRawShape>{
  schema:z.ZodObject<T>,
  type:Exclude<TableType,"none">
}

const book = z.object({
  title_reg:z.string().refine((val)=>val.length > 9),
  description_reg:z.string(),
  cape_reg:z.string()
})

const Form = <T extends ZodRawShape>({schema,type}:FormProps<T>) => {
  const schemaObject = formSchema.schemaList[type] as ZodObject<T>
  const schemaValues = object.getKeys(schemaObject.shape)

  type SchemaType = z.infer<typeof schemaObject>

  const {register,formState} = useForm<SchemaType>({
    mode:"all",
    reValidateMode:"onSubmit",
    resolver:zodResolver(schemaObject)
  });
  const {errors} = formState
  return (
    <form action="">
        {
          schemaValues.map((item_input,index_input)=>
          
            <label htmlFor="">
                <input type="text" {...register(item_input as Path<SchemaType>)}/>
                {
                  Object.entries(errors).map((item,index)=>
                    {
                    return !!item[1]?.message && 
                    item[1].message && item[0] == item_input
                    && <p key={index}>{item[1].message.toString()}</p>                   
                    })
                }
            </label>
          
          
          )
          
        }
        
    </form>
  )
}

export default Form

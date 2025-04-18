import { z } from "zod";
import { TableType } from "../../../table/global/table.global";



const formSchema = {

    schemaList:{
        book:z.object({
            title_reg:z.string().refine((val)=>val.length > 9,{
                message:"Título inválido"
            }),
            description_reg:z.string().refine((val)=>val.length > 9),
            cape_reg:z.string().refine((val)=>val.length > 9,{
                message:"Capa inválida"
            })
        }),
        user:{},
        loan:{},
        amerce:{},
        exemplary:{},
        author:{},
        publisher:{},
        category:{},
        gender:{}
    },
    fieldNames:{
        book:{
            names:['title_reg',"description_reg",'cape_reg']
        }
    },
    getSchemaValues(type:Exclude<TableType,"none">){
        return Object.entries(this.schemaList[type])
    }

}

type SchemaTest = keyof typeof formSchema.schemaList


export {
    formSchema
}
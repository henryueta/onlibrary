import { z, ZodRawShape } from "zod"
import { schema } from "../../src/schema/form.schema"
import { TableType } from "./table.object"

export interface InputProps {
    id?:string,
    tag:string,
    title:string,
    type:"text" | "number" | "file" | "checkbox"
    numberLimit?:{
        min:number,
        max:number
    }
    maskFormat?:string,
    registerId:string
}

export interface FormListProps {
    name:Exclude<TableType,"none">,
    schema:z.ZodObject<ZodRawShape>,
    fields:InputProps[],
}

export interface Form_ObjectProps {
    formList:FormListProps[]
} 

const form:Form_ObjectProps = {
    formList:[
        {
            name:"book",
            schema:schema.schemaList['book'] as z.ZodObject<ZodRawShape>,
            fields:[
                {
                    id:"ISBN_id",
                    tag:"input",
                    title:"ISBN",
                    type:'text',
                    maskFormat:"###-##-#####-##-#",
                    registerId:"ISBN_reg"
                },
                {
                    id:"cape_id",
                    tag:"input",
                    title:"Capa",
                    type:"file",
                    registerId:"cape_reg"
                },
                {
                    id:"title_id",
                    tag:"input",
                    title:"Título",
                    type:"text",
                    registerId:"titulo"
                },
                {
                    id:"description_id",
                    tag:"textarea",
                    title:"Descrição",
                    type:"text",
                    registerId:"description_reg"
                },
                {
                    id:"releaseYear_id",
                    tag:"input",
                    title:"Ano de lançamento",
                    type:"number",
                    numberLimit:{
                        min:1000,
                        max:2100
                    },
                    registerId:"releaseYear_reg"
                },
                {
                    id:"stand_id",
                    tag:"input",
                    title:"Estante",
                    type:"text",
                    registerId:"stand_reg"
                },
                {
                    id:"shelf_id",
                    tag:"input",
                    title:"Prateleira",
                    type:"number",
                    numberLimit:{
                        min:0,
                        max:10000
                    },
                    registerId:"shelf_reg"
                },
                {
                    id:"sector_id",
                    tag:"input",
                    title:"Setor",
                    type:"text",
                    registerId:"sector_reg"
                }
            ]
        }
    ]
}

export {
    form
}
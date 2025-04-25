import { z, ZodAny, ZodRawShape } from "zod"
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
    schema:z.ZodObject<ZodRawShape>
    fields:InputProps[],
    // getQueryFields(type:"post"|"put"):Partial<InputProps[]>
}


export interface Form_ObjectProps {
    formList:FormListProps[]
} 

// const onGetQueryFields = (
//     queryType:"post" | "put",fields:{  
//         post?:Partial<InputProps[]>,
//         put?:Partial<InputProps[]>
//     })=>{
//     return queryType == "post"
//     ? fields.post
//     : queryType == "put"
//     ? fields.put 
//     : []
// }


console.log(schema.schemaList['user'].register.step1)




const form:Form_ObjectProps = {
    formList:[
        {
            name:"user",
            schema:schema.schemaList['user'].register.step1
            .merge(schema.schemaList['user'].register.step2)
            .merge(schema.schemaList['user'].register.step3 as any) as z.ZodObject<ZodRawShape>,
            fields:[
                {
                    id:"nome_id",
                    tag:"input",
                    title:"nome",
                    type:"text",
                    registerId:"nome"
                }
            ]
        },
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
                }
            ],
            // getQueryFields(type){
            //     return onGetQueryFields(type,{
            //         post:this.fields,
            //         put:this.fields
            //     }     
            //     ) || []
            // }
        }
    ]
}

export {
    form
}
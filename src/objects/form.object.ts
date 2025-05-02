import { z, ZodRawShape } from "zod"
import { schema } from "../../src/schema/form.schema"
import { TableType } from "./table.object"

export interface AssociationTableProps {

    nome:string,
    id:string

}

export type BookAssociationProps = Record<'autores'|'categorias'|'generos'|'editoras',AssociationTableProps>

export interface InputProps {
    id?:string,
    tag:'input' | 'textarea' | 'select',
    title:string,
    type?:"text" | "number" | "file" | "checkbox" | "email"
    options?:{
        isMultiple:boolean,
        list:AssociationTableProps[]
    }
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


export interface FormObjectProps {
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


const form:FormObjectProps = {
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
                    title:"Nome",
                    type:"text",
                    registerId:"nome"
                },
                {
                    id:"sobrenome_id",
                    tag:"input",
                    title:"Sobrenome",
                    type:"text",
                    registerId:"sobrenome"
                },
                {
                    id:"cpf_id",
                    tag:"input",
                    title:"CPF",
                    type:"text",
                    registerId:"cpf",
                    maskFormat:"###.###.###-##"
                },
                {
                    id:"username_id",
                    tag:"input",
                    title:"Username",
                    type:"text",
                    registerId:"username",
                },
                {
                    id:"email_id",
                    tag:"input",
                    title:"Email",
                    type:"email",
                    registerId:"email",
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
                },
                {
                    id:"authors_id",
                    tag:"select",
                    title:"Autores",
                    registerId:"authors_reg",
                    options:{
                        isMultiple:true,
                        list:[]
                    }
                },
                {
                    id:"categories_id",
                    tag:"select",
                    title:"Categorias",
                    registerId:"categories_reg",
                    options:{
                        isMultiple:true,
                        list:[]
                    }
                },
                {
                    id:"genders_reg",
                    tag:"select",
                    title:"Gêneros",
                    registerId:"genders_reg",
                    options:{
                        isMultiple:true,
                        list:[]
                    }
                },
                {
                    id:"publishers_id",
                    tag:"select",
                    title:"Editoras",
                    registerId:"publishers_reg",
                    options:{
                        isMultiple:true,
                        list:[]
                    }
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
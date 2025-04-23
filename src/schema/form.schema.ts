import { z } from "zod";
import { TableType } from "../objects/table.object";

/*
Rota para logar usuário(retorna JSONWebToken HTTPOnly com id dentro)
Rota para cadastrar usuário(retorna JSONWebToken HTTPOnly com token com id dentro)
Rota para verificar se um usuário possui uma biblioteca por meio do id dele(retorna JSON com boolean)
Rota para cadastrar biblioteca(retorna JSONWebToken HTTPOnly com token com id dentro)
Rota para verificar se um usuário pode acessar a biblioteca por meio do id dele(retorna JSON com boolean)
Rota para contar registros de tabelas com parametro url "tipo"(retorna JSON com number/int)
Rota para mostrar dados de tabelas com parametro url "tipo"(retorna JSON com string)
*/

const schema = {

    schemaList:{
        book:z.object({
            ISBN_reg:z.string().refine((val)=>val.match(/[0-9]{3}[-][0-9]{2}[-][0-9]{5}[-][0-9]{2}[-][0-9]{1}/),{
                message:"ISBN inválido"
            }),
            titulo:z.string().refine((val)=>val.trim().length > 9,{
                message:"Título inválido"
            }),
            description_reg:z.string().optional(),
            cape_reg:z.custom<FileList>()
            .transform((file)=>file.length > 0 && file.item(0))
            .refine((file)=>!file || (!!file && file.size <= 500000000),{
                message:"Arquivo máximo suportado 500MB"
            })
            .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
                message: "Capa inválida",
            }),
            releaseYear_reg:z.string().refine((val)=>val.trim().length === 4,{
                message:"Ano de lançamento inválido"
            }),
            stand_reg:z.string().refine((val)=>val.trim().length > 2,{
                message:"Estante inválida"
            }),
            shelf_reg:z.string().refine((val)=>val.trim().length > 1,{
                message:"Prataleira inválida"
            }),
            sector_reg:z.string().refine((val)=>val.trim().length > 0,{
                message:"Setor inválido"
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
        // book:{
        //     names:['title_reg',"description_reg",'cape_reg']
        // }
    },
    getSchemaValues(type:Exclude<TableType,"none">){
        return Object.entries(this.schemaList[type])
    }

}

type SchemaTest = keyof typeof schema.schemaList


export {
    schema
}
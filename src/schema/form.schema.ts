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
            ISBN:z.string().refine((val)=>val.match(/[0-9]{3}[-][0-9]{2}[-][0-9]{5}[-][0-9]{2}[-][0-9]{1}/),{
                message:"ISBN inválido"
            }),
            titulo:z.string().refine((val)=>val.trim().length > 2,{
                message:"Título inválido"
            }),
            descricao:z.string().optional(),
            capa:z.custom<FileList>()
            .transform((file)=>file.length > 0 && file.item(0))
            .refine((file)=>!file || (!!file && file.size <= 330000000),{
                message:"Arquivo máximo suportado 500MB"
            })
            .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
                message: "Capa inválida",
            }),
            ano_lancamento:z.string().refine((val)=>val.trim().length === 4,{
                message:"Ano de lançamento inválido"
            }),
            autores:z.array(z.string().min(1)).min(1,{
                message:"Escolha pelo menos 1 autor"
            }),
            categorias:z.array(z.string().min(1)).min(1,{
                message:"Escolha pelo menos 1 categoria"
            }),
            generos:z.array(z.string().min(1)).min(1,{
                message:"Escolha pelo menos 1 gênero"
            }),
            editoras:z.array(z.string().min(1)).min(1,{
                message:"Escolha pelo menos 1 editora"
            }),

        }),
        user:{
            login:z.object({
                login:z.string().refine((val)=>val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || val.match(/^[a-zA-Z0-9]{5,20}$/) && val.trim().length > 0,{
                    message:"Campo username/email inválido"
                }),
                senha:z.string().refine((val)=>val.trim().length >= 3,{
                    message:"Campo senha inválido"
                })
              }),
            register:{
                step1:z.object({
                    nome:z.string().refine((val)=>val.match(/^[a-zA-Z\s]{1,}$/),{
                        message:"Campo nome inválido"
                    }),
                    sobrenome:z.string().refine((val)=>val.match(/^[a-zA-Z\s]{1,}$/),{
                        message:"Campo sobrenome inválido"
                    }),
                    cpf:z.string().refine((val)=>val.match(/[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}/),{
                        message:"Campo CPF inválido"
                    }),
                }),
                step2:z.object({
                    username:z.string().refine((val)=>val.match(/^(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){1,})[a-zA-Z0-9_]{3,20}$/) ,{
                        message:"Username precisa ter números e letras"
                    }),
                    email:z.string().refine((val)=>val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && val.trim().length > 0,{
                        message:"Campo email inválido"
                    }),
                }),

                step3:z.object({
                    senha:z.string().refine((val)=>val.match(/(?=.*[A-Za-z]{2,})(?=.*[0-9]{3,}).{8,}$/),
                    {message:"A senha deve ter no mínimo 8 caracteres com 2 letras e 3 números"}
                ),
                    repetir_senha:z.string()
                    })

                    .refine((data)=>data.repetir_senha === data.senha,{
                        message:"Senhas não coincídem",
                        path:["repetir_senha"]
                })
            }
        },
        library_user:z.object({
            usuarios:z.string().min(2,{
                message:"Campo usuário inválido"
            }),
            perfis_biblioteca:z.string().min(2,{
                message:"Campo perfil inválido"
            }),
            tipo_usuario:z.enum(["comum","admin"]),
            numero_matricula:z.string(),
            cpf:z.string().refine((val)=>val.match(/[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}/),{
                message:"Campo CPF inválido"
            })////
          }),
        account:z.object({
            nome:z.string().min(3,{
                message:"Campo nome inválido"
            }),
            multa_padrao:z.string().min(1,{
                message:"Campo valor deve ter pelo menos 1 digito"
            }).max(7,{
                message:"Campo valor deve ter no máximo 4 digitos"
            }),
            prazo_devolucao_padrao:z.string().min(4,{
                message:"Campo prazo de devolução deve ter pelo menos 1 dígito"
            }).max(7,{
                message:"Campo prazo de devolução deve ter no máximo 2 dígitos"
            }),
            prazo_multa_padrao:z.string().min(4,{
                message:"Campo prazo de multa deve ter pelo menos 1 dígito"
            }).max(7,{
                message:"Campo prazo de multa deve ter no máximo 2 dígitos"
            })
        }),
        loan:z.object({
            exemplares_biblioteca:z.array(z.string().min(1)).min(1,{
                message:"Escolha pelo menos 1 exemplar"
            }),
            usuarios_biblioteca:z.string().min(1,{
                message:"Campo usuário inválido"
            }),
            situacao:z.enum(['concluido','cancelado','pendente']).optional(),
            data_devolucao: z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: "Campo data de devolução inválido",
              }).transform((val) => new Date(val)).optional(),
        }),
        reserve:z.object({
            livros_biblioteca:z.string().min(1,{
                message:"Escolha pelo menos 1 livro"
            }),
            quantidade_total:z.string().min(1,{
                message:"Campo quantidade inválido"
            }),
            usuarios_biblioteca:z.string().min(1,{
                message:"Campo usuário inválido"
            }),
            situacao:z.enum(['concluido','cancelado','atendido_parcialmente','atendido_completamente']).optional(),
            data_retirada: z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: "Campo data de retirada inválido",
              }).transform((val) => new Date(val)).optional(),
        }),
        amerce:z.object({
            usuarios_biblioteca:z.string().min(1,{
                message:"Campo usuário inválido"
            }),
            valor:z.string().min(1,{
                message:"Campo valor deve ter pelo menos 1 digito"
            }).max(7,{
                message:"Campo valor deve ter no máximo 4 digitos"
            }).optional(),
            motivo:z.string().min(5,{
                message:"Campo motivo inválido"
            }),
            situacao:z.enum(['concluido','cancelado','pendente']).optional()
        }),
        exemplary:z.object({
            livros_biblioteca:z.string().min(1,{
                message:"Campo livro inválido"
            }),
            numero_tombo:z.string().refine((val)=>val.length > 0,{
                message:"Campo identificador inválido"
            }),
            situacao:z.enum(['disponivel','indisponivel','reservado','emprestado']),
            setor:z.string().optional(),
            prateleira:z.string().optional(),
            estante:z.string().optional()
        }),
        author:z.object({
            nome:z.string().min(1,{
                message:"Campo nome inválido"
            })
        }),
        publisher:z.object({
            nome:z.string().min(1,{
                message:"Campo nome inválido"
            })
        }),
        category:z.object({
            nome:z.string().min(1,{
                message:"Campo nome inválido"
            })
        }),
        gender:z.object({
            nome:z.string().min(1,{
                message:"Campo nome inválido"
            })
        }),
        library:z.object({
          nome:z.string().refine((val)=>val.trim().length > 0,{
            message:"Campo nome inválido"
          }),
          telefone:z.string().refine((val)=>val.trim().length > 0,{
            message:"Campo telefone inválido"
          }),
          rua:z.string().refine((val)=>val.trim().length > 0,{
            message:"Campo rua inválido"
          }),
          numero:z.string().refine((val)=>val.trim().length > 0,{
            message:"Campo numero inválido"
          }),
          cep:z.string().refine((val)=>val.trim().length > 0,{
            message:"Campo cep inválido"
          }),
          reserva_online:z.boolean(),
          aplicacao_multa:z.boolean(),
          aplicacao_bloqueio:z.boolean()
        })
    },
    getSchemaValues(type:Exclude<TableType,"none">){
        return Object.entries(this.schemaList[type])
    }

}


export {
    schema
}

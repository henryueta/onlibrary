import { AssociationTableProps } from "./form.object";
import {path } from "./path.object";

export type TableType = "none" |"book" | "user" | "library_user" | "account"| "loan" | "reserve" | "amerce" | "exemplary" | "author" | "publisher" | "category" | "gender";
export type TableTitleType = "Livro" | "Usuário" | "Perfil" | "Empréstimo" | "Reserva" | "Multa" | "Exemplar" | "Autor" | "Editora" | "Categoria" | "Gênero"

type account_situation = "ativo" | "bloqueado"




export type BookTableQueryProps = 
Record<'id'| 'ISBN' | 'titulo' | 'descricao',string> 
& 
Record<'ano_lancamento',number>
&
Record<'autores'|'categorias'|'generos'|'editoras',AssociationTableProps>

export type UserTableQueryProps = 
Record<'id'|'nome'| 'sobrenome'| 'email'| 'cpf'|'senha'| 'username',string> 
&
Record<'situacao',account_situation>




export type TableQueryProps=BookTableQueryProps | UserTableQueryProps;

export interface TableTypeProps {
    type:string,
    title:string,
    quantity:number,
    warning?:boolean
    path:string,
    headers:string[],
    dependencies:string[]
}

const tableTitleList = [
    "Livro",
    "Usuário",
    "Perfil",
    "Empréstimo",
    "Reserva",
    "Multa",
    "Exemplar",
    "Autor",
    "Editora",
    "Categoria",
    "Gênero"
]

const onFindTitleIndex = (title:TableTitleType)=>{
    return  tableTitleList.findIndex((item)=>item === title)
}

const tableTypeDataList:TableTypeProps[] = [
    {
        type:"none",
        title:"",
        quantity:0,
        warning:false,
        path:path.onFindPath("library_management"),
        headers:[],
        dependencies:
        [
            tableTitleList[onFindTitleIndex("Livro")],
            tableTitleList[onFindTitleIndex("Usuário")],
            tableTitleList[onFindTitleIndex("Empréstimo")],
            tableTitleList[onFindTitleIndex("Reserva")],
            tableTitleList[onFindTitleIndex("Multa")]
        ]
    },
    {
        type:"book",
        title:tableTitleList[onFindTitleIndex("Livro")],
        quantity:0,
        warning:false,
        path: path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"book"
            }
          ]),
        headers:
        [],
        dependencies:
            [
                tableTitleList[onFindTitleIndex("Exemplar")],
                tableTitleList[onFindTitleIndex("Autor")],
                tableTitleList[onFindTitleIndex("Editora")],
                tableTitleList[onFindTitleIndex("Categoria")],
                tableTitleList[onFindTitleIndex("Gênero")]
            ]
    },
    {
        type:"author",
        title:"Autor",
        quantity:0,
        warning:false,
        path: path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"author"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"publisher",
        title:"Editora",
        quantity:0,
        warning:false,
        path: path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"publisher"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"category",
        title:"Categoria",
        quantity:0,
        warning:false,
        path: path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"category"
            }
          ]),
        headers:
        [],
        dependencies:
            []
    },
    {
        type:"gender",
        title:"Gênero",
        quantity:0,
        warning:false,
        path: path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"gender"
            }
          ]),
        headers:
        [],
        dependencies:
        []
    },
    {
        type:"library_user",
        warning:false,
        title:tableTitleList[onFindTitleIndex("Usuário")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"library_user"
            }
          ]),
        headers:
        [],
        dependencies:
            [
                "Leitores",
                "Bibliotecários",
                tableTitleList[onFindTitleIndex("Perfil")]
            ]
    },{
        type:"account",
        warning:false,
        title:tableTitleList[onFindTitleIndex("Perfil")],
        headers:[],
        dependencies:[],
        path:path.onCreatePathParams("list_data_management",[
            {
                field:"type",
                param:"account"
            }
        ]),
        quantity:0
    }, {
        type:"loan",
        warning:false,
        title:tableTitleList[onFindTitleIndex("Empréstimo")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"loan"
            }
          ]),
        headers:
        [],
        dependencies:
        []
    },
    {
        type:"reserve",
        warning:false,
        title:tableTitleList[onFindTitleIndex("Reserva")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"reserve"
            }
          ]),
        headers:
        [],
        dependencies:
        []
    },{
        type:"amerce",
        warning:false,
        title:"Multa",
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"amerce"
            }
          ]),
        headers:
        [],
        dependencies:
        []
    },
    {
        type:"exemplary",
        warning:false,
        title:tableTitleList[onFindTitleIndex("Exemplar")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
            {
                field:"type",
                param:"exemplary"
            }
        ]),
        headers:
        [],
        dependencies:
        []
    }
];

const onFindTableIndex = (type:TableType)=>{
    return tableTypeDataList.findIndex((item)=>item.type == type);
}

const onFindTablePath = (type:TableType)=>{
    return tableTypeDataList.find((item)=>item.type == type)?.path
}

export {
    tableTypeDataList,
    onFindTableIndex,
    onFindTablePath
}


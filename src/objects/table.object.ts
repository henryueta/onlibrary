import {path } from "./path.object";

export type TableType = "none" |"book" | "user" | "loan" | "amerce" | "exemplary" | "author" | "publisher" | "category" | "gender";
export type TableTitleType = "Livro" | "Usuário" | "Empréstimo" | "Reserva" | "Multa" | "Exemplar" | "Autor" | "Editora" | "Categoria" | "Gênero"

type account_situation = "ativo" | "bloqueado"


type BookTableQueryProps = 
Record<'id'| 'ISBN' | 'titulo' | 'descricao',string> 
& 
Record<'ano_lancamento',number>


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
        type:"user",
        warning:false,
        title:tableTitleList[onFindTitleIndex("Usuário")],
        quantity:0,
        path:path.onCreatePathParams("list_data_management",[
            {
              field:"type",
              param:"user"
            }
          ]),
        headers:
        [],
        dependencies:
            [
                "Leitores",
                "Bibliotecários",
                "Perfis"
            ]
    },{
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


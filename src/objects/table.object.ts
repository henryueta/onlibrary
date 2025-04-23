import {path } from "./path.object";

export type TableType = "none" |"book" | "user" | "loan" | "amerce" | "exemplary" | "author" | "publisher" | "category" | "gender";
export type TableTitleType = "Livro" | "Usuário" | "Empréstimo" | "Reserva" | "Multa" | "Exemplar" | "Autor" | "Editora" | "Categoria" | "Gênero"

type account_situation = "ativo" | "bloqueado"


type BookTableQueryProps = 
Record<'id'| 'ISBN' | 'titulo' | 'descricao',string> 
& 
Record<'ano_lancamento',number>


type UserTableQueryProps = 
Record<'id'|'nome'| 'sobrenome'| 'email'| 'cpf'|'senha'| 'username',string> 
&
Record<'situacao',account_situation>



export type TableQueryProps=BookTableQueryProps | UserTableQueryProps;

export interface TableTypeProps {
    type:string,
    title:string,
    quantity?:number
    path:string
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
        path: path.onFindPath("book_management"),
        headers:
        [],
        dependencies:
            [
                tableTitleList[onFindTitleIndex("Exemplar")].concat("es"),
                tableTitleList[onFindTitleIndex("Autor")].concat("es"),
                tableTitleList[onFindTitleIndex("Editora")].concat("s"),
                tableTitleList[onFindTitleIndex("Categoria")].concat("s"),
                tableTitleList[onFindTitleIndex("Gênero")].concat("s")
            ]
    },
    {
        type:"user",
        title:tableTitleList[onFindTitleIndex("Usuário")],
        quantity:0,
        path:path.onFindPath("user_management"),
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
        title:tableTitleList[onFindTitleIndex("Empréstimo")],
        quantity:0,
        path:path.onFindPath("loan_management"),
        headers:
        [],
        dependencies:
        []
    } 
];

const onFindTableIndex = (type:TableType)=>{
    return tableTypeDataList.findIndex((item)=>item.type == type);
}

export {
    tableTypeDataList,
    onFindTableIndex
}


import { pathList,onFindPathIndex,onPath } from "../../../routes/global/path.global";
import axios from "axios";


export type TableType = "none" |"book" | "user" | "loan" | "reservation" | "amerce" | "exemplary" | "author" | "publisher" | "category" | "gender";
export type TableTitleType = "Livros" | "Usuários" | "Empréstimos" | "Reservas" | "Multas" | "Exemplares" | "Autores" | "Editoras" | "Categorias" | "Gêneros"


export interface TableTypeProps {
    type:string,
    title:string,
    quantity?:number
    path:string
    headers:string[],
    dependencies:string[]
}

const tableTitleList = [
    "Livros",
    "Usuários",
    "Empréstimos",
    "Reservas",
    "Multas",
    "Exemplares",
    "Autores",
    "Editoras",
    "Categorias",
    "Gêneros"
]

const onFindTitleIndex = (title:TableTitleType)=>{
    return  tableTitleList.findIndex((item)=>item === title)
}

const tableTypeList:TableTypeProps[] = [
    {
        type:"none",
        title:"",
        quantity:0,
        path:onPath("library_management"),
        headers:[],
        dependencies:
        [
            tableTitleList[onFindTitleIndex("Livros")],
            tableTitleList[onFindTitleIndex("Usuários")],
            tableTitleList[onFindTitleIndex("Empréstimos")],
            tableTitleList[onFindTitleIndex("Reservas")],
            tableTitleList[onFindTitleIndex("Multas")]
        ]
    },
    {
        type:"book",
        title:tableTitleList[onFindTitleIndex("Livros")],
        quantity:0,
        path: onPath("book_management"),
        headers:
        [
            "Título",
            "Autores",
            "Editoras",
            "Categorias",
            "Gêneros",
            "Quantidade",
            "Estante",
            "Prateleira",
            "Setor"
        ],
        dependencies:
            [
                tableTitleList[onFindTitleIndex("Exemplares")],
                tableTitleList[onFindTitleIndex("Autores")],
                tableTitleList[onFindTitleIndex("Editoras")],
                tableTitleList[onFindTitleIndex("Categorias")],
                tableTitleList[onFindTitleIndex("Gêneros")]
            ]
    },
    {
        type:"user",
        title:tableTitleList[onFindTitleIndex("Usuários")],
        quantity:0,
        path:onPath("user_management"),
        headers:
        [
            "Username",
            "Nome",
            "Email",
            "CPF",
            "Perfil",
            "Situação"
        ],
        dependencies:
            [
                "Perfis"
            ]
    },{
        type:"loan",
        title:tableTitleList[onFindTitleIndex("Empréstimos")],
        quantity:0,
        path:onPath("loan_management"),
        headers:
        [],
        dependencies:
        []
    } 
];

const onSetDataQuantity = ()=>{
    
    tableTypeList.forEach(async (item,index)=>{
        try{
            const response = await axios.get("http://localhost:5100/count?type="+item.type)
            const data = response.data;
            const {quantity} = data;
            item.quantity = quantity
            console.log(item.type +  "==" + quantity)

        }
        catch(error){
            console.log(error)
        }
    })
    console.log(tableTypeList)
}

const onFindTableIndex = (type:TableType)=>{
    return tableTypeList.findIndex((item)=>item.type == type);
}

export {
    tableTypeList,
    onFindTableIndex,
    onSetDataQuantity
}


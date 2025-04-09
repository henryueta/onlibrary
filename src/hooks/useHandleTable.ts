import { useState } from "react";

export type TableType = "book" | "user" | "loan" | "reservation" | "amerce" | "exemplary" | "author" | "publisher" | "category" | "gender";

interface TableProps{
    headerList:string[],
    dataList:string[]
}

const useHandleTable = <T>()=>{

    const tableTypeList = [
        {
            type:"book",
            headers:
            [
                "Título",
                "Autor(es)",
                "Editora(s)",
                "Categoria(s)",
                "Gênero(s)",
                "Quantidade",
                "Estante",
                "Prateleira",
                "Setor"
            ]
        }
    ]

    const [table,setTable] = useState<TableProps | null>(null);

    const onQueryData = (type:TableType,total:number)=>{

        setTable({
            headerList:tableTypeList[0].headers,
            dataList:[
                "A névoa da floresta",
                "Endrick",
                "ACJ",
                "Adulto",
                "Suspense",
                "3",
                "1",
                "C",
                "Suspense"
            ]
        })

    }

    return {
        table,
        onQueryData
    }

}

export default useHandleTable
import { useState } from "react";
import { pathList,onFindPathIndex } from "../routes/global/path.global";
import { TableType, tableTypeList } from "../components/table/global/table.global";

interface TableProps{
    headerList:string[],
    dataList:string[][]
    dataQuantity:number
}

const useHandleTable = <T>()=>{

    const onCheckTable = ()=>{

    }

    const onQueryData = (type:TableType)=>{
        //Axios.get() -- type return data {}
    }

    const onCountData = (type:TableType)=>{
        //Axios.get() --type return data {}
        return 120
    }



    const [table,setTable] = useState<TableProps | null>(null);
    const [tableList,setTableList] = useState<TableProps[] | null>(null)

    const onQueryTable = (type:TableType,total:number)=>{

        setTable({
            headerList:tableTypeList[0].headers,
            dataList:[
                [
                    "A névoa da floresta",
                    "Endrick",
                    "ACJ",
                    "Adulto",
                    "Suspense",
                    "3",
                    "1",
                    "C",
                    "Suspense"
                ],
                [
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
            ],
            dataQuantity:100
        })

    }

    const onQueryTableList = (type:TableType)=>{

        const tableResult = tableTypeList.find((item)=>item.type === type)
        return tableResult?.dependencies || []
    }

    return {
        table,
        onQueryTable,
        onQueryTableList
    }

}

export default useHandleTable
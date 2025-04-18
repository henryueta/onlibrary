import { useEffect, useState } from "react";
import { pathList,onFindPathIndex } from "../routes/global/path.global";
import { onFindTableIndex, TableType, tableTypeList } from "../components/table/global/table.global";
import axios from "axios";

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
    const [tableData,setTableData] = useState<string[]>([]);
    const [tableList,setTableList] = useState<TableProps[] | null>(null)


    const onQueryTable = (type:TableType)=>{
        
        axios.get(`http://localhost:5100/tables/data?type=${type}`)
            .then((result)=>
            {
                let array:any = [];
              const {data} = result;
              setTable({
                headerList:tableTypeList[onFindTableIndex("book")].headers,
                dataList:data.map((item:any,index:number)=>{

                    return Object.values(item)
                }),
                dataQuantity:100
            })
            }
            
            )

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
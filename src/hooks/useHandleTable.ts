import { useState } from "react";
import { onFindTableIndex, TableProps, TableType, tableTypeDataList } from "../components/table/global/table.global";
import axios from "axios";

interface TableDataProps{
    headerList:string[],
    dataList:string[][]
}

const useHandleTable = ()=>{

    const [tableData,setTableData] = useState<TableDataProps | null>(null);
    const [table,setTable] = useState<any | null>();
    

    type QueryType = "create" |"select" | "update" | "delete";

    const onQueryTable = (
        table:{
            type:TableType,
            id?:string
            data?:TableProps
        },
        //create precisa do tipo de tabela e data {retorna confirmação}()
        //select(todos) precisa do tipo de tabela {retorna dados específicos}(coloca em tableData)
        //select(unico) precisa do tipo de tabela e id {retorna todos os dados}(coloca em table)
        //update precisa do tipo de tabela, id e data {retorna confirmação}()
        //delete precisa do tipo de tabela e id {retorna confirmação}()
        type:QueryType)=>{ 
         
            const checkQueryType = {
                create:()=>{
                    table.data && (
                        console.log()    
                    )
                },
                select:()=>{
                    //selecionar tabela e inserir em table
                    table?.id 
                    ?   console.log("retorno unico")
                    :   console.log("retorno em conjunto")
                },
                update:()=>{
                    table?.id && table.data
                    ? console.log("vai atualizar")
                    : console.log("nao vai atualizar")
                },
                delete:()=>{
                    table.id && (
                        console.log()
                    )
                }
            }
            // checkQueryType[type]();
            

        axios.get(`http://localhost:5000/tables/data?type=${table.type}`)
            .then((result)=>
            {
              const {data} = result;
              let headers = Object.entries(data[0]);

                

            //    let test = headers.map((item,index)=>console.log(item))
            //     console.log(test)
              setTableData({
                headerList:headers.map((item,index)=>{
                    return headers[index][0] !== 'id' &&
                     headers[index][0]
                }).filter((item,index)=>item !== false),
                dataList:data.map((item:TableProps,index:number
                )=>{
                    return  Object.entries(item)
                })
            })

            }
            )
            
    }

    const onQueryTableList = (type:TableType)=>{

        const tableResult = tableTypeDataList.find((item)=>item.type === type)
        return tableResult?.dependencies || []
    }

    return {
        tableData,
        onQueryTable,
        onQueryTableList
    }

}

export default useHandleTable
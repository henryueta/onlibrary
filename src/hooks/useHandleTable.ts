import { useEffect, useState } from "react";
import { onFindTableIndex, TableQueryProps, TableType, tableTypeDataList } from "../components/table/global/table.global";
import axios, { AxiosResponse } from "axios";
import useAxios from "./useAxios";


interface TableDataProps{
    headerList:string[],
    dataList:string[][]
}

const useHandleTable = ()=>{

    const [tableData,setTableData] = useState<TableDataProps | null>(null);
    const [table,setTable] = useState<TableQueryProps | null>(null);
    const {onAxiosQuery} = useAxios();

    type QueryType = "create" |"select" | "update" | "delete";

    const onQueryTable = (
        table:{
            type:TableType,
            id?:string
            data?:TableQueryProps
        },
        //create precisa do tipo de tabela e data {retorna confirmação}()
        //select(todos) precisa do tipo de tabela {retorna dados específicos}(coloca em tableData)
        //select(unico) precisa do tipo de tabela e id {retorna todos os dados}(coloca em table)
        //update precisa do tipo de tabela, id e data {retorna confirmação}()
        //delete precisa do tipo de tabela e id {retorna confirmação}()
        type:QueryType)=>{ 

            let onThen:((data:AxiosResponse)=>void) = ()=>{}

            const checkQueryType = {
                create:()=>{
                    table.data && (
                        console.log()    
                    )
                },
                select:()=>{
                    //selecionar tabela e inserir em table
                    table?.id 
                    ? (()=>{
                        onThen = (result)=>{
                            const {data} = result;
                            setTable(data)
                        }
                    })() 
                    :
                    table.data 
                    ? (()=>{

                    })()
                    : (()=>{
                    onThen = (result)=>{
                        const {data} = result;
                        console.log(table.id)
                        let headers = Object.entries(data[0]);
                        setTableData({

                            headerList:headers.map((item,index)=>{
                                return headers[index][0]

                            }).filter((item,index)=>item !== "id"),
                            dataList:data.map((item:TableQueryProps)=>{
                                return  Object.entries(item)
                            })
                        })
                    } 
                    })()
                    onAxiosQuery("get",{
                        url:`http://localhost:5000/tables/data?type=${table.type}`,
                        type:{
                            get:{
                                id:table.id,
                                data:table.data
                            }
                        },
                        onResolver:{
                            then:onThen,
                            catch:(error)=>{
                                console.log(error)
                            }
                        }
                    })
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
            checkQueryType[type]();
            
            
    }

    const onQueryTableList = (type:TableType)=>{

        const tableResult = tableTypeDataList.find((item)=>item.type === type)
        return tableResult?.dependencies || []
    }

    return {
        tableData,
        table,
        onQueryTable,
        onQueryTableList
    }

}

export default useHandleTable
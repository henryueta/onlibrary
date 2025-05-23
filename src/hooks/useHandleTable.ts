import { useEffect, useState } from "react";
import {  TableQueryProps, TableType, tableTypeDataList } from "../objects/table.object";
import { AxiosResponse, CancelToken } from "axios";
import useAxios from "./useAxios";
import useHandleLibrary from "./useHandleLibrary";
import { QueryType } from "../objects/form.object";


interface TableDataProps{
    headerList:string[],
    dataList:string[][]
}

const useHandleTable = ()=>{

    const [tableData,setTableData] = useState<TableDataProps | null>(null);
    const [table,setTable] = useState<TableQueryProps | null>(null);
    const {onAxiosQuery} = useAxios();
    const {currentLibraryContext} = useHandleLibrary()

    useEffect(()=>{
    },[tableData])

    const onQueryCountTable = async <T extends any>(type:string,action:(result:AxiosResponse)=>T,cancelToken?:CancelToken)=>{
        
        !!currentLibraryContext.libraryId &&
            onAxiosQuery("get",{
                url:"http://localhost:5900/count?type="+type+"&id="+currentLibraryContext.libraryId,
                onResolver:{
                    then:(result)=>action(result),
                    catch:(error)=>console.log(error)
                },
                type:{
                    get:{

                    }
                }
            },cancelToken)
    }

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
        type:QueryType,
        cancelToken?:CancelToken)=>{

            let onThen:((data:AxiosResponse)=>void) = ()=>{}
            const checkQueryType = {
                create:()=>{
                    table.data && (
                        console.log()
                    )
                },
                select:()=>{
                    table?.id
                    ? (()=>{
                        onThen = (result)=>{
                            console.log(result)
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
                        console.log("data",data)
                        !!data.length ?
                       (()=>{
                        let headers = Object.entries(data[0]);
                        setTableData({
                                headerList:headers.map((item,index)=>{
                                    console.log(item)
                                    return headers[index][0]
                                }).filter((item)=>item !== "id" && item !== "fk_id_biblioteca"),
                                dataList:data.map((item:TableQueryProps)=>{
                                    return  Object.entries(item)
                                })
                            }

                        )
                       })()
                       : setTableData(null)
                    }
                    })()
                    onAxiosQuery("get",{
                        url:`http://localhost:5900/tables/data?id_biblioteca=${currentLibraryContext.libraryId}&type=${table.type}`,
                        type:{
                            get:{
                                id:table.id,
                                data:table.data
                            }
                        },
                        onResolver:{
                            then:(result)=>{                              
                              console.log(result)
                              onThen(result)
                            },
                            catch:(error)=>{
                                console.log(error)
                            }
                        }
                    },
                    cancelToken)
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

    useEffect(()=>{

    },[])

    const onQueryTableListPath = (type:TableType)=>{
        const tableResult = tableTypeDataList.find((item)=>item.type === type)
        return tableResult?.path
    }

    const onQueryTableList = (type:TableType)=>{

        const tableResult = tableTypeDataList.find((item)=>item.type === type)
        return tableResult?.dependencies || []
    }

    return {
        tableData,
        setTableData,
        table,
        onQueryTable,
        onQueryCountTable,
        onQueryTableList,
        onQueryTableListPath
    }

}

export default useHandleTable

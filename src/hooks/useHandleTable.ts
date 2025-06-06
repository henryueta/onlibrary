import { useState } from "react";
import {  TableQueryProps, TableType, tableTypeDataList,tableRoutes } from "../objects/table.object";
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


    const onFilterTable = (type:Exclude<TableType,"none">,value:string,filter:string)=>{
        alert("Procurar por "+value+" e filtro "+filter+" na tabela "+type)
        onAxiosQuery("get",{
            url:"",
            type:{
                get:{

                }
            },
            onResolver:{
                then(result) {
                    console.log(result)
                },
                catch(error) {
                    console.log(error)
                },
            }
        })

    }

    const onQueryCountTable = async <T extends any>(type:string,action:(result:AxiosResponse)=>T,cancelToken?:CancelToken)=>{
        
        !!currentLibraryContext.libraryId &&
            onAxiosQuery("get",{
                url:"http://localhost:3300/count?type="+type+"&id="+currentLibraryContext.libraryId,
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
            referenceText?:{
                value:String,
                filter:string | number
            }
            data?:TableQueryProps
        },
        //create precisa do tipo de tabela e data {retorna confirmação}()
        //select(todos) precisa do tipo de tabela {retorna dados específicos}(coloca em tableData)
        //select(unico) precisa do tipo de tabela e id {retorna todos os dados}(coloca em table)
        //update precisa do tipo de tabela, id e data {retorna confirmação}()
        //delete precisa do tipo de tabela e id {retorna confirmação}()
        type:QueryType,
        cancelToken?:CancelToken)=>{

            const onSetTableStructure = (data:any)=>{
                let headers = Object.entries(data[0]);
                        setTableData({
                                headerList:headers.map((item,index)=>{
                                    console.log(item)
                                    return headers[index][0]
                                }).filter((item)=>
                                    item !== "id" 
                                    && item !== "fk_id_biblioteca"
                                    && item !== "fk_id_usuario"
                                ),
                                dataList:data.map((item:TableQueryProps)=>{
                                    return  Object.entries(item)
                                })
                            }

                        )
            }

            let onThen:((data:AxiosResponse)=>void) = ()=>{}
            const checkQueryType = {
                create:()=>{
                    table.data && (
                        console.log()
                    )
                },
                select:()=>{
                    table.referenceText
                    ? (()=>{
                        onThen = (result)=>{
                            const {data} = result
                            console.log(data)
                            onSetTableStructure(data)
                        }
                    })()
                    :
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
                        console.log("data",data)
                        !!data.length ?
                       (()=>{
                        onSetTableStructure(data)
                       })()
                       : setTableData(null)
                    }
                    })()
                    !table.id
                    onAxiosQuery("get",{
                        url:!table.id && !table.referenceText
                        ? `http://localhost:3300/tables/data?id_biblioteca=${currentLibraryContext.libraryId}&type=${table.type}`
                        : !table.id && !!table.referenceText
                        ? tableRoutes[table.type].referenceText+"?value="+table.referenceText.value+"&filter="+table.referenceText.filter
                        : tableRoutes[table.type].getById+"?id_biblioteca="+currentLibraryContext.libraryId+"&id="+table.id,
                        // : "http://localhost:3300/library_user/get?id_biblioteca="+currentLibraryContext.libraryId+"&id="+table.id,
                        type:{
                            get:{
                                // id:table.id,
                                // data:table.data
                            }
                        },
                        onResolver:{
                            then:(result)=>{                              
                              console.warn(result)
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
        onQueryTableListPath,
        onFilterTable
    }

}

export default useHandleTable

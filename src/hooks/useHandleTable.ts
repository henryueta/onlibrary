import { useEffect, useState } from "react";
import {  TableQueryProps, TableType, tableTypeDataList,tableRoutes } from "../objects/table.object";
import { AxiosResponse, CancelToken } from "axios";
import useAxios, { QueryStateProps } from "./useAxios";
import useHandleLibrary from "./useHandleLibrary";
import { QueryType } from "../objects/form.object";
import { ManagementType } from "../routes/management/Management.route";
import useHandleAuth from "./usehandleAuth";


interface TableDataProps{
    headerList:string[],
    dataList:string[][]
}

const useHandleTable = (management:ManagementType | "none")=>{

    const [tableData,setTableData] = useState<TableDataProps | null>(null);
    const [table,setTable] = useState<TableQueryProps | null>(null);
    const {onAxiosQuery,queryState} = useAxios();
    const {currentLibraryContext} = useHandleLibrary()
    const [queryFormState,setQueryFormState] = useState<QueryStateProps>(queryState);
    const {authContext} = useHandleAuth();

    useEffect(()=>{

        setQueryFormState(queryState)

    },[queryState])

    const onQueryCountTable = async <T extends any>(management:"global"|"library",type:string,action:(result:any)=>T,cancelToken?:CancelToken)=>{
        (!!currentLibraryContext.libraryId && management === "library"
        ||
        management === "global")
        &&
        (()=>{ 
                onAxiosQuery("get",{
                url:"https://onlibrary-api.onrender.com/api/data/count",
                onResolver:{
                    then:(result)=>{
                        return action(result.data.data)
                    },
                    catch:(error)=>console.log(error)
                },
                type:{
                    get:{
                        params:{
                            type:type,
                            id_biblioteca:currentLibraryContext.libraryId,
                            id_usuario:authContext.userId
                        }
                    }
                }
            },cancelToken)
        })()

    }

     const onSetTableStructure = (data:any)=>{
        let headers = Object.entries(data[0]);
        setTableData({
          headerList:headers.map((header_item)=>{
              return header_item[0]
               }).filter((item)=>
                 item !== "id"
                 && item !== "Id" 
                 && item !== "fkIdBiblioteca"
                 && item !== "fkIdUsuario"
               ),
            dataList:data.map((item:TableQueryProps)=>{
               return  Object.entries(item)
              })
           }

           )
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

        type:QueryType,
        cancelToken?:CancelToken)=>{
            let onThen:((data:AxiosResponse)=>void) = ()=>{}
            const checkQueryType = {
                create:()=>{

                },
                select:()=>{
                    table.referenceText
                    ? (()=>{
                        onThen = (result)=>{
                            const {data} = result
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
                        !!data.length ?
                       (()=>{
                        onSetTableStructure(data)
                       })()
                       : setTableData(null)
                    }
                    })()
                    !!(table.type !== 'library_management' && table.type !== 'global_management' )
                    &&
                    onAxiosQuery("get",{
                        url:!table.id && !table.referenceText 
                        ? 'https://onlibrary-api.onrender.com/api/data/dados'
                        : !table.id && !!table.referenceText 
                        ? tableRoutes[table.type].referenceText
                        :
                         tableRoutes[table.type].getById+"/"+table.id,
                        type:{
                            get:{
                                params:!table.referenceText
                                ? management === 'library'
                                ? {
                                    id_biblioteca:currentLibraryContext.libraryId,
                                    type:table.type,
                                }
                                : {
                                    type:table.type,
                                }
                                : {
                                    value:table.referenceText.value,
                                    filter:table.referenceText.filter,
                                    id_biblioteca:currentLibraryContext.libraryId
                                }
                            }
                        },
                        onResolver:{
                            then:(result)=>{   
                              console.warn(result)
                              onThen(result.data)
                            },
                            catch:(error)=>{
                                console.log(error)
                            }
                        }
                    },
                    cancelToken)
                },
                update:()=>{
                },
                delete:()=>{
                    table.id 
                    && 
                    !!(table.type !== 'library_management' && table.type !== 'global_management' ) 
                    &&(
                        onAxiosQuery("delete",{
                            url:tableRoutes[table.type].delete+"/"+table.id,
                            type:{},
                            onResolver:{
                                then() {
                                    
                                },
                                catch(error) {
                                    console.log(error)
                                },
                                }
                        })
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
        queryFormState,
        onQueryTable,
        onSetTableStructure,
        onQueryCountTable,
        onQueryTableList,
        onQueryTableListPath
    }

}

export default useHandleTable

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

    const onFilterTable = (type:Exclude<TableType,"library_management"|"global_management">,value:string,filter:string)=>{
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
          headerList:headers.map((item,index)=>{
            console.log(item)
              return headers[index][0]
               }).filter((item)=>
                 item !== "id" 
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
                    const check_for_managementUrl = (
                        management === "library"
                        ? "?id_biblioteca="+currentLibraryContext.libraryId+"&"
                        : "?"
                    )
                    !!(table.type !== 'library_management' && table.type !== 'global_management' )
                    &&
                    onAxiosQuery("get",{
                        url:!table.id && !table.referenceText 
                        ? 'https://onlibrary-api.onrender.com/api/data/dados'
                        // ? `http://localhost:4200/tables/data${check_for_managementUrl}type=${table.type}`
                        : !table.id && !!table.referenceText 
                        ? tableRoutes[table.type].referenceText
                        :
                         tableRoutes[table.type].getById+"/"+table.id,
                        // : "http://localhost:4200/library_user/get?id_biblioteca="+currentLibraryContext.libraryId+"&id="+table.id,
                        type:{
                            get:{
                                params:!table.referenceText
                                ? {
                                    id_biblioteca:currentLibraryContext.libraryId,
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
                    table?.id && table.data
                    ? console.log("vai atualizar")
                    : console.log("nao vai atualizar")
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
        onQueryTableListPath,
        onFilterTable
    }

}

export default useHandleTable

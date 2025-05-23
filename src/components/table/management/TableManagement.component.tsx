import Search from "../../search/Search.component"
import "./TableManagement.component.css"
import "../global/Table.component.css"
import useHandleTable from "../../../hooks/useHandleTable"
import { useEffect, useState } from "react"
import { TableType, tableTypeDataList,onFindTableIndex } from "../../../objects/table.object"
import triangleRetangle_icon from "../../../../src/assets/imgs/icons/triangleRetangle_icon.png"
import { path } from "../../../objects/path.object"
import { useNavigate } from "react-router-dom"
import useHandleLibrary from "../../../hooks/useHandleLibrary";
import Warn from "../../warn/Warn.component"
import axios from "axios"

interface TableManagementProps {

    type:TableType

}
const TableManagement = ({type}:TableManagementProps) => {

  const {currentLibraryContext} = useHandleLibrary()
  const {onQueryTable,tableData} = useHandleTable();
  const onNavigate = useNavigate();
  const [maxOfData,setMaxOfData] = useState<number>(5);
  const [tableDataView,setTableDataView] = useState<string[][]>([]);


  useEffect(()=>{
    const source = axios.CancelToken.source();
    onQueryTable({
      type:type
    },
    "select",source.token)
    return ()=>{
      source.cancel()
    }
  },[currentLibraryContext.libraryId,type])


  const onLimitDataView = ()=>{
    setTableDataView(tableData?.dataList.slice(0,maxOfData).map((item)=>{
      return Object.values(item) || ""
  }) || [])
  }

  useEffect(()=>{
    onLimitDataView()
  },[tableData])


  useEffect(()=>{
    onLimitDataView()
  },[maxOfData])


  return (
    <>
    <section className="tableSection">
          
        <div className="titleContainer">
            <img src={triangleRetangle_icon} alt="title_icon" />
            <h1>
                {
                "Lista de "+tableTypeDataList[onFindTableIndex(type)].title.concat("s")
                }
            </h1>
        </div>
      <div className="managementContainer">
            <Search
            filter={{
              defaultValue:{
                 title:"todos",
                 value:"default"
              },
              onSelect:()=>{},
              list: tableData?.headerList.map((item)=>{
                return {
                  title:item,
                  value:item
                }
              }) || []
            }}
            quantity={maxOfData}/>

        <div className="tableOptionsContainer">
           <span>
                Exibir
            </span>
            <input type="number" onWheel={(e)=>(e.target as HTMLInputElement).blur()} value={maxOfData} onChange={(e)=>{
              let current_value = parseInt(e.target.value)
              !!e.target.value && current_value > 0
              ? setMaxOfData(current_value)
              : setMaxOfData(1);
            }}/>
            <span>
                Registros
            </span>

           <button onClick={()=>(onNavigate(path.onCreatePathParams("create_data_management",[
            {
              field:"type",
              param:type
            }
             ]
             ))
           )
           }>
                {`Cadastrar ${tableTypeDataList[onFindTableIndex(type)].title}`}
           </button>
        </div>
      </div>
      <div className="tableContainer">
      {
        !!tableData
        ?<table>
          
      <thead>
      <tr>
        {
          tableData?.headerList.map((item,index)=>
            <th key={index}>
              {item}
            </th>
          )
        }
            <th>
              Action
            </th>
       </tr>

            {

              tableDataView?.map((item,index)=>{

              return  <tr key={index}>
                      {
                        item &&
                        item.map((item_data,index_data)=>
                        {
                          return Object.values(item_data)[0] !== 'id' && Object.values(item_data)[0] !== "fk_id_biblioteca"
                           && <td key={index_data}>
                          {
                          Object.values(item_data)[1].toString().length >= 15 
                          ? Object.values(item_data)[1].toString().slice(0,15).concat("...")
                          : Object.values(item_data)[1].toString()
                          }
                        </td>

                        }
                        )
                      }
                          <td>
                            <button onClick={
                              ()=>{
                               onNavigate(path.onCreatePathParams("update_data_management",[
                               {
                                 field:"type",
                                 param:type
                               },
                               {
                                 field:"id",
                                 param:tableDataView[index].find((item_tableId)=>{
                                   return item_tableId[0] == "id"
                                 })![1].toString()
                               }
                                ]
                                )
                               )
                              }
                              }>
                              Editar
                            </button>
                          </td>
                </tr>
                }
              )

            }
      </thead>
        </table>
        :
        <div className="emptyTableDataContainer">
          <Warn color="black" warning={"Tabela vazia! Adicione novos dados"}></Warn>
        </div>
      }
      </div>
    </section>
    </>
  )
}

export default TableManagement

import Search from "../search/Search.component"
import "./Table.component.css"
import useHandleTable from "../../hooks/useHandleTable"
import { useEffect, useState } from "react"
import { TableType, tableTypeDataList,onFindTableIndex } from "../../objects/table.object"
import triangleRetangle_icon from "../../../src/assets/imgs/icons/triangleRetangle_icon.png"
import { path } from "../../objects/path.object"
import { useNavigate } from "react-router-dom"
import useHandleLibrary from "../../hooks/useHandleLibrary"
import Warn from "../warn/Warn.component"

interface TableProps {

    type:TableType

}
const Table = ({type}:TableProps) => {

  const {currentLibraryContext} = useHandleLibrary()
  const {onQueryTable,tableData} = useHandleTable();
  const onNavigate = useNavigate();
  const [maxOfData,setMaxOfData] = useState<number>(1);
  const [tableDataView,setTableDataView] = useState<string[][]>([]);


  useEffect(()=>{
    onQueryTable({
      type:type
    },
    "select")
  },[currentLibraryContext.libraryId])

  useEffect(()=>{
    onQueryTable({
      type:type
    },
    "select")
  },[type])

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
              onSelect:(e)=>{},
              list: tableData?.headerList.map((item,index)=>{
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

                          return Object.values(item_data)[0] !== 'id' && Object.values(item_data)[0] !== "livraryId"
                           && <td key={index_data}>
                          {

                          Object.values(item_data)[1].slice(0,15).concat("...")
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
                                 })![1]
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

export default Table

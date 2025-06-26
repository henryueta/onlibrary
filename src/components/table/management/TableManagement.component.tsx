import Search from "../../search/Search.component"
import "./TableManagement.component.css"
import useHandleTable from "../../../hooks/useHandleTable"
import { useEffect, useState } from "react"
import { TableType, tableTypeDataList,onFindTableIndex } from "../../../objects/table.object"
import triangleRetangle_icon from "../../../../src/assets/imgs/icons/triangleRetangle_icon.png"
import { path } from "../../../objects/path.object"
import { useNavigate } from "react-router-dom"
import useHandleLibrary from "../../../hooks/useHandleLibrary";
import Warn from "../../warn/Warn.component"
import axios from "axios"
import white_edit_icon from "../../../assets/imgs/icons/white_edit_icon.png";
import white_delete_icon from "../../../assets/imgs/icons/white_delete_icon.webp";
import white_add_icon from "../../../assets/imgs/icons/white_add_icon.webp";
import Communication from "../../communication/Communication.component"
import NoData from "../../empty/NoData.component"

interface TableManagementProps {

    type:TableType,
    management:"library"|"global"

}
const TableManagement = ({type,management}:TableManagementProps) => {

  const {currentLibraryContext} = useHandleLibrary()
  const {onQueryTable,tableData,queryFormState} = useHandleTable(management);
  const onNavigate = useNavigate();
  const [maxOfData,setMaxOfData] = useState<number>(15);
  // const [filterOfData,setFilterOfData] = useState<string>("todos");
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
    <Communication
    formState={queryFormState}
    />
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
            onChange={()=>{}}
            onSearch={(value,quantity,filter,cancelToken)=>{
              type != "library_management"
              &&
              type != "global_management"
              &&
              !!filter 
              &&
              // !!value.length
              // &&
              onQueryTable({
                type:type,
                referenceText:{
                  value:value,
                  filter:filter
                }
              },"select",cancelToken && cancelToken)
            }}
            filter={{
              defaultValue:{
                 title:"todos",
                 value:"default"
              },
              onSelect:()=>{
                
              },
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

           {
            tableTypeDataList[onFindTableIndex(type)].operations.post
            &&
            <button onClick={()=>(onNavigate(path.onCreatePathParams(
              management === "library"
              ? "library_create_data_management"
              : "global_create_data_management",[
            {
              field:"type",
              param:type
            }
             ]
             ))
           )
           }>
              <img src={white_add_icon} alt="add_icon" />
                {`Cadastrar ${tableTypeDataList[onFindTableIndex(type)].title}`}
           </button>
           
           }

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
              {/* Action */}
            </th>
       </tr>

            {

              tableDataView?.map((item,index)=>{

              return  <tr key={index}>
                      {
                        item &&
                        item.map((item_data,index_data)=>
                        {
                          return Object.values(item_data)[0] !== 'id' 
                          && Object.values(item_data)[0] !== "fkIdBiblioteca"
                          && Object.values(item_data)[0] !== "fkIdUsuario"
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
                           <div className="tableDataOptionsContainer">

                              {
                                tableTypeDataList[onFindTableIndex(type)].operations.put
                                &&
                                <button className="editDataButton" onClick={
                                ()=>{
                                onNavigate(path.onCreatePathParams(
                                  management === "library"
                                  ? "library_update_data_management"
                                  : "global_update_data_management",[
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
                                <img src={white_edit_icon} alt="edit_icon" />
                              </button>
                              
                              }

                              {
                                tableTypeDataList[onFindTableIndex(type)].operations.delete
                                &&
                                <button className="deleteDataButton"
                                onClick={()=>{
                                  let current_data_id:string | undefined;
                                  current_data_id = (item.find((item_data)=>
                                    item_data[0] === 'id'
                                  ))

                                  !!currentLibraryContext.libraryId
                                  &&
                                  type !== "library_management"
                                  &&
                                  type !== "global_management"
                                  current_data_id
                                  &&
                                  onQueryTable({
                                    type:type,
                                    id:current_data_id[1]
                                  },"delete")
                                }}>
                                <img src={white_delete_icon} alt="delete_icon" />
                              </button>
                              
                              }

                           </div>
                          </td>
                         
                </tr>
                }
              )

            }
      </thead>
        </table>
        :
        <NoData
        dataType="registro"
        gender="M"
        />
      }
      </div>
    </section>
    </>
  )
}

export default TableManagement

import Search from "../search/Search.component"
import "./Table.component.css"
import useHandleTable from "../../hooks/useHandleTable"
import { useEffect, useState,useReducer } from "react"
import { TableType, tableTypeDataList,onFindTableIndex, TableQueryProps } from "../../objects/table.object"
import Dialog from "../dialog/Dialog.component"
import Form from "../form/global/component/Form.component"
import triangleRetangle_icon from "../../../src/assets/imgs/icons/triangleRetangle_icon.png"
import { form } from "../../objects/form.object"
import { path } from "../../objects/path.object"
import { useNavigate } from "react-router-dom"
import useHandleLibrary from "../../hooks/useHandleLibrary"

interface TableProps {

    type:TableType

}


// const teste = (state:initialType,action:actionType)=>{
//   switch (action.type) {
//     case "get":
//       return {...state,get:action.value}
//     case "post":
//       return {...state,post:action.value};
//     case "put":
//       return {...state,put:action.value}
//     case "delete":
//       return {...state,delete:action.value}
//     default:
//       return state
//   }
// }

// const initialState = {

//   get:true,
//   post:false,
//   put:false,
//   delete:false

// }

// type initialType =  typeof initialState



// <T extends TableQueryProps>
const Table = ({type}:TableProps) => {

  // const [state,dispatch] = useReducer(teste,initialState)

  const {currentLibraryContext} = useHandleLibrary()
  const {onQueryTable,tableData,table} = useHandleTable();
  const onNavigate = useNavigate();

  const [maxOfData,setMaxOfData] = useState<number>(1);
  const [tableDataView,setTableDataView] = useState<string[][]>([]);
  const [tableView,setTableView] = useState<TableQueryProps | null>(null);
  const [updateTable,setUpdateTable] = useState<boolean>(false);

  useEffect(()=>{
    onQueryTable({
      type:type
    },
    "select")
  },[currentLibraryContext.libraryId])


  const onLimitDataView = ()=>{
    setTableDataView(tableData?.dataList.slice(0,maxOfData).map((item)=>{
      return Object.values(item) || ""
  }) || []) 
  }

  useEffect(()=>{
    onLimitDataView()
  },[tableData])

  console.log(tableDataView)

  useEffect(()=>{
    table &&
    setTableView(table || [])
    table &&
    setUpdateTable(true)
  },[table])

  useEffect(()=>{
    onLimitDataView()
  },[maxOfData])

  
  return (
    <>
{
  updateTable &&
  <Dialog onClose={()=>{setUpdateTable(false)}}>
  {
    type !== "none" &&
    <Form 
    formSchema={form.formList[0].schema}
    typeOfData={type} 
    onSubmit={(data)=>{}} 
    defaultValues={tableView as TableQueryProps}
    ></Form>
  }
</Dialog>
}

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
        <table>
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
                                  console.log(item_tableId[0])
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
      </div>
    </section>
    </>
  )
}

export default Table

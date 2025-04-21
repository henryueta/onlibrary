import Search from "../search/Search.component"
import "./Table.component.css"
import useHandleTable from "../../hooks/useHandleTable"
import { useEffect, useState } from "react"
import { TableType, tableTypeDataList,onFindTableIndex, TableQueryProps } from "./global/table.global"
import Dialog from "../dialog/Dialog.component"
import Form from "../form/global/component/Form.component"

interface TableProps {

    type:TableType

}
// <T extends TableQueryProps>
const Table = ({type}:TableProps) => {

  const {onQueryTable,tableData,table} = useHandleTable();

  const [maxOfData,setMaxOfData] = useState<number>(1);
  const [tableDataView,setTableDataView] = useState<string[][]>([]);
  const [tableView,setTableView] = useState<TableQueryProps | null>(null);
  const [registerTable,setRegisterTable] = useState<boolean>(false);
const [updateTable,setUpdateTable] = useState<boolean>(false);

  const [tableCrud,setTableCrud] = useState<any>({
    create:false,
    read:[],
    update:false,
    delete:false    
  });

  useEffect(()=>{
    onQueryTable({
      type:type
    },
    "select")
  },[])

  const onLimitDataView = ()=>{
    setTableDataView(tableData?.dataList.slice(0,maxOfData).map((item)=>{
      return Object.values(item) || ""
  }) || []) 
  }

  useEffect(()=>{
    onLimitDataView()
  },[tableData])

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
    { registerTable &&
      type !== 'none' &&
    <div className="tableDialogContainer">
      <Dialog onClose={()=>setRegisterTable(false)}>
          <Form type={type} onSubmit={(data)=>console.log(data)}></Form>
      </Dialog>
    </div>
    }

{
  updateTable &&
  <Dialog onClose={()=>{setUpdateTable(false)}}>
  {
    type !== "none" &&
    <Form 
    type={type} 
    onSubmit={(data)=>console.log(data)} 
    defaultValues={tableView as TableQueryProps}
    ></Form>
  }
</Dialog>
}

    <section className="tableSection">
      
        <div className="titleContainer">
            <img src="" alt="title_icon" />
            <h1>
                {
                "Lista de "+tableTypeDataList[onFindTableIndex(type)].title.concat("s")
                }
            </h1>
        </div>
      <div className="managementContainer">
            <Search 
            filter={{
              onSelect:(e)=>{console.log(e.target.value)},
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
            <input type="number" value={maxOfData} onChange={(e)=>{
              let current_value = parseInt(e.target.value)
              !!e.target.value && current_value > 0
              ? setMaxOfData(current_value)
              : setMaxOfData(1);
            }}/>
            <span>
                Registros
            </span> 
          
           <button onClick={()=>setRegisterTable(true)}>
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
            
              tableDataView?.map((item,index)=>

                <tr key={index}>                   
                      {
                        item &&
                        item.map((item_data,index_data)=>
                        {

                          return Object.values(item_data)[0] !== 'id' && <td key={index_data}>
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
                                onQueryTable(
                                  {type:"book",
                                  id:tableDataView[index][0][1]},
                                  "select")
                                }
                              }>
                              Editar
                            </button>
                          </td>    
                </tr>
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

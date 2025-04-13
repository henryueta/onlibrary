import Search from "../search/Search.component"
import "./Table.component.css"
import useHandleTable from "../../hooks/useHandleTable"
import { useEffect, useState } from "react"
import { TableType, tableTypeList,onFindTableIndex } from "./global/table.global"


interface TableProps {

    type:TableType

}

const Table = ({type}:TableProps) => {

  const {onQueryTable,table} = useHandleTable();
  const [maxOfData,setMaxOfData] = useState<number>(1);

  useEffect(()=>{
    onQueryTable(type,maxOfData)
  },[maxOfData])


  return (
    <section className="tableSection">
      
        <div className="titleContainer">
            <img src="" alt="title_icon" />
            <h1>
                {
                "Lista de "+tableTypeList[onFindTableIndex(type)].title
                }
            </h1>
        </div>
      <div className="managementContainer">
            <Search 
            filter={{
              onSelect:(e)=>{console.log(e.target.value)},
              list: table?.headerList.map((item,index)=>{
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
          
           <button>
                Cadastrar Livro
           </button>
        </div>
      </div>
      <div className="tableContainer">
        <table>
      <thead>
      <tr>
        {
          table?.headerList.map((item,index)=>
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
              table?.dataList.map((item,index)=>
                <tr key={index}>                   
                      {
                        item.map((item,index)=>
                          <td key={index}>
                            {item.slice(0,15).concat("...")}
                          </td>
                        )
                      }
                          <td>
                            <button>
                              Editar
                            </button>
                          </td>    
                </tr>
              )
            }
      
        {/* {
            table?.dataList.map((item,index)=>
              <td key={index}>
                {item}
              </td>
            )
          } */}
      </thead>
        </table>
      </div>
    </section>
  )
}

export default Table

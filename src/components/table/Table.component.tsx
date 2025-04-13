import Search from "../search/Search.component"
import "./Table.component.css"
import useHandleTable from "../../hooks/useHandleTable"
import { useEffect, useState } from "react"
import { TableType } from "./global/table.global"

interface TableProps {

    type:TableType

}

const Table = ({type}:TableProps) => {

  const {onQueryTable,table} = useHandleTable();
  const [maxOfData,setMaxOfData] = useState<number>(15);



  useEffect(()=>{
    onQueryTable(type,15)
  },[])

  return (
    <section className="tableSection">
      
        <div className="titleContainer">
            <img src="" alt="title_icon" />
            <h1>
                Lista de Livros
            </h1>
        </div>
      <div className="managementContainer">
            <Search/>
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

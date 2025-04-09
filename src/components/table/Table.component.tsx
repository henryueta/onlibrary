import Search from "../search/Search.component"
import "./Table.component.css"
import useHandleTable, { TableType } from "../../hooks/useHandleTable"
import { useEffect } from "react"

interface TableProps {

    type:TableType

}

const Table = ({type}:TableProps) => {

  const {onQueryData,table} = useHandleTable();

  useEffect(()=>{
    onQueryData(type,15)
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
                <input type="number" />
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
            <th key={index}>{item}</th>
          )
        }
       </tr>
        <tr>
          {
            table?.dataList.map((item,index)=>
              <td key={index}>{item}</td>
            )
          }
        </tr>
      </thead>
        </table>
      </div>
    </section>
  )
}

export default Table

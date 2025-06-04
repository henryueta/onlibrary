import Word from "../../../classes/word.class"
import "../global/Table.component.css"

interface TableHomeProps<T extends object> {
    table:object[]

    filter:string[]
    onClick?:(data:T)=>void
}

const TableHome = ({table,filter,onClick}:TableHomeProps<object>) => {



  return (
     <div className="tableContainer">
        <table>
            <thead>
                <tr className="headerLine">
                    {
                     Object.entries(table[0]).map((item,index)=>
                     {
                        return (
                        !filter.includes(item[0])
                        &&
                        <th key={index}>
                            {new Word(item[0],"name").word as string}
                        </th>
                        )
                     }
                    )}
                </tr>
                </thead>
        </table>
        <table>
            <thead>
                    {
                    Object.entries(table).map((item,index)=>
                       {
                        return <tr className="dataLine" key={index} onClick={()=>{
                            !!onClick
                            && onClick(table[index])        
                            }}>
                        {
                        item.map((item_data)=>{
                            return Object.entries(item_data).map((item_dataLine,index_dataLine)=>{    
                                const current_dataValue = item_dataLine[1] as string                         
                                    return (
                                    !filter.includes(item_dataLine[0])
                                    &&
                                    <td key={index_dataLine}>
                                       {
                                        typeof current_dataValue == "string"
                                        ?current_dataValue.slice(0,20).concat("...")
                                        : current_dataValue
                                       }
                                    </td>     
                                )
                            })
                        })
                        }
                         </tr>
                       }
                    )}
               
            </thead>
        </table>
    </div>
  )
}

export default TableHome

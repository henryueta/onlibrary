import { useEffect, useState } from "react"
import useAxios from "./useAxios"
import Word from "../classes/word.class"

export type GraphicTableType = 
{
    title:"Empréstimo" 
    type:"loan" 
}
| 
{
    title:"Reserva",
    type:"reserve"
}
|
{
    title:"Multa",
    type:"amerce"
}



const useHandleGraphic = ()=>{

    const [graphicTable,setGraphicTable] = useState<GraphicTableType>({
        title:"Empréstimo",
        type:"loan"
    });
    const [graphicData,setGraphicData] = useState<number[]>([]);

    const {onAxiosQuery} = useAxios();

    const checkGraphicType = {

        loan:{
            table:"tb_emprestimo",
            url:""
        },
        reserve:{
            table:"tb_reserva",
            url:""
        },
        amerce:{
            table:"tb_multa",
            url:""
        }

    }

    useEffect(()=>{

        console.log(checkGraphicType[graphicTable.type].table)
        
    },[graphicTable])

  

    const onDrawGraphic = (type:GraphicTableType['type'])=>{
        setGraphicTable((prev)=>{
            return (
            type == "loan"
            ? {type:"loan",title:"Empréstimo"}
            : 
            type == "reserve"
            ? {type:"reserve",title:"Reserva"}
            :
            type == "amerce"
            ? {type:"amerce",title:"Multa"}
            : prev
            )
            
        })
    }

return {
    onDrawGraphic,
    graphicTable,
    graphicData
 
}

}

export default useHandleGraphic
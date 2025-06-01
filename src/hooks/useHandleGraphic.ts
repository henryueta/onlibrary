import { useEffect, useState } from "react"
import useAxios from "./useAxios"

type GraphicTableType = 
{
    title:"empréstimo" 
    type:"loan" 
}
| 
{
    title:"reserva",
    type:"reserve"
}
|
{
    title:"multa",
    type:"amerce"
}



const useHandleGraphic = ()=>{

    const [graphicTable,setGraphicTable] = useState<GraphicTableType>({
        title:"empréstimo",
        type:"loan"
    });
    const {onAxiosQuery} = useAxios();

    useEffect(()=>{

        console.log(graphicTable)

    },[graphicTable])

    const onDrawGraphic = (type:GraphicTableType['type'])=>{
        setGraphicTable((prev)=>{
            return (
            type == "loan"
            ? {type:"loan",title:"empréstimo"}
            : 
            type == "reserve"
            ? {type:"reserve",title:"reserva"}
            :
            type == "amerce"
            ? {type:"amerce",title:"multa"}
            : prev
            )
            
        })
    }

return {
    onDrawGraphic
}

}

export default useHandleGraphic
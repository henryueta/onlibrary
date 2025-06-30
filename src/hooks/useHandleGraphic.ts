import { useEffect, useState } from "react"
import useAxios from "./useAxios"
import useHandleLibrary from "./useHandleLibrary"

interface GraphicProps {
    lastData:{
        info:string,
        situacao:string
    }[],
    weekData:{
        data:number,
        dia_semana:string,
        data_emissao:string
    }[]
}

export const graphicDataTypeList:Record<'global'|'library',GraphicTableType[]> = {
    global:[
        {
            title:"Usuário",
            type:"user"
        },
        {
            title:"Biblioteca",
            type:"library"
        }
    ],
    library:[
        {
            title:"Empréstimo",
            type:"loan"
        },
        {
            title:"Reserva",
            type:"reserve"
        },
        {
            title:"Multa",
            type:"amerce"
        }
    ]
}

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
|
{
    title:"Biblioteca",
    type:"library"
}
|
{
    title:"Usuário",
    type:"user"
}



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
        },
        user:{
            table:"tb_usuario",
            url:""
        },
        library:{
            table:"tb_biblioteca",
            url:""
        }

        

    }


const useHandleGraphic = ( management:"library" | "global")=>{

    const [graphicTable,setGraphicTable] = useState<GraphicTableType>(graphicDataTypeList[management][0]);
    const [graphicData,setGraphicData] = useState<number[]>([]);
    const [latestData,setLatestData] = useState<GraphicProps['lastData']>([]);
    const {currentLibraryContext} = useHandleLibrary();

    useEffect(()=>{

        // setGraphicData(()=>{
        //     return graphicTable.type === "loan"
        //     ? [10,20,15,40]
        //     : graphicTable.type === "reserve"
        //     ? [1,2,5,9]
        //     : graphicTable.type === "amerce"
        //     ? [1,5,10,22]
        //     : []
        // })
        (!!(management === 'library' && !!currentLibraryContext.libraryId)
        ||
        !!(management === 'global'))
        &&

        onAxiosQuery("get",{
            url:"https://onlibrary-api.onrender.com/api/data/graficos",
            type:{
                get:{
                    params:management === 'library'
                    ? {
                        nome_tabela:checkGraphicType[graphicTable.type].table,
                        id_biblioteca:currentLibraryContext.libraryId
                    }
                    : {
                        nome_tabela:checkGraphicType[graphicTable.type].table,
                    }
                }
            },
            onResolver:{
                then(result) {
                    const current_result  = result.data.data as GraphicProps;
                    setGraphicData(current_result.weekData.map((week)=>{
                        return week.data
                    }))
                    setLatestData(current_result.lastData)
                },
                catch(error) {
                    console.log(error)
                },
            }
        })
        console.warn(graphicTable,"AQUI")
    },[graphicTable,currentLibraryContext.libraryId])

    const {onAxiosQuery} = useAxios();



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
            : 
            type == "user"
            ? {type:"user",title:"Usuário"}
            :
            type == "library"
            ? {type:"library",title:"Biblioteca"}
            : prev
            )
            
        })
    }
    
return {
    onDrawGraphic,
    graphicTable,
    graphicData,
    latestData
 
}

}

export default useHandleGraphic
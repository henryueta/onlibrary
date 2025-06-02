import { useState } from "react";
import useHandleGraphic, { GraphicTableType } from "../../../hooks/useHandleGraphic";
import Graphic from "../global/Graphic.component"
import "./GraphicManagement.component.css"

interface GraphicManagementProps {



}

const GraphicManagement = ({}:GraphicManagementProps) => {
    
    const {onDrawGraphic,graphicTable} = useHandleGraphic();
    const [selectedButton,setSelectedButton] = useState<number>(0);
    const graphicTableManagementList:GraphicTableType[]= [
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

  return (
    <section className="graphicManagementSection">
        <section className="graphicViewSection">
            <div className="graphicViewChoiceContainer">
                {
                    graphicTableManagementList.map((item,index)=>{
                        return (
                        <button 
                        onClick={()=>{
                            setSelectedButton(index)
                            onDrawGraphic(item.type)
                        }}
                        className={
                            index == selectedButton
                            ? "acceptButton"
                            : "cancelButton"
                        }
                        style={{border:"none",outline:"none"}}
                        >
                            {item.title}
                        </button>
                        )
                    })
                }

                {/* <button className="acceptButton">
                    Emprestimo
                </button>
                <button className="cancelButton" style={{border:"none"}}>
                    Emprestimo
                </button>
                <button className="cancelButton" style={{border:"none"}}>
                    Emprestimo
                </button> */}
            </div>
            <div className="graphicViewContainer">
                <Graphic
                data={[10,20,15,40]}
                categories={['domingo','segunda','terça','quarta','quinta','sexta','sábado']}
                title={`Total de ${graphicTable.title.toLowerCase().concat("s")} da semana`}
                />
            </div>
        </section>
        <section className="graphicDataListSection">
            <div className="graphicDataListContainer">
                <div className="titleContainer">
                    <h1>
                        {
                            graphicTable.title
                            ?.concat("s")
                            .concat(" recentes")
                        } 
                    </h1>
                </div>
                <div className="dataListContainer">
                    <div className="itemListContainer">
                       <div className="itemContentContainer">
                             A névoa da floresta
                       </div>
                       <div className="itemSituationContainer">
                            Vencido
                       </div>
                    </div>
                   
                </div>
            </div>
        </section>
    </section>
  )
}

export default GraphicManagement

import { useState } from "react";
import useHandleGraphic, { graphicDataTypeList, GraphicTableType } from "../../../hooks/useHandleGraphic";
import Graphic from "../global/Graphic.component"
import "./GraphicManagement.component.css"
import { ManagementType } from "../../../routes/management/Management.route";

interface GraphicManagementProps {
    management:ManagementType
}


const GraphicManagement = ({management}:GraphicManagementProps) => {
    
    const {onDrawGraphic,graphicTable,graphicData} = useHandleGraphic(management);
    const [selectedButton,setSelectedButton] = useState<number>(0);
    const [graphicManagementList] = useState<GraphicTableType[]>(graphicDataTypeList[management]);

  return (
    <section className="graphicManagementSection">
        <section className="graphicViewSection">
            <div className="graphicViewChoiceContainer">
                {
                    graphicManagementList.map((item,index)=>{
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
            </div>
            <div className="graphicViewContainer">
                <Graphic
                data={graphicData}
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

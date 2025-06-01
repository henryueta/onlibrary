import useHandleGraphic from "../../../hooks/useHandleGraphic";
import Graphic from "../global/Graphic.component"
import "./GraphicManagement.component.css"

interface GraphicManagementProps {



}

const GraphicManagement = ({}:GraphicManagementProps) => {
    const {} = useHandleGraphic();

  return (
    <section className="graphicManagementSection">
        <section className="graphicViewSection">
            <div className="graphicViewChoiceContainer">
                <button className="acceptButton">
                    Emprestimo
                </button>
                <button className="cancelButton" style={{border:"none"}}>
                    Emprestimo
                </button>
                <button className="cancelButton" style={{border:"none"}}>
                    Emprestimo
                </button>
            </div>
            <div className="graphicViewContainer">
                <Graphic
                title="Total de empréstimos da semana"
                />
            </div>
        </section>
        <section className="graphicDataListSection">
            <div className="graphicDataListContainer">
                <div className="titleContainer">
                    <h1>
                        Últimos emprestimos
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

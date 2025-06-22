import "./Conclusion.route.css"
import FooterHome from "../../components/footer/home/FooterHome.component"
import NavHome from "../../components/nav/home/NavHome.component"
import HeaderTitle from "../../components/header_title/HeaderTitle.component"
import { useState } from "react";
import { path } from "../../objects/path.object";
import useHandlePath from "../../hooks/useHandlePath";

type ConclusionType = "online_reserve" | "support";

interface ConclusionContentProps {
    title:string,
    subTitle:string,
    buttonList: Record<'title'|'path',string>[]
}

const Conclusion = ({type}:{type:ConclusionType}) => {

    const checkConclusionContentType = {
      "online_reserve":()=>{
        return {
          title:"Sua reserva online foi registrada!",
          subTitle:"Aguarde até o bibliotecário confirmar a data de retirada",
          buttonList:[
            {
              title:"Ver reserva",
              path:"/user/orders"
            }
          ]
        }
      },
      "support":()=>{
          return {
          title:"Sua mensagem foi enviada!",
          subTitle:"Aguarde até o suporte analisar sua solicitação",
          buttonList:[
            // {
            //   title:"Ver reserva",
            //   path:""
            // }
          ]
        }
      }
    }

    const [conclusionContent,setConclusionContent] = useState<ConclusionContentProps>
    (
      checkConclusionContentType[type]()
  );
  const {onTransition,currentPathContext} = useHandlePath();
  return (
    <>
        <NavHome/>
            <section className={"conclusionPageSection "+currentPathContext.transitionClass}>
                <div className="conclusionContainer">
                    <HeaderTitle
                    title="Obrigado!"
                    />
                    <p>{conclusionContent.title}</p>
                    <p>{conclusionContent.subTitle}</p>
                     <div className="conclusionOptionsContainer">
                        <button className="acceptButton">
                          Home
                        </button>
                        {
                          conclusionContent.buttonList.map((btn)=>
                            <button 
                            className="acceptButton"
                            onClick={()=>{
                              onTransition(btn.path,{
                                hasReplace:true
                              })
                            }}
                            >
                              {btn.title}
                            </button>
                          )
                        }
                    </div>
                </div>
               
            </section>
        <FooterHome/>
    </>
  )
}

export default Conclusion

import { ReactNode } from "react";
import "./Main.component.css";

type MainStyleProps = Record<'contentStyle',React.CSSProperties>;

interface MainProps extends MainStyleProps{

  children:ReactNode

}


const Main = ({children,contentStyle}:MainProps) => {
  return (
    <main className="mainContent"
    style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <section className="mainContainer"
      style={
        {
          display:"flex",
          alignItems:"center",
          justifyContent:"start",
          ...contentStyle
        }
      }>
           {children}
      </section>
    </main>
  )
}

export default Main

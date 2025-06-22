import "./Conclusion.route.css"
import FooterHome from "../../components/footer/home/FooterHome.component"
import NavHome from "../../components/nav/home/NavHome.component"


const Conclusion = () => {
  return (
    <>
        <NavHome/>
            <section className="conclusionPageSection">
                <div className="conclusionContainer">
                    <p>Agradecemos</p>
                </div>
            </section>
        <FooterHome/>
    </>
  )
}

export default Conclusion

import { Link } from "react-router-dom";
import "./FooterHome.component.css"

const FooterHome = () => {
  return (
    <footer className="footerHomeBar">
          <div className="enterpriseContainer">
              <p>@2025 Inova Company. Todos os direitos reservados</p>
          </div>
          <div className="footerOptionsContainer">
            <Link to={"/"}>Home</Link>
            <hr />
            <Link to={"/"}>Sobre nós</Link>
            <hr />
            <Link to={"/"}>Contato</Link>
          </div>
    </footer>
  )
}

export default FooterHome;

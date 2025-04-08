import "./NavLibrary.component.css";
import onlibrary_logo from "../../../../assets/imgs/logo/onlibrary_logo.png";

const NavLibrary = () => {
  return (
    <nav className="navLibrary">
      <div className="logoContainer">
        <img src={onlibrary_logo} alt="onlibrary_logo" />
      </div>
      <div className="libraryOptionsContainer">
      <details>
        <summary><img src="" alt="" />Gestão</summary>
        <ul>
          <li><img src="" alt="" /><a href="#home">Usuários</a></li>
          <li><img src="" alt="" /><a href="#about">Livros</a></li>
          <li><img src="" alt="" /><a href="#services">Empréstimos</a></li>
          <li><img src="" alt="" /><a href="#contact">Reservas</a></li>
          <li><img src="" alt="" /><a href="#contact">Multas</a></li>
        </ul>
    </details>

      </div>
    </nav>
  )
}

export default NavLibrary

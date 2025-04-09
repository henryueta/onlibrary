import "./NavLibrary.component.css";
import onlibrary_logo from "../../../../assets/imgs/logo/onlibrary_logo.png";
import Details from "../../../details/Details.component";

const NavLibrary = () => {
  return (
    <nav className="navLibrary">
      <div className="logoContainer">
        <img src={onlibrary_logo} alt="onlibrary_logo" />
      </div>
      <div className="libraryOptionsContainer">
        <Details title="Gestão" hasIcon={true} hasRedirectTo={false} redirectTo="" icon="" list={[
          {
            hasRedirectTo:true,
            title:"Usuários",
            hasIcon:true,
            icon:"",
            redirectTo:"#",
          },
          {
            hasRedirectTo:false,
            hasIcon:false,
            redirectTo:"#",
            children:<Details hasIcon={true} hasRedirectTo={true} redirectTo="" title="Livros" icon="" list={[
              {
                hasRedirectTo:true,
                title:"Exemplares",
                hasIcon:true,
                icon:"",
                redirectTo:"#",
              },
              {
                hasRedirectTo:true,
                title:"Autores",
                hasIcon:true,
                icon:"",
                redirectTo:"#",
              },
              {
                hasRedirectTo:true,
                title:"Editoras",
                hasIcon:true,
                icon:"",
                redirectTo:"#",
              },
              {
                hasRedirectTo:true,
                title:"Categorias",
                hasIcon:true,
                icon:"",
                redirectTo:"#",
              },
              {
                hasRedirectTo:true,
                title:"Gêneros",
                hasIcon:true,
                icon:"",
                redirectTo:"#",
              }
            ]}/>
          },
          {
            hasRedirectTo:true,
            title:"Empréstimos",
            hasIcon:true,
            icon:"",
            redirectTo:"#",
          },
          {
            hasRedirectTo:true,
            title:"Reservas",
            hasIcon:true,
            icon:"",
            redirectTo:"#",
          },
          {
            hasRedirectTo:true,
            title:"Multas",
            hasIcon:true,
            icon:"",
            redirectTo:"#",
          }
        ]}>
        </Details>
      {/* <details>
        <summary><img src="" alt="" />Gestão</summary>
        <ul>
          <li><img src="" alt="" /><a href="#home">Usuários</a></li>
          <li><img src="" alt="" />Livros</li>
          <li><img src="" alt="" /><a href="#services">Empréstimos</a></li>
          <li><img src="" alt="" /><a href="#contact">Reservas</a></li>
          <li><img src="" alt="" /><a href="#contact"></a></li>
        </ul>
    </details> */}

      </div>
    </nav>
  )
}

export default NavLibrary

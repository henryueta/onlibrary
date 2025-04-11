import "./NavLibrary.component.css";
import onlibrary_logo from "../../../../assets/imgs/logo/onlibrary_logo.png";
import Details from "../../../details/Details.component";
import { useNavigate } from "react-router-dom";
import ListItem from "../../../listItem/ListItem.component";

const NavLibrary = () => {

 const onNavigate = useNavigate();

  return (
    <nav className="navLibrary">
      <div className="logoContainer">
        <img src={onlibrary_logo} alt="onlibrary_logo" />
      </div>
      <div className="libraryOptionsContainer">
        <ul>
          <ListItem title="Dashboard" icon="a" onClick={()=>onNavigate("/management/library")}/> 
          <ListItem title="Minha Biblioteca" icon="a"/> 
          <li>
            <Details title="Gestão" icon="a" list={[
              {
                title:"Usuários",
                icon:"a",
                onClick:()=>onNavigate("/management/library/users")
              },
              {
                children:<Details onClick={()=>onNavigate("/management/library/books")} title="Livros" icon="a" list={[
                  {
                    title:"Exemplares",
                    icon:"a",
                  },
                  {
                    title:"Autores",
                    icon:"a",
                  },
                  {
                    title:"Editoras",
                    icon:"a",
                  },
                  {
                    title:"Categorias",
                    icon:"a",
                  },
                  {
                    title:"Gêneros",
                    icon:"a",
                  }
                ]}/>
              },
              {
                title:"Empréstimos",
                icon:"a",
              },
              {
                title:"Reservas",
                icon:"a",
              },
              {
                title:"Multas",
                icon:"a",
              }
            ]}>
            </Details>
          </li>
        </ul> 
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

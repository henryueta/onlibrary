import "./NavLibrary.component.css";
import onlibrary_logo from "../../../../assets/imgs/logo/onlibrary_logo.png";
import management_icon from "../../../../assets/imgs/icons/management_icon.webp"
import dashboardHome_icon from "../../../../assets/imgs/icons/dashboardHome_icon.webp";
import cubeTable_icon from "../../../../assets/imgs/icons/cubeTable_icon.webp"
import Details from "../../../details/Details.component";
import { useNavigate,useLocation } from "react-router-dom";
import ListItem from "../../../listItem/ListItem.component";
import { onFindTablePath } from "../../../../objects/table.object";


const NavLibrary = () => {

 const onNavigate = useNavigate();
  const location = useLocation();
  

  return (
    <nav className="navLibrary">
      <div className="logoContainer">
        <img src={onlibrary_logo} alt="onlibrary_logo" />
      </div>
      <div className="libraryOptionsContainer">
        <ul>
          <ListItem title="Dashboard" icon={dashboardHome_icon} onClick={()=>onNavigate("/management/library")}/> 
          <ListItem title="Minha Biblioteca" icon={cubeTable_icon}/> 
          <li>
            <Details title="Gestão" icon={management_icon} list={[
              {
                title:"Usuários",
                icon:cubeTable_icon,
                onClick:()=>onNavigate(onFindTablePath("user") || "")
              },
              {
                children:<Details open={
                  location.pathname == onFindTablePath("book")
                } onClick={()=>onNavigate(onFindTablePath("book") || "")} title="Livros" icon={cubeTable_icon} list={[
                  {
                    title:"Exemplares",
                    icon:cubeTable_icon,
                  },
                  {
                    title:"Autores",
                    icon:cubeTable_icon,
                  },
                  {
                    title:"Editoras",
                    icon:cubeTable_icon,
                  },
                  {
                    title:"Categorias",
                    icon:cubeTable_icon,
                  },
                  {
                    title:"Gêneros",
                    icon:cubeTable_icon,
                  }
                ]}/>
              },
              {
                title:"Empréstimos",
                icon:cubeTable_icon,
              },
              {
                title:"Reservas",
                icon:cubeTable_icon,
              },
              {
                title:"Multas",
                icon:cubeTable_icon,
              }
            ]}>
            </Details>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavLibrary

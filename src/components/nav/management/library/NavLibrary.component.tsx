import "./NavLibrary.component.css";
import onlibrary_logo from "../../../../assets/imgs/logo/onlibrary_logo.png";
import management_icon from "../../../../assets/imgs/icons/management_icon.webp"
import dashboardHome_icon from "../../../../assets/imgs/icons/dashboardHome_icon.webp";
import cubeTable_icon from "../../../../assets/imgs/icons/cubeTable_icon.webp"
import Details from "../../../details/Details.component";
import { useNavigate,useLocation } from "react-router-dom";
import ListItem from "../../../listItem/ListItem.component";
import { onFindTablePath } from "../../../../objects/table.object";
import useHandlePath from "../../../../hooks/useHandlePath";


const NavLibrary = () => {

 const onNavigate = useNavigate();
  const location = useLocation();
  const {currentPathContext} = useHandlePath();

  return (
    <nav className="navLibrary">
      <div className="logoContainer">
        <img src={onlibrary_logo} alt="onlibrary_logo" />
      </div>
      <div className="libraryOptionsContainer">
        <ul>
          <ListItem  
          title="Dashboard" 
          icon={dashboardHome_icon} 
          onClick={()=>onNavigate("/management/library")}
          style={currentPathContext.pathName === "/management/library" 
            ? {backgroundColor:"var(--selectedBlue_var)"}
            : {}
          }
          /> 
          <ListItem 
          title="Minha Biblioteca" 
          onClick={()=>onNavigate("/management/library/about")}
          icon={cubeTable_icon}/> 
          <li>
            <Details title="Gestão" icon={management_icon} list={[
              {
                title:"Usuários",
                icon:cubeTable_icon,
                onClick:()=>onNavigate(onFindTablePath("library_user") || "")
              },
              {
                children:<Details 
                open={
                  location.pathname == onFindTablePath("book")
                  ||
                  location.pathname == onFindTablePath("author")
                  ||
                  location.pathname == onFindTablePath("category")
                  ||
                  location.pathname == onFindTablePath("gender")
                  ||
                  location.pathname == onFindTablePath("exemplary")
                  ||
                  location.pathname == onFindTablePath("publisher")

                } onClick={()=>onNavigate(onFindTablePath("book") || "")} 
                title="Livros" 
                icon={cubeTable_icon} 
                list={[
                  {
                    title:"Exemplares",
                    icon:cubeTable_icon,
                    style: location.pathname == onFindTablePath("exemplary")
                    ? {backgroundColor:"var(--selectedBlue_var)"}
                    : {},
                    onClick:()=>onNavigate(onFindTablePath("exemplary") || "")
                  },
                  {
                    title:"Autores",
                    icon:cubeTable_icon,
                    style: location.pathname == onFindTablePath("author")
                    ? {backgroundColor:"var(--selectedBlue_var)"}
                    : {},
                    onClick:()=>onNavigate(onFindTablePath("author") || "")
                  },
                  {
                    title:"Editoras",
                    icon:cubeTable_icon,
                    style: location.pathname == onFindTablePath("publisher")
                    ? {backgroundColor:"var(--selectedBlue_var)"}
                    : {},
                    onClick:()=>onNavigate(onFindTablePath("publisher") || "")
                  },
                  {
                    title:"Categorias",
                    icon:cubeTable_icon,
                    style: location.pathname == onFindTablePath("category")
                    ? {backgroundColor:"var(--selectedBlue_var)"}
                    : {},
                    onClick:()=>onNavigate(onFindTablePath("category") || "")
                  },
                  {
                    title:"Gêneros",
                    icon:cubeTable_icon,
                    style: location.pathname == onFindTablePath("gender")
                    ? {backgroundColor:"var(--selectedBlue_var)"}
                    : {},
                    onClick:()=>onNavigate(onFindTablePath("gender") || "")
                  }
                ]}/>
              },
              {
                title:"Empréstimos",
                icon:cubeTable_icon,
                style: location.pathname == onFindTablePath("loan")
                ? {backgroundColor:"var(--selectedBlue_var)"}
                : {},
                onClick:()=>onNavigate(onFindTablePath("loan") || "")
              },
              {
                title:"Reservas",
                icon:cubeTable_icon,
                style: location.pathname == onFindTablePath("reserve")
                ? {backgroundColor:"var(--selectedBlue_var)"}
                : {},
                onClick:()=>onNavigate(onFindTablePath("reserve") || "")
              },
              {
                title:"Multas",
                icon:cubeTable_icon,
                style: location.pathname == onFindTablePath("amerce")
                ? {backgroundColor:"var(--selectedBlue_var)"}
                : {},
                onClick:()=>onNavigate(onFindTablePath("amerce") || "")
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

import "./NavLibrary.component.css";
import onlibrary_logo from "../../../../assets/imgs/logo/onlibrary_logo.png";
import management_icon from "../../../../assets/imgs/icons/management_icon.webp"
import dashboardHome_icon from "../../../../assets/imgs/icons/dashboardHome_icon.webp";
import cubeTable_icon from "../../../../assets/imgs/icons/cubeTable_icon.webp"
import Details from "../../../details/Details.component";
import { useNavigate,useLocation } from "react-router-dom";
import ListItem from "../../../listItem/ListItem.component";
import { onCheckTableDependencie, tableTypeDataList, TableTypeProps } from "../../../../objects/table.object";
import useHandlePath from "../../../../hooks/useHandlePath";
import useHandleLibrary from "../../../../hooks/useHandleLibrary";
import { ManagementType } from "../../../../routes/management/Management.route";
import { useState } from "react";


const NavLibrary = ({management}:{management:ManagementType}) => {

 const onNavigate = useNavigate();
  const location = useLocation();
  const {currentPathContext} = useHandlePath();
  const {currentLibraryContext} = useHandleLibrary()
  const [navItems] = useState<TableTypeProps[]>(
    tableTypeDataList.filter((table)=>
      table.management === management
    )
  );

  const createListItemLibrary = (table:TableTypeProps)=>{

       return { 
                open:(
                  !!(table.dependencies.map((dep)=>{
               
                 return location.pathname === navItems.find(
                  (tab)=>!!(tab.title === dep && tab.management === management)
                  )?.path
                

                }).find((cond)=>!!cond)
                 ||
                 location.pathname === table.path
                )
                )
                ,
                onClick:()=>{
                  onNavigate(table.path)
                },
                title:table.title,
                icon:cubeTable_icon,
                style: location.pathname === table.path
                  ? {backgroundColor:"var(--selectedBlue_var)"}
                  : {}
              }

  }

  return (
    <nav className="navLibrary">
      <div className="logoContainer"
      onClick={()=>{
        onNavigate("/",{
          replace:true
        })
      }}>
        <img src={onlibrary_logo} alt="onlibrary_logo" />
      </div>
      <div className="libraryOptionsContainer">
        <ul>
          <ListItem  
          title="Dashboard" 
          icon={dashboardHome_icon} 
          onClick={()=>onNavigate(management === 'library'
            ? "/management/library"
            : "/management/global"
          )}
          style={currentPathContext.pathName === "/management/library" 
            ? {backgroundColor:"var(--selectedBlue_var)"}
            : {}
          }
          /> 
          {
             management === 'library'
             &&
            <ListItem 
              title="Minha Biblioteca" 
              onClick={()=>onNavigate("/management/library/data/update/library/"+currentLibraryContext.libraryId)}
              icon={cubeTable_icon}
              style={location.pathname === "/management/library/data/update/library/"+currentLibraryContext.libraryId
                ? {backgroundColor:"var(--selectedBlue_var)"}
                : {}}
            /> 
          }
          

          <li>
            <Details 
            title="Gestão" 
            icon={management_icon} 
            list={
                  navItems.map((table)=>{
                return table.type !== "global_management"
                &&
                table.type !== "library_management"
                &&
                (()=>{
                  const current_table = createListItemLibrary(table)

                  const list = table.dependencies.map((dep)=>
                    {
                      const dependencie = navItems.find((tab)=>tab.title === dep)
                      return createListItemLibrary(dependencie as TableTypeProps)
                    }
                )

                return !!(table.dependencies.length)
                ? {
                  children:<Details
                open={current_table.open}
                onClick={current_table.onClick}
                title={current_table.title}
                icon={current_table.icon}
                list={list}
                />
                }
                :
                !(
                  onCheckTableDependencie(table)
                )
                  && {
                  open:current_table.open,
                  onClick:current_table.onClick,
                  title:current_table.title,
                  icon:current_table.icon,
                  list:list,
                  style: location.pathname === table.path
                  ? {backgroundColor:"var(--selectedBlue_var)"}
                  : {}
                }

                })()

            }).filter((noFalse)=>!!noFalse)
            //   [
            //   {
            //     title:"Usuários",
            //     icon:cubeTable_icon,
            //     onClick:()=>onNavigate(onFindTablePath("library_user") || "")
            //   },
            //   {
            //     children:<Details 
            //     open={
            //       location.pathname == onFindTablePath("book")
            //       ||
            //       location.pathname == onFindTablePath("author")
            //       ||
            //       location.pathname == onFindTablePath("category")
            //       ||
            //       location.pathname == onFindTablePath("gender")
            //       ||
            //       location.pathname == onFindTablePath("exemplary")
            //       ||
            //       location.pathname == onFindTablePath("publisher")

            //     } onClick={()=>onNavigate(onFindTablePath("book") || "")} 
            //     title="Livros" 
            //     icon={cubeTable_icon} 
            //     list={[
            //       {
            //         title:"Exemplares",
            //         icon:cubeTable_icon,
            //         style: location.pathname == onFindTablePath("exemplary")
            //         ? {backgroundColor:"var(--selectedBlue_var)"}
            //         : {},
            //         onClick:()=>onNavigate(onFindTablePath("exemplary") || "")
            //       },
            //       {
            //         title:"Autores",
            //         icon:cubeTable_icon,
            //         style: location.pathname == onFindTablePath("author")
            //         ? {backgroundColor:"var(--selectedBlue_var)"}
            //         : {},
            //         onClick:()=>onNavigate(onFindTablePath("author") || "")
            //       },
            //       {
            //         title:"Editoras",
            //         icon:cubeTable_icon,
            //         style: location.pathname == onFindTablePath("publisher")
            //         ? {backgroundColor:"var(--selectedBlue_var)"}
            //         : {},
            //         onClick:()=>onNavigate(onFindTablePath("publisher") || "")
            //       },
            //       {
            //         title:"Categorias",
            //         icon:cubeTable_icon,
            //         style: location.pathname == onFindTablePath("category")
            //         ? {backgroundColor:"var(--selectedBlue_var)"}
            //         : {},
            //         onClick:()=>onNavigate(onFindTablePath("category") || "")
            //       },
            //       {
            //         title:"Gêneros",
            //         icon:cubeTable_icon,
            //         style: location.pathname == onFindTablePath("gender")
            //         ? {backgroundColor:"var(--selectedBlue_var)"}
            //         : {},
            //         onClick:()=>onNavigate(onFindTablePath("gender") || "")
            //       }
            //     ]}/>
            //   },
            //   {
            //     title:"Empréstimos",
            //     icon:cubeTable_icon,
            //     style: location.pathname == onFindTablePath("loan")
            //     ? {backgroundColor:"var(--selectedBlue_var)"}
            //     : {},
            //     onClick:()=>onNavigate(onFindTablePath("loan") || "")
            //   },
            //   {
            //     title:"Reservas",
            //     icon:cubeTable_icon,
            //     style: location.pathname == onFindTablePath("reserve")
            //     ? {backgroundColor:"var(--selectedBlue_var)"}
            //     : {},
            //     onClick:()=>onNavigate(onFindTablePath("reserve") || "")
            //   },
            //   {
            //     title:"Multas",
            //     icon:cubeTable_icon,
            //     style: location.pathname == onFindTablePath("amerce")
            //     ? {backgroundColor:"var(--selectedBlue_var)"}
            //     : {},
            //     onClick:()=>onNavigate(onFindTablePath("amerce") || "")
            //   }
            // ]
            }>
            </Details>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavLibrary

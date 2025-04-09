import "./Management.route.css";
import NavAdmin from "../../components/nav/management/admin/NavAdmin.component"
import NavLibrary from "../../components/nav/management/library/NavLibrary.component"
import ListTableButton from "../../components/list/button/ListTableButton.component";
import cube_icon from "../../assets/imgs/icons/cube_icon.png"

interface ManagementProps {
hasListTableButton:boolean,

children:React.ReactNode
}

const Management = ({children,hasListTableButton}:ManagementProps) => {

  return (
      <section className="managementSection">
          <NavLibrary/>
        <section className="managementContentSection">
          <NavAdmin/>
          <section className="dataContentSection">
            {hasListTableButton 
          &&(
            <ListTableButton buttonList={
              [{
                icon:cube_icon,
                quantity:"126",
                redirectTo:"#",
                title:"Livros"
              },
              {
                icon:cube_icon,
                quantity:"84",
                redirectTo:"#",
                title:"Usuários"
              },
              {
                icon:cube_icon,
                quantity:"102",
                redirectTo:"#",
                title:"Empréstimos"
              },
              {
                icon:cube_icon,
                quantity:"25",
                redirectTo:"#",
                title:"Reservas"
              },
              {
                icon:cube_icon,
                quantity:"14",
                redirectTo:"#",
                title:"Multas"
              }]
            }/>
          )
          }
            {children}
          </section> 
        </section>
      </section>
  )
}

export default Management

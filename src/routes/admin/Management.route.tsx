import "./Management.route.css";
import NavAdmin from "../../components/nav/management/admin/NavAdmin.component"
import NavLibrary from "../../components/nav/management/library/NavLibrary.component"
import GroupTableButton from "../../components/group/button/GroupTableButton.component";
import cube_icon from "../../assets/imgs/icons/cube_icon.png"
import { useEffect, useState } from "react";
import useHandleTable from "../../hooks/useHandleTable";
import { TableType, tableTypeList,onFindTableIndex,onSetDataQuantity,TableTypeProps } from "../../components/table/global/table.global";
import axios from "axios";


interface ManagementProps {
hasGroupTableButton:boolean,
item_management:TableType
children:React.ReactNode
}


const Management = ({children,item_management,hasGroupTableButton}:ManagementProps) => {
  const [buttonList,setButtonList] = useState<TableTypeProps[]>(tableTypeList);
  const {onQueryTableList} = useHandleTable()

  useEffect(()=>{
    
    buttonList.forEach(async (button,index)=>{
      try{
          const response = await axios.get("http://localhost:5100/count?type="+button.type).then((res)=>{
            setButtonList((prev)=>{
             return prev.map((item,index)=>{
                if(item.type === button.type){
                    item.quantity = res.data.quantity
                }
                return item
              })
            })
          })

      }
      catch(error){
          console.log(error)
      }
  })
  },[])

  useEffect(()=>{
    console.log(buttonList)
  },[buttonList])

  const [position,setPosition] = useState({
    x:0+"px",
    y:0+"px"
  });

  useEffect(()=>{
  },[position])

  
  return (
    <>
    <NavLibrary/>
      <section className="managementSection">
        <section className="managementContentSection">
          <NavAdmin/>

          <section className="dataContentSection">
            {hasGroupTableButton 
          &&(
            <GroupTableButton buttonList={
              buttonList[onFindTableIndex(item_management)].dependencies.map((item,index)=>{
               return {
              icon:cube_icon,
                quantity:buttonList[tableTypeList.findIndex((itemQnt)=>itemQnt.title === item)]?.quantity?.toString() || "0",
                redirectTo: "",
                title:item
                }
              })
              // [{
              //   icon:cube_icon,
              //   quantity:"126",
              //   redirectTo:"#",
              //   title:"Livros"
              // },
              // {
              //   icon:cube_icon,
              //   quantity:"84",
              //   redirectTo:"#",
              //   title:"Usuários"
              // },
              // {
              //   icon:cube_icon,
              //   quantity:"102",
              //   redirectTo:"#",
              //   title:"Empréstimos"
              // },
              // {
              //   icon:cube_icon,
              //   quantity:"25",
              //   redirectTo:"#",
              //   title:"Reservas"
              // },
              // {
              //   icon:cube_icon,
              //   quantity:"14",
              //   redirectTo:"#",
              //   title:"Multas"
              // }]
            }/>
          )
          }
            {children}
          </section> 
        </section>
      </section>
      </>
  )
}

export default Management

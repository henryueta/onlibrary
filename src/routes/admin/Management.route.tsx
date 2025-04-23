import "./Management.route.css";
import NavAdmin from "../../components/nav/management/admin/NavAdmin.component"
import NavLibrary from "../../components/nav/management/library/NavLibrary.component"
import GroupTableButton from "../../components/group/button/GroupTableButton.component";
import cube_icon from "../../assets/imgs/icons/cube_icon.png"
import { useEffect, useState } from "react";
import useHandleTable from "../../hooks/useHandleTable";
import { TableType, tableTypeDataList,onFindTableIndex,TableTypeProps } from "../../objects/table.object";
import axios from "axios";


interface ManagementProps {
hasGroupTableButton:boolean,
item_management:TableType
children:React.ReactNode
}

const teste = {
  idade:"19",
  id:"113d",
  nome:"Henry"
}

const Management = ({children,item_management,hasGroupTableButton}:ManagementProps) => {
  const [buttonList,setButtonList] = useState<TableTypeProps[]>(tableTypeDataList);
  const {onQueryTableList} = useHandleTable()

  useEffect(()=>{
    buttonList.forEach(async (button,index)=>{
      try{
          await axios.get("http://localhost:5000/count?type="+button.type).then((res)=>{
            setButtonList((prev)=>{
             return prev.map((item,index)=>{
                if(item.type === button.type){
                    item.quantity = res.data.quantidade
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
                const dependecie_button = buttonList[tableTypeDataList.findIndex((itemQnt)=>itemQnt.title === item)];
               return {
              icon:cube_icon,
                quantity:dependecie_button?.quantity?.toString() || "0",
                redirectTo:dependecie_button?.path,
                title:item
                }
              })
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

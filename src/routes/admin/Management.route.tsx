import "./Management.route.css";
import NavAdmin from "../../components/nav/management/admin/NavAdmin.component"
import NavLibrary from "../../components/nav/management/library/NavLibrary.component"
import GroupTableButton from "../../components/group/button/GroupTableButton.component";
import cube_icon from "../../assets/imgs/icons/cube_icon.png"
import { useEffect, useState } from "react";
import { TableType, tableTypeDataList,onFindTableIndex,TableTypeProps, TableQueryProps } from "../../objects/table.object";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "../../components/table/Table.component";
import Form from "../../components/form/global/component/Form.component";
import { form } from "../../objects/form.object";
import useHandleTable from "../../hooks/useHandleTable";


type ManagementMode = "default" | "get" | "post" | "put";

interface ManagementProps {
hasGroupTableButton:boolean,
mode:ManagementMode
}



const Management = ({hasGroupTableButton,mode}:ManagementProps) => {
  const [buttonList,setButtonList] = useState<TableTypeProps[]>(tableTypeDataList);
  const [defaultForm,setDefaultForm] = useState<TableQueryProps | null>();

  const {onQueryTable,table} = useHandleTable();


  const {type,id} = useParams()


  useEffect(()=>{
    !!id &&
    onQueryTable({
      type:type as TableType || "none",
      id:id
    },
    "select")

    mode !== "put"
    &&  setDefaultForm(null)
 
  },[type,id])

  useEffect(()=>{
    table &&
    setDefaultForm(table || [])

  },[table])

  // const modeList = {
  //   default:
  //     <></>,
  //   get:
  //     ()=>{return <Table type={type as TableType}/>},
  //   post:
  //    ()=>{
  //     return  <>
  //     {
  //       mode == "post"
  //       &&
  //       <Form 
  //         formSchema={form.formList.find((item)=>item.name == type)!.schema}
  //         typeOfData={type as Exclude<TableType,"none">} 
  //         onSubmit={(data)=>console.log(data)} 
  //         // defaultValues={}
  //         />
  //     }
  //   </>
  //    },
  //   put:
  //     ()=>{return <p>{type}</p>}
  // }

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
              buttonList[onFindTableIndex(type as TableType || "none")].dependencies.map((item,index)=>{
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

           

          {
            
            !!type &&
            mode == "get"
            ? <Table type={type as TableType}/>
            : 
            mode == "post"
            ?
               <Form 
                formSchema={form.formList.find((item)=>item.name == type)!.schema}
                typeOfData={type as Exclude<TableType,"none">} 
                onSubmit={(data)=>console.log(data)} 
                />
            :
            mode == "put" && defaultForm 
            &&
            <>

                <Form 
                formSchema={form.formList.find((item)=>item.name == type)!.schema}
                typeOfData={type as Exclude<TableType,"none">} 
                onSubmit={(data)=>console.log(data)} 
                defaultValues={defaultForm}
                />
            </>
          }



          </section> 
        </section>
      </section>
      </>
  )
}

export default Management

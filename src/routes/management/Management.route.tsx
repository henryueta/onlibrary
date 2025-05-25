import "./Management.route.css";
import NavAdmin from "../../components/nav/management/admin/NavAdmin.component";
import NavLibrary from "../../components/nav/management/library/NavLibrary.component";
import GroupTableCard from "../../components/group/table_card/GroupTableCard.component";
import cube_icon from "../../assets/imgs/icons/cube_icon.png"
import { useEffect, useState } from "react";
import { TableType, tableTypeDataList,onFindTableIndex,TableTypeProps, TableQueryProps } from "../../objects/table.object";
import { useParams } from "react-router-dom";
import Table from "../../components/table/management/TableManagement.component";
import Form from "../../components/form/global/component/Form.component";
import { form } from "../../objects/form.object";
import useHandleTable from "../../hooks/useHandleTable";
import useHandleLibrary from "../../hooks/useHandleLibrary";
import useHandlePath from "../../hooks/useHandlePath";

type ManagementMode = "default" | "get" | "post" | "put";

interface ManagementProps {
hasGroupTableCard:boolean,
mode:ManagementMode
}



const Management = ({hasGroupTableCard,mode}:ManagementProps) => {
  const [cardList,setcardList] = useState<TableTypeProps[]>(tableTypeDataList);
  const [defaultForm,setDefaultForm] = useState<TableQueryProps | null>();
  const {currentLibraryContext} = useHandleLibrary()
  const {onQueryTable,table,onQueryCountTable} = useHandleTable();
  const {currentPathContext} = useHandlePath();
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
   (()=>{
    
    return  setDefaultForm(table || [])
   })()

  },[table])

  useEffect(()=>{

    cardList.forEach((button)=>{
        onQueryCountTable(button.type,(result)=>{
          setcardList((prev)=>{
            return prev.map((item)=>{
               if(item.type === button.type){
                   item.quantity = result.data.quantidade
                   item.warning = result.data.aviso
               }
               return item
             })
           })
        })
  })

},[currentLibraryContext.libraryId,currentPathContext.pathName])

  return (
    <>
    <NavLibrary />
      <section className="managementSection">
        <section className="managementContentSection">
          <NavAdmin/>
          <section className="dataContentSection">
            {hasGroupTableCard
              &&(
            <GroupTableCard cardList={
              cardList[onFindTableIndex(type as TableType || "none")].dependencies.map((item)=>{
                const dependecie_button = cardList[tableTypeDataList.findIndex((itemQnt)=>{
                  return itemQnt.title === item
                })];
                return {
              icon:cube_icon,
                quantity:dependecie_button?.quantity.toString() || "0",
                warning:dependecie_button?.warning || false,
                redirectTo:dependecie_button?.path,
                title:item
                }

              })
            }/>
          )
          }

          {
            mode == "default"
            ? <></>
            :
            !!type &&
            mode == "get"
            ? <Table type={type as TableType}/>
            :
            mode == "post"
            ?
              <div className="formDataContainer">
                 <Form
                 method={{
                  post:true,
                  put:false
                 }}
                formSchema={form.formList.find((item)=>item.name == type)!.schema[mode]}
                typeOfData={type as Exclude<TableType,"library"|"none">}
                onSubmit={()=>{}}
                />
              </div>
            :
            mode == "put" && defaultForm
            &&
            <>
                <div className="formDataContainer">
                  <Form
                  method={{
                    post:false,
                    put:true
                  }}
                  formSchema={form.formList.find((item)=>item.name == type)!.schema[mode]}
                  typeOfData={type as Exclude<TableType,"none"|"library">}
                  onSubmit={(data)=>console.log(data)}
                  defaultValues={defaultForm}
                  />
                </div>
            </>
          }
          </section>
        </section>
      </section>
      </>
  )
}

export default Management

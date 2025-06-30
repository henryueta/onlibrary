import "./Management.route.css";
import NavAdmin from "../../components/nav/management/admin/NavAdmin.component";
import NavLibrary from "../../components/nav/management/library/NavLibrary.component";
import GroupTableCard from "../../components/group/table_card/GroupTableCard.component";
import cube_icon from "../../assets/imgs/icons/cube_icon.png"
import { useEffect, useState } from "react";
import { TableType, tableTypeDataList,onFindTableIndex,TableTypeProps, TableQueryProps, onFindTablePath } from "../../objects/table.object";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../components/table/management/TableManagement.component";
import Form from "../../components/form/global/component/Form.component";
import { form } from "../../objects/form.object";
import useHandleTable from "../../hooks/useHandleTable";
import useHandleLibrary from "../../hooks/useHandleLibrary";
import useHandlePath from "../../hooks/useHandlePath";
import GraphicManagement from "../../components/graphic/management/GraphicManagement.component";
import useHandlePdf from "../../hooks/useHandlePdf";

type ManagementMode = "default" | "get" | "post" | "put" | "library";

export type ManagementType = "library" | "global"

interface ManagementProps {
hasGroupTableCard:boolean,
mode:ManagementMode
management:ManagementType

}



const Management = ({hasGroupTableCard,mode,management}:ManagementProps) => {
  const [cardList,setcardList] = useState<TableTypeProps[]>(tableTypeDataList);
  const [defaultForm,setDefaultForm] = useState<TableQueryProps | null>();
  const {currentLibraryContext} = useHandleLibrary()
  const {onQueryTable,table,onQueryCountTable} = useHandleTable(management);
  const {currentPathContext,pathManagement} = useHandlePath(management);
  const {onQueryLibraryData} = useHandlePdf(management);
  const {type,id} = useParams()
  const onNavigate = useNavigate();

  useEffect(()=>{

    !!id &&
      onQueryTable({
      type:type as TableType || "library_management"||"global_management",
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
        button.management === management
        &&
        onQueryCountTable(management,button.type,(result)=>{
          console.warn(result)
          setcardList((prev)=>{
            return prev.map((item)=>{
               if(item.type === button.type){
                   item.quantity = result.count
                   item.warning = result.warn
               }
               return item
             })
           })
        })

  })



},[currentLibraryContext.libraryId,currentPathContext.pathName])


  return (
    <>
    <NavLibrary
    management={management}
     />
      <section className="managementSection">
         <NavAdmin
         management={management}
         />
        <section className="managementContentSection">
         
          <section className="dataContentSection">
              
             <div className="currentPathContainer">
              {
              !!pathManagement
              &&
              `${pathManagement.replace(/[/]/g," ◢ ")}
              ${!!type
                ? tableTypeDataList[onFindTableIndex(type as TableType)].title
                : ""
              }
              `

              }
            </div>
            {hasGroupTableCard
              &&(
            <GroupTableCard 
            cardList={
              cardList[onFindTableIndex(type as TableType || (
                management === "global"
                ?"global_management"
                : "library_management"
              ))].dependencies.map((item)=>{
                const dependecie_button = cardList[tableTypeDataList.findIndex((itemQnt)=>{
                  return itemQnt.title === item 
                  &&
                  (
                    management === "global"
                    ?
                    (
                      itemQnt.type !== "library_user"
                      &&
                      itemQnt.type !== "library_book"
                      &&
                      itemQnt.type !== "library_author"
                      &&
                      itemQnt.type !== "library_category"
                      &&
                      itemQnt.type !== "library_gender"
                      &&
                      itemQnt.type !== "library_publisher"
                    )
                    :
                    (
                      itemQnt.type !== "user"
                      &&
                      itemQnt.type !== "book"
                      &&
                      itemQnt.type !== "author"
                      &&
                      itemQnt.type !== "category"
                      &&
                      itemQnt.type !== "gender"
                      &&
                      itemQnt.type !== "publisher"
                    )
                  )
                })];
                return {
              icon:cube_icon,
                quantity:dependecie_button?.quantity.toString() || "0",
                warning:dependecie_button?.warning || false,
                redirectTo:dependecie_button?.path,
                title:(()=>{
                  return dependecie_button.title
                })()
                }

              })
            }/>
          )
          }
           
          {
            mode == "default"
            ? 
            <>
              <div className="summaryContainer">
                <button
                  className="acceptButton"
                  onClick={()=>{
                    onQueryLibraryData()
                  }}
                  >Baixar relatório
                </button>
              </div>
              <GraphicManagement management={management}/>
            </>
                
            :
            !!type &&
            mode == "get"
            ? 
            <section className="tableManagementSection">
                <Table 
                  type={type as TableType}
                  management={management}
                  />
            </section>
            :
            mode == "post"
            ?
              <div className="formDataContainer">

                 <Form
                 redirectAfterConclude={true}
                 method={{
                  post:true,
                  put:false
                 }}
                formSchema={form.formList.find((item)=>item.name == type)!.schema[mode]}
                typeOfData={type as Exclude<TableType,"library_management"|"global_management">}
                onSubmit={()=>
                    {
                     const formatedTypeParam = type as TableType;
                     onNavigate(onFindTablePath(formatedTypeParam) || "")
                    }
                  }
                 
                />
              </div>
            :
            mode == "put" && defaultForm
            &&
            <>
                <div className="formDataContainer">
                  
                  <Form
                  redirectAfterConclude={true}
                  method={{
                    post:false,
                    put:true
                  }}
                  formSchema={form.formList.find((item)=>item.name == type)!.schema[mode]}
                  typeOfData={type as Exclude<TableType,"library_management"|"global_management">}
                  onSubmit={()=>
                    {
                     const formatedTypeParam = type as TableType;
                     onNavigate(onFindTablePath(formatedTypeParam) || "")
                    }
                  }
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

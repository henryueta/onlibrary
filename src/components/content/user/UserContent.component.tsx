import "./UserContent.component.css"
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { tableRoutes, UserTableQueryProps } from "../../../objects/table.object";
import userLogged_icon from "../../../assets/imgs/icons/userStep_icon.png"
import HeaderTitle from "../../header_title/HeaderTitle.component";
import Form from "../../form/global/component/Form.component";
import { form } from "../../../objects/form.object";
import useHandleTable from "../../../hooks/useHandleTable";
import Communication from "../../communication/Communication.component";
import useHandlePath from "../../../hooks/useHandlePath";

const UserContent = ({id}:{id:string}) => {

    const {onAxiosQuery} = useAxios();
    useEffect(()=>{
        
      onAxiosQuery("get",{
        url:tableRoutes['user'].getById+"?id="+id,
        type:{
          get:{
  
          }
        },
        onResolver:{
           then(result) {
               !!result.data
               &&
               setUserContent(result.data)
           },
           catch(error) {
               console.log(error)
           },
        }
      })
  
    },[id])

    const [userContent,setUserContent] = useState<UserTableQueryProps | null>(null);
    const {onQueryTable,queryFormState} = useHandleTable('none');
    const {currentPathContext} = useHandlePath()

  return (
    <>
    <Communication
    formState={queryFormState}
    />
    <section className={"userAccountDataSection "+currentPathContext.transitionClass}>
        <section className="headerSection">
            <HeaderTitle 
            hasHrLine = {false}
            title="Conta"
            />
            <div className="dataOptionsContainer">
                <button 
                style={{border:"0.1rem solid red",color:"red",fontWeight:"bold"}}
                 className="cancelButton"
                 onClick={()=>{
                    onQueryTable({
                        type:"user",
                        id:id
                    },"delete")
                 }}
                 >
                    Deletar Conta
                </button>
            </div>
        </section>
        <section className="dataContentSection">
            <section className="simpleContentSection">
                <div className="userIconContainer">
                    <img src={userLogged_icon} alt="user_icon" />
                </div>
                <div className="userUsernameContainer">
                    <h1>
                        {userContent?.nome.concat(` ${userContent.sobrenome}`)}
                    </h1>
                    <p>
                        Vulgo ( {userContent?.username} )
                    </p>
                </div>
            </section>
            <section className="fullContentSection">
                <HeaderTitle
                hasHrLine
                    title="Informações pessoais"
                />
                <div className="fullContentContainer">
                    {
                        !!userContent
                        &&
                        <Form
                        formSchema={form.formList.find((item)=>item.name == "user")!.schema["put"].omit({
                            situacao:true,
                            tipo:true
                        })}
                        defaultValues={userContent}
                        method={{
                            post:false,
                            put:true
                        }}
                        onSubmit={(data)=>{
                            console.log(data)
                        }}
                        typeOfData="user"
                        />
                    }
                </div>
            </section>
        </section>
    </section>
    </>
  )
}

export default UserContent

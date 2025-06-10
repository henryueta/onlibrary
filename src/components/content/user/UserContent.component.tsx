import "./UserContent.component.css"
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { tableRoutes, UserTableQueryProps } from "../../../objects/table.object";
import userLogged_icon from "../../../assets/imgs/icons/userStep_icon.png"
import HeaderTitle from "../../header_title/HeaderTitle.component";
import Form from "../../form/global/component/Form.component";
import { form } from "../../../objects/form.object";

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
               setUserContent(result.data[0])
           },
           catch(error) {
               console.log(error)
           },
        }
      })
  
    },[id])

    const [userContent,setUserContent] = useState<UserTableQueryProps | null>(null);
    const [isUserUpdate,setIsUserUpdate] = useState<boolean>(false);

  return (
    <section className="userAccountDataSection">
        <section className="headerSection">
            <HeaderTitle 
            hasHrLine = {false}
            title="Conta"
            />
            {/* <div className="dataOptionsContainer">
                {
                    !!isUserUpdate
                    &&
                    <button
                    onClick={()=>{
                        handleSubmit((data)=>{
                            console.log
                        })
                        // onQueryForm(currentLibraryContext.libraryId || "",{
                        //     type:"user",
                        //     id:id
                            
                        // },"update")
                    }}
                    className="acceptButton"
                    >
                        Salvar alterações
                    </button>
                }
                <button
                className={
                    !!isUserUpdate
                    ? "cancelButton"
                    : "acceptButton"
                }
                onClick={()=>{
                    setIsUserUpdate((prev)=>!prev)
                }}>
                    {
                        !!isUserUpdate
                        ? "Cancelar"
                        : "Editar"
                    }
                 </button>
            </div> */}
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
                        formSchema={form.formList.find((item)=>item.name == "user")!.schema["put"]}
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

                    {/* {
                        !!userContent
                        &&
                        Object.entries(userContent).map((item,index)=>{
                            return (
                                <TitleDescription
                                key={index}
                                title={new Word(item[0].toString(),"name").word || ""}
                                description={
                                    <input 
                                    {...register(item[0])}
                                    disabled={!isUserUpdate}
                                    defaultValue={item[1]}/>
                                }
                                />
                                
                            )
                        })
                    } */}
                </div>
            </section>
        </section>
    </section>
  )
}

export default UserContent

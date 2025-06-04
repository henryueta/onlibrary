import "./UserContent.component.css"
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { UserTableQueryProps } from "../../../objects/table.object";
import TitleDescription from "../../title_description/TitleDescription.component";
import Word from "../../../classes/word.class";
import userLogged_icon from "../../../assets/imgs/icons/userLogged_icon.png"
import HeaderTitle from "../../header_title/HeaderTitle.component";

const UserContent = ({id}:{id:string}) => {

    const {onAxiosQuery} = useAxios();

    useEffect(()=>{
  
      onAxiosQuery("get",{
        url:"http://localhost:5900/user/get?id="+id,
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
            title="Conta"
            />
            <div className="dataOptionsContainer">
                <button>

                </button>
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
                {
                    !!isUserUpdate
                    &&
                    <button
                    className="acceptButton"
                    >
                        Salvar alterações
                    </button>
                }
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
                    title="Informações pessoais"
                />
                <div className="fullContentContainer">
                    {
                        !!userContent
                        &&
                        Object.entries(userContent).map((item,index)=>{
                            return (
                                <TitleDescription
                                key={index}
                                title={new Word(item[0].toString(),"name").word || ""}
                                description={
                                    <input 
                                    disabled={!isUserUpdate}
                                    defaultValue={item[1]}/>
                                }
                                />
                            )
                        })
                    }
                </div>
            </section>
        </section>
    </section>
  )
}

export default UserContent

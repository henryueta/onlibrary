import "./Support.route.css";
import FooterHome from "../../components/footer/home/FooterHome.component"
import NavHome from "../../components/nav/home/NavHome.component"
import HeaderTitle from "../../components/header_title/HeaderTitle.component";
import useAxios from "../../hooks/useAxios";
import Communication from "../../components/communication/Communication.component";
import Spinner from "../../components/spinner/Spinner.component";
import useHandleAuth from "../../hooks/usehandleAuth";
import useHandlePath from "../../hooks/useHandlePath";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Warn from "../../components/warn/Warn.component";

const support_form_schema = z.object({
    mensagem:z.string().min(5,{
        message:"Campo mensagem precisa ser preenchido"
    })
})

const Support = () => {

    // const [supportState,setSupportState] = useReducer(handleSupportState,initialSupportState);
    const {onAxiosQuery,queryState} = useAxios();
    const {authContext} = useHandleAuth();
    const {onTransition,currentPathContext} = useHandlePath();
    const {register,formState,handleSubmit} = useForm({
        mode:"all",
        reValidateMode:"onSubmit",
        resolver:zodResolver(support_form_schema)
    });
    const {errors} = formState;
    


  return (
    <>
        <NavHome/>
           <Communication
           formState={queryState}
           />
            <section className={"supportPageSection "+currentPathContext.transitionClass}>
                <div className="supportContainer">
                    {/* <div className="iconContainer">
                        <img src="https://cdn.creazilla.com/icons/3430555/support-icon-size_24.png" alt="" />
                    </div> */}
                    <HeaderTitle
                        title="Suporte"
                        hasHrLine
                    />
                    <div className="subtitleContainer">
                        <p>
                           Estamos a sua disposição! Como podemos ajudar?
                        </p>
                    </div>
                    <div className="solicitationContainer">
                        <label htmlFor="solicitation_id">
                            <textarea
                            placeholder="Escreva sua mensagem"
                            {...register("mensagem")}
                            id="solicitation_id"
                            />
                            
                            <div
                            style={{
                                width:"100%",
                            }}
                            >
                                <Warn
                            color="black"
                            warning={errors.mensagem?.message || ""}
                            />
                            </div>

                            <button className="acceptButton"
                            onClick={()=>{
                                handleSubmit((data)=>{
                                !!authContext.userId                            
                                ? onAxiosQuery("post",{
                                    url:"https://onlibrary-api.onrender.com/api/suporte",
                                    type:{post:
                                        {
                                            data:{
                                                fk_id_usuario:authContext.userId,
                                                conteudo:data.mensagem
                                            }
                                        }
                                    },
                                    onResolver:{
                                        then() {
                                            setTimeout(()=>{
                                                onTransition("/support/conclusion",{
                                                    hasReplace:true
                                                })
                                            },1000)
                                        },
                                        catch(error) {
                                            console.log(error)
                                        },
                                    }
                                })
                                : onTransition("/login",{
                                    hasReplace:false
                                })    
                                })()                           
                            }}
                            >
                                {
                                    !!queryState.isLoading
                                    &&
                                    <Spinner
                                    />
                                }
                                Enviar Mensagem
                            </button>
                        </label>
                    </div>
                    {/* <div className="emailContactContainer">
                        <p>
                            inovacompany2025@gmail.com
                        </p>
                    </div> */}
                </div>
            </section>
        <FooterHome/>
    </>
  )
}

export default Support

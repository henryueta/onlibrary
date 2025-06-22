import "./Support.route.css";
import FooterHome from "../../components/footer/home/FooterHome.component"
import NavHome from "../../components/nav/home/NavHome.component"
import HeaderTitle from "../../components/header_title/HeaderTitle.component";
import useAxios from "../../hooks/useAxios";
import Communication from "../../components/communication/Communication.component";
import Spinner from "../../components/spinner/Spinner.component";
import useHandleAuth from "../../hooks/usehandleAuth";
import useHandlePath from "../../hooks/useHandlePath";

const Support = () => {

    // const [supportState,setSupportState] = useReducer(handleSupportState,initialSupportState);
    const {onAxiosQuery,queryState} = useAxios();
    const {authContext} = useHandleAuth();
    const {onTransition,currentPathContext} = useHandlePath();
    

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
                            <textarea name="" id="solicitation_id"/>
                            <button className="acceptButton"
                            onClick={()=>{
                                !!authContext.userId                              
                                ? onAxiosQuery("post",{
                                    url:"http://localhost:4200/contact/post",
                                    type:{post:{data:{}}},
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

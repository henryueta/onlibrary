import "./Support.route.css";
import FooterHome from "../../components/footer/home/FooterHome.component"
import NavHome from "../../components/nav/home/NavHome.component"
import HeaderTitle from "../../components/header_title/HeaderTitle.component";
import { useEffect, useReducer } from "react";
import useAxios from "../../hooks/useAxios";
import Communication from "../../components/communication/Communication.component";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner.component";

const initialSupportState = {

    solicitationValue:"",
    isSent:false

}

const Support = () => {

    useEffect(()=>{

        

    },[])

    // const [supportState,setSupportState] = useReducer(handleSupportState,initialSupportState);
    const {onAxiosQuery,queryState} = useAxios();
    const onNavigate = useNavigate();

  return (
    <>
        <NavHome/>
           <Communication
           formState={queryState}
           />
            <section className="supportPageSection">
                <div className="supportContainer">
                    <div className="iconContainer">
                        <img src="https://cdn.creazilla.com/icons/3430555/support-icon-size_24.png" alt="" />
                    </div>
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
                                onAxiosQuery("post",{
                                    url:"http://localhost:4200/contact/post",
                                    type:{post:{data:{}}},
                                    onResolver:{
                                        then() {
                                            setTimeout(()=>{
                                                onNavigate("/support/conclusion")
                                            },1000)
                                        },
                                        catch(error) {
                                            console.log(error)
                                        },
                                    }
                                })
                            }}
                            >
                                {
                                    !!queryState.isLoading
                                    &&
                                    <Spinner
                                    />
                                }
                                Enviar
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

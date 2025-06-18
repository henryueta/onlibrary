import "./Notification.component.css"
import libraryNotification_icon from "../../assets/imgs/icons/libraryNotification_icon.webp"
import useAxios from "../../hooks/useAxios";
import useHandleLibrary from "../../hooks/useHandleLibrary";
import {useEffect,useRef, useReducer} from "react"
import Dialog from "../dialog/Dialog.component";
import notification_info_icon from "../../assets/imgs/icons/info_notification_icon.png";
import axios from "axios";

interface NotificationProps {
      type:"admin" | "comum",
      id:string,
}

interface UserNotificationProps{
conteudo :string
data_emissao : string
marcado_lido : boolean
tipo : Exclude<NotificationProps,'id'>
titulo:string
}

interface NotificationStateProps {

  userNotifications:UserNotificationProps[],
  isNotificationsView:boolean
  currentNotificationView:null | UserNotificationProps
}

const initialNotificationState:NotificationStateProps = {

  userNotifications:[],
  isNotificationsView:false,
  currentNotificationView:null

}

type NotificationActionProps = 
{
  type:"userNotification",
  value:UserNotificationProps[]
}
|
{
  type:"notificationsView",
  value:boolean
}
|
{
  type:"currentNotification",
  value:UserNotificationProps
}

const handleNotificationState =  (state:NotificationStateProps,action:NotificationActionProps)=>{

    switch (action.type) {
      case "userNotification":
          return {...state,userNotifications:action.value}
      case "notificationsView":
          return {...state,isNotificationsView:action.value}
      case "currentNotification":
        return {...state,currentNotificationView:action.value}
      default:
        return state
    }

}

const Notification = ({type,id}:NotificationProps)=>{

  const [notificationState,setNotificationState] = useReducer(handleNotificationState,initialNotificationState);
  const {onAxiosQuery} = useAxios();
  const {currentLibraryContext} = useHandleLibrary();
  const notification_ref = useRef<HTMLDivElement>(null);



  useEffect(()=>{
    !!currentLibraryContext.libraryId &&
    (()=>{
      const source = axios.CancelToken.source()
      // setInterval(()=>{
    onAxiosQuery("get",{
      url:"http://localhost:3300/notification/get?id_usuario="+id+"&id_biblioteca="+currentLibraryContext.libraryId+"&type="+type,
      type:{
        get:{

        }
      },
      onResolver:{
          then:(result)=>{
            const notification_data = result.data as UserNotificationProps[];
            setNotificationState({
              type:"userNotification",
              value:notification_data
            });
          },
          catch:(error)=>console.log(error)
      }
    },source.token)
    console.log("req feita")
  // },10000)
    })()

  },[currentLibraryContext.libraryId])

useEffect(()=>{

  console.warn(notificationState.isNotificationsView)

},[notificationState.isNotificationsView])

  return (
    <>
   
    {/* <div className="notificationDetailsView">
      aaa
    </div> */}
      {
        !!notificationState.currentNotificationView
        &&
      <Dialog
      closeOnExternalClick={true}
      className="notificationDetailsView"
      title={notificationState.currentNotificationView.titulo}
      children={
        <div>
          <p>{notificationState.currentNotificationView.conteudo}</p>
        </div>
      }
      />
      }
      

    <div className="currentNotificationContainer" onClick={()=>setNotificationState({
          type:"notificationsView",
          value:true
        })}>
          
        {
          !!notificationState.userNotifications.length &&
          !!notificationState.userNotifications.filter((item)=>{
            return item.marcado_lido
          })
          ? <div className="newNotificationContainer"></div>
          : <></>
        }
      <img src={libraryNotification_icon} alt="admin_notification_icon"/>

       {
      !!notificationState.isNotificationsView &&
      <Dialog
      title={
        <h1>
          {`Notificações (
          ${!!notificationState.userNotifications.length 
          ? notificationState.userNotifications.filter((item)=>!item.marcado_lido).length.toString() 
          : "0"}
          )`}
        </h1>
      }
      closeClass="notificationDialogClose"
      closeOnExternalClick={true}
      className="notificationDialog"
      close={{
        onClose:()=>setNotificationState({
          type:"notificationsView",
          value:false
        }),
        closeButton:false,
        timer:50
      }}
      >
      <div ref={notification_ref} className="notificationsContainer">
        {
          !!notificationState.userNotifications.length ?
          notificationState.userNotifications.map((item,index)=>{
              return <div 
              key={index} 
              className="notificationItemContainer"
              onClick={()=>{

                  setTimeout(()=>{
                    setNotificationState({
                      type:"notificationsView",
                      value:false
                    })
                  },50)

                setNotificationState({
                  type:"currentNotification",
                  value:item
                })

                
                
              }}
              >
                  <div className="notificationItemIconContainer">
                      <img src={notification_info_icon} alt="info_notification_icon" />
                  </div>
                  <div className="notificationItemInfoContainer">
                      
                    <div className="notificationItemContentContainer">
                      {item.conteudo}
                    </div>
                    <div className="notificationItemDateContainer">
                      {
                      new Date(item.data_emissao).toLocaleDateString("pt-BR")
                      }
                    </div>
                  </div>
                  {
                    !item.marcado_lido
                    &&
                    <div key={index} className="notificationSituationContainer"></div>
                  }
                </div>
                
             
          })
          : <>Nenhuma notificação</>
        }
      </div>
      </Dialog>
    }


    </div>
    </>
  )

}

export default Notification;

import "./Notification.component.css"
import libraryNotification_icon from "../../assets/imgs/icons/libraryNotification_icon.webp"
import Dialog from "../dialog/Dialog.component";
import notification_info_icon from "../../assets/imgs/icons/info_notification_icon.png";
import useHandleNotification, { NotificationProps } from "../../hooks/useHandleNotification";
import useHandlePath from "../../hooks/useHandlePath";


const Notification = ({type,id}:NotificationProps)=>{

  const {currentPathContext} = useHandlePath()
  const {notificationState,setNotificationState} = useHandleNotification({
    type:type,
    id:id
  });

  return (
    <>
   
    {/* <div className="notificationDetailsView">
      aaa
    </div> */}
      {
        !!notificationState.currentNotification.isView
        &&
      <Dialog
      hasBackgroundBlur={true}
      closeOnExternalClick={true}
      close={{
        closeButton:false,
        timer:50,
        onClose() {
          setNotificationState({
            type:"currentNotification",
            value:{
              isView:false,
              content:null
            }
          })
        },
      }}
      className="notificationDetailsView"
      title={
        <>
            <img src={notification_info_icon} alt="" />
            <span>
               {
                type === "admin"
                ? "Mensagem solicitada"
                : notificationState.currentNotification.content?.titulo
              }
            </span>
          </>
      }
      children={
        <>
        <div className="notificationContentContainer">
          <p>
            {notificationState.currentNotification.content?.conteudo}
          </p>
        
        </div>

          <div className="concludeSolicitation">
            <button 
            className="cancelButton"
            onClick={()=>{
              setNotificationState({
                type:"currentNotification",
                value:{
                  isView:false,
                  content:null
                }
              })
            }}
            >
              Fechar
            </button>
          {
            type === "admin"
            &&
            <button 
              className="acceptButton">
                Marcar como Concluido
            </button>
          }
          </div>
        
        </>
      }
      />
      }
      

    <div className={"currentNotificationContainer "+currentPathContext.transitionClass} onClick={()=>setNotificationState({
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
      <div className="notificationsContainer">
        {
          !!notificationState.userNotifications.length ?
          notificationState.userNotifications.map((notification,index)=>{
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
                  value:{
                    isView:true,
                    content:notification
                  }
                })

                
                
              }}
              >
                  <div className="notificationItemIconContainer">
                      <img src={notification_info_icon} alt="info_notification_icon" />
                  </div>
                  <div className="notificationItemInfoContainer">
                      
                    <div className="notificationItemContentContainer">
                      {notification.conteudo}
                    </div>
                    <div className="notificationItemDateContainer">
                      {
                      new Date(notification.data_emissao).toLocaleDateString("pt-BR")
                      }
                    </div>
                  </div>
                  {
                    !notification.marcado_lido
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

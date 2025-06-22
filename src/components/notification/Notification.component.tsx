import "./Notification.component.css"
import libraryNotification_icon from "../../assets/imgs/icons/libraryNotification_icon.webp"
import Dialog from "../dialog/Dialog.component";
import notification_info_icon from "../../assets/imgs/icons/info_notification_icon.png";
import useHandleNotification, { NotificationProps } from "../../hooks/useHandleNotification";


const Notification = ({type,id}:NotificationProps)=>{


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
        type !== "admin"
        ? notificationState.currentNotification.content?.titulo
        : "Mensagem solicitada" 
      }
      children={
        <div className="notificationContentContainer">
          <p>
            {notificationState.currentNotification.content?.conteudo}
          </p>
        {
          type === 'admin'
          &&
          <div className="concludeSolicitation">
              <button>Marcar como Concluido</button>
          </div>
        }
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

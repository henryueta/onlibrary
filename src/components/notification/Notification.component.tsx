import "./Notification.component.css"
import libraryNotification_icon from "../../assets/imgs/icons/libraryNotification_icon.webp"
import useAxios from "../../hooks/useAxios";
import useHandleLibrary from "../../hooks/useHandleLibrary";
import {useEffect,useState,useRef} from "react"
import Dialog from "../dialog/Dialog.component";
import notification_info_icon from "../../assets/imgs/icons/info_notification_icon.png";

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

const Notification = ({type,id}:NotificationProps)=>{
  const [userNotifications,setUserNotifications] = useState<UserNotificationProps[]>([]);
  const [isNotificationsView,setIsNotificationsView] = useState<boolean>(false);
  const {onAxiosQuery} = useAxios();
  const {currentLibraryContext} = useHandleLibrary();
  const notification_ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
  },[userNotifications])


  useEffect(()=>{
    !!currentLibraryContext.libraryId &&
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
            setUserNotifications(notification_data);
          },
          catch:(error)=>console.log(error)
      }
    })
  // },90000)

  },[currentLibraryContext.libraryId])



  return (
    <>
   


    <div className="currentNotificationContainer" onClick={()=>setIsNotificationsView((prev)=>true)}>
        {
          !!userNotifications.length &&
          !!userNotifications.filter((item)=>{
            return item.marcado_lido
          })
          ? <div className="newNotificationContainer"></div>
          : <></>
        }
      <img src={libraryNotification_icon} alt="admin_notification_icon"/>
       {
      !!isNotificationsView &&
      <Dialog
      title={
        <h1>
          {`Notificações (
          ${!!userNotifications.length 
          ? userNotifications.filter((item)=>!item.marcado_lido).length.toString() 
          : "0"}
          )`}
        </h1>
      }
      closeClass="notificationDialogClose"
      closeOnExternalClick={true}
      className="notificationDialog"
      close={{
        onClose:()=>setIsNotificationsView(false),
        closeButton:false,
        timer:50
      }}
      >
      <div ref={notification_ref} className="notificationsContainer">
        {
          !!userNotifications.length ?
          userNotifications.map((item,index)=>{
              return <>
                <div key={index} className="notificationItemContainer">
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
                
              </>
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

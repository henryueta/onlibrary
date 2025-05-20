import "./Notification.component.css"
import libraryNotification_icon from "../../assets/imgs/icons/libraryNotification_icon.webp"
import useAxios from "../../hooks/useAxios";
import useHandleLibrary from "../../hooks/useHandleLibrary";
import {useEffect,useState} from "react"

interface NotificationProps {
      type:"admin" | "comum",
      id:string
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

  useEffect(()=>{
  },[userNotifications])


  useEffect(()=>{
    !!currentLibraryContext.libraryId &&
    // setInterval(()=>{
    onAxiosQuery("get",{
      url:"http://localhost:5900/notification/get?id_usuario="+id+"&id_biblioteca="+currentLibraryContext.libraryId+"&type="+type,
      type:{
        get:{

        }
      },
      onResolver:{
          then:(result)=>{
            console.log(result)
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
    {
      !!isNotificationsView &&
      <div className="notificationsContainer">
        {
          !!userNotifications.length ?
          userNotifications.map((item,index)=>{
              return <>
                <div key={index} className="notificationItem">
                  {
                    !item.marcado_lido
                    &&
                    <div key={index} className="notificationSituationContainer"></div>
                  }
                  {item.conteudo}
                </div>
              </>
          })
          : <>Nenhuma notificação</>
        }
      </div>
    }


    <div className="currentNotificationContainer" onClick={()=>setIsNotificationsView((prev)=>!prev)}>
        {
          !!userNotifications.length &&
          !!userNotifications.filter((item)=>{
            return item.marcado_lido
          })
          ? <div className="newNotificationContainer"></div>
          : <></>
        }
      <img src={libraryNotification_icon} alt="admin_notification_icon"/>
    </div>
    </>
  )

}

export default Notification;

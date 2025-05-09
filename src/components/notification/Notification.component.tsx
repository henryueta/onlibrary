import "./Notification.component.css"
import libraryNotification_icon from "../../assets/imgs/icons/libraryNotification_icon.webp"


interface NotificationProps {

}

const Notification = ({}:NotificationProps)=>{

  return (
    <div className="currentNotificationContainer">
      <img src={libraryNotification_icon} alt="admin_notification_icon"/>
    </div>
  )

}

export default Notification;

import { useEffect, useReducer } from "react"
import useHandleLibrary from "./useHandleLibrary"
import useAxios from "./useAxios"
import axios from "axios"

export interface NotificationProps {
      type:"biblioteca" | "comum" | "admin",
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
  currentNotification:{
    isView:boolean,
    content: null | UserNotificationProps
  }
}

const initialNotificationState:NotificationStateProps = {

  userNotifications:[],
  isNotificationsView:false,
  currentNotification:{
    isView:false,
    content:null
  }

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
  value:{
    isView:boolean,
    content:UserNotificationProps | null
  }
}


const handleNotificationState =  (state:NotificationStateProps,action:NotificationActionProps)=>{

    switch (action.type) {
      case "userNotification":
          return {...state,userNotifications:action.value}
      case "notificationsView":
          return {...state,isNotificationsView:action.value}
      case "currentNotification":
        return {...state,currentNotification:action.value}
      default:
        return state
    }

}

const useHandleNotification = ({type,id}:NotificationProps)=>{

    const [notificationState,setNotificationState] = useReducer(handleNotificationState,initialNotificationState);
    const {currentLibraryContext} = useHandleLibrary();
    const {onAxiosQuery} = useAxios();
    

    useEffect(()=>{
        !!currentLibraryContext.libraryId &&
        (()=>{
            const source = axios.CancelToken.source()
        // setInterval(()=>{
            onAxiosQuery("get",{
            url:"http://localhost:4200/notification/get?id_usuario="+id+"&id_biblioteca="+currentLibraryContext.libraryId+"&type="+type,
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
        // },10000)
        })()

  },[currentLibraryContext.libraryId,type])

  const onConcludeNotification = (id_notification:string)=>{

    type === 'biblioteca'
    ? "req com id biblioteca"+currentLibraryContext.libraryId+" e id usuario"+id+" para tb_notificacao"
    : 
    type === 'comum'
    ? "req com id do usuario"+id+" para tb_notificacao"
    :
    type === 'admin'
    && "req com id do usuario"+id+" para tb_contato"
    
  }

    return {
        notificationState,
        setNotificationState,
        onConcludeNotification
    }

}

export default useHandleNotification
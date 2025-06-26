import { useEffect, useReducer } from "react"
import useHandleLibrary from "./useHandleLibrary"
import useAxios from "./useAxios"
import axios from "axios"

export interface NotificationProps {
      type:"biblioteca" | "comum" | "admin",
      id:string,
}

interface UserNotificationProps{
id:string,
conteudo :string
data_emissao : string
marcado_lido : boolean
concluido: boolean
tipo : Exclude<NotificationProps,'id'>
titulo:string
}

interface NotificationStateProps {

  userNotifications:UserNotificationProps[],
  isNotificationsView:boolean,
  isUpdated:boolean,
  currentNotification:{
    isView:boolean,
    content: null | UserNotificationProps
  }
}

const initialNotificationState:NotificationStateProps = {

  userNotifications:[],
  isNotificationsView:false,
  isUpdated:false,
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
|
{
  type:"update",
  value:boolean
}


const handleNotificationState =  (state:NotificationStateProps,action:NotificationActionProps)=>{

    switch (action.type) {
      case "userNotification":
          return {...state,userNotifications:action.value}
      case "notificationsView":
          return {...state,isNotificationsView:action.value}
      case "currentNotification":
        return {...state,currentNotification:action.value}
      case "update":
        return {...state,isUpdated:action.value}
      default:
        return state
    }

}

const useHandleNotification = ({type,id}:NotificationProps)=>{

    const [notificationState,setNotificationState] = useReducer(handleNotificationState,initialNotificationState);
    const {currentLibraryContext} = useHandleLibrary();
    const {onAxiosQuery} = useAxios();
    

    useEffect(()=>{

        !!(type.length || notificationState.isUpdated)
            &&
        (()=>{

            const source = axios.CancelToken.source()
            
        // setInterval(()=>{
            onAxiosQuery("get",{
            url:"https://onlibrary-api.onrender.com/api/notificacao",
            type:{
                get:{
                  params:{
                    usuarioId: id,
                    bibliotecaId: !!currentLibraryContext.libraryId?.length 
                    ? currentLibraryContext.libraryId
                    : " "
                    ,
                    tipo: type
                  }
                }
            },
            onResolver:{
                then:(result)=>{
                  console.warn(result.data)
                    const notification_data = result.data.data as UserNotificationProps[];
                    setNotificationState({
                    type:"userNotification",
                    value:notification_data
                    });
                },
                catch:(error)=>console.log(error)
            }
            },source.token)
        // },10000)
            setNotificationState({
              type:"update",
              value:false
            })
        })()

  },[currentLibraryContext.libraryId,type,notificationState.isUpdated])

  const onConcludeNotification = (id_notification:string)=>{

    type === 'admin'
    &&
    onAxiosQuery("put",{
      url:"https://onlibrary-api.onrender.com/api/suporte/concluido"+id_notification,
      type:{
        put:{
          params:{
            id:id_notification
          }
        }
      },
      onResolver:{
        then(result) {
          console.log(result.data)
        },
        catch(error) {
          console.log(error)
        },
      }
    })

  }

  const onReadNotification = (id_notification:string)=>{
    const notification_url = type === 'admin'
    ? `https://onlibrary-api.onrender.com/api/suporte/lido/${id_notification}`
    : `https://onlibrary-api.onrender.com/api/notificacao/lida/${id_notification}`;

    onAxiosQuery("put",{
      url:notification_url,
      type:{
        put:{
          data:{

          },
          params:{
            id:id_notification
          }
        }
      },
      onResolver:{
        then() {
            setNotificationState({
              type:"update",
              value:true
            })
        },
        catch(error) {
          console.log(error)
        },
      }
    })

  }

    return {
        notificationState,
        onConcludeNotification,
        setNotificationState,
        onReadNotification
    }

}

export default useHandleNotification
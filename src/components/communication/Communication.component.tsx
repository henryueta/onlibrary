import ServerMessage from "../message/ServerMessage.component"
import useCommunication from "../../hooks/useHandleCommunication"
import { QueryStateProps } from "../../hooks/useAxios";

interface CommunicationProps {
    formState:QueryStateProps
}

const Communication = ({formState}:CommunicationProps) => {
  
    const {communicationState,setCommunicationState} = useCommunication(formState);

    return (
    <>
         {
           !!communicationState.isSuccessView
          && <ServerMessage
          message={formState.success.message}
          type="success"
          onClose={
            ()=>{
              setCommunicationState({
                type:"success",
                value:false
              })
            }
          }
          />
        }
        {
          !!communicationState.isErrorView
          &&  <ServerMessage
          message={formState.error.message}
          type="error"
          onClose={
            ()=>{
              setCommunicationState({
                type:"error",
                value:false
              })
            }
          }
          />
        }
    </>
  )
}

export default Communication

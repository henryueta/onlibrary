import "./ServerMessage.component.css"
import validated_icon from "../../assets/imgs/icons/small_validated_icon.webp";
import warning_icon from "../../assets/imgs/icons/small_warning_icon.webp";
import Dialog from "../dialog/Dialog.component";

interface ServerMessageProps {

    type:"error" | "success",
    message:string,
    onClose:()=>void

}

const ServerMessage = ({type,message,onClose}:ServerMessageProps) => {
  return (
    <Dialog
              title={
                <div>
                  <img src={
                    type === "success"
                    ? validated_icon
                    : warning_icon
                  } alt={
                    type === "success"
                    ? "success_icon"
                    : "warn_icon"
                  } />
                 {message}
                </div>
              }
              closeOnExternalClick={true}
              className="serverMessageDialog"
              closeClass="closeDialog"
               close={{
                timer:900,
                closeButton:false,
                onClose:()=>{onClose();}
               }}>
                  <></>
              </Dialog>
  )
}

export default ServerMessage

import { RegisterProvider } from "./RegisterContext"

const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <RegisterProvider>
        {children}
    </RegisterProvider>
  )
}

export default AppProvider

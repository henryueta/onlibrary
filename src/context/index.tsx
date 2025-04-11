import { RegisterProvider } from "./RegisterContext"
import { AuthProvider } from "./AuthContext"

const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <AuthProvider>
        <RegisterProvider>
            {children}
        </RegisterProvider>
    </AuthProvider>
  )
}

export default AppProvider

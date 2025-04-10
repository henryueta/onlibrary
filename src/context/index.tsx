import { RegisterProvider } from "./RegisterContext"
import { AuthProvider } from "./AuthContext"

const AppProvider = ({children}:{children:React.ReactElement}) => {
  return (
    <AuthProvider>
        <RegisterProvider>
            {children}
        </RegisterProvider>
    </AuthProvider>
  )
}

export default AppProvider

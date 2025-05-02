import { RegisterProvider } from "./RegisterContext"
import { AuthProvider } from "./AuthContext"
import { LibraryProvider } from "./LibraryContext"

const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <AuthProvider>
        <RegisterProvider>
              <LibraryProvider>
                  {children}
              </LibraryProvider>
        </RegisterProvider>
    </AuthProvider>
  )
}

export default AppProvider

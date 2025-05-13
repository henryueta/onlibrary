import { RegisterProvider } from "./RegisterContext"
import { AuthProvider } from "./AuthContext"
import { LibraryProvider } from "./LibraryContext"
import {PathProvider} from "./PathContext";

const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <PathProvider>
      <AuthProvider>
          <RegisterProvider>
                <LibraryProvider>
                    {children}
                </LibraryProvider>
          </RegisterProvider>
      </AuthProvider>
    </PathProvider>
  )
}

export default AppProvider

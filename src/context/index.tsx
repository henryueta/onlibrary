import { RegisterProvider } from "./RegisterContext"
import { AuthProvider } from "./AuthContext"
import { LibraryProvider } from "./LibraryContext"
import {PathProvider} from "./PathContext";
import { SearchProvider } from "./SearchContext";

const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <PathProvider>
      <SearchProvider>
        <AuthProvider>
            <RegisterProvider>
                  <LibraryProvider>
                      {children}
                  </LibraryProvider>
            </RegisterProvider>
        </AuthProvider>
      </SearchProvider>
    </PathProvider>
  )
}

export default AppProvider

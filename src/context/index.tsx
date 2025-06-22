import { RegisterProvider } from "./RegisterContext"
import { AuthProvider } from "./AuthContext"
import { LibraryProvider } from "./LibraryContext"
import {PathProvider} from "./PathContext";
import { SearchProvider } from "./SearchContext";
import { CategoryProvider } from "./CategoryContext";

const AppProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <PathProvider>
      <CategoryProvider>
        <SearchProvider>
          <AuthProvider>
              <RegisterProvider>
                    <LibraryProvider>
                        {children}
                    </LibraryProvider>
              </RegisterProvider>
          </AuthProvider>
        </SearchProvider>
      </CategoryProvider> 
    </PathProvider>
  )
}

export default AppProvider

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './routes/home/Home.route.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import FirstRegisterStep from './routes/form/register/user/step1/FirstRegisterPage.route.tsx'
import SecondRegisterStep from './routes/form/register/user/step2/SecondRegisterPage.route.tsx'
import ThirdRegisterStep from './routes/form/register/user/step3/ThirdRegisterPage.route.tsx'
import LoginPage from './routes/form/login/LoginPage.route.tsx'
import BookPage from './routes/book/BookPage.route.tsx'
import AppProvider from './context/index.tsx'
import Management from './routes/management/Management.route.tsx'
import Private from './routes/private/Private.route.tsx'
import {path} from './objects/path.object.ts'
import LibraryRegisterPage from './routes/form/register/library/LibraryRegisterPage.route.tsx'
import LibraryChoice from './routes/choice/LibraryChoice.route.tsx'
import OnlineReserve from './routes/reserve/OnlineReserve.route.tsx'
import UserPage from './routes/account/UserPage.route.tsx'
import SearchPage from './routes/search/SearchPage.route.tsx'
import Support from './routes/support/Support.route.tsx'
import Conclusion from './routes/conclusion/Conclusion.route.tsx'



export const router = createBrowserRouter([
  {
    path:path.onFindPath("home_page"),
    element:<Home/>
  },
  {
    path:path.onFindPath("book_page"),
    element:<BookPage/>
  },
  {
    path:path.onFindPath("search_page"),
    element:<SearchPage/>
  },
  {
    path:path.onFindPath("online_reserve"),
    element:<OnlineReserve/>
  },
  {
    path:path.onFindPath("online_reserve_conclusion"),
    element:
      <Conclusion/>
  },
  {
    path:path.onFindPath("support_page"),
    element:
      <Support/>
  },
  {
    path:path.onFindPath("support_conclusion_page"),
    element:
      <Conclusion/>
  },
  {
    path:path.onFindPath("user_login"),
    element:<LoginPage/>
  },
  {
    path:path.onFindPath("user_register_step1"),
    element:<FirstRegisterStep/>
  },
  {
    path:path.onFindPath("user_register_step2"),
    element:<SecondRegisterStep/>
  },
  {
    path:path.onFindPath("user_register_step3"),
    element:<ThirdRegisterStep/>
  },
  {
    path:path.onFindPath("user_page"),
    element:<UserPage/>
  },
  {
    path:"",
    element:""
  },
  {
    path:path.onFindPath("library_register"),
    element:
    <Private>
      <LibraryRegisterPage/>
    </Private>
  },
   {
    path:path.onFindPath("global_management"),
    element:
    <Private>
          <Management 
          management='global'
          mode='default' 
          hasGroupTableCard={true}
          />
    </Private>
  },
  {
    path:path.onFindPath("global_create_data_management"),
    element:
    <Private>
          <Management 
          management='global'
          mode='post' 
          hasGroupTableCard={false}
          />
    </Private>
  },
  {
    path:path.onFindPath("global_list_data_management"),
    element:
    <Private>
          <Management 
          management='global'
          mode='get' 
          hasGroupTableCard={true}
          />
    </Private>
  },
  {
    path:path.onFindPath("global_update_data_management"),
    element:
    <Private>
          <Management
          management='global'
          mode='put'
          hasGroupTableCard={false}
          />
    </Private>
  },
  {
    path:path.onFindPath("library_management"),
    element:
    <Private>
          <Management 
          management='library'
          mode='default' 
          hasGroupTableCard={true}
          />
    </Private>
  },
  {
    path:path.onFindPath("library_create_data_management"),
    element:
    <Private>
          <Management 
          management='library'
          mode='post' 
          hasGroupTableCard={false}
          />
    </Private>
  },
  {
    path:path.onFindPath("library_list_data_management"),
    element:
    <Private>
          <Management 
          management='library'
          mode='get' 
          hasGroupTableCard={true}
          />
    </Private>
  },
  {
    path:path.onFindPath("library_update_data_management"),
    element:
    <Private>
          <Management
          management='library'
          mode='put'
          hasGroupTableCard={false}
          />
    </Private>
  },
  {
    path:path.onFindPath("library_choice"),
    element:
    <Private>
        <LibraryChoice/>
    </Private>
  },
  {
    path:path.onFindPath("library_about"),
    element:
    <Private>
          <Management
          management='library'
          mode='library' 
          hasGroupTableCard={false}
          />
    </Private>
  },
  

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </StrictMode>
)

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
    path:path.onFindPath("library_register"),
    element:
    <Private>
      <LibraryRegisterPage/>
    </Private>
  },
  {
    path:path.onFindPath("library_management"),
    element:
    <Private>
      <Management mode='default' hasGroupTableCard={true}/>
    </Private>
  },
  {
    path:path.onFindPath("create_data_management"),
    element:
    <Private>
      <Management mode='post' hasGroupTableCard={false}/>
    </Private>
  },
  {
    path:path.onFindPath("list_data_management"),
    element:
    <Private>
      <Management mode='get' hasGroupTableCard={true}/>
    </Private>
  },
  {
    path:path.onFindPath("update_data_management"),
    element:
    <Private>
      <Management mode='put'  hasGroupTableCard={false}/>
    </Private>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './routes/home/Home.route.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import FirstRegisterStep from './routes/form/register/step1/FirstRegisterPage.route.tsx'
import SecondRegisterStep from './routes/form/register/step2/SecondRegisterPage.route.tsx'
import ThirdRegisterStep from './routes/form/register/step3/ThirdRegisterPage..route.tsx'
import LoginPage from './routes/form/login/LoginPage.route.tsx'
import BookPage from './routes/book/BookPage.route.tsx'
import AppProvider from './context/index.tsx'
import Management from './routes/admin/Management.route.tsx'
import Private from './routes/private/Private.route.tsx'
import Table from './components/table/Table.component.tsx'
import {pathList,onFindPathIndex} from './routes/global/path.global.ts'

export const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/book/",
    element:<BookPage/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/register/step/name",
    element:<FirstRegisterStep/>
  },
  {
    path:"/register/step/contact",
    element:<SecondRegisterStep/>
  },
  {
    path:"/register/step/password",
    element:<ThirdRegisterStep/>
  },
  {
    path:pathList[onFindPathIndex("library_management")].path,
    element:
    <Private>
      <Management item_management='none' hasGroupTableButton={true}>
        <></>
      </Management>
    </Private>
  },
  {
    path:pathList[onFindPathIndex("book_management")].path,
    element:
    <Private>
    <Management item_management='book' hasGroupTableButton={true}>
        <Table type='book'></Table>
    </Management>
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

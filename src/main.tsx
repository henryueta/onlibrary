import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './routes/home/Home.route.tsx'
import { createBrowserRouter,Link,RouterProvider } from 'react-router-dom'
import FirstRegisterStep from './routes/form/register/user/step1/FirstRegisterPage.route.tsx'
import SecondRegisterStep from './routes/form/register/user/step2/SecondRegisterPage.route.tsx'
import ThirdRegisterStep from './routes/form/register/user/step3/ThirdRegisterPage..route.tsx'
import LoginPage from './routes/form/login/LoginPage.route.tsx'
import BookPage from './routes/book/BookPage.route.tsx'
import AppProvider from './context/index.tsx'
import Management from './routes/admin/Management.route.tsx'
import Private from './routes/private/Private.route.tsx'
import Table from './components/table/Table.component.tsx'
import {pathList,onFindPathIndex} from './routes/global/path.global.ts'
import LibraryRegisterPage from './routes/form/register/library/LibraryRegisterPage.route.tsx'

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
    path:"/register/user/step/name",
    element:<FirstRegisterStep/>
  },
  {
    path:"/register/user/step/contact",
    element:<SecondRegisterStep/>
  },
  {
    path:"/register/user/step/password",
    element:<ThirdRegisterStep/>
  },
  {
    path:"/register/library",
    element:
    <Private>
      <LibraryRegisterPage/>
    </Private>
  },
  {
    path:pathList[onFindPathIndex("library_management")].path,
    element:
    <Private>
      <Management item_management='none' hasGroupTableButton={true}>
        <>
          <Link to={"/register/library"}>Cadastrar biblioteca</Link>
        </>
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

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


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home />
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
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

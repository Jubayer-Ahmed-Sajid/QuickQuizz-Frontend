import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import './index.css'
import { Toaster } from 'sonner'
import AuthProvider from './Components/Authprovider/Authprovider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <Toaster richColors position="top-right" />
    <RouterProvider router={router}></RouterProvider>

    </AuthProvider>
  </StrictMode>,
)

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import MyDashboard from './pages/MyDashboard'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <PublicRoute><LogInPage /></PublicRoute>
  },
  {
    path: "/register",
    element: <SignUpPage />
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><MyDashboard /></PrivateRoute>
  }

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
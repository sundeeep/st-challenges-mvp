import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import ProtectedRoute from './utils/ProtectedRoute'
import MyDashboard from './pages/MyDashboard'
import AppwriteAccount from './appwrite/Account.services'
import AuthRoute from './utils/AuthRoute'


const appwriteAccount = new AppwriteAccount();

async function getCurrentUser() {
  const user = await appwriteAccount.getAppwriteUser()
  return user;
}

const currentUser = await getCurrentUser()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <AuthRoute currentUser={currentUser}><LogInPage /></AuthRoute>
  },
  {
    path: "/register",
    element: <AuthRoute currentUser={currentUser}><SignUpPage /></AuthRoute>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute currentUser={currentUser}><MyDashboard /></ProtectedRoute>
  }

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
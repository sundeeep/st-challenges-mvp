import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Overview from './pages/my-dashboard/Overview'
import MyDashboard from './pages/my-dashboard/MyDashboard'
import Challenges from './pages/my-dashboard/Challenges'
import Settings from './pages/my-dashboard/Settings'
import AdminRoute from './routes/AdminRoute'
import UserProfile from './pages/UserProfile'
import ChallengePage from './pages/challenges/ChallengePage'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient.js'
import TodoApp from './pages/TodoApp'
import { ToastContainer } from 'react-toastify'
import OrdersDashboard from './pages/OrdersDashboard'

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
    path:"/profile",
    element: <PrivateRoute><UserProfile /></PrivateRoute>
  },
  {
    path: "/challenges/:challengeId",
    element: <PrivateRoute><ChallengePage /></PrivateRoute>
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>
                <AdminRoute>
                  <MyDashboard />
                </AdminRoute>
              </PrivateRoute>,
    children: [
      {
        element: <Overview />,
        index: true
      },
      {
        path:"challenges",
        element: <Challenges />
      },
      {
        path:"settings",
        element: <Settings />
      }
    ]
  },
  {
    path:"/todo-app",
    element: <TodoApp />
  },
  {
    path: "/orders-dashboard",
    element: <OrdersDashboard />
  }

])

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer />
  </QueryClientProvider>
)
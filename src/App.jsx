import { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import ForgotPassword from './pages/ForgotPassword';
import SupportPage from './pages/Support';
import EnterprisePage from './pages/Enterprise';
import Pricing from './pages/Pricing';
import Blog from './pages/blog/Blog';
import Checkout from './pages/checkout/Checkout';
import ProtectedRoute from './auth/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Posts from './pages/dashboard/posts/Posts';
import PostDetailPage from './pages/dashboard/posts/PostDetailPage';
import CreatePost from './pages/dashboard/posts/CreatePost';
import Users from './pages/dashboard/users/Users';
import CreateUser from './pages/dashboard/users/CreateUser';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';``
import Bookmarks from './pages/dashboard/Bookmarks';
import '@fontsource/roboto/400.css'; //300,500,700//

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  function toggleDarkMode(){
    setDarkMode(prevMode => !prevMode)
  }
  
  const router = createBrowserRouter(createRoutesFromElements(
          <Route>
            <Route path='/login' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route element={<Layout />}>
              <Route path='/' element={<Blog />} />
              <Route path='/pricing' element={<Pricing />} />
              <Route path='/enterprise' element={<EnterprisePage />} />
              <Route path='/support' element={<SupportPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='dashboard' element={<DashboardLayout darkMode={darkMode} />}>
                 <Route index element={<Dashboard darkMode={darkMode} />}/>
                 <Route path='posts' element={<Posts darkMode={darkMode} />} />
                 <Route path='createpost' element={<CreatePost darkMode={darkMode} />} />
                 <Route path='post/:id' element={<PostDetailPage darkMode={darkMode} />} />
                 <Route path='users' element={<Users darkMode={darkMode} />} />
                 <Route path='createuser' element={<CreateUser darkMode={darkMode} />} />
                 <Route path='profile' element={<Profile darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}/>
                 <Route path='bookmarks' element={<Bookmarks darkMode={darkMode} />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
  ))

  return (
    <RouterProvider router={router} />
  );
}

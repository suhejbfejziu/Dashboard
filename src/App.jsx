import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import ForgotPassword from './pages/ForgotPassword';
import SupportPage from './pages/Support';
import EnterprisePage from './pages/Enterprise';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import Checkout from './pages/checkout/Checkout';
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
  const router = createBrowserRouter(createRoutesFromElements(
          <Route>
            <Route path='/login' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/pricing' element={<Pricing />} />
              <Route path='/enterprise' element={<EnterprisePage />} />
              <Route path='/support' element={<SupportPage />} />
            </Route>
              <Route path='dashboard' element={<DashboardLayout />}>
                 <Route index element={<Dashboard />}/>
                 <Route path='posts' element={<Posts />} />
                 <Route path='createpost' element={<CreatePost />} />
                 <Route path='post/:id' element={<PostDetailPage />} />
                 <Route path='users' element={<Users />} />
                 <Route path='createuser' element={<CreateUser />} />
                 <Route path='profile' element={<Profile />}/>
                 <Route path='bookmarks' element={<Bookmarks />} />
              </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
  ))

  return (
    <RouterProvider router={router} />
  );
}

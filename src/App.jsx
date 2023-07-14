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
import Home from './pages/Home';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Posts from './pages/dashboard/posts/Posts';
import PostDetailPage from './pages/dashboard/posts/PostDetailPage';
import CreatePost from './pages/dashboard/posts/CreatePost';
import Users from './pages/dashboard/users/Users';
import CreateUser from './pages/dashboard/users/CreateUser';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';``
import Bookmarks from './pages/dashboard/Bookmarks';
import useUserStore from './userStore';
import { useQuery } from 'react-query';

export default function App() {
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
  const { isLoading, error } = useQuery('userInfo', fetchUserInfo);

  if(isLoading) return "Loading..."

  if (error) return 'An error has occurred: ' + error.message


  const router = createBrowserRouter(createRoutesFromElements(
        <Route>
          <Route path='/login' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='posts' element={<Posts />} />
            <Route path='post/:id' element={<PostDetailPage />} />
          </Route>
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />}/>
            <Route path='createpost' element={<CreatePost />} />
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

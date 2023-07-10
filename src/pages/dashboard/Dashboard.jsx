import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import Lottie from 'lottie-react'
import animationData from "../../assets/welcome.json"
import useUserStore from '../../userStore';
import useAuthStore from '../../authStore';
import { Balancer } from 'react-wrap-balancer';

export default function Dashboard() {
const navigate = useNavigate()
const user = useUserStore((state) => state.user);
const checkAuthentication = useAuthStore((state) => state.checkAuthentication);

useEffect(() => {
  async function handleAuthentication() {
    const isAuthenticated = await checkAuthentication();
    if (!isAuthenticated) {
      navigate("/login");
  }
  }

  handleAuthentication();
}, []);

return (
  <>
    <ToastContainer 
      position="bottom-left"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <div className='flex text-center' style={{ height: '100vh' }}>
      <div className='w-2/4 bg-gray-100 flex flex-col justify-center'>
        <Balancer className='text-2xl font-medium mx-auto'>Welcome, {user.full_name}</Balancer>
        <Balancer className='mx-auto my-6'>We are delighted to welcome you here. Please feel at home and take advantage of the various services that we offer.</Balancer>
        <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{mx: 'auto'}}>
          {user.isAdmin == 0 ? "" : <Button component={Link} to={'/dashboard/users'}>Users <GroupIcon sx={{ ml: 0.5 }} /></Button>}
          <Button component={Link} to={'/posts'}>Posts <ArticleIcon sx={{ ml: 0.5 }} /></Button>
          <Button component={Link} to={'/dashboard/bookmarks'}>Bookmarks <BookmarkIcon sx={{ ml: 0.5 }} /></Button>
        </ButtonGroup>
      </div>
      <div className='w-2/4 bg-slate-200 flex flex-col justify-center'>
      <Lottie animationData={animationData} style={{height: 300}} />
      <Balancer className='mx-auto'>Our platform helps you manage posts and comments with ease. Explore the features and reach out if needed. Our goal is to make blogging seamless.</Balancer>
      </div>
    </div>
  </>
);
}

import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const actions = [
  { icon: <PersonAddIcon />, name: 'New User', redirect: '/dashboard/createuser' },
  { icon: <PostAddIcon />, name: 'New Post', redirect: '/dashboard/createpost' },
  { icon: <BookmarkAddIcon />, name: 'New Bookmark', redirect: '/dashboard/bookmarks' }
];

export default function Dashboard() {
  const {full_name} = JSON.parse(localStorage.getItem('user'));

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center', height: '100vh', textAlign: 'center'}}>
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
      theme="dark" />
      <Typography variant='h4'>Welcome, {full_name}</Typography>
      <Typography variant='subtitle1' sx={{my:2}}>We're so happy to see you again. How can we assist you today?</Typography>
      <Stack spacing={2} direction={"column"}>
      <Stack spacing={2} direction="row">
          <Button variant='contained' component={Link} to={'/dashboard/users'}>
            Users <GroupIcon sx={{ml: 0.5}} />
          </Button>
        <Button variant="contained" component={Link} to={'/dashboard/posts'}>
          Posts <ArticleIcon sx={{ml: 0.5}} />
        </Button>
      </Stack>
      <Button variant='contained' component={Link} to={'/dashboard/bookmarks'}>
        Bookmarks <BookmarkIcon sx={{ml: 0.5}} />
      </Button>
    </Stack>
    <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            component={Link}
            to={action.redirect}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

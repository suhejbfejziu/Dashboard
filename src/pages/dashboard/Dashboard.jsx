import { useContext } from 'react';
import { UserContext } from '../../auth/UserContext';
import { Link } from 'react-router-dom';
import { Button, Box, Stack, Typography, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const actions = [
  { icon: <PersonAddIcon />, name: 'New User', redirect: '/dashboard/createuser' },
  { icon: <PostAddIcon />, name: 'New Post', redirect: '/dashboard/createpost' },
  { icon: <BookmarkAddIcon />, name: 'New Bookmark', redirect: '/dashboard/bookmarks' }
];

export default function Dashboard() {
  const { userData } = useContext(UserContext);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center', height: '100vh', textAlign: 'center'}}>
      <Typography variant='h4'>Welcome, {userData && userData.full_name}</Typography>
      <Typography variant='subtitle1' sx={{my:2}}>We're so happy to see you again. How can we assist you today?</Typography>
      <Typography variant='body2' sx={{mb:1}}>Go to:</Typography>
      <Stack spacing={2} direction={userData.isAdmin === "true" ? "column" : "row"}>
      <Stack spacing={2} direction="row">
        {userData.isAdmin === "true" && (
          <Button variant='contained' component={Link} to={'/dashboard/users'}>
            Users <GroupIcon sx={{ml: 0.5}} />
          </Button>
        )}
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

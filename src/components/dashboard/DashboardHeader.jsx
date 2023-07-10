import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { getInitials, generateColors } from "../../utils"
import { deepOrange, deepPurple, blue } from '@mui/material/colors';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useUserStore from '../../userStore';
import HomeIcon from '@mui/icons-material/Home';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function DashboardHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [bgColor, setBgColor] = useState(deepOrange[500]);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user);
  const [state, setState] = useState({
    left: false,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogOut(){
    localStorage.clear();
    navigate('/login');
  }
  
  useEffect(() => {
    // generate a random color
    const randomColor = generateColors(deepOrange, deepPurple, blue)
    // set the background color
    setBgColor(randomColor);
  }, []);

  const initials = getInitials(user.full_name);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        { user.isAdmin == 0 ? "" :  <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/users">
            <ListItemIcon><PersonAdd /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        }
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/posts">
            <ListItemIcon><PostAddIcon /></ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/bookmarks">
            <ListItemIcon><BookmarkIcon /></ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/dashboard/profile">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogOut}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      <Typography
        sx={{ marginTop: 'auto', marginBottom: '1rem', alignSelf: 'center' }}
        variant="body2"
      >
        &copy; 2023 Userconnectivity.com
      </Typography>
    </Box>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={'/dashboard'}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            User Connectivity <Typography variant='caption'>Dashboard</Typography>
          </Typography>
          <Box sx={{display: 'flex', ml: 'auto'}}>
          <Box>
            <IconButton id="demo-customized-button" 
              className='cursor-pointer' 
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true" 
              aria-controls={open ? 'demo-customized-menu' : undefined} 
              onClick={handleClick}>
                <Avatar
                  sx={{ bgcolor: bgColor }} >
                  {initials}
                </Avatar>
              </IconButton>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
                <CardActionArea onClick={handleClose} component={Link} to={'/dashboard/profile'}>
                  <CardContent sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar
                      sx={{ bgcolor: bgColor, mr: 1 }} >
                      {initials}
                    </Avatar>
                    <Typography>{user.full_name}</Typography>
                  </CardContent>
                </CardActionArea>
                <MenuItem component={Link} to={'/'} onClick={handleClose} disableRipple>
                  <HomeIcon /> Home
                </MenuItem>
                <MenuItem component={Link} to={'/dashboard'} onClick={handleClose} disableRipple>
                  <DashboardIcon /> Dashboard
                </MenuItem>
              {user.isAdmin == 0 ? "" : 
                <MenuItem component={Link} to={'/dashboard/users'} onClick={handleClose} disableRipple>
                  <PersonAdd /> Users
                </MenuItem> 
              }
                <MenuItem component={Link} to={'/posts'} onClick={handleClose} disableRipple>
                  <PostAddIcon /> Posts
                </MenuItem>
                <MenuItem component={Link} to={'/dashboard/bookmarks'} onClick={handleClose} disableRipple>
                  <BookmarkIcon /> Bookmarks
                </MenuItem>
                <MenuItem component={Link} to={'/dashboard/profile'} onClick={handleClose} disableRipple>
                  <PersonIcon/> Profile
                </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogOut} disableRipple>
                <Logout /> Log out
              </MenuItem>
            </StyledMenu>
          </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

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
import SearchIcon from '@mui/icons-material/Search';
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
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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
  const [isDarkMode, setDarkMode] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
    setDarkMode(initialDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const darkMode = !isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    setDarkMode(darkMode);
  };

  function handleLogOut(){
    axios.get('http://dashboard-adaptech.com/api/logout.php')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  useEffect(() => {
    // generate a random color
    const randomColor = generateColors(deepOrange, deepPurple, blue)
    // set the background color
    setBgColor(randomColor);
  }, []);

  const {full_name} = JSON.parse(localStorage.getItem('user'));

  const initials = getInitials(full_name);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = useState({
    left: false,
  });

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
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <CardActionArea onClick={handleClose} component={Link} to={'/dashboard/profile'}>
          <CardContent sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar
              sx={{ bgcolor: bgColor, mr: 1 }} >
              {initials}
            </Avatar>
            <Typography>{full_name}</Typography>
          </CardContent>
      </CardActionArea>
      <Divider />
      <List>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard"/>
            </ListItemButton>
        </ListItem>
          <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard/users">
              <ListItemIcon><PersonAdd /></ListItemIcon>
              <ListItemText primary="Users"/>
              </ListItemButton>
          </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/posts">
            <ListItemIcon><PostAddIcon /></ListItemIcon>
            <ListItemText primary="Posts"/>
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/bookmarks">
            <ListItemIcon><BookmarkIcon /></ListItemIcon>
            <ListItemText primary="Bookmarks"/>
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/profile">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile"/>
            </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={handleLogOut} disablePadding>
          <ListItemButton>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
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
            DASHBOARD
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <FormControlLabel  control={<MaterialUISwitch sx={{mx: 1}} onClick={toggleDarkMode} checked={isDarkMode} />} />
          <Box sx={{ display: { xs: 'flex' } }}>
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
                    <Typography>{full_name}</Typography>
                  </CardContent>
                </CardActionArea>
                <MenuItem component={Link} to={'/dashboard'} onClick={handleClose} disableRipple>
                    <DashboardIcon /> Dashboard
                  </MenuItem>
                  <MenuItem component={Link} to={'/dashboard/users'} onClick={handleClose} disableRipple>
                    <PersonAdd /> Users
                  </MenuItem> 
                  <MenuItem component={Link} to={'/dashboard/posts'} onClick={handleClose} disableRipple>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

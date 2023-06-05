import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../auth/UserContext';
import { AuthContext } from '../../auth/AuthContext';
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
import { CardActionArea, 
         CardContent, 
         Typography, 
         Menu, 
         MenuItem, 
         Divider, 
         Avatar, 
         Box, 
         SwipeableDrawer, 
         List, 
         ListItem, 
         ListItemButton, 
         ListItemIcon, 
         ListItemText, 
         AppBar,
         Toolbar,
         InputBase } from '@mui/material';

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
  const {userData} = useContext(UserContext);
  const {logout} = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  function logOut(){
    logout()
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

  const initials = getInitials(userData.full_name);

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
            <Typography>{userData.full_name}</Typography>
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
        {
          userData.isAdmin === "true" ? 
          (
          <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard/users">
              <ListItemIcon><PersonAdd /></ListItemIcon>
              <ListItemText primary="Users"/>
              </ListItemButton>
          </ListItem>
          ) : ''
        }
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
        <ListItem onClick={logOut} disablePadding>
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
                    <Typography>{userData.full_name}</Typography>
                  </CardContent>
                </CardActionArea>
                <MenuItem component={Link} to={'/dashboard'} onClick={handleClose} disableRipple>
                    <DashboardIcon /> Dashboard
                  </MenuItem>
                { userData.isAdmin === "true" ? 
                  ( <MenuItem component={Link} to={'/dashboard/users'} onClick={handleClose} disableRipple>
                    <PersonAdd /> Users
                  </MenuItem> ) : ''
                }
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
                <MenuItem onClick={logOut} disableRipple>
                  <Logout /> Log out
                </MenuItem>
            </StyledMenu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

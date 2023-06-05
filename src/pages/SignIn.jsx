import { useState, useContext} from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { UserContext } from '../auth/UserContext';
import { Login } from '../api/login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, 
         InputLabel, 
         OutlinedInput, 
         FormControl, 
         InputAdornment, 
         TextField, 
         Link, 
         Typography, 
         CssBaseline, 
         Box, 
         Grid, 
         Container, 
         Avatar, 
         IconButton, 
         Backdrop,
         CircularProgress,
         Popover } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Dashboard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setUserData} = useContext(UserContext)
    const {login} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    const handleClose = () => {
      setOpen(false);
    };

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const openPopOver = Boolean(anchorEl);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
      const input = document.getElementById('outlined-adornment-password');
      const cursorPosition = input.selectionStart;
      setTimeout(() => {
        input.setSelectionRange(cursorPosition, cursorPosition);
      }, 0);
    };
  
    const handleMouseDownPassword = (event) => {
      if (!showPassword) {
        event.preventDefault();
      }
    };
    
  return (
    <ThemeProvider theme={theme}>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Avatar component={RouterLink} to={"/"} sx={{ m: 2, bgcolor: 'secondary.main' }}>
          <ArrowBackIcon />
      </Avatar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <div>
              <IconButton>
              <Typography
                aria-owns={openPopOver ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <InfoIcon /> 
              </Typography>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={openPopOver}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 2 }}>Welcome to the login page! Please enter your credentials to access your account. We're happy to have you here and look forward to helping you with any questions or concerns you may have. If you have any trouble logging in, don't hesitate to reach out for assistance. We want to make sure you have a smooth and secure experience using our platform. Thank you for choosing us as your trusted partner.</Typography>
                </Popover>
              </IconButton>
            </div>
          </Box>
          <Box component="form" onSubmit={(e) => Login(e, email, password, setUserData, login, navigate)} sx={{ mt: 1 }}>
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              type='email'
              label="Email Address"
              autoComplete="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
            <FormControl fullWidth sx={{ mt: 1}} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name='password'
                fullWidth
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!email || !password}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to={"/forgot-password"} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={"/sign-up"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
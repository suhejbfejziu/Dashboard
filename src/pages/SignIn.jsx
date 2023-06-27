import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import $ from 'jquery';
import { useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = (data) => {
    $.ajax({
      url: 'http://dashboard-adaptech.com/api/login.php',
      type: 'POST',
      data: data,
      success: function(data) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
        setTimeout(() => {
          toast.success(data.success);
        }, 500)
      },
      error: function(error) {
        toast.error(error.responseJSON.error, error.status);
      }
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    const input = document.getElementById('password');
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
      <Avatar component={RouterLink} to={'/'} sx={{ m: 2, bgcolor: 'primary.main' }}>
        <ArrowBackIcon />
      </Avatar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
          }}
        >
          <Box
            sx={{
              marginTop: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center', // Center align the content
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit(handleLogin)}>
            <TextField
              autoFocus
              margin="normal"
              fullWidth
              type="email"
              label="Email Address"
              {...register('email', {required: true})}
              aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <p className='text-red-500 text-sm'>Email is required</p>
              )}
            <FormControl margin='normal' fullWidth variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                {...register('password', {required: true})}
                aria-invalid={errors.password ? "true" : "false"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
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
            {errors.password?.type === "required" && (
                <p className='text-red-500 text-sm'>Password is required</p>
              )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to={'/forgot-password'} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={'/sign-up'} variant="body2">
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

import { useEffect } from "react";
import { useNavigate, Link as RouterLink} from "react-router-dom"
import { useForm } from "react-hook-form";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import useAuthStore from "../authStore";

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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

export default function SignUp(){
  const theme = createTheme();
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm();
  const checkAuthentication = useAuthStore((state) => state.checkAuthentication);

  useEffect(() => {
    async function handleAuthentication() {
      const isAuthenticated = await checkAuthentication();
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/sign-up");
      }
    }

    handleAuthentication();
  }, []);
  
  const handleSignUp = (data) => {
    $.ajax({
      url: "http://dashboard-adaptech.com/api/signup.php",
      type: "POST",
      data: data,
      success: function(data) {
        if (data.error) {
          toast.error(data.error);
        } else if (data.success) {
          toast.success(data.success);
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        }
      },
      error: function(error) {
        toast.error(error);
      }
    });
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
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <PersonIcon />
              </Avatar>
              <Typography sx={{mb:1}} component="h1" variant="h5">
                Sign Up
              </Typography>
              <Typography sx={{mb:1}} className="text-center" variant="subtitle1" color="text.secondary">
                Let's get started by collecting some basic information from you so we can tailor our services to your needs.
              </Typography>
              <Box sx={{mt: 2}} component="form" onSubmit={handleSubmit(handleSignUp)}>
              <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  label="First name"
                  {...register("firstName", {required: true})}
                  aria-invalid={errors.firstName ? "true" : "false"} />
                  {errors.firstName?.type === "required" && (
                    <p className='text-red-500 text-sm'>First Name is required</p>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last name"
                  {...register("lastName", {required: true})}
                  aria-invalid={errors.lastName ? "true" : "false"} />
                  {errors.lastName?.type === "required" && (
                    <p className='text-red-500 text-sm'>Last Name is required</p>
                  )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email", {
                    required: true,
                    validate: validateEmail
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email?.type === "required" && (
                  <p className='text-red-500 text-sm'>Email is required</p>
                )}
                {errors.email?.type === "validate" && (
                  <p className='text-red-500 text-sm'>Invalid email address</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  {...register("password", {
                    required: true,
                    validate: validatePassword,
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === "required" && (
                  <p className='text-red-500 text-sm'>Password is required</p>
                )}
                {errors.password?.type === "validate" && (
                  <p className='text-red-500 text-sm'>Password must be at least 7 characters long, start with an uppercase letter, and contain at least one special character</p>
                )}
              </Grid>
              </Grid>
              <p className="text-sm text-gray-500 mt-2">By clicking Sign Up, you agree to our <a className="text-blue-600" href="#">Terms</a>, <a className="text-blue-600" href="#">Privacy Policy</a> and <a className="text-blue-600" href="#">Cookies Policy</a>.</p>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              </Box>
                <Grid container>
                  <Grid item xs>
                    <Link component={RouterLink} to={'/forgot-password'} variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to={'/login'} variant="body2">
                      Already have account? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      );
}

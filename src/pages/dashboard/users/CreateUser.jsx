import { useState, useEffect } from "react"
import { useNavigate , useLocation, Link} from "react-router-dom"
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import useAuthStore from "../../../authStore";

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function CreateUser(){
  const location = useLocation()
  const {register, formState: {errors}, handleSubmit} = useForm()
  const [showPassword, setShowPassword] = useState(false);
  const userId = location?.state?.user_id
  const navigate = useNavigate()
  const theme = createTheme();
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
  
  const handleCreateUser = (data) => {
    const url = userId ? 'http://dashboard-adaptech.com/api/users.php' : 'http://dashboard-adaptech.com/api/users.php?users';
    const isAdmin = data.isAdmin;
  
    data.isAdmin = isAdmin ? '1' : '0';
    
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function(data) {
        if(data.error){
          toast.error(data.error)
        } else if(data.success){
          toast.success(data.success);
          setTimeout(() => {
            navigate('/dashboard/users');
          }, 1000);
        }
      },
      error: function(error) {
        toast.error(error);
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
        <CssBaseline />
        <Container sx={{ my: 4}} component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonIcon />
            </Avatar>
            <Typography className='uppercase' component="h1" variant="h5">
              {location.state ? "Edit user" : "Create user"}
            </Typography>
            <Box sx={{mt: 2}} component="form" onSubmit={handleSubmit(handleCreateUser)}>
            {userId ? <input type="hidden" {...register('user_id')} value={userId} /> : ""}
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                fullWidth
                label="First name"
                defaultValue={location.state?.first_name || ""}
                {...register("firstName", {required: true})}
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName?.type === "required" && (
                  <p className='text-red-500 text-sm'>First Name is required</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last name"
                defaultValue={location.state?.last_name || ""}
                {...register("lastName", {required: true})}
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName?.type === "required" && (
                  <p className='text-red-500 text-sm'>Last Name is required</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={location.state ? 'New Email' : 'Email'}
                type="email"
                defaultValue={location.state?.email || ""}
                fullWidth
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
            <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">{location.state ? 'New Password' : 'Password'}</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              {...register("password", {
                required: location.state ? false : true,
                validate: location.state ? undefined : validatePassword
              })}
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
              label={location.state ? "New Password" : "Password"}
            />
          </FormControl>
          {errors.password?.type === "required" && (
            <p className='text-red-500 text-sm'>Password is required</p>
          )}
          {errors.password?.type === "validate" && !location.state && (
            <p className='text-red-500 text-sm'>Password must be at least 7 characters long, start with an uppercase letter, and contain at least one special character</p>
          )}
            </Grid>
            </Grid>
            <FormControlLabel
                control={<Checkbox
                  {...register("isAdmin")}
                  defaultChecked={location.state?.isAdmin === 1 ? true : false}
                  color="primary"
                />
                }
                label="Do you want this user to be Admin ?"
              />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {location.state ? "Edit" : "Submit"}
              </Button>
              <Button component={Link} to={"/dashboard/users"} variant="outlined" fullWidth>Cancel</Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}

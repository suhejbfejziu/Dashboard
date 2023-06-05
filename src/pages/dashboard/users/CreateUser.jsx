import { useState, useContext } from "react"
import { useNavigate , useLocation, Link} from "react-router-dom"
import { UserContext } from "../../../auth/UserContext";
import { countries } from "../../../countries";
import swal from "sweetalert";
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min.js';
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, 
         Button, 
         CssBaseline, 
         TextField, 
         Box, 
         Typography, 
         Container, 
         Autocomplete, 
         FormControlLabel,
         Checkbox, 
         FormControl, 
         InputLabel, 
         OutlinedInput, 
         InputAdornment,
         IconButton,
         MenuItem,
         Select,
         Grid,
         Backdrop,
         CircularProgress } from '@mui/material';

export default function CreateUser(){
    const location = useLocation()
    const [firstName, setFirstName] = useState(location.state?.first_name || '')
    const [lastName, setLastName] = useState(location.state?.last_name || '')
    const [email, setEmail] = useState(location.state?.email || '')
    const [password, setPassword] = useState(location.state?.password || '')
    const [country, setCountry] = useState(location.state?.country || '')
    const [gender, setGender] = useState(location.state?.gender || '')
    const [phone, setPhone] = useState(location.state?.phone || '')
    const [birthday, setBirthday] = useState(location.state?.birthday || '')
    const [isAdmin, setIsAdmin] = useState(location.state && location.state.isAdmin === "true" || false)
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const userId = location?.state?.user_id
    const {userData} = useContext(UserContext);
    const navigate = useNavigate()
    const theme = createTheme();

    const countryChangeHandler = (event, value) => {
      if (value) {
        setCountry(value.label);
      } else {
        setCountry('');
      }
    };

    const handleClose = () => {
      setOpen(false);
    };

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

    $(document).ready(function() {
      $('#phone').mask('(000) 000-0000');
   });

  async function CreateUser(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('country', country);
    formData.append('gender', gender);
    formData.append('phone', phone);
    formData.append('birthday', birthday);
    formData.append('isAdmin', Boolean(isAdmin));
    formData.append('NewUser', "NewUser");
  
    if (userId) {
      formData.append('userId', userId);
    }
  
    const url = userId ? 'http://dashboard-adaptech.com/api/users.php' : 'http://dashboard-adaptech.com/api/users.php?users';
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  
    try {
      const response = await axios.post(url, formData, config);
      const { data } = response;
  
      if (data.error) {
        swal('Error', `${data.error}`, 'error');
      } else if (data.success) {
        swal('Success', `${data.success}`, 'success');
        setTimeout(() => {
          navigate('/dashboard/users');
        }, 1500);
      }
    } catch (error) {
      swal('Error', `${error}`, 'error');
    }
  }
        
        return (
            <ThemeProvider theme={theme}>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <CssBaseline />
              { userData.isAdmin === "true" ? 
              (<Container sx={{ my: 4}} component="main" maxWidth="xs">
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
                  <Box sx={{mt: 2}} component="form" name='NewUser' onSubmit={CreateUser}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="first-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="last-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Autocomplete
                        id="country"
                        options={countries}
                        value={country}
                        onChange={countryChangeHandler}
                        autoHighlight
                        isOptionEqualToValue={(option) => option.label || ""}
                        renderOption={(props, option) => (
                          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a country"
                            id="country"
                            name="country"
                            required
                            fullWidth
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                          />
                        )}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl fullWidth >
                      <InputLabel id="demo-simple-select-label">Gender *</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="gender"
                        name="gender"
                        value={gender}
                        label="Gender *"
                        onChange={(e) => {setGender(e.target.value)}}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      fullWidth
                      id="phone"
                      name="phone"
                      type="numeric"
                      label="Phone"
                      value={phone}
                      onChange={(e) => {setPhone(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      fullWidth
                      id="birthday"
                      name="birthday"
                      type="date"
                      label="Birthday"
                      value={birthday}
                      onChange={(e) => {setBirthday(e.target.value)}}
                    />
                  </Grid>
                  </Grid>
                  <FormControlLabel
                      control={<Checkbox onChange={(e) => {setIsAdmin(e.target.checked)}} checked={isAdmin} value="remember" color="primary" />}
                      label="Do you want this user to be Admin ?"
                    />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={!firstName || !lastName || !email || !password || !gender || !phone || !birthday}
                    >
                      {location.state ? "Edit" : "Submit"}
                    </Button>
                    <Button component={Link} to={"/dashboard/users"} variant="contained" fullWidth color="secondary">Cancel</Button>
                  </Box>
                </Box>
              </Container>) : ''}
            </ThemeProvider>
          );
}

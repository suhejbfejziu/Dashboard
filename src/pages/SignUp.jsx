import { useState } from "react"
import { useNavigate, Link as RouterLink} from "react-router-dom"
import { countries } from "../countries";
import swal from "sweetalert";
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min.js';
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, 
         FormControl, 
         InputLabel, 
         Link, 
         TextField, 
         Autocomplete, 
         CssBaseline, 
         Typography,
         Grid, 
         Container, 
         Box, 
         Avatar, 
         MenuItem, 
         Select, 
         Backdrop, 
         CircularProgress } from '@mui/material';

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
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [country, setCountry] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [open, setOpen] = useState(false);
    const theme = createTheme();
    const navigate = useNavigate()
    
    const countryChangeHandler = (event, value) => {
      if (value) {
        setCountry(value.label);
      } else {
        setCountry('');
      }
    };

    $(document).ready(function() {
      $('#phone').mask('(000) 000-0000');
    });

    const handleClose = () => {
      setOpen(false);
    };

    async function SignUp(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("country", country);
      formData.append("gender", gender);
      formData.append("phone", phone);
      formData.append("date", birthday);
      formData.append("isAdmin", Boolean(isAdmin));
      formData.append("NewUser", "NewUser");
    
      try {
        const response = await axios.post(
          "http://dashboard-adaptech.com/api/users.php?users",
          formData
        );
        const data = response.data;
        if (data.error) {
          swal("Error", `${data.error}`, "error");
        } else if (data.success) {
          swal("Success", `${data.success}`, "success");
          setTimeout(() => {
            navigate("/login");
            swal.close()
          }, 1500);
        }
      } catch (err) {
        swal("Error", `${err}`, "error");
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
                <Avatar component={RouterLink} to={'/login'} sx={{ m: 2, bgcolor: 'secondary.main' }}>
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
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                  <Typography className="text-center" variant="subtitle1" color="text.secondary">
                    We'll ask you for some basic information to get you started, and from there, you'll be able to take full advantage of all our features. 
                  </Typography>
                  <Box sx={{mt: 2}} component="form" name='userForm' onSubmit={SignUp}>
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
                  <TextField
                      required
                      fullWidth
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value) }}
                    />
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
                      id="date"
                      name="date"
                      type="date"
                      label="Birthday"
                      value={birthday}
                      onChange={(e) => {setBirthday(e.target.value)}}
                    />
                  </Grid>
                  </Grid>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={!firstName || !lastName || !email || !password || !gender || !phone || !birthday || password !== confirmPassword}
                    >
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

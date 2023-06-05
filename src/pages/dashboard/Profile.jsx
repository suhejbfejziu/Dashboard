import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../auth/UserContext';
import { countries } from '../../countries';
import { getInitials, generateColors } from '../../utils';
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min.js';
import axios from 'axios';
import { deepOrange, deepPurple, blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Button, 
         Tooltip, 
         Accordion, 
         AccordionSummary, 
         AccordionDetails, 
         Typography, 
         Avatar, 
         TextField, 
         Divider, 
         FormControl, 
         InputLabel, 
         Select, 
         MenuItem, 
         Autocomplete, 
         Box,
         Snackbar,
         Alert,
         Switch,
         Backdrop,
         CircularProgress,
         Grid } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Profile({darkMode, toggleDarkMode}){
    const navigate = useNavigate();
    const {userData} = useContext(UserContext);
    const [userId, setUserId] = useState(userData?.user_id || "");
    const [firstName, setFirstName] = useState(userData?.first_name || "");
    const [lastName, setLastName] = useState(userData?.last_name || "");
    const [country, setCountry] = useState(userData?.country || "");
    const [birthday, setBirthday] = useState(userData?.birthday || "");
    const [gender, setGender] = useState(userData?.gender || "");
    const [phone, setPhone] = useState(userData?.phone || "");
    const [email, setEmail] = useState(userData?.email || "");
    const [currentPassword, setCurrentPassword] = useState(userData.password)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("")
    const [bgColor, setBgColor] = useState(deepOrange[500]);
    const [isDirty, setIsDirty] = useState(false);
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    useEffect(() => {
      // generate a random color
      const randomColor = generateColors(deepOrange, deepPurple, blue);
  
      // set the background color
      setBgColor(randomColor);
    }, []);

    const initials = getInitials(userData.full_name);

    $(document).ready(function() {
      $('#phone').mask('(000) 000-0000');
   });

    const handleClose = () => {
      setOpen(false);
    };

    const countryChangeHandler = (event, value) => {
      setIsDirty(true);
      if (value) {
        setCountry(value.label);
      } else {
        setCountry('');
      }
    };


   async function updateInformation(e) {
    e.preventDefault();
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('country', country)
    formData.append('gender', gender)
    formData.append('phone', phone)
    formData.append('date', birthday)
    formData.append('updateInformation', "updateInformation")
  
    try {
      const response = await axios.post('http://dashboard-adaptech.com/api/profile.php', formData)
      const data = response.data
      if(data.error){
        swal('Error', `Error: ${data.error}`, 'error')
      } else if (data.success){
        setSuccessMessage(data.success)
        setOpen(true)
        setTimeout(() => {
          navigate('/login')
          setOpen(false)
        }, 1500)
      }
    } catch (error) {
      swal('Error', `Error: ${error}`, 'error');
    }
  }
  
  async function updatePassword(e){
    e.preventDefault()
    const passwordData = new FormData()
    passwordData.append('userId', userId)
    passwordData.append('password', password)
    passwordData.append('updatePassword', "updatePassword")
  
    try {
      const response = await axios.post('http://dashboard-adaptech.com/api/profile.php', passwordData)
      const data = response.data
  
      if(data.error){
        swal('Error', `Error: ${data.error}`, 'error')
      } else if (data.success){
        setSuccessMessage(data.success)
        setOpen(true)
        setTimeout(() => {
          navigate('/login')
          setOpen(false)
        }, 1500)
      }
    } catch (err) {
      swal('Error', `Error: ${err}`, 'error');
    }
  }
  
  async function deleteUser(user_id) {
    try {
      const response = await axios.delete(`http://dashboard-adaptech.com/api/profile.php?DeleteUser=${user_id}`);
      const data = response.data;
      if (data.error) {
        swal('Error', `Error: ${data.error}`, 'error');
      } else if (data.success) {
        swal('Sorry to see you go!', data.success, 'info');
        setTimeout(() => {
          navigate("/")
          swal.close()
        }, 1500)
      }
    } catch (err) {
      swal('Error', `Error: ${err}`, 'error');
    }
  }
  
    function handleDelete(user_id) {
      swal({
        title: "Confirm is you?",
        text: "To make sure you are the owner of the account, you need to provide your password!",
        icon: "warning",
        dangerMode: true,
        content: {
          element: "input",
          attributes: {
            type: "password",
            placeholder: "Enter your current password",
          },
        },
      }).then((password) => {
        if (password !== currentPassword) {
          swal("Error", "Invalid password", "error");
          return;
        }
        deleteUser(user_id);
      });
    }

    return (
        <Box>
        {successMessage && <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
            <Alert onClose={handleClose} variant='filled' severity="success" sx={{ width: '100%' }}>
                {successMessage}. For changes to take effect, you need to log in again!
            </Alert>
        </Snackbar>}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box className="mx-auto p-8">
          <Box className={darkMode ? "bg-zinc-700 text-white rounded-lg overflow-hidden py-8 px-4" : "bg-white shadow-lg rounded-lg overflow-hidden py-8 px-4"}>
            <Typography variant='h5' sx={{textAlign:'center', textTransform: 'uppercase'}}>Profile</Typography>
            <Box className="h-56 pt-8">
              <Tooltip title={userData.full_name}>
                <Avatar alt="#" src="#" className='mx-auto' sx={{ width: 150, height: 150, bgcolor: bgColor}}>{initials}</Avatar>
              </Tooltip>
            </Box>
            <Box sx={{my:0.5}} component="form" name='profileForm' onSubmit={updateInformation}>
              <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <AccountCircleIcon sx={{mr:1}} /><Typography>Personal Information</Typography>
                  </AccordionSummary>
                    <Divider />
                    <AccordionDetails sx={{my:2}}>
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
                    <Tooltip arrow title="Replace with new email">
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
                    </Tooltip>
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
                    <Grid item xs={12}>
                      <Tooltip arrow title="To make sure you are the owner of the account, you need to provide your password to make changes happen">
                        <TextField id="confirmPassForInfo" name='password' type="password" label="Current Password" fullWidth required value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); setIsDirty(true)}} />
                      </Tooltip>
                    </Grid>
                    </Grid>
                    <Button sx={{mt:1}} disabled={!isDirty || confirmPassword !== currentPassword} variant="contained" type='submit'>Save Changes</Button>
                    </AccordionDetails>
                </Accordion>
                </Box>
                <Divider />
                <Box sx={{my:0.5}} component="form" name="updatePassword" onSubmit={updatePassword}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <SecurityIcon sx={{mr:1}}/><Typography>Sign In & Security</Typography>
                  </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <TextField id='password' name='password' type="password" label="New Password" fullWidth required margin='normal' value={password} onChange={(e) => {setPassword(e.target.value); setIsDirty(true)}} />
                      <Tooltip arrow title="To make sure you are the owner of the account, you need to provide your password to make changes happen">
                        <TextField id="confirmPassForPass" name='password' type="password" label="Current Password" fullWidth required margin='normal' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value);setIsDirty(true)}} />
                      </Tooltip>
                      <Divider />
                      <Button disabled={!isDirty || confirmPassword !== currentPassword} variant="contained" type='submit'>Save Changes</Button>
                    </AccordionDetails>
                </Accordion>
                </Box>
                <Divider />
                <Accordion>
                  <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  >
                    <Typography><ManageAccountsIcon sx={{mr:1}} />Account Management</Typography>
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails>
                    <Typography variant='body2'>Close account</Typography>
                    <Typography>{userData.first_name}, we’re sorry to see you go</Typography>
                    <Button sx={{mt:2}} variant='contained' onClick={() => handleDelete(userData.user_id)} startIcon={<DeleteIcon />}>Continue</Button>
                  </AccordionDetails>
                </Accordion>
                <Divider />
                <Box sx={{my:0.5}}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    {darkMode ? <NightlightIcon sx={{mr: 1}}/> : <LightModeIcon sx={{mr: 1}} />}<Typography>Display Mode</Typography>
                  </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Typography>Choose how your Dashboard experience looks for this device.</Typography>
                      <Typography variant='body2' sx={{mt:1}} color="text.secondary">Activate {darkMode ? "Light" : "Dark"} Mode:</Typography>
                      <Switch onClick={toggleDarkMode} {...label} checked={darkMode} color='primary'/>
                    </AccordionDetails>
                </Accordion>
                </Box>
          </Box>
        </Box>
      </Box> 
    )
}
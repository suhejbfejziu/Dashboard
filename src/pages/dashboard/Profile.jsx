import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getInitials, generateColors } from '../../utils';
import $ from 'jquery';
import axios from 'axios';
import { deepOrange, deepPurple, blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import useUserStore from '../../userStore';
import useAuthStore from '../../authStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '6px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Profile(){
  const navigate = useNavigate();
  const {register, formState: {errors}, handleSubmit} = useForm();
  const {register: register2, formState: {errors: errors2}, handleSubmit: handleSubmit2} = useForm()
  const {register: register3, formState: {errors: errors3}, handleSubmit: handleSubmit3} = useForm()
  const [bgColor, setBgColor] = useState(deepOrange[500]);
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  
  useEffect(() => {
    // generate a random color
    const randomColor = generateColors(deepOrange, deepPurple, blue);

    // set the background color
    setBgColor(randomColor);
  }, []);

  const initials = getInitials(user.full_name);

  const handleInformationChange = (data) => {
    $.ajax({
      url: 'http://dashboard-adaptech.com/api/profile.php',
      type: 'POST',
      data: data,
      success: function(data) {
        toast.success(data.success);
        localStorage.clear();
        setTimeout(() => {
          navigate('/login')
        }, 1500);
      },
      error: function(error) {
        toast.error(error);
      }
    });
  }

  const handlePasswordChange = (data) => {
    $.ajax({
      url: 'http://dashboard-adaptech.com/api/profile.php',
      type: 'POST',
      data: data,
      success: function(data) {
        if(data.error){
          toast.error(data.error)
        } else if(data.success){
          toast.success(data.success);
          localStorage.clear();
          setTimeout(() => {
            navigate('/login')
          }, 1500);
        }
      },
      error: function(error) {
        toast.error(error);
      }
    });
  }

  async function handleDeleteUser(user_id) {
    try {
      const response = await axios.get(`http://dashboard-adaptech.com/api/profile.php?user_id=${user_id}`);
      const data = response.data;
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success(data.success);
        localStorage.clear();
        setTimeout(() => {
          navigate("/")
        }, 1500)
      }
    } catch (error) {
      toast.error('Error', `Error: ${error}`, 'error');
    }
  }
  
  function handleDelete(data) {
    $.ajax({
      url: "http://dashboard-adaptech.com/api/profile.php",
      type: "POST",
      data: data,
      dataType: "json",
      success: function (response) {
        if (response.success) {
          handleDeleteUser(data.user_id);
        } else {
          toast.error(response.error);
        }
      },
      error: function (error) {
        toast.error(error);
      },
    });
  }
  
    return (
        <Box>
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
        <Box className="mx-auto p-8">
          <Box className={"bg-white shadow-lg rounded-lg overflow-hidden py-8 px-4"}>
            <Typography variant='h5' sx={{textAlign:'center', textTransform: 'uppercase'}}>Profile</Typography>
            <Box className="h-56 pt-8">
              <Tooltip title={user.full_name}>
                <Avatar alt="#" src="#" className='mx-auto' sx={{ width: 150, height: 150, bgcolor: bgColor}}>{initials}</Avatar>
              </Tooltip>
            </Box>
            <Box sx={{my:0.5}} component="form" onSubmit={handleSubmit(handleInformationChange)}>
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
                    <input type='hidden' {...register('user_id')} value={user.user_id} />
                    <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="First name"
                        fullWidth
                        defaultValue={user.first_name}
                        {...register('firstName', {required: true})}
                        aria-invalid={errors.firstName ? "true" : "false"}
                      />
                      {errors.firstName?.type === "required" && (
                         <p className='text-red-500 text-sm'>First Name is required</p>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Last name"
                        fullWidth
                        defaultValue={user.last_name}
                        {...register('lastName', {required: true})}
                        aria-invalid={errors.firstName ? "true" : "false"}
                      />
                      {errors.lastName?.type === "required" && (
                         <p className='text-red-500 text-sm'>Last Name is required</p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        defaultValue={user.email}
                        {...register('email', {required: true})}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email?.type === "required" && (
                         <p className='text-red-500 text-sm'>Email is required</p>
                      )}
                    </Grid>
                    </Grid>
                    <Button sx={{mt:2}} variant="contained" type='submit'>Save Changes</Button>
                    </AccordionDetails>
                </Accordion>
                </Box>
                <Divider />
                <Box sx={{my:0.5}} component="form" onSubmit={handleSubmit2(handlePasswordChange)}>
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
                      <input type='hidden' {...register2('user_id')} value={user.user_id} />
                      <TextField 
                      type="password" 
                      {...register2('currentPassword', {required: true})}
                      aria-invalid={errors2.currentPassword ? "true" : "false"} 
                      label="Current Password" 
                      fullWidth
                      margin='normal' 
                      />
                      {errors2.currentPassword?.type === "required" && (
                         <p className='text-red-500 text-sm'>Current Password is required</p>
                      )}
                      <TextField 
                      type="password" 
                      {...register2('newPassword', {required: true})} 
                      aria-invalid={errors2.newPassword ? "true" : "false"}
                      label="New Password" 
                      fullWidth 
                      margin='normal' 
                      />
                      {errors2.newPassword?.type === "required" && (
                         <p className='text-red-500 text-sm'>Password is required</p>
                      )}
                      <Button sx={{mt: 1}} variant="contained" type='submit'>Save Changes</Button>
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
                    <Typography>{user.first_name}, we’re sorry to see you go</Typography>
                    <Button sx={{mt: 2}} variant='contained' onClick={handleOpen}>Continue</Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Confirm if it's you
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          To ensure you are the owner of the account, please provide your password.
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit3(handleDelete)}>
                          <input type='hidden' {...register3('user_id')} value={user.user_id} />
                          <TextField 
                          type='password' 
                          label="Current Password" 
                          margin='normal' 
                          fullWidth 
                          {...register3('password', {required: true})}
                          aria-invalid={errors3.password ? "true" : "false"} />
                          {errors3.password?.type === "required" && (
                              <p className='text-red-500 text-sm'>Current Password is required</p>
                          )}
                          <Button variant='contained' type='submit' sx={{mt: 1}} startIcon={<DeleteIcon />}>Close account</Button>
                        </Box>
                      </Box>
                    </Modal>
                  </AccordionDetails>
                </Accordion>
          </Box>
        </Box>
      </Box> 
    )
}
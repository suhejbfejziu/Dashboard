import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../auth/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../../../api/users';
import { Button, 
         Typography, 
         Table, 
         TableBody, 
         TableCell, 
         TableContainer, 
         TableHead, 
         TableRow, 
         Paper, 
         Tooltip, 
         IconButton, 
         Badge, 
         Tabs, 
         Tab, 
         Box, 
         Alert } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
          {/* <Typography>
          </Typography> */}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Users({darkMode}) {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState(0);
  const {userData} = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    getUsers(value)
    .then(data => setUsers(data))
    .catch(error => console.error(error));
  }, [value]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  function editUser(user_id){
    // Find the selected user from the users array
    const selectedUser = users.find(user => user.user_id === user_id);
    
    // Navigate to the CreateUser component and pass the selected user as state
    navigate('/dashboard/createuser', { state: selectedUser });
  }
  
  return (
    <Box>
    { userData.isAdmin === "true" ? 
      (<Box>
        <Box sx={{textAlign: 'center'}}>
          <Typography sx={{mt:4, mb:2, textTransform: 'uppercase'}} variant='h5'>List of users</Typography>
          <Badge badgeContent={users.length} color="secondary">
            <Link to='/dashboard/createuser'>
              <Button variant="contained">Create new user <PersonAddIcon sx={{ml: 0.5}} /></Button>
            </Link>
          </Badge>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt:2 }}>
            <Tabs textColor={darkMode ? 'inherit' : 'primary'} value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab label="Simple Users" {...a11yProps(0)} />
              <Tab label="Admin Users" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
          {users?.length ? 
                ( <TableContainer className='my-4' component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Country</TableCell>
                        <TableCell align="center">Gender</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Birthday</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow
                          key={user.user_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center" component="th" scope="row">{user.user_id}</TableCell>
                          <TableCell align="center">{user.first_name}</TableCell>
                          <TableCell align="center">{user.last_name}</TableCell>
                          <TableCell align="center">{user.email}</TableCell>
                          <TableCell align="center">{user.country}</TableCell>
                          <TableCell align="center">{user.gender}</TableCell>
                          <TableCell align="center">{user.phone}</TableCell>
                          <TableCell align="center">{user.birthday}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Edit">
                              <IconButton onClick={() => editUser(user.user_id)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete">
                              <IconButton onClick={() => deleteUser(user.user_id, setUsers)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </TableContainer> ) : ( <Alert sx={{mx: 2, justifyContent: 'center'}} severity="info">No Simple Users found!</Alert> )
          }
          </TabPanel>
          <TabPanel value={value} index={1}>
          {users?.length ? 
                ( <TableContainer className='my-4' component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Country</TableCell>
                        <TableCell align="center">Gender</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Birthday</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow
                          key={user.user_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center" component="th" scope="row">{user.user_id}</TableCell>
                          <TableCell align="center">{user.first_name}</TableCell>
                          <TableCell align="center">{user.last_name}</TableCell>
                          <TableCell align="center">{user.email}</TableCell>
                          <TableCell align="center">{user.country}</TableCell>
                          <TableCell align="center">{user.gender}</TableCell>
                          <TableCell align="center">{user.phone}</TableCell>
                          <TableCell align="center">{user.birthday}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Edit">
                              <IconButton onClick={() => editUser(user.user_id)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete">
                              <IconButton onClick={() => deleteUser(user.user_id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </TableContainer>) : ( <Alert sx={{mx: 2, justifyContent: 'center'}} severity="info">No Admin Users found!</Alert> )
          }
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            Item Three
          </TabPanel> */}
        </Box>
        </Box> ) : ''}
    </Box>
  );
}


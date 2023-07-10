import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import $ from 'jquery';
import useUserStore from '../../../userStore';
import useAuthStore from '../../../authStore';

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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const checkAuthentication = useAuthStore((state) => state.checkAuthentication);
  const user = useUserStore((state) => state.user);

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
    function getUsers() {
      let url;
      if (value === 0) {
        url = "http://dashboard-adaptech.com/api/getUsers.php?users=0";
      } else if (value === 1) {
        url = "http://dashboard-adaptech.com/api/getUsers.php?users=1";
      }
    
      $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        },
        success: function(data) {
          console.log(data);
          if (data.error) {
            toast.error(data.error);
          } else {
            setUsers(data.map((user) => ({ ...user, id: user.user_id })));
          }
        },
        error: function(error) {
          toast.error(error.responseJSON.error);
        }
      });
    }
    getUsers();
  }, [value]);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  function handleEditUser(user_id) {
    const selectedUser = users.find(user => user.user_id === user_id);
    navigate('/dashboard/createuser', { state: selectedUser });
  }

  async function handleDeleteUser(user_id) {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      });

      if (willDelete) {
        const response = await axios.get(`http://dashboard-adaptech.com/api/users.php?user_id=${user_id}`);
        const data = response.data;

        if (data.error) {
          toast.error(data.error);
        } else if (data.success) {
          toast.success(data.success);
          setUsers(prevUsers => prevUsers.filter(user => user.user_id !== user_id));
        }
      }
    } catch (error) {
      toast.error(error);
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, align: 'center' },
    { field: 'first_name', headerName: 'First Name', width: 200, align: 'center' },
    { field: 'last_name', headerName: 'Last Name', width: 200, align: 'center' },
    { field: 'email', headerName: 'Email', width: 250, align: 'center' },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => handleEditUser(params.row.user_id)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteUser(params.row.user_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
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
    {user.isAdmin == 0 ? alert('Access Denied') : (
    <Box>
      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ mt: 4, mb: 2, textTransform: 'uppercase' }} variant='h5'>Users</Typography>
          {user.isAdmin == 0 ? "" : <Button LinkComponent={Link} to='/dashboard/createuser' variant="contained">Create new user <PersonAddIcon sx={{ ml: 0.5 }} /></Button>}
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab label="Simple Users" {...a11yProps(0)} />
              <Tab label="Admin Users" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {users?.length ? (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={users}
                  columns={columns.map(column => ({
                    ...column,
                    headerAlign: 'center',
                    align: 'center',
                  }))}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </div>
            ) : (
              <Alert severity="warning">No Simple Users found!</Alert>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {users?.length ? (
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={users}
                  columns={columns.map(column => ({
                    ...column,
                    headerAlign: 'center',
                    align: 'center',
                  }))}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
              </div>
            ) : (
                <Alert severity="warning">No Admin Users found!</Alert>
            )}
          </TabPanel>
        </Box>
      </Box>
    </Box>
      )}
    </>
  );
}

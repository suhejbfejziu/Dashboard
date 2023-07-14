import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCategories } from '../../../api/posts';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import useUserStore from '../../../userStore';
import useAuthStore from '../../../authStore';
import Stack from '@mui/material/Stack';
import Editor from '../../../Editor';

export default function CreatePost() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const postId = location.state?.post_id;
  const theme = createTheme();
  const navigate = useNavigate();
  const [description, setDescription] = useState(location.state?.description || '');
  const user = useUserStore((state) => state.user);
  const checkAuthentication = useAuthStore((state) => state.checkAuthentication);
  
  useEffect(() => {
    async function handleAuthentication() {
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        navigate('/login');
      }
    }

    handleAuthentication();
  }, []);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  const handleEditorChange = (html) => {
    setDescription(html);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const post = $("#createpost").serialize();
    const url = postId
      ? 'http://dashboard-adaptech.com/api/posts.php'
      : 'http://dashboard-adaptech.com/api/posts.php?posts';
    $.ajax({
      url: url,
      type: 'POST',
      data: post,
      success: function (data) {
        toast.success(data.success);
        setTimeout(() => {
          navigate('/posts');
        }, 1000);
      },
      error: function (error) {
        console.log(error)
        toast.error(error);
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ my: 4 }} component="main" maxWidth="md">
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
          theme="dark"
        />
        <CssBaseline />
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <PostAddIcon />
            </Avatar>
            <Typography className="uppercase" component="h1" variant="h5">
              {location.state ? 'Edit Post' : 'Create post'}
            </Typography>
          </Box>
          <form id="createpost" onSubmit={handleCreatePost}>
            {postId && (
              <input
                type="hidden"
                id="post_id"
                name="post_id"
                value={postId}
              />
            )}
            <input
              type="hidden"
              id="user_id"
              name="user_id"
              value={user.user_id}
            />
            <TextField
              autoFocus
              margin="normal"
              fullWidth
              required
              id="title"
              name="title"
              type="text"
              label="Title"
              defaultValue={location.state?.title || ''}
            />
            <FormControl sx={{ mb: 3 }} fullWidth margin="normal">
              <InputLabel id="select-category">Category *</InputLabel>
              <Select
                labelId="select-category"
                label="Category"
                required
                id="category_id"
                name="category_id"
                defaultValue={location.state?.category_id || ''}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              type="hidden"
              id="createdAt"
              name="createdAt"
              value={moment().format()}
            />
            <Editor placeholder={'Write something...'} value={description} onEditorChange={handleEditorChange}/>
            <input
              type="hidden"
              id="description"
              name="description"
              value={description}
            />
            <Stack sx={{my: 2}} spacing={2} direction="row">
              <Button component={Link} to="/posts" variant="outlined" fullWidth>
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                {location.state ? 'Edit' : 'Post'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

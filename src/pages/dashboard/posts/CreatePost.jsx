import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCategories } from '../../../api/posts';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
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

export default function CreatePost() {
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const {register, formState: {errors}, handleSubmit} = useForm()
    const postId = location.state?.post_id;
    const {user_id} = JSON.parse(localStorage.getItem('user'))
    const theme = createTheme();
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
        .then(data => setCategories(data))
        .catch(error => console.error(error));
      }, [])
      
    const handleCreatePost = (data) => {
        const url = postId ? 'http://dashboard-adaptech.com/api/posts.php' : 'http://dashboard-adaptech.com/api/posts.php?posts';
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: function(data) {
            toast.success(data.success);
            setTimeout(() => {
                navigate('/dashboard/posts');
              }, 1500);
            },
            error: function(error) {
              toast.error(error);
            }
          });
      };

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ my: 4 }} component="main" maxWidth="xs">
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
                <Box>
                    <Box                    
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <PostAddIcon />
                        </Avatar>
                        <Typography className="uppercase" component="h1" variant="h5">
                            {location.state ? 'Edit Post' : 'Create post'}
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit(handleCreatePost)} sx={{ mt: 1 }}>
                        {postId ? <input type="hidden" {...register('post_id')} value={postId} /> : ""}
                        <input type='hidden' {...register('user_id')} value={user_id} />
                        <TextField
                            autoFocus
                            margin="normal"
                            fullWidth
                            type="text"
                            label="Title"
                            defaultValue={location.state?.title || ""}
                            {...register('title', {required: true})}
                            aria-invalid={errors.title ? "true" : "false"}
                        />
                        {errors.title?.type === "required" && (
                            <p className='text-red-500 text-sm'>Title is required</p>
                        )}
                        <TextField
                            margin="normal"
                            fullWidth
                            multiline
                            rows={4}
                            type="text"
                            defaultValue={location.state?.body || ""}
                            label="What's on your mind?"
                            {...register('body', {required: true})}
                            aria-invalid={errors.body ? "true" : "false"}
                        />
                        {errors.body?.type === "required" && (
                            <p className='text-red-500 text-sm'>Description is required</p>
                        )}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="select-category">Category</InputLabel>
                            <Select
                                labelId="select-category"
                                label="Category"
                                {...register('category', {required: true})}
                                aria-invalid={errors.category ? "true" : "false"}
                                defaultValue=""
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.category?.type === "required" && (
                            <p className='text-red-500 text-sm'>Category is required</p>
                        )}
                        <TextField
                            margin="normal"
                            fullWidth
                            type="datetime-local"
                            label="CreatedAt"
                            defaultValue={location.state?.createdAt || ""}
                            {...register('createdAt', {required: true})}
                            aria-invalid={errors.createAt ? "true" : "false"}
                        />
                        {errors.createdAt?.type === "required" && (
                            <p className='text-red-500 text-sm'>Created At is required</p>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {location.state ? 'Edit' : 'Post'}
                        </Button>
                        <Button component={Link} to={"/dashboard/posts"} variant="outlined" fullWidth>Cancel</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

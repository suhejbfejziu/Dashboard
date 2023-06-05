import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../../../auth/UserContext';
import { createPost, getCategories } from '../../../api/posts';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Avatar, 
         Button, 
         CssBaseline, 
         TextField, 
         InputLabel, 
         MenuItem, 
         FormControl, 
         Select, 
         Box, 
         Typography, 
         Container, 
         Backdrop, 
         CircularProgress } from '@mui/material';

export default function CreatePost() {
    const location = useLocation();
    const {userData} = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState(location.state?.title || '');
    const [body, setBody] = useState(location.state?.body || '');
    const [categoryId, setCategoryId] = useState('');
    const [createdAt, setCreatedAt] = useState(
        location.state?.createdAt ||
        (new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0, 16))
    );
    const [open, setOpen] = useState(false);
    const postId = location.state?.post_id;
    const theme = createTheme();
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
        .then(data => setCategories(data))
        .catch(error => console.error(error));
      }, [])
      
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <ThemeProvider theme={theme}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Container sx={{ my: 4 }} component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PostAddIcon />
                    </Avatar>
                    <Typography className="uppercase" component="h1" variant="h5">
                        {location.state ? 'Edit Post' : 'Create post'}
                    </Typography>
                    <Box component="form" name="postForm" onSubmit={(e) => createPost(e, userData, categoryId, title, body, createdAt, postId,  navigate)} sx={{ mt: 1 }}>
                        <TextField type="hidden" name="postId" value={postId} />
                        <TextField
                            autoFocus
                            margin="normal"
                            required
                            fullWidth
                            id="author"
                            name="author"
                            type="text"
                            label="Author"
                            autoComplete="author"
                            value={userData.full_name}
                        />
                        <TextField
                            autoFocus
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            name="title"
                            type="text"
                            label="Title"
                            autoComplete="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="body"
                            name="body"
                            type="text"
                            label="What's on your mind?"
                            value={body}
                            onChange={(e) => {
                                setBody(e.target.value);
                            }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="category"
                                name="category"
                                required
                                label="Category"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)} // Updated event handler
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="date"
                            name="date"
                            type="datetime-local"
                            label="CreatedAt"
                            value={createdAt}
                            onChange={(e) => {
                                setCreatedAt(e.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!title || !body || !createdAt} // Updated condition
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {location.state ? 'Edit' : 'Post'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

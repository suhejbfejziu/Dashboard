import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBookmarks, getSavedPosts } from "../../api/bookmarks";
import { getTimeElapsed } from "../../utils";
import axios from "axios";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from "../../userStore";
import useAuthStore from "../../authStore";

const defaultTheme = createTheme();

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
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
    getBookmarks(user.user_id)
      .then(data => setBookmarks(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    getSavedPosts(bookmarks)
      .then(data => setSavedPosts(data))
      .catch(error => console.error(error));
  }, [bookmarks]);

  async function handleBookmarkRemove(post_id) {
    try {
      const response = await axios.get(`http://dashboard-adaptech.com/api/bookmarks.php?post_id=${post_id}&user_id=${user.user_id}`);
      const { data } = response;
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success(data.success);
        setSavedPosts(prevSavedPosts =>
          prevSavedPosts.filter(savedPost => savedPost.post_id !== post_id)
        );
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return ( 
    <ThemeProvider theme={defaultTheme}>
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
      <main>
        <Box
          sx={{
            pt: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{textTransform: "uppercase"}}
            >
              Saved Posts
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        {savedPosts?.length ? 
        <Grid container spacing={4}>
            {savedPosts.map((post) => (
              <Grid item key={post.post_id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea component={Link} to={`/post/${post.post_id}`}>
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography sx={{wordBreak: 'break-all'}} gutterBottom variant="h5" component="h2">
                    {post.title.length > 15 ? post.title.substring(0, 25) + "..." : post.title}
                    </Typography>
                    <Typography sx={{wordBreak: 'break-all'}} variant="subtitle1" gutterBottom>
                    {post.description.length > 25 ? post.description.substring(0, 50) + "..." : post.description}
                    </Typography>
                    <Button variant="outlined">Read more...</Button>
                  </CardContent>
                  </CardActionArea>
                  <Divider />
                  <CardActions>
                    <Button size="small">{getTimeElapsed(post.createdAt)}</Button>
                    <Box sx={{ml: 'auto'}}>
                    <Tooltip arrow title="Unsave">
                    <IconButton onClick={() => handleBookmarkRemove(post.post_id)}>
                      <BookmarkRemoveIcon />
                    </IconButton>
                    </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid> : 
            <Box>
              <Alert severity="info">It looks like you don't have any posts saved on your bookmarks yet. Don't worry, you can start bookmarking posts by clicking the bookmark icon on any post you find interesting or useful. Then, you can easily access them later by going to your bookmarks tab. Happy bookmarking!</Alert>
              <Box sx={{textAlign: 'center'}}>
                <Button component={Link} to="/posts" variant="contained" sx={{mt:2}}>Go to posts</Button>
              </Box>
            </Box> }
        </Container>
      </main>
    </ThemeProvider>
  );
}
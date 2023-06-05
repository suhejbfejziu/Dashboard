import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../../auth/UserContext';
import { getBookmarks, getSavedPosts, bookmarkRemove } from "../../api/bookmarks";
import { getTimeElapsed } from "../../utils";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CardActionArea, 
         Divider, 
         IconButton, 
         Tooltip, 
         Button, 
         Card, 
         CardActions, 
         CardContent, 
         CardMedia, 
         CssBaseline, 
         Grid, 
         Box, 
         Typography, 
         Container, 
         Alert } from "@mui/material";
        
const defaultTheme = createTheme();

export default function Bookmarks() {
const {userData} = useContext(UserContext);
const [bookmarks, setBookmarks] = useState([]);
const [savedPosts, setSavedPosts] = useState([]);

useEffect(() => {
  getBookmarks(userData.user_id)
    .then(data => setBookmarks(data))
    .catch(error => console.error(error));
}, []);

useEffect(() => {
  getSavedPosts(bookmarks)
    .then(data => setSavedPosts(data))
    .catch(error => console.error(error));
}, [bookmarks]);

  return ( 
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            pt: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Saved Posts
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        {savedPosts?.length ? <Grid container spacing={4}>
            {savedPosts.map((post) => (
              <Grid item key={post.post_id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea component={Link} to={`/dashboard/post/${post.post_id}`}>
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
                    {post.body.length > 25 ? post.body.substring(0, 50) + "..." : post.body}
                    </Typography>
                    <Typography variant="body2">{post.category_name}</Typography>
                  </CardContent>
                  </CardActionArea>
                  <Divider />
                  <CardActions>
                    <Button size="small">{post.author_name}</Button>
                    <Button size="small">{getTimeElapsed(post.createdAt)}</Button>
                    <Box sx={{ml: 'auto'}}>
                    <Tooltip arrow title="Unsave">
                    <IconButton onClick={() => bookmarkRemove(post, userData, setSavedPosts)}>
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
                <Button component={Link} to="/dashboard/posts" variant="contained" sx={{mt:1.5}}>Go to posts</Button>
              </Box>
            </Box> }
        </Container>
      </main>
    </ThemeProvider>
  );
}
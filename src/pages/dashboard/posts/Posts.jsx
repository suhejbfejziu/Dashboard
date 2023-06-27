import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getPosts } from '../../../api/posts';
import { getTimeElapsed } from '../../../utils';
import { Link, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import axios from 'axios';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';

export default function Posts({darkMode}) {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate()
  const typeFilter = searchParams.get("category")

  useEffect(() => {
    getPosts()
    .then(data => setPosts(data))
    .catch(error => console.error(error));
  }, [])
  
  function handleEditPost(post_id){
  const selectedPost = posts.find(post => post.post_id === post_id)
  navigate('/dashboard/createpost', {state: selectedPost})
  }

  async function handleDeletePost(post_id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.get(`http://dashboard-adaptech.com/api/posts.php?post_id=${post_id}`);
          const { data } = response;
          if (data.error) {
            toast.error(data.error);
          } else if (data.success) {
            toast.success(data.success);
            setPosts(prevPosts => prevPosts.filter(post => post.post_id !== post_id));
          }
        } catch (error) {
          toast.error(error);
        }
      }
    });
  }  
  
    function handleSavePost(post_id) {
      const savedPost = new FormData();
      const {user_id} = JSON.parse(localStorage.getItem('user'));
      savedPost.append('post_id', post_id);
      savedPost.append('user_id', user_id);
      savedPost.append('setBookmark', 'setBookmark')
      
      axios.post('http://dashboard-adaptech.com/api/bookmarks.php', savedPost)
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else if (response.data.success) {
          toast.success(response.data.success);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }   

  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
        if (value === null) {
            prevParams.delete(key)
        } else {
            prevParams.set(key, value)
        }
        return prevParams
    })
}

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedPosts = searchParams.get("category")
  ? posts.filter(post => post.category_name === searchParams.get("category"))
  : posts;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = displayedPosts.slice(indexOfFirstItem, indexOfLastItem);
  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(posts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  const renderPageNumbers = (
    <Pagination count={Math.ceil(posts.length / itemsPerPage)} color="primary" onChange={(event, value) => handlePageClick(value)} />
    );

    const uniqueCategories = [...new Set(posts.map(post => post.category_name))];

    const categoryItems = uniqueCategories.map(category => {
      const numPosts = posts.filter(post => post.category_name === category).length;
      return (
        <MenuItem key={category} value={category}>
          {category} ({numPosts})
        </MenuItem>
      );
    });
    
  const postsEl = currentPosts.map((item) => {
    return (
      <Card key={item.post_id} sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to={`/dashboard/post/${item.post_id}`}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          image="https://source.unsplash.com/random?wallpapers"
        />
          <CardContent>
            <Typography className="break-all" gutterBottom variant="h5">
              {item.title.length > 15 ? item.title.substring(0, 25) + "..." : item.title}
            </Typography>
            <Typography className="break-all" gutterBottom variant="body2" color="text.secondary">
              {item.body.length > 25 ? item.body.substring(0, 50) + "..." : item.body}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {item.category_name}
            </Typography>
            <Button variant="contained">Read more</Button>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions>
          <Tooltip title="Edit" arrow>
            <IconButton aria-label="edit" onClick={() => handleEditPost(item.post_id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton aria-label="delete" onClick={() => handleDeletePost(item.post_id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow>
            <IconButton aria-label="bookmark" onClick={() => handleSavePost(item.post_id)}>
              <BookmarkBorderIcon />
            </IconButton>
          </Tooltip>
          <Box className="ml-auto text-center">
              <Box sx={{display: 'flex', flexWrap:'wrap'}}>
                <Tooltip arrow title="Published by">
                  <Typography gutterBottom variant="body2" color="text.secondary">{item.author_name} {getTimeElapsed(item.createdAt)}</Typography>
                </Tooltip>
              </Box>
          </Box>
        </CardActions>
      </Card>
    );
  });

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
        <Box sx={{textAlign: 'center'}} >
          <Typography sx={{mt:4, mb:2, textTransform: 'uppercase'}} variant='h5'>List of posts</Typography>
          <Badge badgeContent={posts.length} color="secondary">
            <Link to='/dashboard/createpost'>
              <Button variant="contained">Create new post <PostAddIcon sx={{ml: 0.5}}/></Button>
            </Link>
          </Badge>
        </Box>
      { displayedPosts?.length ? 
      (
          <Box className="mb-8">
            <Typography sx={{ml: 2, mb: 1, textTransform: 'uppercase'}} variant="body2" color={darkMode ? "white" : "text.secondary"}>Filter by Categories <FilterAltIcon /></Typography>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
                <Box>
                <FormControl sx={{minWidth: 160, mx: 2}}>
                  <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                  <Select
                    value={typeFilter || ''}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Categories"
                    onChange={event => handleFilterChange('category', event.target.value)}
                  >
                    <MenuItem value="">
                      <em>All categories</em>
                    </MenuItem>
                    {categoryItems}
                  </Select>
                </FormControl>
                </Box>
                <Box>
                  {typeFilter ? (
                      <Button variant="contained"
                        onClick={() => {setCategory(''); handleFilterChange("category", null)}}
                      >Clear filter</Button>
                  ) : null}
                </Box>
            </Box>
            <section className="flex justify-center flex-wrap gap-5">
              {postsEl}
            </section>
            <ul className="flex justify-center my-6">
              {renderPageNumbers}
            </ul>
        </Box>
          ) :
          (
            <Box>
              <Typography sx={{ml: 2, mb: 1}} variant="body2" color="text.secondary">Filter by Categories <FilterAltIcon /></Typography>
              <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
                  <Box>
                  <FormControl sx={{minWidth: 160, mx: 2}}>
                    <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                    <Select
                      value={typeFilter || ''}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Categories"
                      onChange={event => handleFilterChange('category', event.target.value)}
                    >
                      <MenuItem value="">
                        <em>All categories</em>
                      </MenuItem>
                      {categoryItems}
                    </Select>
                  </FormControl>
                  </Box>
                  <Box>
                    {typeFilter ? (
                        <Button variant="contained"
                          onClick={() => {setCategory(''); handleFilterChange("category", null)}}
                        >Clear filter</Button>
                    ) : null}
                  </Box>
              </Box>
              <Box>
                <Container maxWidth="md">
                  <Alert sx={{mx: 2, justifyContent: 'center'}} severity="info">{typeFilter ? "Unfortunately, we did not find any posts that match the selected filter. Please try clearing the filter to see more options." : "It seems like you haven't created any posts yet, but don't worry! You can easily create one by clicking the Create New Post button and filling out the text fields with whatever you'd like to share."}</Alert>
                </Container>
              </Box>
            </Box>
          )
      }
    </Box>
  );
}

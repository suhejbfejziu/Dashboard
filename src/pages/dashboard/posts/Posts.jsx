import { useEffect, useState } from 'react';
import { getAllPosts } from '../../../api/posts';
import { getTimeElapsed } from '../../../utils';
import { Link, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import axios from 'axios';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
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
import useUserStore from '../../../userStore';
import useAuthStore from '../../../authStore';
import { useNavigate } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const typeFilter = searchParams.get("category")
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated)
  const checkAuthentication = useAuthStore((state) => state.checkAuthentication);
  const navigate = useNavigate()

  useEffect(() => {
    async function handleAuthentication() {
      await checkAuthentication();
    }

    handleAuthentication();
  }, []);

  useEffect(() => {
    getAllPosts()
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
          const response = await axios.post(`http://dashboard-adaptech.com/api/posts.php?delete_post=${post_id}`);
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
    savedPost.append('post_id', post_id);
    savedPost.append('user_id', user.user_id);
    
    axios.post('http://dashboard-adaptech.com/api/bookmarks.php', savedPost)
    .then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
      } else if (response.data.success) {
        const successMessage = (
          <span>
            {response.data.success}{' '}
            <Link className='underline text-white' to="/dashboard/bookmarks">Go to Bookmarks</Link>
          </span>
        );
        toast.success(successMessage);
      }
    })
    .catch((error) => {
      toast.error(error);
    });
  }   

  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value); // Include the value parameter
      }
      return prevParams;
    });
    setCategory(value)
  }

  const uniqueCategories = [...new Set(posts.map(post => post.category_id))];
// Update this part
  const categoryItems = uniqueCategories.map((categoryId) => {
    const categoryName = posts.find((post) => post.category_id === categoryId)?.category_name || '';
    const numPosts = posts.filter((post) => post.category_id === categoryId).length;
    return (
      <MenuItem key={categoryId} value={categoryName}>
        {categoryName} ({numPosts})
      </MenuItem>
    );
  });
    
// Update this line
  const displayedPosts = searchParams.get('category')
    ? posts.filter((post) => post.category_name === searchParams.get('category'))
    : posts;

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
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
    
  const postsEl = currentPosts.map((item) => {
    return (
      <Card key={item.post_id} sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to={`/post/${item.post_id}`}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          image="https://source.unsplash.com/random?wallpapers"
        />
          <CardContent>
            <Typography className="break-all underline" gutterBottom variant="h5">
              {item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {item.category_name}
            </Typography>
            <Button variant="outlined">Read more...</Button>
          </CardContent>
        </CardActionArea>
        <Divider />
        {isLoggedIn && 
          <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
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
          </CardActions>
        }
          <Box sx={{textAlign: 'center', my: 1}}>
            <Tooltip arrow title="Posted">
              <Typography gutterBottom variant="body2" color="text.secondary">{getTimeElapsed(item.createdAt)}</Typography>
            </Tooltip>
          </Box>
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
        <section className="mt-6 mb-12 flex items-center">
          <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
          <p className='text-center text-2xl font-medium underline mb-4 uppercase'>Posts</p>
            <div className="bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col justify-center items-center p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                  {isLoggedIn &&
                  <Link to='/dashboard/createpost'>
                  <Button variant='contained'>
                    <PostAddIcon sx={{mr: 0.5}}/>Create new post 
                  </Button>
                  </Link>
                  }
                  <FormControl sx={{width: 140}}>
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                      value={category || ''} // Update the value prop
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Filter"
                      onChange={event => handleFilterChange('category', event.target.value)}
                    >
                      {categoryItems}
                    </Select>
                  </FormControl>
                  <Box>
                    {typeFilter ? (
                        <Button variant="outlined"
                          onClick={() => {setCategory(''); handleFilterChange("category", null)}}
                        >Clear filter</Button>
                    ) : null}
                  </Box>
              </div>
            </div>
          </div>
        </section>
        <Box className="m-4">
          <section className="flex justify-center flex-wrap gap-5">
            {postsEl?.length ? postsEl : <Alert severity='warning'>No posts found!</Alert>}
          </section>
          <ul className="flex justify-center my-6">
            {renderPageNumbers}
          </ul>
      </Box>
    </Box>
  );
}

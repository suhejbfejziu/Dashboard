import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../auth/UserContext';
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost, savePost } from '../../../api/posts';
import { getTimeElapsed } from '../../../utils';
import { Link, useSearchParams } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, 
         IconButton, 
         Tooltip, 
         Pagination, 
         Badge, 
         Card, 
         CardActions, 
         CardContent, 
         CardMedia, 
         Typography, 
         CardActionArea, 
         Divider,
         Box, 
         InputLabel, 
         MenuItem, 
         FormControl, 
         Select, 
         Alert } from "@mui/material";

export default function Posts({darkMode}) {
  const [posts, setPosts] = useState([]);
  const {userData} = useContext(UserContext);
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
  
  function editPost(post_id){
  const selectedPost = posts.find(post => post.post_id === post_id)
  navigate('/dashboard/createpost', {state: selectedPost})
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
            <IconButton aria-label="edit" onClick={() => editPost(item.post_id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton aria-label="delete" onClick={() => deletePost(item.post_id, setPosts)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip arrow>
            <IconButton aria-label="bookmark" onClick={() => savePost(item, userData.user_id)}>
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
                  <Alert sx={{mx: 2, justifyContent: 'center'}} severity="info">{typeFilter ? "Unfortunately, we did not find any posts that match the selected filter. Please try clearing the filter to see more options." : "It seems like you haven't created any posts yet, but don't worry! You can easily create one by clicking the Create New Post button and filling out the text fields with whatever you'd like to share."}</Alert>
              </Box>
            </Box>
          )
      }
    </Box>
  );
}

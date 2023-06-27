import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getPost } from "../../../api/posts";
import { getComments } from "../../../api/comments";
import { getTimeElapsed } from "../../../utils";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import $ from 'jquery';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
  
export default function PostDetailPage(){
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [dialog, setDialog] = useState(false);
    const [dialogEdit, setDialogEdit] = useState(false);
    const {register, handleSubmit} = useForm()
    const params = useParams()
    const {...comment} = JSON.parse(localStorage.getItem('comment'))
    const {...user} = JSON.parse(localStorage.getItem('user'))

    const handleDialogOpen = () => {
      setDialog(true);
    }

    const handleDialogClose = () => {
      setDialog(false);
    }

    const handleDialogEditClose = () => {
      setDialogEdit(false);
    }

    useEffect(() => {
      getPost(params.id)
      .then(data => setPosts(data))
      .catch(error => console.error(error));
    }, [params.id]);

    useEffect(() => {
      getComments()
      .then(data => setComments(data))
      .catch(error => console.error(error));
    }, []);

    const handleCreateComment = (data) => {
      $.ajax({
        url: 'http://dashboard-adaptech.com/api/comments.php',
        type: 'POST',
        data: data,
        success: function(data) {
          toast.success(data.success)
          setTimeout(() => {
            setDialog(false);
          }, 1500);
        },
        error: function(error) {
          toast.error(error)
        }
      });
    }

    const handleEditComment = (data) => {
      $.ajax({
        url: 'http://dashboard-adaptech.com/api/comments.php',
        type: 'POST',
        data: data,
        success: function(data) {
          toast.success(data.success);
          setTimeout(() => {
            setDialogEdit(false)
          }, 1500);
        },
        error: function(error) {
          toast.error(error);
        }
      });
    }
  
    async function handleDeleteComment(comment_id){
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this comment!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      })
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            const response = await axios.get(`http://dashboard-adaptech.com/api/comments.php?comment_id=${comment_id}`);
            const { data } = response;
            if (data.error) {
              toast.error(data.error);
            } else if (data.success) {
              toast.success(data.success);
              setComments(prevComments => prevComments.filter(comment => comment.comment_id !== comment_id));
            }
          } catch (error) {
            toast.error(error);
          }
        }
      });
    }

    const handleDialogEditOpen = (comment) => {
      var comment = {
        comment_id: comment.comment_id,
        body: comment.body
      };
      
      // Convert the object to JSON string
      var commentJSON = JSON.stringify(comment);
      
      // Store the JSON string in localStorage
      localStorage.setItem('comment', commentJSON);
      setDialogEdit(true);
    };

    const postsEl = posts.find((obj) => obj.post_id === params.id)
    const commentsEl = comments.filter((obj) => obj.post_id === params.id)
    
    if(!postsEl){
        return ( 
        <Box sx={{ display: 'grid', placeContent: 'center' }}>
            <CircularProgress />
        </Box> 
        )
    }
    
    return(
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
      <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center', my: 4}}>
                <Box>
                    <Card sx={{ maxWidth: 345, mx: 'auto', mt:4 }}>
                    <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                    <CardContent>
                        <Tooltip arrow title="Title">
                        <Typography className="break-words" gutterBottom variant="h5" component="div">
                        {postsEl.title}
                        </Typography>
                        </Tooltip>
                        <Tooltip arrow title="Description">
                        <Typography className="break-words" variant="body2" color="text.secondary">
                        {postsEl.body}
                        </Typography>
                        </Tooltip>
                        <Tooltip arrow title="Category">
                        <Typography variant="body2" gutterBottom>{postsEl.category_name}</Typography>
                        </Tooltip>
                        <Tooltip arrow title="Published by">
                            <Typography variant="body2" gutterBottom>{postsEl.author_name} / {getTimeElapsed(postsEl.createdAt)}</Typography>
                        </Tooltip>
                        <Button sx={{mt: 1}} variant="contained" onClick={handleDialogOpen}>
                            Write comment
                        </Button>
                    </CardContent>
                    </Card>
                    <Dialog
                        open={dialog}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Write Comment"}
                        </DialogTitle>
                        <DialogContent>
                        <Box component="form" onSubmit={handleSubmit(handleCreateComment)}>
                        <input type="hidden" {...register('post_id')} value={params.id} />
                        <input type="hidden" {...register('user_id')} value={user.user_id} />
                        <TextField margin="normal" required fullWidth type="text" label="Name" value={user.full_name} />
                        <TextField margin="normal" required fullWidth type="email" label="Email" value={user.email} />
                        <TextField autoFocus margin="normal" required fullWidth multiline rows={4} type="text" label={`What's on your mind ?`} {...register('body')} />
                        <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button type="submit" autoFocus>
                            Publish
                        </Button>
                        </DialogActions>
                        </Box>
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={dialogEdit}
                        onClose={handleDialogEditClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Edit Comment"}
                        </DialogTitle>
                        <DialogContent>
                        <Box component="form" onSubmit={handleSubmit(handleEditComment)}>
                        <input type="hidden" {...register('EditComment')} />
                        <input type="hidden" {...register('comment_id')} value={comment.comment_id} />
                        <TextField margin="normal" required fullWidth type="text" label="Name" value={user.full_name} />
                        <TextField margin="normal" required fullWidth type="email" label="Email" value={user.email} />
                        <TextField
                        autoFocus
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        type="text"
                        label={`What's on your mind?`}
                        defaultValue={comment.body}
                        {...register('body')}
                        />
                        <DialogActions>
                        <Button onClick={handleDialogEditClose}>Cancel</Button>
                        <Button type="submit" autoFocus>
                            Save
                        </Button>
                        </DialogActions>
                        </Box>
                        </DialogContent>
                    </Dialog>
                </Box>
                <Box sx={{p: 6, mx: 'auto', mr:4}} className="bg-slate-200 rounded-lg shadow-lg">
                    <Typography sx={{textAlign: 'center', mb:2, textTransform: 'uppercase'}} color="text.secondary" variant="h5">Comments</Typography>
                    { commentsEl?.length ? (
                        <Box className="grid grid-cols-2 gap-2">
                        {commentsEl.map((comments, index) => (
                            <Box
                            className="bg-white border border-gray-300 p-4 max-w-sm rounded-lg shadow-md h-auto"
                            key={index}
                            >
                            <Box className="flex items-center mb-2">
                                <PersonIcon className="h-5 w-5 text-gray-600 mr-1" />
                                <Typography variant="body2" className="text-gray-600">Name: {comments.name}</Typography>
                            </Box>
                            <Box className="flex items-center mb-2">
                                <EmailIcon className="h-5 w-5 text-gray-600 mr-1" />
                                <Typography variant="body2" className="text-gray-600">Email: {comments.email}</Typography>
                            </Box>
                            <Box className="flex items-center mb-2">
                                <DescriptionIcon className="h-5 w-5 text-gray-600 mr-1" />
                                <Typography variant="body2" className="text-gray-600">Description:</Typography>
                            </Box>
                            <Typography variant="body2" className="text-gray-700 break-all">{comments.body}</Typography>
                            <Box>
                            <Tooltip title="Edit" arrow>
                              <IconButton aria-label="edit" onClick={() => handleDialogEditOpen(comments)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <IconButton aria-label="delete" onClick={() => handleDeleteComment(comments.comment_id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            </Box>
                            </Box>
                        ))}
                        </Box>
                        ) :  (
                          <Alert sx={{mx: 2, justifyContent: 'center'}} severity="info">There are no comments on this post yet, so you have the opportunity to be the first one to comment!</Alert>
                      )
                    }
                </Box>
        </Box>
      </>
    )
}

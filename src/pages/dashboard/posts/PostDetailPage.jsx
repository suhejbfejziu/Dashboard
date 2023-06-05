import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router"
import { UserContext } from '../../../auth/UserContext';
import { getPost } from "../../../api/posts";
import { getComments, AddComment, editComment, deleteComment } from "../../../api/comments";
import { getTimeElapsed } from "../../../utils";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, 
         TextField, 
         Tooltip, 
         Alert,
         Button, 
         Dialog,
         DialogActions, 
         DialogContent, 
         DialogTitle, 
         Card, 
         CardContent, 
         CardMedia, 
         Typography, 
         IconButton,
         CircularProgress } from "@mui/material";
  
export default function PostDetailPage(){
    const {userData} = useContext(UserContext);
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [commentId, setCommentId] = useState('');
    const [body, setBody] = useState('')
    const [dialog, setDialog] = useState(false);
    const [dialogEdit, setDialogEdit] = useState(false);
    const params = useParams()

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

    const handleDialogOpen = () => {
      setBody('');
      setDialog(true);
    }

    const handleDialogClose = () => {
      setDialog(false);
    }

    const handleDialogEditClose = () => {
      setDialogEdit(false);
    }

    const handleDialogEditOpen = (comment) => {
      setCommentId(comment.comment_id);
      setBody(comment.body);
      setDialogEdit(true);
    };

    const postsEl = posts.find((obj) => obj.post_id === params.id)
    const commentsEl = comments.filter((obj) => obj.post_id === params.id)
    
    if(!postsEl){
        return ( <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box> )
    }
    
    return(
        <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', alignItems: 'center'}}>
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
                        <Box component="form" name="NewComment" onSubmit={(e) => AddComment(e, userData, params.id, body, setDialog)}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        name="name"
                        type="text"
                        label="Name"
                        autoComplete="name"
                        value={userData.full_name}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        autoComplete="email"
                        value={userData.email}
                        />
                        <TextField
                        autoFocus
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        id="body"
                        name="body"
                        type="text"
                        label={`What's on your mind ?`}
                        value={body}
                        onChange={(e) => { setBody(e.target.value) }}
                        />
                        <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button disabled={!body} type="submit" autoFocus>
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
                        <Box component="form" name="commentEdit" onSubmit={(e) => editComment(e, commentId, body, setDialogEdit)}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="editname"
                        name="name"
                        type="text"
                        label="Name"
                        autoComplete="name"
                        value={userData.full_name}
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="editemail"
                        name="email"
                        type="email"
                        label="Email"
                        autoComplete="email"
                        value={userData.email}
                        />
                        <TextField
                        autoFocus
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        id="editbody"
                        name="body"
                        type="text"
                        label={`What's on your mind?`}
                        value={body}
                        onChange={(e) => { setBody(e.target.value) }}
                        />
                        <DialogActions>
                        <Button onClick={handleDialogEditClose}>Cancel</Button>
                        <Button disabled={!body} type="submit" autoFocus>
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
                              <IconButton aria-label="delete" onClick={() => deleteComment(comments.comment_id, setComments)}>
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
    )
}

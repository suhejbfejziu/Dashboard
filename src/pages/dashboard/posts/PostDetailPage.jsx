import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/posts";
import { getComments } from "../../../api/comments";
import { getTimeElapsed } from "../../../utils";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import $ from 'jquery';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useUserStore from "../../../userStore";
import useAuthStore from "../../../authStore";
import TextField from '@mui/material/TextField'
import moment from "moment";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '6px',
  p: 4,
};

export default function PostDetailPage() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const user = useUserStore((state) => state.user);
  const checkAuthentication = useAuthStore((state) => state.checkAuthentication);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated)

  const handleOpenModal = (comment) => {
    setSelectedComment(comment);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedComment(null);
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Link Copied Successfully');
  };

  useEffect(() => {
    async function handleAuthentication() {
       await checkAuthentication();
    }

    handleAuthentication();
  }, []);

  useEffect(() => {
    getPosts(params.id)
    .then(data => setPosts(data))
    .catch(error => console.error(error));
  }, [params.id]);

  useEffect(() => {
    getComments(params.id)
    .then(data => setComments(data))
    .catch(error => console.error(error));
  }, []);

  const handleCreateComment = (data) => {
    $.ajax({
      url: 'http://dashboard-adaptech.com/api/comments.php',
      type: 'POST',
      data: data,
      success: function (data) {
        toast.success(data.success);
        reset();
        setComments(prevComments => [...prevComments, data.comment]);
      },
      error: function (error) {
        toast.error(error);
      }
    });
  };

  const handleEditComment = (e) => {
    e.preventDefault();
    var post = $("#handleEditForm").serialize();
    $.ajax({
      type: 'POST',
      data: post,
      url: 'http://dashboard-adaptech.com/api/comments.php',
      success: function (data) {
        toast.success(data.success);
        // Update the comments state with the updated comment data
        setComments(prevComments => prevComments.map(comment => {
          if (comment.comment_id === selectedComment.comment_id) {
            return {
              ...comment,
              description: data.comment.description,
              createdAt: data.comment.createdAt
            };
          }
          return comment;
        }));
        handleCloseModal();
      },
      error: function (error) {
        toast.error(error);
      }
    });
  };

  async function handleDeleteComment(comment_id) {
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

  return (
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
        theme="dark"
      />
      {posts.map(post => (
        <section key={post.post_id} className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gray-100">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue">
              <header className="mb-4 lg:mb-6">
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img className="mr-4 w-16 h-16 rounded-full" src="author profile" alt="Author Image" />
                    <div>
                      <Tooltip title="Posted by" arrow>
                        <p className="text-xl font-bold text-gray-900">{post.full_name}</p>
                      </Tooltip>
                      <p className="text-base font-light text-gray-500">{post.category_name} / {getTimeElapsed(post.createdAt)}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-center">
                    <small>Share</small>
                    <Tooltip arrow title="Copy Link">
                      <IconButton onClick={copyToClipboard}>
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </address>
                <h1 className="text-gray-900 lg:mb-6 lg:text-4xl">{post.title}</h1>
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.description }}></div>
              </header>
           </article>
          </div>
        </section>
      ))}
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments.length})</h2>
          </div>
        {isLoggedIn ? ( 
        <form className="mb-6" onSubmit={handleSubmit(handleCreateComment)}>
            <input type="hidden" {...register('post_id')} value={params.id} />
            <input type="hidden" {...register('user_id')} value={user.user_id} />
            <input type="hidden" {...register('createdAt')} value={moment().format()} />
            <div className="py-2 mb-4">
              <TextField
                label="Write a comment"
                {...register('description', { required: true })}
                aria-invalid={errors.description ? "true" : "false"}
                multiline
                fullWidth
                rows={4}
              />
              {errors.description?.type === "required" && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}
            </div>
            <Button variant="contained" type="submit">
              Post comment
            </Button>
        </form> 
        ) : ( 
        <p className="text-red-500 italic">In order to leave a comment, please <Link className="underline" to="/login">log in</Link> first to gain access</p>
        )}
          {comments.map((comment) => (
            <section key={comment.comment_id}>
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900">{comment.full_name}</p>
                <p className="text-sm text-gray-600">{getTimeElapsed(comment.createdAt)}</p>
              </div>
              <p className="text-gray-500">{comment.description}</p>
              <div className="flex items-center">
              <Button variant="outlined">Reply</Button>
                <div className="ml-auto">
                {isLoggedIn && 
                <>
                  <IconButton onClick={() => handleOpenModal(comment)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteComment(comment.comment_id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
                }
                </div>
              </div>
              <hr />
            </section>
          ))}
          <div>
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Typography sx={{ mb: 2 }} id="modal-modal-title" variant="h6" component="h2">
              Edit comment
            </Typography>
            <form id="handleEditForm" onSubmit={handleEditComment}>
              <input id="comment_id" name="comment_id" type="hidden" value={selectedComment?.comment_id} />
              <input id="createdAt" name="createdAt" type="hidden" value={moment().format()} />
              <TextField
                id="description"
                name="description"
                label="Edit comment"
                multiline
                required
                fullWidth
                defaultValue={selectedComment?.description}
                rows={4}
                sx={{mb: 2}}
              />
              <div className="flex justify-end">
                <Button onClick={handleCloseModal} sx={{ mr: 2 }}>Cancel</Button>
                <Button type="submit" variant="contained" disableElevation>Edit</Button>
              </div>
            </form>
            </Box>
          </Modal>
          </div>
        </div>
      </section>
    </>
  );
}

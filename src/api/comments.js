import axios from "axios";
import swal from "sweetalert";

async function getComments(){
    try {
      const res = await axios.get('http://dashboard-adaptech.com/api/comments.php?comments');
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  async function AddComment(e, userData, params_id, body, setDialog) {
    e.preventDefault();
    const commentData = new FormData();
    commentData.append('post_id', params_id);
    commentData.append('user_id', userData.user_id)
    commentData.append('body', body);
    commentData.append('NewComment', 'NewComment');
  
    try {
      const response = await axios.post(
        'http://dashboard-adaptech.com/api/comments.php',
        commentData
      );
  
      const data = response.data;
  
      if (data.error) {
        swal('Error', `${data.error}`, 'error');
      } else if (data.success) {
        swal('Success', `${data.success}`, 'success');
        setTimeout(() => {
          setDialog(false)
        }, 1000);
      }
    } catch (error) {
      swal('Error', `${error}`, 'error');
    }
  }

  async function deleteComment(comment_id, setComments){
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
          const response = await axios.get(`http://dashboard-adaptech.com/api/comments.php?DeleteComment=${comment_id}`);
          const { data } = response;
          if (data.error) {
            swal('Error', `Error: ${data.error}`, 'error');
          } else if (data.success) {
            swal('Success', `Success: ${data.success}`, 'success');
            setComments(prevComments => prevComments.filter(comment => comment.comment_id !== comment_id));
          }
        } catch (error) {
          swal('Error', `Error: ${error}`, 'error');
        }
      }
    });
  }

  async function editComment(e, commentId, body, setDialogEdit){
    e.preventDefault()
    const commentData = new FormData();
    commentData.append('comment_id', commentId);
    commentData.append('body', body);
    commentData.append('EditComment', 'EditComment');

    try {
      const response = await axios.post(
        'http://dashboard-adaptech.com/api/comments.php',
        commentData
      );
  
      const data = response.data;
  
      if (data.error) {
        swal('Error', `${data.error}`, 'error');
      } else if (data.success) {
        swal('Success', `${data.success}`, 'success');
        setTimeout(() => {
          setDialogEdit(false)
        }, 1000);
      }
    } catch (error) {
      swal('Error', `${error}`, 'error');
    }
  }

  export {getComments, AddComment, editComment, deleteComment}
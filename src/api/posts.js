import axios from "axios";
import swal from "sweetalert";

async function getPosts() {
    try {
      const res = await axios.get('http://dashboard-adaptech.com/api/posts.php?posts');
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(`Error getting posts: ${error}`);
    }
  }
  
  async function getPost(params_id) {
    try {
      const response = await fetch(`http://dashboard-adaptech.com/api/posts.php?post=${params_id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
        const response = await axios.get('http://dashboard-adaptech.com/api/category.php?categories');
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
  async function createPost(e, userData, categoryId, title, body, createdAt, postId, navigate) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_id', userData.user_id);
    formData.append('category_id', categoryId);
    formData.append('title', title);
    formData.append('body', body);
    formData.append('createdAt', createdAt);
    formData.append('NewPost', 'NewPost');

    if (postId) {
        formData.append('postId', postId);
    }

    const url = postId ? 'http://dashboard-adaptech.com/api/posts.php' : 'http://dashboard-adaptech.com/api/posts.php?posts';
    try {
        const response = await axios.post(url, formData);
        const data = response.data;
        if (data.error) {
            swal('Error', `${data.error}`, 'error');
        } else if (data.success) {
            swal('Success', `${data.success}`, 'success');
            setTimeout(() => {
                navigate('/dashboard/posts');
            }, 1500);
        }
    } catch (error) {
        swal('Error', `${error}`, 'error');
    }
}

async function deletePost(post_id, setPosts) {
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
        const response = await axios.get(`http://dashboard-adaptech.com/api/posts.php?DeletePost=${post_id}`);
        const { data } = response;
        if (data.error) {
          swal('Error', `Error: ${data.error}`, 'error');
        } else if (data.success) {
          setPosts(prevPosts => prevPosts.filter(post => post.post_id !== post_id));
          swal('Success', `${data.success}`, 'success');
        }
      } catch (error) {
        swal('Error', `Error: ${error}`, 'error');
      }
    }
  });
}

async function savePost(item, user_id) {
  const { post_id } = item;
  const savedPost = new FormData();
  savedPost.append('post_id', post_id);
  savedPost.append('user_id', user_id);
  savedPost.append('setBookmark', 'setBookmark');

  try {
    const response = await axios.post('http://dashboard-adaptech.com/api/bookmarks.php', savedPost);
    const { data } = response;
    if (data.error) {
      swal('Error', `Error: ${data.error}`, 'error');
    } else if (data.success) {
      swal('Success', `${data.success}`, 'success');
      }
  } catch (error) {
    swal('Error', `Error: ${error}`, 'error');
  }
}   

export {getPosts, getPost, getCategories, createPost, deletePost, savePost}
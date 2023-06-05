import axios from "axios";
import swal from "sweetalert";

async function getBookmarks(user_id) {
    try {
      const res = await axios.get(`http://dashboard-adaptech.com/api/bookmarks.php?bookmark=${user_id}`);
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(`Error getting posts: ${error}`);
    }
  }

  async function getSavedPosts(bookmarks) {
    try {
      const postIds = bookmarks.map(bookmark => bookmark.post_id);
      const promises = postIds.map(postId => axios.get(`http://dashboard-adaptech.com/api/posts.php?SavedPost=${postId}`));
      const responses = await Promise.all(promises);
      const data = responses.flatMap(response => response.data); // Combine data from multiple responses into a single array
      return data;
    } catch (error) {
      console.error(`Error getting saved posts: ${error}`);
    }
  }
  
  async function bookmarkRemove(post, userData, setSavedPosts) {
    const { post_id } = post;
    try {
      const response = await axios.get(`http://dashboard-adaptech.com/api/bookmarks.php?removeBookmark=${post_id}&user_id=${userData.user_id}`);
      const { data } = response;
      if (data.error) {
        swal('Error', `Error: ${data.error}`, 'error');
      } else if (data.success) {
        swal('Success', `Success: ${data.success}`, 'success');
        setSavedPosts(prevSavedPosts =>
          prevSavedPosts.filter(savedPost => savedPost.post_id !== post_id)
        );
      }
    } catch (error) {
      console.error(`Error removing post: ${error}`);
    }
  }

  export {getBookmarks, getSavedPosts, bookmarkRemove}
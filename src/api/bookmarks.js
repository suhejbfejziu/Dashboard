import axios from "axios";

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
  
  export {getBookmarks, getSavedPosts}
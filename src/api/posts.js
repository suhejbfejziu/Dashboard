import axios from "axios";

async function getAllPosts() {
    try {
      const res = await axios.get('http://dashboard-adaptech.com/api/getPosts.php?posts');
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(`Error getting posts: ${error}`);
    }
  }
  
  async function getPosts(params_id) {
    try {
      const response = await fetch(`http://dashboard-adaptech.com/api/getPosts.php?post=${params_id}`);
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

export {getAllPosts, getPosts, getCategories}
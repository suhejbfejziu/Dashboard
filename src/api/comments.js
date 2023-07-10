import axios from "axios";

async function getAllComments(){
    try {
      const res = await axios.get('http://dashboard-adaptech.com/api/comments.php?comments');
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  async function getComments(post_id){
    try {
      const res = await axios.get(`http://dashboard-adaptech.com/api/comments.php?comment=${post_id}`);
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };


export {getAllComments, getComments}
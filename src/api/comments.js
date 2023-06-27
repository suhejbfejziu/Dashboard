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



  export {getComments}
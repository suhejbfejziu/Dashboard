import axios from "axios";

const getUsers = async (value) => {
    let url;
    if (value === 0) {
      url = "http://dashboard-adaptech.com/api/users.php?users";
    } else if (value === 1) {
      url = "http://dashboard-adaptech.com/api/users.php?AdminUsers";
    }
  
    try {
      const response = await axios.get(url);
      const { data } = response;
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  


  export {getUsers}
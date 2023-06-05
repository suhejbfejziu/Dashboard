import axios from "axios";
import swal from "sweetalert";

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
  
  async function deleteUser(user_id, setUsers) {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      });
      
      if (willDelete) {
        const response = await axios.get(`http://dashboard-adaptech.com/api/users.php?DeleteUser=${user_id}`);
        const data = response.data;
        
        if (data.error) {
          swal('Error', `Error: ${data.error}`, 'error');
        } else if (data.success) {
          swal('Success', `Success: ${data.success}`, 'success');
          setUsers(prevUsers => prevUsers.filter(user => user.user_id !== user_id));
        }
      }
    } catch (err) {
      swal('Error', `Error: ${err}`, 'error');
    }
  }

  export {getUsers, deleteUser}
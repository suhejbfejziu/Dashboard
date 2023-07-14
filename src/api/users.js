import axios from 'axios';

async function getUsers(value) {
  let url;
  if (value === 0) {
    url = "http://dashboard-adaptech.com/api/getUsers.php?users=0";
  } else if (value === 1) {
    url = "http://dashboard-adaptech.com/api/getUsers.php?users=1";
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}

export {getUsers}
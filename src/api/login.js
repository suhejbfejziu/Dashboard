import axios from "axios";
import swal from "sweetalert";

async function Login(e, email, password, setUserData, login, navigate) {
    e.preventDefault();
    const LoginData = new FormData();
    LoginData.append('email', email);
    LoginData.append('password', password);
  
    try {
      const response = await axios.post('http://dashboard-adaptech.com/api/login.php', LoginData);
      const { data: responseData } = response;
  
      if (responseData.error) {
        swal('Error', `${responseData.error}`, 'error');
        setTimeout(() => {
          swal.close();
        }, 1500);
      } else if (responseData.success) {
        swal('Success', `${responseData.success}`, 'success');
        login();
        setUserData(responseData.user);
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get('redirectTo');
        setTimeout(() => {
          navigate(redirectTo || '/dashboard');
          swal.close()
        }, 1000);
      }
    } catch (err) {
      swal('Error', `${err}`, 'error');
    }
  }

  export {Login}
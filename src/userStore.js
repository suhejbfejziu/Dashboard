import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  fetchUserInfo: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://dashboard-adaptech.com/api/getUserInfo.php', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      if (response.status === 200) {
        const data = response.data;
        set(() => ({ user: data }));
      } else {
        throw new Error('Error fetching user info');
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserStore;

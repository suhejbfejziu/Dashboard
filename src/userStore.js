import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  fetchUserInfo: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://dashboard-adaptech.com/api/getUserInfo.php', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      if (response.ok) {
        const data = await response.json();
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

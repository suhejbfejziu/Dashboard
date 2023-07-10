import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => set(() => ({ isAuthenticated: value })),
  checkAuthentication: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://dashboard-adaptech.com/api/checkAuth.php', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'Authenticated') {
          set(() => ({ isAuthenticated: true }));
          return true;
        } else if (data.status === 'Unauthenticated') {
          set(() => ({ isAuthenticated: false }));
          return false;
        }
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      console.error(error);
      set(() => ({ isAuthenticated: false }));
      return false;
    }
  },
}));

export default useAuthStore;

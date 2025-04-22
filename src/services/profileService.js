import apiService from './apiService'; // Axios instance for making HTTP requests

const profileService = {
  getCurrentUser: async () => {
    try {
      const response = await apiService.get('/users/me');
      return response.data || response; // Return user data or the full response
    } catch (error) {
      throw error; // Propagate errors for handling in the calling code
    }
  },
};

export default profileService;
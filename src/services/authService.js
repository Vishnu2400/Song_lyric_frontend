import apiService from './apiService';

const authService = {
  register: (username, email, password, role) => {
    return apiService.post('/auth/register', { username, email, password, role });
  },

  login: (username, password) => {
    return apiService.post('/auth/login', { username, password });
  },

};

export default authService;
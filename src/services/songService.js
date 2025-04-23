import apiService from './apiService';

const songService = {
  getAllSongs: () => apiService.get('/songs/all'),
  getMySongs: () => apiService.get('/songs/my-songs'),
  getSongById: (id) => apiService.get(`/songs/${id}`),
  createSong: (songData) => apiService.post('/songs/create', songData),
  updateSong: (id, updatedSong) => apiService.put(`/songs/update/${id}`, updatedSong),
  deleteSong: (id) => apiService.delete(`/songs/delete/${id}`),
  addLike: (id) => apiService.post(`/songs/like/${id}`),
  getAllSongsWithCommentsAndSuggestions: () => apiService.get('/songs/with-comments-suggestions'),
  suggestTitle: async (lyrics) => {
    try {
      const response = await apiService.post('/songs/suggest-title', { lyrics });
      console.log('Full API response:', response?.data || response);
  
      // Return the raw response (or response.data if it exists)
      return response?.data || response;
    } catch (error) {
      console.error('Error in suggestTitle:', error);
      return 'Failed to fetch title suggestions.';
    }
  },
  
  
};

export default songService;
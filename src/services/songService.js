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
};

export default songService;
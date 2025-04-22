import apiService from './apiService';

const commentService = {
  getCommentsForSong: (songId) => apiService.get(`/comments/song/${songId}`),
  addComment: (songId, comment) => apiService.post(`/comments/add/${songId}`, comment),
};

export default commentService;
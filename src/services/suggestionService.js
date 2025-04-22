import apiService from './apiService';

const suggestionService = {
  addSuggestion: (songId, suggestionText) => apiService.post(`/suggestions/add/${songId}`, suggestionText),
};

export default suggestionService;
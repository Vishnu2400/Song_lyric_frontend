import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import suggestionService from '../services/suggestionService'; // Ensure the suggestion service is imported

const AddSuggestionPage = () => {
  const { songId } = useParams(); // Get the songId from the URL
  const navigate = useNavigate();
  const [suggestionText, setSuggestionText] = useState(''); // State for suggestion text

  const handleAddSuggestion = async (e) => {
    e.preventDefault();
    try {
      await suggestionService.addSuggestion(songId, { suggestionText });
      alert('Suggestion added successfully!');
      navigate('/songs'); // Redirect back to the songs page
    } catch (err) {
      console.error('Failed to add suggestion:', err);
      if (err.response && err.response.data) {
        alert(err.response.data); // Show the backend error message
      } else {
        alert('An error occurred while adding the suggestion.');
      }
    }
  };

  return (
    <div className="add-suggestion-page">
      <h1>Add Suggestion</h1>
      <form onSubmit={handleAddSuggestion}>
        <textarea
          value={suggestionText}
          onChange={(e) => setSuggestionText(e.target.value)}
          placeholder="Enter your suggestion here"
          required
        ></textarea>
        <button type="submit">Add Suggestion</button>
      </form>
    </div>
  );
};

export default AddSuggestionPage;

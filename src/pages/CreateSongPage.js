import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import songService from '../services/songService';

const CreateSongPage = () => {
  const [newSong, setNewSong] = useState({ title: '', lyrics: '' });
  const [suggestedTitles, setSuggestedTitles] = useState(''); // Change to a string
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newSong.title.trim() || !newSong.lyrics.trim()) {
      alert('Both title and lyrics are required to create a song.');
      return;
    }
    try {
      await songService.createSong(newSong);
      setNewSong({ title: '', lyrics: '' });
      navigate('/songs');
      alert('Song created successfully!');
    } catch (err) {
      console.error('Failed to create the song:', err);
      alert('An error occurred while creating the song.');
    }
  };

  const handleSuggestTitle = async () => {
    if (!newSong.lyrics) {
      alert('Please enter lyrics first to get title suggestions.');
      return;
    }
    setIsLoading(true); // Set loading to true
    try {
      const suggestions = await songService.suggestTitle(newSong.lyrics);
      console.log('Suggestions received:', suggestions);
      setSuggestedTitles(suggestions || 'No suggestions available.');
      setError(null);
    } catch (err) {
      console.error('Failed to get title suggestions:', err);
      setSuggestedTitles('');
      setError('Failed to fetch title suggestions. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="create-song-page">
      <h1>Create a New Song</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter song title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="lyrics">Lyrics:</label>
          <textarea
            id="lyrics"
            placeholder="Enter song lyrics"
            value={newSong.lyrics}
            onChange={(e) => setNewSong({ ...newSong, lyrics: e.target.value })}
            required
          ></textarea>
        </div>
        <div>
          <button 
            type="button" 
            onClick={handleSuggestTitle} 
            disabled={isLoading || !newSong.lyrics.trim()}
          >
            {isLoading ? 'Loading...' : 'Suggest Titles'}
          </button>
        </div>
        {suggestedTitles && (
          <div>
            <h3>Suggested Titles</h3>
            <p>{suggestedTitles}</p> {/* Display the raw suggestions */}
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Create Song</button>
      </form>
    </div>
  );
};

export default CreateSongPage;
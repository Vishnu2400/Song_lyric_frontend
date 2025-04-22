import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import songService from '../services/songService';

const CreateSongPage = () => {
  const [newSong, setNewSong] = useState({ title: '', lyrics: '' });
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      // Call the API to create a new song
      await songService.createSong(newSong);

      // Reset the form inputs
      setNewSong({ title: '', lyrics: '' });

      // Redirect to the SongsPage
      navigate('/songs');
      alert('Song created successfully!');
    } catch (err) {
      console.error('Failed to create the song:', err);
      alert('An error occurred while creating the song.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Create a New Song</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Enter song title"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Lyrics:</label>
          <textarea
            placeholder="Enter song lyrics"
            value={newSong.lyrics}
            onChange={(e) => setNewSong({ ...newSong, lyrics: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', height: '100px', marginBottom: '10px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Create Song
        </button>
      </form>
    </div>
  );
};

export default CreateSongPage;
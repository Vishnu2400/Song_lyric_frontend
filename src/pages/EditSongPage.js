import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import songService from '../services/songService';

const EditSongPage = () => {
  const { id } = useParams(); // Get the song ID from the URL
  const navigate = useNavigate();
  const [song, setSong] = useState({ title: '', lyrics: '' });

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const fetchedSong = await songService.getSongById(id); // Fetch song details by ID
        setSong(fetchedSong);
      } catch (err) {
        console.error('Failed to fetch song details:', err);
        alert('Failed to load song details.');
      }
    };

    fetchSongDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      await songService.updateSong(id, song); // Send the updated song details to the backend
      alert('Song updated successfully!');
      navigate('/songs'); // Redirect to the SongsPage
    } catch (err) {
      console.error('Failed to update the song:', err);
      alert('An error occurred while updating the song.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Edit Song</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Enter song title"
            value={song.title}
            onChange={(e) => setSong({ ...song, title: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Lyrics:</label>
          <textarea
            placeholder="Enter song lyrics"
            value={song.lyrics}
            onChange={(e) => setSong({ ...song, lyrics: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', height: '100px', marginBottom: '10px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Update Song
        </button>
      </form>
    </div>
  );
};

export default EditSongPage;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import songService from '../services/songService';

const EditSongPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState({ title: '', lyrics: '' });

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const fetchedSong = await songService.getSongById(id);
        setSong(fetchedSong);
      } catch (err) {
        console.error('Failed to fetch song details:', err);
        alert('Failed to load song details.');
      }
    };

    fetchSongDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await songService.updateSong(id, song);
      alert('Song updated successfully!');
      navigate('/songs');
    } catch (err) {
      console.error('Failed to update the song:', err);
      alert('An error occurred while updating the song.');
    }
  };

  return (
    <div className="edit-song-page">
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
          />
        </div>
        <div>
          <label>Lyrics:</label>
          <textarea
            placeholder="Enter song lyrics"
            value={song.lyrics}
            onChange={(e) => setSong({ ...song, lyrics: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit">Update Song</button>
      </form>
    </div>
  );
};

export default EditSongPage;

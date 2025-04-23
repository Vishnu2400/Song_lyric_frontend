import React, { useEffect, useState } from 'react';
import songService from '../services/songService';
import { useNavigate } from 'react-router-dom';

const MySongsPage = () => {
  const [mySongs, setMySongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserSongs = async () => {
      try {
        const userSongs = await songService.getMySongs();
        setMySongs(userSongs);
      } catch (err) {
        console.error('Failed to fetch user songs:', err);
      }
    };

    fetchUserSongs();
  }, []);

  const handleEditClick = (songId) => {
    navigate(`/edit-song/${songId}`);
  };

  const handleDelete = async (id) => {
    try {
      await songService.deleteSong(id);
      setMySongs((prevMySongs) => prevMySongs.filter((song) => song.id !== id));
      alert('Song deleted successfully!');
    } catch (err) {
      console.error('Failed to delete the song:', err);
    }
  };

  return (
    <div className="my-songs-page">
      <h1>My Songs</h1>
      <ul>
        {mySongs.map((song) => (
          <li key={song.id}>
            <strong>{song.title}</strong>
            <p>{song.lyrics}</p>
            <button onClick={() => handleEditClick(song.id)}>Edit</button>
            <button onClick={() => handleDelete(song.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySongsPage;

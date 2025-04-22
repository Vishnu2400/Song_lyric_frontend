import React, { useEffect, useState } from 'react';
import songService from '../services/songService';
import { useNavigate } from 'react-router-dom';

const SongsPage = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongsWithCommentsAndSuggestions = async () => {
      try {
        const allSongs = await songService.getAllSongsWithCommentsAndSuggestions();
        setSongs(allSongs);
      } catch (err) {
        console.error('Failed to fetch songs:', err);
      }
    };

    fetchSongsWithCommentsAndSuggestions();
  }, []);

  const handleLike = async (id) => {
    try {
      await songService.addLike(id);

      // Update the like count immediately in the state (for both songs and mySongs)
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.id === id ? { ...song, likesCount: song.likesCount + 1 } : song
        )
      );

      alert('Song liked successfully!');
    } catch (err) {
      console.error('Failed to like the song:', err);
    }
  };

  const handleAddSuggestionClick = (songId) => {
    navigate(`/suggestions/add/${songId}`); // Redirect to the suggestion form for this song
  };


  return (
    <div>
      <h1>All Songs</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <strong>{song.title}</strong> by {song.authorUsername}
            <p>{song.lyrics}</p>
            <button onClick={() => handleLike(song.id)}>
              {song.likesCount} Likes
            </button>
            <button onClick={() => navigate(`/comments/add/${song.id}`)}>Add Comment</button>
            <button onClick={() => handleAddSuggestionClick(song.id)}>Add Suggestion</button>

            <h3>Comments:</h3>
            <ul>
              {song.comments.length > 0 ? (
                song.comments.map((comment) => (
                  <li key={comment.id}>
                    <strong>{comment.commenterUsername}:</strong> {comment.commentText}
                  </li>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </ul>

            <h3>Suggestions:</h3>
            <ul>
              {song.suggestions.length > 0 ? (
                song.suggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <strong>{suggestion.suggesterUsername}:</strong> {suggestion.suggestionText}
                  </li>
                ))
              ) : (
                <p>No suggestions yet.</p>
              )}
            </ul>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default SongsPage;
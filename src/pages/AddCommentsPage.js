import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import commentService from '../services/commentService'; // Import the comment service

const AddCommentPage = () => {
  const { songId } = useParams(); // Get the songId from the URL
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState(''); // State for the comment text

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await commentService.addComment(songId, { commentText });
      alert('Comment added successfully!');
      navigate('/songs'); // Redirect back to the songs page
    } catch (err) {
      console.error('Failed to add comment:', err);
      if (err.response && err.response.data) {
        alert(err.response.data); // Show the backend error message
      } else {
        alert('An error occurred while adding the comment.');
      }
    }
  };

  return (
    <div>
      <h1>Add Comment</h1>
      <form onSubmit={handleAddComment}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment here"
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default AddCommentPage;
import React, { useEffect, useState } from 'react';
import profileService from '../services/profileService';

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Holds user data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await profileService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError('Failed to load user profile. Please try again later.');
        console.error('Failed to fetch user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Show a loading message while fetching user data
  if (loading) return <p>Loading...</p>;

  // Show an error message if the API call failed
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Profile Page</h1>
      <h3>Current User Details</h3>
      {user && (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Roles:</strong> {user.roles.join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
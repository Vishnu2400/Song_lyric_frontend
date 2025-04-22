import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'SONG_WRITER' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLoginMode) {
        // Login API call
        const response = await authService.login(formData.username, formData.password);
        localStorage.setItem('token', response.token);
        window.dispatchEvent(new Event('storage'));
        navigate('/songs');
      } else {
        // Registration API call
        await authService.register(formData.username, formData.email, formData.password, formData.role);
        alert('Registration successful! Please log in.');
        setIsLoginMode(true); // Switch to login mode
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>{isLoginMode ? 'Login' : 'Register'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        {!isLoginMode && (
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        )}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        {!isLoginMode && (
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="SONG_WRITER">Song Writer</option>
            <option value="CONTRIBUTOR">Contributor</option>
          </select>
        )}
        <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthPage;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import AuthPage from "./pages/AuthPage"; 
import SongsPage from "./pages/SongsPage"; 
import CreateSongPage from "./pages/CreateSongPage"; 
import EditSongPage from "./pages/EditSongPage";
import AddCommentsPage from "./pages/AddCommentsPage"; 
import ProfilePage from './pages/ProfilePage';
import AddSuggestionPage from './pages/AddSuggestionPage';
import MySongsPage from './pages/MySongsPage';
import './styles.css'; // Import global styles
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/auth" element={<AuthPage />} /> {/* Login and Sign-Up */}
        <Route path="/songs" element={<SongsPage />} /> {/* Songs Page */}
        <Route path="/my-songs" element={<MySongsPage />} /> {/* My Songs Page */}
        <Route path="/create-song" element={<CreateSongPage />} /> {/* Create Song Page */}
        <Route path="/edit-song/:id" element={<EditSongPage />} /> {/* Edit Song Page */}
        <Route path="/comments/add/:songId" element={<AddCommentsPage />} /> {/* Add Comment Page */}
        <Route path="/suggestions/add/:songId" element={<AddSuggestionPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page */}
      </Routes>
    </Router>
  );
}

export default App;
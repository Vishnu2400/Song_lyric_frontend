import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token")); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/auth");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn && <li><Link to="/auth">Login</Link></li>}
        {isLoggedIn && <li><Link to="/songs">Songs</Link></li>}
        {isLoggedIn && <li><Link to="/create-song">Create Song</Link></li>}
        {isLoggedIn && <li><Link to="/my-songs">My Songs</Link></li>}
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

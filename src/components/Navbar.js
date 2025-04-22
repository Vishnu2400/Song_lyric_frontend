import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Dispatch a storage event to notify other components
    window.dispatchEvent(new Event("storage"));

    // Redirect to login page
    navigate("/auth");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!localStorage.getItem("token") && <li><Link to="/auth">Login</Link></li>}
        {localStorage.getItem("token") && <li><Link to="/songs">Songs</Link></li>}
        {localStorage.getItem("token") && <li><Link to="/create-song">Create Song</Link></li>}
        {localStorage.getItem("token") && <li><Link to="/my-songs">My Songs</Link></li>}
        {localStorage.getItem("token") && <li><Link to="/profile">Profile</Link></li>}
        {localStorage.getItem("token") && (
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
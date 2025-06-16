import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
      <Link to="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
      {!user && <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>}
      {!user && <Link to="/signup" style={{ marginRight: '15px' }}>Signup</Link>}
      {user && <Link to="/upload">Upload</Link>}
      {user && <Link to="/courses" style={{ marginRight: '15px' }}>Courses</Link>}
      {user && <Link to="/my-courses" style={{ marginRight: '15px' }}>My Courses</Link>}
      {user && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;

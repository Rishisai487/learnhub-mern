import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      email,
      password
    });

    // ✅ Save token and user info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert('Login successful!');
    window.location.href = '/dashboard';
  } catch (err) {
    console.error("Login error:", err);
    alert(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

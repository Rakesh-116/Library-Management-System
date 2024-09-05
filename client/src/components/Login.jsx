import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setRole, setLoggedInUser }) => {
  const [password, setPassword] = useState('');
  const [role, setLoginRole] = useState('USER');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
        role,
      });
      setLoggedInUser(response.data.user);
      setRole(role);
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setLoginRole(e.target.value)}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

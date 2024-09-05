import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD

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
=======
import { useNavigate } from 'react-router-dom';

const Login = ({ setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });
      const { role } = res.data;
      setRole(role);

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'user') {
        navigate('/user');
      } else {
        setError('Invalid role');
      }
    } catch (err) {
      setError('Invalid username or password');
>>>>>>> c0d9f711559a692acc4a94a4821bc6a4cd1901f9
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
>>>>>>> c0d9f711559a692acc4a94a4821bc6a4cd1901f9
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // Basic client-side validation
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setMessage('Login successful!');

      // Store the JWT token in local storage
      localStorage.setItem('token', response.data.token);
      console.log('Logged in:', response.data);

     

    } catch (error) {
      setError(error.response?.data.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="auth-header text-2xl font-semibold text-center mb-5">Login</h2>
      {error && <p className="auth-error text-red-500 text-center">{error}</p>}
      {message && <p className="auth-success text-green-500 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="auth-form space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="auth-input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className={`auth-button w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

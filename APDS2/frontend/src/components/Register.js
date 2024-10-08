import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true); 

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password }); 
      setMessage('Registration successful!');
      console.log('Registered:', response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-header">Register</h2>
      {error && <p className="auth-error">{error}</p>}
      {message && <p className="auth-success">{message}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="auth-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;

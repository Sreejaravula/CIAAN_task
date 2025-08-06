// src/pages/RegisterPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
    }
    try {
      console.log(process.env.REACT_APP_API_URL)
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        { name, email, password, bio }
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
      window.location.reload(); // To update Navbar state
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Bio (Optional)</label>
          <textarea
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short introduction about yourself"
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
       <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
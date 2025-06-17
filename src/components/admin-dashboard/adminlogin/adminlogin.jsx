"use client";
import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { email, password });
      alert("Login successful");
      // Save token or redirect
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={loginAdmin}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;

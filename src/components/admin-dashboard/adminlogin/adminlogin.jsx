"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../../../config/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post(API_ENDPOINTS.ADMIN_LOGIN, { email, password });
      
      if (res.data.success) {
        // Store admin token or redirect
        localStorage.setItem('adminToken', res.data.token);
        setLoginSuccess(true);
        // Redirect to admin dashboard
        window.location.href = '/admin-dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;

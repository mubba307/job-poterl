"use client";
import React, { useState } from 'react';
import axios from 'axios';

const AdminSignup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const register = async (e) => {
    e.preventDefault();
    await axios.post('/api/admin/register', form);
    alert("Admin registered!");
  };

  return (
    <form onSubmit={register}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default AdminSignup;

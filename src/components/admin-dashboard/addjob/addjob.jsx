"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/api';

const AddJob = () => {
  const [job, setJob] = useState({ title: '', description: '', company: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axios.post(API_ENDPOINTS.ADD_JOB, job);
      setSuccess('Job added successfully!');
      // Reset form
      setJob({ title: '', company: '', location: '', description: '', salary: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add job');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Job Title" onChange={e => setJob({ ...job, title: e.target.value })} />
      <input placeholder="Company" onChange={e => setJob({ ...job, company: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setJob({ ...job, description: e.target.value })}></textarea>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJob;

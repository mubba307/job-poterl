"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/api';

const AddJob = () => {
  const [job, setJob] = useState({ title: '', description: '', company: '', industry: '' });
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
      setJob({ title: '', company: '', location: '', description: '', salary: '', industry: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add job');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Job Title" value={job.title} onChange={e => setJob({ ...job, title: e.target.value })} />
      <input placeholder="Company" value={job.company} onChange={e => setJob({ ...job, company: e.target.value })} />
      <select value={job.industry} onChange={e => setJob({ ...job, industry: e.target.value })}>
        <option value="">Select Industry</option>
        <option value="technology">Technology (IT)</option>
        <option value="healthcare">Healthcare</option>
        <option value="education">Education</option>
        <option value="retail">Retail</option>
        <option value="construction">Construction</option>
        <option value="hospitality">Hospitality</option>
        <option value="manufacturing">Manufacturing</option>
        <option value="government">Government</option>
        <option value="arts">Arts & Entertainment</option>
        <option value="logistics">Logistics</option>
        <option value="other">Other</option>
      </select>
      <textarea placeholder="Description" value={job.description} onChange={e => setJob({ ...job, description: e.target.value })}></textarea>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJob;

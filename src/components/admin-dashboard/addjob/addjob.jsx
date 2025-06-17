"use client";
import React, { useState } from 'react';
import axios from 'axios';

const AddJob = () => {
  const [job, setJob] = useState({ title: '', description: '', company: '' });

  const submitJob = async (e) => {
    e.preventDefault();
    await axios.post('/api/jobs', job);
    alert("Job added!");
  };

  return (
    <form onSubmit={submitJob}>
      <input placeholder="Job Title" onChange={e => setJob({ ...job, title: e.target.value })} />
      <input placeholder="Company" onChange={e => setJob({ ...job, company: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setJob({ ...job, description: e.target.value })}></textarea>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJob;

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const response = await axios.get('/api/jobs'); // <-- Check this URL
    setJobs(response.data);
  };

  const deleteJob = async (id) => {
    await axios.delete(`/api/jobs/${id}`);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ul>
      {jobs.map(job => (
        <li key={job._id}>
          {job.title} <button onClick={() => deleteJob(job._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default JobList;

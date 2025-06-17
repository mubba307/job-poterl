"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.JOBS);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(API_ENDPOINTS.DELETE_JOB(id));
      fetchJobs(); // Refresh the list
    } catch (error) {
      console.error('Error deleting job:', error);
    }
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

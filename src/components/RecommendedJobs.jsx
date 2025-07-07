'use client';

import React, { useEffect, useState } from 'react';

const mockJobs = [
  { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', skills: ['React', 'JavaScript'], match: 92 },
  { id: 2, title: 'Backend Engineer', company: 'DataWorks', location: 'New York, NY', skills: ['Node.js', 'MongoDB'], match: 88 },
  { id: 3, title: 'Full Stack Developer', company: 'Webify', location: 'San Francisco, CA', skills: ['React', 'Node.js', 'Express'], match: 85 },
];

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <div>Loading recommended jobs...</div>;
  if (!jobs.length) return <div>No recommendations at this time.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recommended Jobs for You</h2>
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company} &mdash; {job.location}</p>
                <div className="text-sm text-gray-500 mt-1">Skills: {job.skills.join(', ')}</div>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">{job.match}% match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs; 
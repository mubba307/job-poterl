'use client';

import React, { useEffect, useState } from 'react';

const mockCandidates = [
  { id: 1, name: 'Alice Johnson', title: 'Frontend Developer', skills: ['React', 'JavaScript'], match: 95 },
  { id: 2, name: 'Bob Smith', title: 'Backend Engineer', skills: ['Node.js', 'MongoDB'], match: 90 },
  { id: 3, name: 'Carol Lee', title: 'Full Stack Developer', skills: ['React', 'Node.js', 'Express'], match: 87 },
];

const RecommendedCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCandidates(mockCandidates);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <div>Loading recommended candidates...</div>;
  if (!candidates.length) return <div>No recommendations at this time.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recommended Candidates</h2>
      <div className="grid gap-4">
        {candidates.map(candidate => (
          <div key={candidate.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.title}</p>
                <div className="text-sm text-gray-500 mt-1">Skills: {candidate.skills.join(', ')}</div>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">{candidate.match}% match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCandidates; 
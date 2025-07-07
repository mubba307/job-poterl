'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { jobSections } from './joblist';

// Assuming JobCard and jobSections are defined elsewhere and imported correctly
// import JobCard from './JobCard';
// import { jobSections } from './jobData';

const JobCard = ({ job, userId }) => {
  const companyEmail = job.companyEmail || "company@example.com";

  function isValidObjectId(id) {
    return typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]+$/.test(id);
  }

  async function handleApply() {
    if (!isValidObjectId(userId)) {
      alert('Please log in with a valid account to apply for jobs.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          jobId: job.id,
          companyEmail: companyEmail
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Application sent! ' + data.message);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300 w-[380px] h-auto flex flex-col">
      {/* ...existing job card content... */}
      <div className="flex-1 mb-4">
        <p className="text-gray-700 text-sm line-clamp-4 h-20 overflow-hidden">{job.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4 h-16 overflow-hidden">
        {job.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded whitespace-nowrap">
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="text-gray-500 text-xs self-center">+{job.skills.length - 4} more</span>
        )}
      </div>
      <button
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-auto"
        onClick={handleApply}
      >
        Apply Now
      </button>
      {/* Newsletter Footer Content inside the card */}
      <div className="bg-gray-50 rounded-lg shadow p-4 mt-4 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          📧 Stay Updated with Weekly Job Alerts!
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Get the latest job opportunities delivered straight to your inbox every week
        </p>
        <div className="flex flex-col md:flex-row gap-2 max-w-xs mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Unsubscribe anytime • Privacy policy • Weekly delivery
        </p>
      </div>
    </div>
  );
};

export default function JobNewsletter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollRefs = useRef({});
  const [userId, setUserId] = useState(null);

  // Get unique categories
  const categories = useMemo(() => {
    const allJobs = jobSections.flatMap(section => section.jobs);
    return ['All', ...new Set(allJobs.map(job => job.category))];
  }, []);

  // Filter sections based on search and category
  const filteredSections = useMemo(() => {
    return jobSections.map(section => ({
      ...section,
      jobs: section.jobs.filter(job => {
        const matchesSearch = !searchTerm ||
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
    })).filter(section => section.jobs.length > 0);
  }, [searchTerm, selectedCategory]);

  // Auto-scroll functionality
  useEffect(() => {
    const intervals = {};

    filteredSections.forEach(section => {
      if (scrollRefs.current[section.id] && section.jobs.length > 1) {
        intervals[section.id] = setInterval(() => {
          const container = scrollRefs.current[section.id];
          if (container) {
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;
            const currentScroll = container.scrollLeft;

            if (currentScroll >= scrollWidth - clientWidth - 10) {
              container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              container.scrollTo({ left: currentScroll + 370, behavior: 'smooth' });
            }
          }
        }, 4000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [filteredSections]);

  useEffect(() => {
    // Try to get userId from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserId(userObj._id || userObj.id); // adjust key as per your storage
      } catch (e) {
        // handle error
      }
    }
  }, []);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center">Job Newsletter</h1>
        <p className="text-center text-gray-600">{getCurrentDate()}</p>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div className="flex-1 mb-2 md:mb-0">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredSections.map(section => (
          <div key={section.id} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <div
              ref={el => (scrollRefs.current[section.id] = el)}
              className="flex overflow-x-auto scrollbar-hide"
            >
              {section.jobs.map((job, idx) => (
                <JobCard key={job.id || idx} job={job} userId={userId} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

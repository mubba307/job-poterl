import React from 'react';

export default function About() {
  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">About Job Drive Portal</h2>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Job Drive Portal is your one-stop platform for discovering the best job opportunities, internships, and career resources. 
        We connect talented individuals with top companies, making the job search process simple, transparent, and effective.
      </p>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-50 rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">For Job Seekers</h3>
          <p className="text-gray-600">
            Explore jobs by category, location, or company. Get personalized recommendations and apply easily.
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">For Employers</h3>
          <p className="text-gray-600">
            Post jobs, review applications, and find the right talent for your organization quickly and efficiently.
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 shadow">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To empower every job seeker and employer with the tools and resources needed for career success.
          </p>
        </div>
      </div>
    </section>
  );
}
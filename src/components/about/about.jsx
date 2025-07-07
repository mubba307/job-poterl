import React from 'react';

export default function About() {
  return (
    <section className="w-full max-w-xs sm:max-w-3xl mx-auto py-8 sm:py-12 px-2 sm:px-4 animate-fade-in glass rounded-2xl shadow-xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4 text-center animate-slide-down">About Job Drive Portal</h2>
      <p className="text-base sm:text-lg text-gray-700 mb-6 text-center animate-fade-in-slow">
        Job Drive Portal is your one-stop platform for discovering the best job opportunities, internships, and career resources. 
        We connect talented individuals with top companies, making the job search process simple, transparent, and effective.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
        <div className="bg-blue-50 rounded-xl p-4 sm:p-6 shadow animate-fade-in-slow">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">For Job Seekers</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore jobs by category, location, or company. Get personalized recommendations and apply easily.
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 sm:p-6 shadow animate-fade-in-slow">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">For Employers</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Post jobs, review applications, and find the right talent for your organization quickly and efficiently.
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 sm:p-6 shadow animate-fade-in-slow">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            To empower every job seeker and employer with the tools and resources needed for career success.
          </p>
        </div>
      </div>
    </section>
  );
}
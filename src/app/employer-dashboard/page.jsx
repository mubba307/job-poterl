import React from 'react';
import Navbar from '@/components/navbar/navbar';
import { RecommendedCandidates } from '@/components';

export default function EmployerDashboard() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Welcome to Your Employer Dashboard</h1>
        <RecommendedCandidates />
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Your Job Postings</h2>
          <div className="border rounded-lg p-6 text-gray-500 bg-gray-50">
            {/* TODO: Integrate job posting management here */}
            <p>No job postings yet. Post a new job to see it here!</p>
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Dashboard Analytics</h2>
          <div className="border rounded-lg p-6 text-gray-500 bg-gray-50">
            {/* TODO: Integrate analytics here */}
            <p>Analytics coming soon: views, applications, and more.</p>
          </div>
        </section>
      </main>
    </div>
  );
} 
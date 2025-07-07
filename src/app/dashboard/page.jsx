'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar'
import Hero from '@/components/home/hero/hero'
import About from '@/components/about/about'
import JobNewsletter from '@/components/joblist/joblist';
import { JobCardList } from '@/components/jobcard/jobcard';
import { RecommendedJobs } from '@/components';

export default function Dashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage (from signup or login)
    const userData = localStorage.getItem('userData');
    const userToken = localStorage.getItem('userToken');
    
    if (userData || userToken) {
      setIsLoggedIn(true);
    } else {
      // If no user data, redirect to signup
      router.push('/');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center glass p-10 rounded-2xl shadow-2xl animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect to signup
  }

  // Show main homepage content if logged in
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen animate-fade-in">
      <Navbar />  
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <Hero />
        <div className="my-8 animate-slide-up">
          <RecommendedJobs />
        </div>
        <div className="my-8 animate-slide-up">
          <JobNewsletter/>
        </div>
        <div className="my-8 animate-slide-up">
          <JobCardList/>
        </div>
        <div className="my-8 animate-slide-up">
          <About />
        </div>
      </div>
    </div>
  );
} 
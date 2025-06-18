'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar'
import Hero from '@/components/home/hero/hero'
import About from '@/components/about/about'
import JobNewsletter from '@/components/joblist/joblist';
import { JobCardList } from '@/components/jobcard/jobcard';

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect to signup
  }

  // Show main homepage content if logged in
  return (
    <div>
      <Navbar />  
      <Hero />
      <JobNewsletter/>
      <JobCardList/>
      <About />
    </div>
  );
} 
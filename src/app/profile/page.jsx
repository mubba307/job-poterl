'use client';
// NOTE: The folder is 'profle' (typo), not 'profile'.
import Profile from '@/components/profle/profile'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function profilePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('userToken');
    console.log('Profile page: Token from localStorage:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.log('Profile page: No token found, redirecting to login');
      setIsAuthenticated(false);
      setIsLoading(false);
      router.push('/loginme');
      return;
    }

    // Token exists, let the Profile component handle the API call
    console.log('Profile page: Token found, allowing access');
    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Router will handle redirect
  }

  return (
    <div>
        <Profile />
    </div>
  )
}

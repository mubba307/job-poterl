'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link and Burger */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              JobHai
            </Link>
            
            {/* Burger Icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className={`${menuOpen ? 'block' : 'hidden'} md:flex md:space-x-6 absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-50`}>
            <Link href="/resume" className="block md:inline-block px-4 py-2 md:p-0 text-gray-700 hover:text-blue-600">
              Resume
            </Link>
            <Link href="/chat-help" className="block md:inline-block px-4 py-2 md:p-0 text-gray-700 hover:text-blue-600">
              Chat Help
            </Link>
            <Link href="/job-track" className="block md:inline-block px-4 py-2 md:p-0 text-gray-700 hover:text-blue-600">
              JOB-Track
            </Link>
            <Link href="/saved-jobs" className="block md:inline-block px-4 py-2 md:p-0 text-gray-700 hover:text-blue-600">
              Saved Jobs
            </Link>
            <Link href="/blogs" className="block md:inline-block px-4 py-2 md:p-0 text-gray-700 hover:text-blue-600">
              Blogs
            </Link>
            <Link href="/contact" className="block md:inline-block px-4 py-2 md:p-0 text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <Link href="/about" className="block md:inline-block px-4 py-2 md:p-0 text-gray-700 hover:text-blue-600">
              About
            </Link>
          </div>

          {/* Center Search Engine */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search jobs, companies..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 bg-white"
                style={{ color: 'black' }}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side Login/Logout */}
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
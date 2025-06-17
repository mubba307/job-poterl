'use client';
import Navbar from '@/components/navbar/navbar'
import Hero from '@/components/home/hero/hero'
import Job from '@/components/job/job'
import JobList from '@/components/joblist/joblist'
import About from '@/components/about/about'
import React from 'react'

export default function HomePage() {
  return (
    <div>
      <Navbar />  
      <Hero />
      
      <Job />
      <JobList />
      <About />
    </div>
  )
}

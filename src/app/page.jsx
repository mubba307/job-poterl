'use client';
import Navbar from '@/components/navbar/navbar'
import Hero from '@/components/home/hero/hero'
import About from '@/components/about/about'
import React from 'react'
import JobNewsletter from '@/components/joblist/joblist';
import { JobCardList } from '@/components/jobcard/jobcard';

export default function HomePage() {
  return (
    <div>
      <Navbar />  
      <Hero />
    <JobNewsletter/>
      <JobCardList/>
      <About />
    </div>
  )
}

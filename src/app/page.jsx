'use client';
import Navbar from '@/components/navbar/navbar';
import Hero from '@/components/home/hero/hero';
import About from '@/components/about/about';
import JobNewsletter from '@/components/joblist/joblist';
import { JobCardList } from '@/components/jobcard/jobcard';
import UserPreferences from '@/components/uc-design/UserPreferences';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobNewsletter />
      <JobCardList />
      <About />
      <UserPreferences />
    </div>
  );
}

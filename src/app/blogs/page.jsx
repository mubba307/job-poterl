'use client';
import Blog from '@/components/blogs/blog';
import Navbar from '@/components/navbar/navbar';
export default function Blogme() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">Job Portal Blog</h1>
      
      <Blog />
    </div>
  );
}
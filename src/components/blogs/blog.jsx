"use client";
import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash, Eye, Heart, MessageCircle, Share2, Calendar, User } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    summary: "",
    content: "",
    author: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);

  // Fetch blog posts (replace URL with your API endpoint)
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // Use localStorage instead of API call for offline functionality
      const savedBlogsData = localStorage.getItem('blogPosts');
      if (savedBlogsData) {
        setPosts(JSON.parse(savedBlogsData));
      } else {
        // Add some sample blog posts for demonstration
        const samplePosts = [
          {
            id: 1,
            title: "How to Ace Your Job Interview in 2024",
            summary: "Essential tips and strategies for succeeding in modern job interviews",
            content: "Job interviews have evolved significantly in recent years. With the rise of remote work and digital communication, candidates need to adapt their approach. Here are some key strategies: 1. Research the company thoroughly, 2. Prepare STAR method responses, 3. Practice virtual interview etiquette, 4. Show enthusiasm and cultural fit, 5. Follow up professionally.",
            author: "Career Expert",
            date: "2024-01-15",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400"
          },
          {
            id: 2,
            title: "The Future of Remote Work",
            summary: "Exploring the trends and opportunities in remote work",
            content: "Remote work is here to stay, and it's transforming how we think about employment. Companies are increasingly offering flexible work arrangements, and employees are seeking better work-life balance. Key trends include hybrid work models, digital nomadism, and the importance of strong communication skills in virtual environments.",
            author: "Workplace Analyst",
            date: "2024-01-10",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
          },
          {
            id: 3,
            title: "Building a Strong Professional Network",
            summary: "Strategies for networking in the digital age",
            content: "Networking is crucial for career growth, but it's changed dramatically with social media and digital platforms. LinkedIn, professional associations, and industry events are key channels. Focus on providing value to others, maintaining genuine relationships, and staying active in your professional community.",
            author: "Networking Specialist",
            date: "2024-01-05",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400"
          }
        ];
        setPosts(samplePosts);
        localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  // Handle new post input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle new post submit (replace with your API endpoint)
  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.summary || !newPost.content || !newPost.author) return;
    setLoading(true);
    setError("");
    try {
      // Get existing posts from localStorage
      const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      
      // Create new post with ID and date
      const newPostData = {
        ...newPost,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      };
      
      // Add new post to beginning of array
      const updatedPosts = [newPostData, ...existingPosts];
      
      // Save to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      // Update state
      setPosts(updatedPosts);
      setNewPost({ title: "", summary: "", content: "", author: "", image: "" });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding blog:', error);
      setError("Failed to add post.");
    } finally {
      setLoading(false);
    }
  };

  // Handle expand/collapse for posts
  const handleExpand = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  // Handle delete post (demo only)
  const handleDelete = async (id) => {
    setLoading(true);
    setError("");
    try {
      // Get existing posts from localStorage
      const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      
      // Filter out the post to delete
      const updatedPosts = existingPosts.filter((post) => post.id !== id);
      
      // Save to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      // Update state
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError("Failed to delete post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xs sm:max-w-3xl mx-auto py-8 sm:py-10 px-2 sm:px-4 animate-fade-in glass rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 animate-slide-down">Job Portal Blog</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition font-semibold shadow animate-bounce w-full sm:w-auto"
        >
          {showForm ? "Close" : "Add Post"}
        </button>
      </div>

      {/* New Post Form */}
      {showForm && (
        <form
          onSubmit={handleAddPost}
          className="bg-blue-50 rounded-xl shadow p-4 sm:p-6 mb-10 space-y-4 animate-fade-in-slow"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">Add New Blog Post</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 text-sm sm:text-base"
            required
          />
          <input
            type="text"
            name="summary"
            placeholder="Summary"
            value={newPost.summary}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 text-sm sm:text-base"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newPost.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 text-sm sm:text-base"
            required
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL (optional)"
            value={newPost.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 text-sm sm:text-base"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newPost.content}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 text-sm sm:text-base"
            rows={4}
            required
          />
          <button type="submit" className="w-full py-2 rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-bounce disabled:opacity-60 disabled:cursor-not-allowed">
            Add Post
          </button>
        </form>
      )}

      {/* Blog Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-blue-700 animate-pulse">Loading...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-600 animate-fade-in">{error}</div>
        ) : posts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 animate-fade-in">No blog posts yet.</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white/90 rounded-xl shadow-lg p-4 flex flex-col gap-2 animate-fade-in-slow glass hover:scale-105 transition-transform duration-300 cursor-pointer">
              {post.image && (
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              )}
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-1 line-clamp-2">{post.title}</h3>
              <p className="text-gray-700 text-sm sm:text-base line-clamp-2 mb-1">{post.summary}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <User className="w-4 h-4" /> {post.author} <Calendar className="w-4 h-4 ml-2" /> {post.date}
              </div>
              <button onClick={() => handleExpand(post.id)} className="text-blue-600 hover:underline text-xs font-semibold self-start animate-bounce">
                {expandedPost === post.id ? 'Hide Details' : 'Read More'}
              </button>
              {expandedPost === post.id && (
                <div className="text-gray-800 text-sm sm:text-base animate-fade-in-slow mt-2 mb-1">{post.content}</div>
              )}
              <div className="flex gap-2 mt-auto">
                <button onClick={() => handleDelete(post.id)} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition animate-bounce" aria-label="Delete Post">
                  <Trash className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition animate-bounce" aria-label="Like Post">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition animate-bounce" aria-label="Comment">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition animate-bounce" aria-label="Share">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
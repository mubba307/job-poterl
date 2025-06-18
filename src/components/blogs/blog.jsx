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
    <section className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-blue-900">Job Portal Blog</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          {showForm ? "Close" : "Add Post"}
        </button>
      </div>

      {/* New Post Form */}
      {showForm && (
        <form
          onSubmit={handleAddPost}
          className="bg-blue-50 rounded-xl shadow p-6 mb-10 space-y-4"
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Add New Blog Post</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
            required
          />
          <input
            type="text"
            name="summary"
            placeholder="Summary"
            value={newPost.summary}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newPost.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
            required
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL (optional)"
            value={newPost.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newPost.content}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? "Posting..." : "Add Post"}
          </button>
          {error && <div className="text-red-600 text-sm">{error}</div>}
        </form>
      )}

      {/* Blog Posts List */}
      {loading ? (
        <div className="text-center text-blue-700">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full md:w-40 h-40 object-cover rounded-lg mb-4 md:mb-0"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-blue-800 mb-2">{post.title}</h3>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:underline text-sm"
                    title="Delete Post"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <span className="text-gray-500 text-sm">By {post.author}</span>
                </div>
                <p className="text-gray-700 mb-3">{post.summary}</p>
                <button
                  onClick={() => handleExpand(post.id)}
                  className="text-blue-600 underline text-sm mb-2"
                >
                  {expandedPost === post.id ? "Hide Details" : "Read More"}
                </button>
                {expandedPost === post.id && (
                  <div className="mt-2 text-gray-800">{post.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
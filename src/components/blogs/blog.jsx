"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
    async function fetchPosts() {
      setLoading(true);
      setError("");
      try {
        // const response = await axios.get("/api/blog");
        // setPosts(response.data);
        // Demo data:
        setPosts([
          {
            id: 1,
            title: "How to Write a Winning Resume",
            date: "2025-06-10",
            summary: "Tips and tricks to make your resume stand out to employers.",
            content: "Full content for resume tips...",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: 2,
            title: "Top 10 Interview Questions and How to Answer Them",
            date: "2025-06-05",
            summary: "Prepare for your next interview with these common questions.",
            content: "Full content for interview questions...",
            author: "Career Coach",
            image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
          },
          {
            id: 3,
            title: "Career Growth in the Tech Industry",
            date: "2025-05-28",
            summary: "Explore opportunities and trends in tech careers.",
            content: "Full content for tech careers...",
            author: "Guest Writer",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
          },
        ]);
      } catch (err) {
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

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
      // const response = await axios.post("/api/blog", newPost);
      // setPosts((prev) => [response.data, ...prev]);
      // Demo: Add locally
      setPosts((prev) => [
        {
          ...newPost,
          id: Date.now(),
          date: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      setNewPost({ title: "", summary: "", content: "", author: "", image: "" });
      setShowForm(false);
    } catch (err) {
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
      // await axios.delete(`/api/blog/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
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
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function JobTracker() {
  const [jobs, setJobs] = useState([
    {
      company: "TechNova Solutions",
      title: "Frontend Developer",
      status: "Applied",
      date: "2025-06-10",
      notes: "Waiting for response"
    }
  ]);
  const [form, setForm] = useState({
    company: "",
    title: "",
    status: "Applied",
    date: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [statusCounts, setStatusCounts] = useState({
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0
  });

  useEffect(() => {
    // Calculate status counts whenever jobs change
    const counts = jobs.reduce(
      (acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
      },
      { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 }
    );
    setStatusCounts(counts);
  }, [jobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!form.company || !form.title || !form.date) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Example POST request (replace URL with your API endpoint)
      // const response = await axios.post("/api/jobs", form);
      // setJobs((prev) => [...prev, response.data]);
      // For demo, just add locally:
      setJobs((prev) => [...prev, form]);
      setForm({
        company: "",
        title: "",
        status: "Applied",
        date: "",
        notes: ""
      });
      setSuccess("Job added successfully!");
    } catch (err) {
      setError("Failed to add job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditJob = (idx) => {
    setEditingId(idx);
    setForm(jobs[idx]);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (!form.company || !form.title || !form.date) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Example PUT request (replace URL with your API endpoint)
      // await axios.put(`/api/jobs/${editingId}`, form);
      // Update locally for demo:
      setJobs((prev) =>
        prev.map((job, idx) => (idx === editingId ? form : job))
      );
      setForm({
        company: "",
        title: "",
        status: "Applied",
        date: "",
        notes: ""
      });
      setEditingId(null);
      setSuccess("Job updated successfully!");
    } catch (err) {
      setError("Failed to update job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      company: "",
      title: "",
      status: "Applied",
      date: "",
      notes: ""
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4" style={{ color: "black" }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "black" }}>Job Application Tracker</h1>
        <p style={{ color: "black" }}>Keep track of your job applications and their progress</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="bg-white rounded-lg shadow p-4 text-center" style={{ color: "black" }}>
            <div className="text-2xl font-bold" style={{ color: "black" }}>{count}</div>
            <div className="text-sm" style={{ color: "black" }}>{status}</div>
          </div>
        ))}
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg" style={{ color: "black" }}>
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg" style={{ color: "black" }}>
          {success}
        </div>
      )}

      {/* Add/Edit Job Form */}
      <div className="bg-white rounded-lg shadow mb-8 p-6" style={{ color: "black" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "black" }}>
          {editingId !== null ? "Edit Job Application" : "Add New Job Application"}
        </h2>
        <form onSubmit={editingId !== null ? handleUpdateJob : handleAddJob} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="company"
            placeholder="Company Name *"
            value={form.company}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            style={{ color: "black" }}
          />
          <input
            type="text"
            name="title"
            placeholder="Job Title *"
            value={form.title}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            style={{ color: "black" }}
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: "black" }}
          >
            <option value="Applied" style={{ color: "black" }}>Applied</option>
            <option value="Interview" style={{ color: "black" }}>Interview</option>
            <option value="Offer" style={{ color: "black" }}>Offer</option>
            <option value="Rejected" style={{ color: "black" }}>Rejected</option>
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            style={{ color: "black" }}
          />
          <input
            type="text"
            name="salary"
            placeholder="Expected Salary"
            value={form.salary}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: "black" }}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: "black" }}
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ color: "black" }}
          >
            <option value="Low" style={{ color: "black" }}>Low Priority</option>
            <option value="Medium" style={{ color: "black" }}>Medium Priority</option>
            <option value="High" style={{ color: "black" }}>High Priority</option>
          </select>
          <textarea
            name="notes"
            placeholder="Notes and Comments"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2 lg:col-span-3"
            style={{ color: "black" }}
          />
          <div className="flex gap-2 md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
              style={{ color: "white" }}
            >
              {loading ? "Processing..." : editingId !== null ? "Update Job" : "Add Job"}
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                style={{ color: "black" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filters and Search */}
      {/* ...rest of your code remains unchanged... */}
    </div>
  );
}
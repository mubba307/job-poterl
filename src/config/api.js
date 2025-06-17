// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_SIGNUP: `${API_BASE_URL}/api/admin/register`,
  
  // Jobs
  JOBS: `${API_BASE_URL}/api/jobs`,
  JOB_BY_ID: (id) => `${API_BASE_URL}/api/jobs/${id}`,
  
  // Admin
  ADD_JOB: `${API_BASE_URL}/api/jobs`,
  DELETE_JOB: (id) => `${API_BASE_URL}/api/jobs/${id}`,
  SEND_NOTIFICATION: `${API_BASE_URL}/api/send-notification`,
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`,
  
  // Blog
  BLOG: `${API_BASE_URL}/api/blog`,
  BLOG_BY_ID: (id) => `${API_BASE_URL}/api/blog/${id}`,
  
  // Resume
  RESUME: `${API_BASE_URL}/api/resume`,
  RESUME_BY_ID: (id) => `${API_BASE_URL}/api/resume/${id}`,
  
  // Chatbot
  CHATBOT_MESSAGE: `${API_BASE_URL}/api/chatbot`,
};

// API Helper functions
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}; 
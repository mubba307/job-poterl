'use client';
import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Users, 
  Building2, 
  Calendar, 
  MapPin, 
  Phone, 
  Briefcase,
  User,
  LogOut,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  Activity,
  Login
} from 'lucide-react';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Dashboard data
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  
  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Login form
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Demo user data for offline functionality with login details
  const demoUsers = [
    {
      id: '507f1f77bcf86cd799439011',
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      location: "San Francisco, CA",
      userType: "jobseeker",
      experience: "mid",
      skills: "React, Node.js, TypeScript",
      company: "",
      industry: "",
      role: "Software Developer",
      createdAt: "2024-01-15",
      lastLogin: "2024-01-20T10:30:00Z",
      loginCount: 15,
      isOnline: false,
      loginHistory: [
        { date: "2024-01-20T10:30:00Z", ip: "192.168.1.100", device: "Chrome on Windows" },
        { date: "2024-01-19T14:20:00Z", ip: "192.168.1.100", device: "Chrome on Windows" },
        { date: "2024-01-18T09:15:00Z", ip: "192.168.1.100", device: "Mobile Safari" }
      ]
    },
    {
      id: '507f1f77bcf86cd799439012',
      fullName: "Jane Smith",
      email: "jane.smith@techcorp.com",
      phone: "234-567-8901",
      location: "New York, NY",
      userType: "employer",
      experience: "",
      skills: "",
      company: "TechCorp Solutions",
      industry: "technology",
      role: "HR Manager",
      createdAt: "2024-01-14",
      lastLogin: "2024-01-20T08:45:00Z",
      loginCount: 8,
      isOnline: true,
      loginHistory: [
        { date: "2024-01-20T08:45:00Z", ip: "10.0.0.50", device: "Firefox on Mac" },
        { date: "2024-01-19T16:30:00Z", ip: "10.0.0.50", device: "Firefox on Mac" },
        { date: "2024-01-18T11:20:00Z", ip: "10.0.0.50", device: "Firefox on Mac" }
      ]
    },
    {
      id: '507f1f77bcf86cd799439013',
      fullName: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "345-678-9012",
      location: "Austin, TX",
      userType: "jobseeker",
      experience: "senior",
      skills: "Python, Machine Learning, AWS",
      company: "",
      industry: "",
      role: "Data Scientist",
      createdAt: "2024-01-13",
      lastLogin: "2024-01-19T17:10:00Z",
      loginCount: 12,
      isOnline: false,
      loginHistory: [
        { date: "2024-01-19T17:10:00Z", ip: "172.16.0.25", device: "Chrome on Linux" },
        { date: "2024-01-18T13:45:00Z", ip: "172.16.0.25", device: "Chrome on Linux" },
        { date: "2024-01-17T10:30:00Z", ip: "172.16.0.25", device: "Chrome on Linux" }
      ]
    },
    {
      id: '507f1f77bcf86cd799439014',
      fullName: "Sarah Wilson",
      email: "sarah.wilson@healthtech.com",
      phone: "456-789-0123",
      location: "Boston, MA",
      userType: "employer",
      experience: "",
      skills: "",
      company: "HealthTech Solutions",
      industry: "healthcare",
      role: "Recruitment Specialist",
      createdAt: "2024-01-12",
      lastLogin: "2024-01-20T12:00:00Z",
      loginCount: 6,
      isOnline: true,
      loginHistory: [
        { date: "2024-01-20T12:00:00Z", ip: "203.0.113.10", device: "Safari on Mac" },
        { date: "2024-01-19T09:15:00Z", ip: "203.0.113.10", device: "Safari on Mac" },
        { date: "2024-01-18T14:30:00Z", ip: "203.0.113.10", device: "Safari on Mac" }
      ]
    },
    {
      id: '507f1f77bcf86cd799439015',
      fullName: "David Brown",
      email: "david.brown@example.com",
      phone: "567-890-1234",
      location: "Chicago, IL",
      userType: "jobseeker",
      experience: "entry",
      skills: "JavaScript, HTML, CSS",
      company: "",
      industry: "",
      role: "Frontend Developer",
      createdAt: "2024-01-11",
      lastLogin: "2024-01-18T15:20:00Z",
      loginCount: 3,
      isOnline: false,
      loginHistory: [
        { date: "2024-01-18T15:20:00Z", ip: "198.51.100.75", device: "Edge on Windows" },
        { date: "2024-01-17T11:45:00Z", ip: "198.51.100.75", device: "Edge on Windows" },
        { date: "2024-01-16T16:10:00Z", ip: "198.51.100.75", device: "Edge on Windows" }
      ]
    }
  ];

  // Demo stats with login information
  const demoStats = {
    totalUsers: 5,
    jobseekers: 3,
    employers: 2,
    recentUsers: 2,
    onlineUsers: 2,
    totalLogins: 44
  };

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try to login via API first
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', data.token);
        loadDashboard();
      } else {
        // Fallback to hardcoded credentials
        if (loginForm.email === 'admine@gmail.com' && loginForm.password === 'test1234') {
          setIsLoggedIn(true);
          localStorage.setItem('adminToken', 'admin_token_' + Date.now());
          loadDashboard();
        } else {
          setError(data.error || 'Invalid admin credentials. Access denied.');
        }
      }
    } catch (error) {
      console.error('Admin login error:', error);
      // Fallback to hardcoded credentials for demo
      if (loginForm.email === 'admine@gmail.com' && loginForm.password === 'test1234') {
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', 'admin_token_' + Date.now());
        loadDashboard();
      } else {
        setError('Invalid admin credentials. Access denied.');
      }
    }
    
    setLoading(false);
  };

  // Load dashboard data
  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('No admin token found');
      }

      // Try to load from API
      try {
        const [statsResponse, usersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/dashboard`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }),
          fetch(`${API_BASE_URL}/admin/users`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          })
        ]);

        if (statsResponse.ok && usersResponse.ok) {
          const statsData = await statsResponse.json();
          const usersData = await usersResponse.json();

          setStats(statsData.stats);
          setUsers(usersData.users);
          setTotalUsers(usersData.pagination.totalUsers);
          setTotalPages(usersData.pagination.totalPages);
        } else {
          throw new Error('API request failed');
        }
      } catch (apiError) {
        console.log('API not available, using demo data:', apiError);
        // Fallback to demo data
        setStats(demoStats);
        setUsers(demoUsers);
        setTotalUsers(demoUsers.length);
        setTotalPages(1);
      }
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard load error:', error);
      // Fallback to demo data
      setStats(demoStats);
      setUsers(demoUsers);
      setTotalUsers(demoUsers.length);
      setTotalPages(1);
    }
  };

  // Search users
  const searchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('No admin token found');
      }

      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (userTypeFilter) params.append('userType', userTypeFilter);
      if (experienceFilter) params.append('experience', experienceFilter);
      if (industryFilter) params.append('industry', industryFilter);

      const response = await fetch(`${API_BASE_URL}/admin/users/search?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setTotalUsers(data.pagination.totalUsers);
        setTotalPages(data.pagination.totalPages);
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      console.log('Search API not available, using local filter:', error);
      // Fallback to local filtering
      const filteredUsers = demoUsers.filter(user => {
        const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             user.skills.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = !userTypeFilter || user.userType === userTypeFilter;
        const matchesExperience = !experienceFilter || user.experience === experienceFilter;
        const matchesIndustry = !industryFilter || user.industry === industryFilter;
        
        return matchesSearch && matchesType && matchesExperience && matchesIndustry;
      });
      
      setUsers(filteredUsers);
      setTotalUsers(filteredUsers.length);
      setTotalPages(1);
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.skills.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !userTypeFilter || user.userType === userTypeFilter;
    const matchesExperience = !experienceFilter || user.experience === experienceFilter;
    const matchesIndustry = !industryFilter || user.industry === industryFilter;
    
    return matchesSearch && matchesType && matchesExperience && matchesIndustry;
  });

  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setUserTypeFilter('');
    setExperienceFilter('');
    setIndustryFilter('');
    loadDashboard(); // Reload original data
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setStats(null);
    setUsers([]);
    setError('');
    localStorage.removeItem('adminToken');
  };

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      loadDashboard();
    }
  }, []);

  // Search effect
  useEffect(() => {
    if (isLoggedIn && (searchQuery || userTypeFilter || experienceFilter || industryFilter)) {
      searchUsers();
    }
  }, [searchQuery, userTypeFilter, experienceFilter, industryFilter]);

  // Login Form Component
  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-purple-600 px-8 py-6 text-center">
            <h1 className="text-3xl font-bold text-white">🔐 Admin Access</h1>
            <p className="text-red-100 mt-2">Restricted Area - Admin Only</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black"
                    placeholder="Enter admin email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-black"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-purple-700 focus:ring-4 focus:ring-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  '🔐 Admin Login'
                )}
              </button>
            </form>
            
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                <strong>⚠️ Restricted Access:</strong> This area is only accessible to authorized administrators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🔐 JobPortal Admin Dashboard</h1>
              <p className="text-gray-600">Manage and view all user registrations</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Jobseekers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.jobseekers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Employers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.employers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Recent (7 days)</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recentUsers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Online Now</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.onlineUsers || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Login className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Logins</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLogins || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  >
                    <option value="">All Types</option>
                    <option value="jobseeker">Jobseekers</option>
                    <option value="employer">Employers</option>
                  </select>
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  >
                    <option value="">All Experience</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="executive">Executive</option>
                  </select>
                  <select
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  >
                    <option value="">All Industries</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">👥 All Registered Users ({filteredUsers.length})</h2>
            {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
          </div>

          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No users found</div>
          ) : (
            <div className="p-6">
              <div className="grid gap-6">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        user.userType === 'jobseeker' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {user.userType}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{user.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{user.location}</span>
                      </div>
                      {user.experience && (
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{user.experience}</span>
                        </div>
                      )}
                      {user.skills && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600"><strong>Skills:</strong> {user.skills}</span>
                        </div>
                      )}
                      {user.company && (
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{user.company}</span>
                        </div>
                      )}
                      {user.industry && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600"><strong>Industry:</strong> {user.industry}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600"><strong>Role:</strong> {user.role}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      {isLoggedIn ? <Dashboard /> : <LoginForm />}
    </div>
  );
};

export default AdminDashboard; 
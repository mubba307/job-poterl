'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Building2, 
  Calendar, 
  LogOut,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  Trash2,
  Shield
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Dashboard data
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Demo user data for admin view
  const demoUsers = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      location: "San Francisco, CA",
      userType: "jobseeker",
      experience: "Mid Level",
      skills: "React, Node.js, TypeScript",
      company: "",
      industry: "",
      role: "Software Developer",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane.smith@techcorp.com",
      phone: "234-567-8901",
      location: "New York, NY",
      userType: "employer",
      experience: "",
      skills: "",
      company: "TechCorp Solutions",
      industry: "Technology",
      role: "HR Manager",
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      fullName: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "345-678-9012",
      location: "Austin, TX",
      userType: "jobseeker",
      experience: "Senior Level",
      skills: "Python, Machine Learning, AWS",
      company: "",
      industry: "",
      role: "Data Scientist",
      createdAt: "2024-01-13"
    },
    {
      id: 4,
      fullName: "Sarah Wilson",
      email: "sarah.wilson@healthtech.com",
      phone: "456-789-0123",
      location: "Boston, MA",
      userType: "employer",
      experience: "",
      skills: "",
      company: "HealthTech Solutions",
      industry: "Healthcare",
      role: "Recruitment Specialist",
      createdAt: "2024-01-12"
    },
    {
      id: 5,
      fullName: "David Brown",
      email: "david.brown@example.com",
      phone: "567-890-1234",
      location: "Chicago, IL",
      userType: "jobseeker",
      experience: "Entry Level",
      skills: "JavaScript, HTML, CSS",
      company: "",
      industry: "",
      role: "Frontend Developer",
      createdAt: "2024-01-11"
    }
  ];

  // Demo stats
  const demoStats = {
    totalUsers: 5,
    jobseekers: 3,
    employers: 2,
    recentUsers: 2
  };

  useEffect(() => {
    // Check if admin token exists
    const adminToken = localStorage.getItem('adminToken');
    const isAdminUser = localStorage.getItem('isAdmin');
    const userType = localStorage.getItem('userType');
    
    console.log('Admin dashboard checking authentication:', {
      adminToken,
      isAdminUser,
      userType,
      hasAdminToken: !!adminToken,
      isAdminUserTrue: isAdminUser === 'true',
      isUserTypeAdmin: userType === 'admin'
    });
    
    if (adminToken && isAdminUser === 'true' && userType === 'admin') {
      console.log('Admin authentication successful, loading dashboard...');
      setIsAdmin(true);
      loadDashboard();
    } else {
      console.log('Admin authentication failed, redirecting to login...');
      // Clear any invalid data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('userType');
      // Redirect to main login page
      router.push('/loginme');
    }
    setLoading(false);
  }, [router]);

  const loadDashboard = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats(demoStats);
      setUsers(demoUsers);
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard load error:', error);
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.skills.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !userTypeFilter || user.userType === userTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setUserTypeFilter('');
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userType');
    router.push('/loginme');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Access Denied!</strong>
            <span className="block sm:inline"> Invalid admin credentials. Redirecting to login...</span>
          </div>
          <p className="text-gray-600">Please log in with valid admin credentials.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">🔐 JobPortal Admin Dashboard</h1>
                <p className="text-gray-600">Manage and view all user registrations</p>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  <Users className="w-6 h-6 text-green-600" />
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
                        <span className="text-gray-600"><strong>Phone:</strong> {user.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600"><strong>Location:</strong> {user.location}</span>
                      </div>
                      {user.experience && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600"><strong>Experience:</strong> {user.experience}</span>
                        </div>
                      )}
                      {user.skills && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600"><strong>Skills:</strong> {user.skills}</span>
                        </div>
                      )}
                      {user.company && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600"><strong>Company:</strong> {user.company}</span>
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
                        <span className="text-gray-600"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="mt-4 flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-yellow-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
}
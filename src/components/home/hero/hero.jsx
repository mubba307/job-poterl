import React, { useState, useEffect } from 'react'
import { Search, MapPin, Briefcase, Building, Users, TrendingUp, Star, ChevronDown, Filter, Bell, Upload, ExternalLink, Heart, Clock, DollarSign, ArrowRight, Eye, Zap, Target, Award, MessageCircle, Video, FileText, Calendar, Send, Bookmark, Share2, AlertTriangle, CheckCircle, Play, BarChart3, Globe, Shield, Sparkles, Phone, Mail, LinkedIn, Twitter, Facebook, Instagram, ChevronRight, Plus, Minus, RefreshCw, Settings, User, CreditCard, HelpCircle, X, Rocket, Lightbulb, GraduationCap, Code2, Palette, Megaphone } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdvancedJobPortalHero() {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [showJobs, setShowJobs] = useState(false)
  const [showCompanies, setShowCompanies] = useState(false)
  const [savedJobs, setSavedJobs] = useState(new Set())
  const [liveJobs, setLiveJobs] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [showSalaryCalculator, setShowSalaryCalculator] = useState(false)
  const [showCareerGuide, setShowCareerGuide] = useState(false)
  const [activeTab, setActiveTab] = useState('jobs')
  const [showNotifications, setShowNotifications] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [showVideoInterview, setShowVideoInterview] = useState(false)
  const [currentSalary, setCurrentSalary] = useState('')
  const [expectedSalary, setExpectedSalary] = useState('')
  const [sampleJobs, setSampleJobs] = useState([])

  // Add new state for animations and UI effects
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showJobDetails, setShowJobDetails] = useState(null)
  const [animateStats, setAnimateStats] = useState(false)
  const [hoveredJob, setHoveredJob] = useState(null)

  const router = useRouter()

  // Enhanced job categories with more details
  const enhancedCategories = [
    { 
      name: 'Software Engineer', 
      count: '12K+ jobs', 
      icon: '💻', 
      trend: '+15%',
      skills: ['React', 'Node.js', 'Python'],
      avgSalary: '₹12-25 LPA',
      demand: 'Very High'
    },
    { 
      name: 'Data Scientist', 
      count: '8K+ jobs', 
      icon: '📊', 
      trend: '+25%',
      skills: ['Python', 'ML', 'SQL'],
      avgSalary: '₹15-30 LPA',
      demand: 'High'
    },
    { 
      name: 'Product Manager', 
      count: '6K+ jobs', 
      icon: '🎯', 
      trend: '+18%',
      skills: ['Strategy', 'Analytics', 'Leadership'],
      avgSalary: '₹18-35 LPA',
      demand: 'High'
    },
    { 
      name: 'UI/UX Designer', 
      count: '5K+ jobs', 
      icon: '🎨', 
      trend: '+12%',
      skills: ['Figma', 'Adobe XD', 'User Research'],
      avgSalary: '₹10-25 LPA',
      demand: 'Medium'
    },
    { 
      name: 'DevOps Engineer', 
      count: '4K+ jobs', 
      icon: '⚙️', 
      trend: '+30%',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      avgSalary: '₹15-28 LPA',
      demand: 'Very High'
    },
    { 
      name: 'Marketing Manager', 
      count: '15K+ jobs', 
      icon: '📢', 
      trend: '+8%',
      skills: ['Digital Marketing', 'SEO', 'Analytics'],
      avgSalary: '₹8-20 LPA',
      demand: 'Medium'
    }
  ]

  // Add new features section
  const features = [
    {
      icon: Rocket,
      title: 'Smart Job Matching',
      description: 'AI-powered job recommendations based on your skills and preferences',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Lightbulb,
      title: 'Career Insights',
      description: 'Get real-time market insights and salary trends',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: GraduationCap,
      title: 'Skill Development',
      description: 'Access to courses and certifications to boost your career',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Code2,
      title: 'Tech Opportunities',
      description: 'Exclusive tech job listings from top companies',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  // Add success stories
  const successStories = [
    {
      name: 'Sarah K.',
      role: 'Senior Software Engineer',
      company: 'TechCorp',
      image: '👩‍💻',
      story: 'Found my dream job within 2 weeks of using the platform',
      salary: '₹35 LPA'
    },
    {
      name: 'Michael R.',
      role: 'Product Manager',
      company: 'StartupX',
      image: '👨‍💼',
      story: 'The AI matching helped me discover perfect opportunities',
      salary: '₹28 LPA'
    },
    {
      name: 'Priya S.',
      role: 'Data Scientist',
      company: 'AI Solutions',
      image: '👩‍🔬',
      story: 'Career guidance and interview prep were game-changers',
      salary: '₹32 LPA'
    }
  ]

  // Enhanced job data with more features
  const initialSampleJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Innovators Pvt Ltd',
      location: 'Bangalore • Remote',
      salary: '₹15-25 LPA',
      experience: '3-6 years',
      type: 'Full-time',
      logo: '🏢',
      isEasyApply: true,
      posted: '2 hours ago',
      applicants: '12 applicants',
      skills: ['React', 'Node.js', 'Python'],
      matchScore: 95,
      isUrgent: true,
      hasVideoInterview: true,
      companyRating: 4.5,
      benefits: ['Health Insurance', 'Stock Options', 'Flexible Hours'],
      jobType: 'hybrid'
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'AI Solutions Corp',
      location: 'Mumbai • Hybrid',
      salary: '₹18-30 LPA',
      experience: '2-5 years',
      type: 'Full-time',
      logo: '🤖',
      isEasyApply: true,
      posted: '5 hours ago',
      applicants: '8 applicants',
      skills: ['Python', 'ML', 'SQL'],
      matchScore: 88,
      isUrgent: false,
      hasVideoInterview: true,
      companyRating: 4.7,
      benefits: ['Learning Budget', 'Health Insurance', 'Remote Work'],
      jobType: 'hybrid'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'StartupX',
      location: 'Delhi • On-site',
      salary: '₹20-35 LPA',
      experience: '4-8 years',
      type: 'Full-time',
      logo: '🚀',
      isEasyApply: false,
      posted: '1 day ago',
      applicants: '45 applicants',
      skills: ['Strategy', 'Analytics', 'Leadership'],
      matchScore: 76,
      isUrgent: true,
      hasVideoInterview: false,
      companyRating: 4.2,
      benefits: ['Equity', 'Health Insurance', 'Team Outings'],
      jobType: 'onsite'
    }
  ]

  const topCompanies = [
    {
      id: 1,
      name: 'Tech Innovators',
      logo: '🏢',
      rating: 4.5,
      jobs: 45,
      description: 'Leading software development company',
      hiring: 'Actively Hiring',
      employees: '1000-5000',
      founded: '2010',
      industry: 'Technology',
      benefits: ['Health Insurance', 'Stock Options', 'Flexible Hours', 'Learning Budget'],
      recentNews: 'Raised $50M Series B funding'
    },
    {
      id: 2,
      name: 'AI Solutions Corp',
      logo: '🤖',
      rating: 4.7,
      jobs: 23,
      description: 'Cutting-edge AI and machine learning solutions',
      hiring: 'Actively Hiring',
      employees: '500-1000',
      founded: '2015',
      industry: 'Artificial Intelligence',
      benefits: ['Remote Work', 'Learning Budget', 'Health Insurance', 'Stock Options'],
      recentNews: 'Launched new AI product suite'
    }
  ]

  const quickSearchCategories = [
    { name: 'Software Engineer', count: '12K+ jobs', icon: '💻', trend: '+15%' },
    { name: 'Data Scientist', count: '8K+ jobs', icon: '📊', trend: '+25%' },
    { name: 'Product Manager', count: '6K+ jobs', icon: '🎯', trend: '+18%' },
    { name: 'UI/UX Designer', count: '5K+ jobs', icon: '🎨', trend: '+12%' },
    { name: 'DevOps Engineer', count: '4K+ jobs', icon: '⚙️', trend: '+30%' },
    { name: 'Marketing Manager', count: '15K+ jobs', icon: '📢', trend: '+8%' }
  ]

  const careerResources = [
    {
      title: 'Resume Builder',
      description: 'Create ATS-friendly resumes in minutes',
      icon: FileText,
      action: 'Build Resume',
      popular: true,
      link: '/resume',
      color: 'from-blue-500 to-blue-600',
      features: ['ATS Optimization', 'Professional Templates', 'Real-time Preview']
    },
    {
      title: 'Video Interview',
      description: 'Direct video interview with built-in calling',
      icon: Video,
      action: 'Start Interview',
      popular: true,
      link: '/interview',
      color: 'from-purple-500 to-purple-600',
      features: ['Direct Video Calling', 'WebRTC Technology', 'Interview Tools']
    },
    {
      title: 'Salary Calculator',
      description: 'Know your market worth',
      icon: DollarSign,
      action: 'Calculate',
      popular: false,
      // Remove link, add onClick:
      onClick: () => setShowSalaryCalculator(true),
      color: 'from-green-500 to-green-600',
      features: ['Market Analysis', 'Role Comparison', 'Negotiation Tips']
    },
    {
      title: 'Career Guidance',
      description: 'Get personalized career advice',
      icon: Target,
      action: 'Get Guidance',
      popular: false,
      link: '/career-guidance',
      color: 'from-orange-500 to-orange-600',
      features: ['Career Path Planning', 'Skill Assessment', 'Industry Insights']
    },
    {
      title: 'Skill Assessment',
      description: 'Test your skills and get certified',
      icon: Award,
      action: 'Take Test',
      popular: true,
      link: '/skill-assessment',
      color: 'from-red-500 to-red-600',
      features: ['Technical Tests', 'Soft Skills', 'Certification']
    },
    {
      title: 'Industry Insights',
      description: 'Latest trends and market analysis',
      icon: BarChart3,
      action: 'View Insights',
      popular: false,
      link: '/industry-insights',
      color: 'from-indigo-500 to-indigo-600',
      features: ['Market Trends', 'Salary Data', 'Growth Areas']
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'job_match',
      title: 'New job matches found!',
      message: '5 new jobs match your profile',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'application',
      title: 'Application Status Update',
      message: 'TechCorp viewed your application',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Video interview with StartupX tomorrow',
      time: '3 hours ago',
      unread: false
    }
  ]

  const trendingSkills = [
    { name: 'React', demand: 'High', growth: '+35%' },
    { name: 'Python', demand: 'Very High', growth: '+28%' },
    { name: 'AWS', demand: 'High', growth: '+42%' },
    { name: 'Machine Learning', demand: 'Very High', growth: '+55%' },
    { name: 'TypeScript', demand: 'Medium', growth: '+38%' },
    { name: 'Kubernetes', demand: 'High', growth: '+48%' }
  ]

  // Animate live jobs counter
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveJobs(prev => {
        if (prev < 475000) {
          return prev + Math.floor(Math.random() * 500) + 100
        }
        return 475000
      })
    }, 50)

    setTimeout(() => {
      setLiveJobs(475000)
      clearInterval(timer)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  const handleSearch = () => {
    setShowJobs(true)
    setShowCompanies(false)
  }

  const handleShowCompanies = () => {
    setShowCompanies(true)
    setShowJobs(false)
  }

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) {
        newSet.delete(jobId)
      } else {
        newSet.add(jobId)
      }
      return newSet
    })
  }

  const handleEasyApply = (jobId) => {
    alert(`Applied to job ${jobId} successfully! 🎉\nYou'll receive updates via email and notifications.`)
  }

  const handleViewCompany = (companyName) => {
    alert(`Viewing ${companyName} profile with detailed insights, employee reviews, and all open positions`)
  }

  const handleVideoInterview = () => {
    router.push('/interview')
  }

  const calculateSalaryInsights = () => {
    if (currentSalary && expectedSalary) {
      const current = parseInt(currentSalary)
      const expected = parseInt(expectedSalary)
      const increase = ((expected - current) / current * 100).toFixed(1)
      alert(`Salary Analysis:\n• Current: ₹${current} LPA\n• Expected: ₹${expected} LPA\n• Increase: ${increase}%\n• Market Status: ${increase > 20 ? 'Above Market' : increase > 10 ? 'Fair' : 'Conservative'}`)
    }
  }

  return (
    <div className="w-full bg-gradient-to-b from-white via-blue-50 to-purple-50 min-h-screen">
      {/* Enhanced Quick Access Banner with Animation */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 px-2 md:px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <span className="text-xs md:text-sm font-medium">🚀 Quick Actions:</span>
            <button 
              onClick={handleSearch}
              className="bg-white/20 hover:bg-white/30 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition-colors flex items-center gap-1"
            >
              <Search className="w-3 h-3" />
              Find Jobs
            </button>
            <button 
              onClick={handleShowCompanies}
              className="bg-white/20 hover:bg-white/30 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition-colors flex items-center gap-1"
            >
              <Building className="w-3 h-3" />
              Companies
            </button>
            <Link 
              href="/interview"
              className="bg-white/20 hover:bg-white/30 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition-colors flex items-center gap-1"
            >
              <Video className="w-3 h-3" />
              Video Interview
            </Link>
            <button 
              onClick={() => setShowSalaryCalculator(true)}
              className="bg-white/20 hover:bg-white/30 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition-colors flex items-center gap-1"
            >
              <DollarSign className="w-3 h-3" />
              Salary Tool
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0">
            <div className="text-xs md:text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {liveJobs.toLocaleString()} active jobs
            </div>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-2 md:right-4 bg-white rounded-xl shadow-2xl border border-gray-200 w-11/12 max-w-xs md:w-80 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            <button onClick={() => setShowNotifications(false)}>
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notif.unread ? 'bg-blue-50' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-gray-800 text-sm">{notif.title}</h4>
                  {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <p className="text-gray-600 text-sm mb-1">{notif.message}</p>
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
            ))}
          </div>
          <div className="p-4 text-center">
            <button className="text-blue-600 text-sm font-medium">View All Notifications</button>
          </div>
        </div>
      )}

      {/* Main Hero Section with Enhanced Design */}
      <div className="py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Enhanced Header with Animation */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Your Career Journey Starts Here
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover opportunities that match your skills and aspirations. 
              Powered by AI to help you find your perfect career path.
            </p>
            
            {/* Enhanced Feature Pills with Hover Effects */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
              <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                <Zap className="w-4 h-4" />
                One-Click Apply
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                <Target className="w-4 h-4" />
                Smart Matching
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                <Video className="w-4 h-4" />
                Video Interviews
              </span>
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                <Shield className="w-4 h-4" />
                Verified Companies
              </span>
            </div>
          </div>

          {/* Enhanced Search Bar with Modern Design */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-12 border border-gray-100 transform hover:scale-[1.02] transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative group">
                <div className={`flex items-center border-2 rounded-2xl px-4 py-4 bg-gray-50 group-hover:bg-white transition-all duration-300 ${isSearchFocused ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
                  <Search className="w-5 h-5 text-gray-400 mr-3 group-hover:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 font-medium"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center border-2 rounded-xl px-3 md:px-4 py-3 md:py-4 bg-gray-50 focus-within:bg-white focus-within:border-blue-500 transition-all">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 font-medium text-sm md:text-base"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl px-3 md:px-4 py-3 md:py-4 hover:border-blue-500 transition-all"
              >
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700 font-medium text-sm md:text-base">Filters</span>
              </button>

              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 md:py-4 px-4 md:px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <Search className="w-5 h-5" />
                Find Jobs
              </button>
            </div>

            {/* Enhanced Quick Category Search */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Trending Job Categories
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {enhancedCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setJobTitle(category.name)
                      handleSearch()
                    }}
                    className="group p-4 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-100 hover:border-blue-200"
                  >
                    <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform">{category.icon}</div>
                    <div className="font-semibold text-gray-800 mb-1">{category.name}</div>
                    <div className="text-sm text-blue-600 mb-1">{category.count}</div>
                    <div className="text-xs text-green-600 font-medium mb-2">{category.trend} growth</div>
                    <div className="text-xs text-gray-500">Avg. Salary: {category.avgSalary}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {category.skills.slice(0, 2).map(skill => (
                        <span key={skill} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* New Features Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Why Choose Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-2 mb-4 transform group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{story.image}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{story.name}</h3>
                      <p className="text-gray-600">{story.role} at {story.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{story.story}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">Salary: {story.salary}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-xl p-1 flex flex-wrap">
              {[
                { key: 'jobs', label: 'Jobs' },
                { key: 'companies', label: 'Companies' },
                { key: 'resources', label: 'Career Tools' },
                { key: 'insights', label: 'Market Insights' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all text-xs md:text-base ${
                    activeTab === tab.key
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Job Results */}
          {(showJobs || activeTab === 'jobs') && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  {jobTitle ? `Jobs for "${jobTitle}"` : 'Recommended Jobs'}
                </h2>
                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid gap-6">
                {sampleJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-300 p-6 hover:shadow-xl transition-all transform hover:scale-[1.02]">
                    {/* Job Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{job.logo}</div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                            {job.isUrgent && (
                              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                URGENT
                              </span>
                            )}
                            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                              {job.matchScore}% Match
                            </div>
                          </div>
                          <p className="text-gray-600 font-medium mb-2">{job.company}</p>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(job.companyRating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">{job.companyRating}</span>
                          </div>
                          
                          {/* Job Details */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.experience}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {job.posted}
                            </span>
                            {job.hasVideoInterview && (
                              <span className="flex items-center gap-1 text-purple-600">
                                <Video className="w-4 h-4" />
                                Video Interview
                              </span>
                            )}
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.map((skill) => (
                              <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Benefits */}
                          <div className="flex flex-wrap gap-2">
                            {job.benefits.slice(0, 3).map((benefit) => (
                              <span key={benefit} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                                ✓ {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => handleSaveJob(job.id)}
                          className={`p-2 rounded-full transition-colors ${
                            savedJobs.has(job.id) 
                              ? 'bg-red-100 text-red-500' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          <Heart className="w-5 h-5" fill={savedJobs.has(job.id) ? 'currentColor' : 'none'} />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{job.applicants}</span>
                        {job.isEasyApply && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Easy Apply
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEasyApply(job.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Apply Now
                        </button>
                        <button
                          onClick={() => alert('Previewing job details...')}
                          className="bg-gray-100 hover:bg-gray-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                        {job.hasVideoInterview && (
                          <button
                            onClick={handleVideoInterview}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
                          >
                            <Video className="w-4 h-4" />
                            Video Interview
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Companies Tab */}
          {activeTab === 'companies' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Building className="w-6 h-6 text-blue-600" />
                Top Companies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topCompanies.map((company) => (
                  <div key={company.id} className="bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-300 p-6 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-4xl">{company.logo}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(company.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">{company.rating}</span>
                        </div>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">{company.hiring}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{company.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {company.benefits.slice(0, 3).map((benefit) => (
                        <span key={benefit} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span><Users className="w-4 h-4 inline" /> {company.employees} employees</span>
                      <span><Calendar className="w-4 h-4 inline" /> Founded {company.founded}</span>
                      <span><Briefcase className="w-4 h-4 inline" /> {company.jobs} jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-700 mb-2">
                      <Sparkles className="w-4 h-4" />
                      {company.recentNews}
                    </div>
                    <button
                      onClick={() => handleViewCompany(company.name)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition flex items-center gap-2 mt-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Company
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Tools Tab */}
          {activeTab === 'resources' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Career Tools & Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerResources.map((tool, idx) => (
                  tool.onClick ? (
                    <button
                      key={idx}
                      onClick={tool.onClick}
                      className="group block w-full text-left bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-300 p-6 hover:shadow-xl transition-all flex flex-col h-full"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} p-2 transform group-hover:scale-110 transition-transform`}>
                          <tool.icon className="w-full h-full text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {tool.title}
                          </h3>
                          {tool.popular && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold mt-1 inline-block">
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {tool.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="mt-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition-all transform group-hover:scale-105 flex items-center justify-center gap-2">
                        <span>{tool.action}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  ) : (
                    <Link 
                      href={tool.link} 
                      key={idx}
                      className="group block"
                    >
                      <div className="bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-300 p-6 hover:shadow-xl transition-all flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} p-2 transform group-hover:scale-110 transition-transform`}>
                            <tool.icon className="w-full h-full text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {tool.title}
                            </h3>
                            {tool.popular && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold mt-1 inline-block">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
                        
                        {/* Features List */}
                        <div className="mb-4">
                          <ul className="space-y-2">
                            {tool.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button className="mt-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition-all transform group-hover:scale-105 flex items-center justify-center gap-2">
                          <span>{tool.action}</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Market Insights Tab */}
          {activeTab === 'insights' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Market Insights & Trending Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingSkills.map((skill, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-300 p-6 hover:shadow-xl transition-all flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="w-6 h-6 text-yellow-400" />
                      <h3 className="text-lg font-bold text-gray-800">{skill.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">Demand: <span className="font-semibold">{skill.demand}</span></p>
                    <p className="text-green-600 font-medium">Growth: {skill.growth}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Salary Calculator Modal */}
          {showSalaryCalculator && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                <button
                  onClick={() => setShowSalaryCalculator(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold text-blue-700 mb-4">Salary Calculator</h3>
                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder="Current Salary (LPA)"
                    value={currentSalary}
                    onChange={e => setCurrentSalary(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-300"
                  />
                  <input
                    type="number"
                    placeholder="Expected Salary (LPA)"
                    value={expectedSalary}
                    onChange={e => setExpectedSalary(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-300"
                  />
                  <button
                    onClick={calculateSalaryInsights}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold w-full"
                  >
                    Calculate Insights
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Video Interview Modal */}
          {showVideoInterview && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                <button
                  onClick={() => setShowVideoInterview(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold text-purple-700 mb-4">Video Interview</h3>
                <p className="mb-4 text-gray-700">
                  Prepare for your video interview. Make sure your camera and microphone are working.
                </p>
                <div className="flex flex-col items-center gap-4">
                  <Video className="w-16 h-16 text-purple-500" />
                  <button
                    onClick={() => alert('Starting video interview...')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
                  >
                    Start Interview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
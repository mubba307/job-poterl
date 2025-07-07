import _JSXStyle from "styled-jsx/style";
import React, { useState, useEffect } from 'react'
import { Search, MapPin, Briefcase, Building, Users, TrendingUp, Star, ChevronDown, Filter, Bell, Upload, ExternalLink, Heart, Clock, DollarSign, ArrowRight, Eye, Zap, Target, Award, MessageCircle, Video, FileText, Calendar, Send, Bookmark, Share2, AlertTriangle, CheckCircle, Play, BarChart3, Globe, Shield, Sparkles, Phone, Mail, LinkedIn, Twitter, Facebook, Instagram, ChevronRight, Plus, Minus, RefreshCw, Settings, User, CreditCard, HelpCircle, X, Rocket, Lightbulb, GraduationCap, Code2, Palette, Megaphone, Accessibility, Smartphone, Monitor, Users2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdvancedJobPortalHero() {
  // UC Design: User-focused state management
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

  // UC Design: Enhanced user experience states
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showJobDetails, setShowJobDetails] = useState(null)
  const [animateStats, setAnimateStats] = useState(false)
  const [hoveredJob, setHoveredJob] = useState(null)
  
  // UC Design: Accessibility and user preference states
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState('medium')
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false)
  const [userPreferences, setUserPreferences] = useState({
    jobAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    personalizedRecommendations: true
  })

  const router = useRouter()

  // UC Design: User-centered job categories with accessibility
  const enhancedCategories = [
    { 
      name: 'Software Engineer', 
      count: '12K+ jobs', 
      icon: '💻', 
      trend: '+15%',
      skills: ['React', 'Node.js', 'Python'],
      avgSalary: '₹12-25 LPA',
      demand: 'Very High',
      accessibility: 'High contrast available',
      remoteFriendly: true
    },
    { 
      name: 'Data Scientist', 
      count: '8K+ jobs', 
      icon: '📊', 
      trend: '+25%',
      skills: ['Python', 'ML', 'SQL'],
      avgSalary: '₹15-30 LPA',
      demand: 'High',
      accessibility: 'Screen reader friendly',
      remoteFriendly: true
    },
    { 
      name: 'Product Manager', 
      count: '6K+ jobs', 
      icon: '🎯', 
      trend: '+18%',
      skills: ['Strategy', 'Analytics', 'Leadership'],
      avgSalary: '₹18-35 LPA',
      demand: 'High',
      accessibility: 'Keyboard navigation',
      remoteFriendly: true
    },
    { 
      name: 'UI/UX Designer', 
      count: '5K+ jobs', 
      icon: '🎨', 
      trend: '+12%',
      skills: ['Figma', 'Adobe XD', 'User Research'],
      avgSalary: '₹10-25 LPA',
      demand: 'Medium',
      accessibility: 'Color blind friendly',
      remoteFriendly: true
    },
    { 
      name: 'DevOps Engineer', 
      count: '4K+ jobs', 
      icon: '⚙️', 
      trend: '+30%',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      avgSalary: '₹15-28 LPA',
      demand: 'Very High',
      accessibility: 'High contrast mode',
      remoteFriendly: true
    },
    { 
      name: 'Marketing Manager', 
      count: '15K+ jobs', 
      icon: '📢', 
      trend: '+8%',
      skills: ['Digital Marketing', 'SEO', 'Analytics'],
      avgSalary: '₹8-20 LPA',
      demand: 'Medium',
      accessibility: 'Screen reader optimized',
      remoteFriendly: false
    }
  ]

  // UC Design: User-focused features with accessibility
  const features = [
    {
      icon: Rocket,
      title: 'Smart Job Matching',
      description: 'AI-powered job recommendations based on your skills and preferences',
      color: 'from-blue-500 to-purple-500',
      accessibility: 'Voice navigation supported',
      userBenefit: 'Save 70% time in job search'
    },
    {
      icon: Lightbulb,
      title: 'Career Insights',
      description: 'Get real-time market insights and salary trends',
      color: 'from-yellow-500 to-orange-500',
      accessibility: 'High contrast mode',
      userBenefit: 'Make informed career decisions'
    },
    {
      icon: GraduationCap,
      title: 'Skill Development',
      description: 'Access to courses and certifications to boost your career',
      color: 'from-green-500 to-teal-500',
      accessibility: 'Screen reader friendly',
      userBenefit: 'Upskill with personalized learning paths'
    },
    {
      icon: Code2,
      title: 'Tech Opportunities',
      description: 'Exclusive tech job listings from top companies',
      color: 'from-purple-500 to-pink-500',
      accessibility: 'Keyboard navigation',
      userBenefit: 'Access to premium tech roles'
    }
  ]

  // UC Design: Inclusive success stories
  const successStories = [
    {
      name: 'Sarah K.',
      role: 'Senior Software Engineer',
      company: 'TechCorp',
      image: '👩‍💻',
      story: 'Found my dream job within 2 weeks of using the platform',
      salary: '₹35 LPA',
      accessibility: 'Wheelchair accessible workplace',
      remoteWork: true
    },
    {
      name: 'Michael R.',
      role: 'Product Manager',
      company: 'StartupX',
      image: '👨‍💼',
      story: 'The AI matching helped me discover perfect opportunities',
      salary: '₹28 LPA',
      accessibility: 'Flexible work arrangements',
      remoteWork: true
    },
    {
      name: 'Priya S.',
      role: 'Data Scientist',
      company: 'AI Solutions',
      image: '👩‍🔬',
      story: 'Career guidance and interview prep were game-changers',
      salary: '₹32 LPA',
      accessibility: 'Inclusive hiring practices',
      remoteWork: true
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
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 shadow-xl rounded-3xl px-4 py-16 mb-12 overflow-hidden animate-fade-in">
      {/* Parallax SVG background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', top: 0, left: 0}}>
          <defs>
            <linearGradient id="parallaxGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path fill="url(#parallaxGradient)" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" style={{transform: 'translateY(0px)'}}></path>
        </svg>
      </div>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-lg animate-slide-down mb-4">
          Find Your Dream Job
        </h1>
        {/* Moving text marquee */}
        <div className="relative w-full overflow-x-hidden mb-4" style={{height: '2.5rem'}}>
          <div className="absolute whitespace-nowrap animate-marquee text-lg font-semibold text-blue-700" style={{left: 0, top: 0}}>
            🚀 AI-Powered Matching &nbsp; | &nbsp; 💼 475,000+ Jobs &nbsp; | &nbsp; 🌍 12,000+ Companies &nbsp; | &nbsp; 🎥 Video Interviews &nbsp; | &nbsp; 🏆 Skill Assessments &nbsp; | &nbsp; 📈 Salary Insights &nbsp; | &nbsp; 🌐 Non-IT & IT Jobs &nbsp; | &nbsp; 🎉 Success Stories &nbsp; | &nbsp; 🔥 Trending Skills: React, Python, AWS, ML, TypeScript, Kubernetes
          </div>
        </div>
        <p className="text-xl md:text-2xl text-gray-700 font-medium mb-8 animate-fade-in-slow">
          Discover thousands of opportunities in IT, Non-IT, and more. <br />
          <span className="text-primary font-bold">AI-powered matching</span>, <span className="text-secondary font-bold">career insights</span>, and <span className="text-accent font-bold">real success stories</span> await you.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10 animate-fade-in-slower">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-bounce">
            Get Started
          </button>
          <button className="px-8 py-4 rounded-full bg-white text-blue-700 font-bold text-lg shadow hover:bg-blue-50 hover:scale-105 transition-all duration-300 border border-blue-200 animate-bounce-slow">
            Browse Jobs
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-in-slower">
          {/* Animated stats */}
          <div className="bg-white/80 rounded-xl shadow-lg px-6 py-4 flex flex-col items-center animate-bounce-slow">
            <span className="text-3xl font-extrabold text-blue-600">475,000+</span>
            <span className="text-gray-700 font-medium">Live Jobs</span>
          </div>
          <div className="bg-white/80 rounded-xl shadow-lg px-6 py-4 flex flex-col items-center animate-bounce-slow">
            <span className="text-3xl font-extrabold text-purple-600">12,000+</span>
            <span className="text-gray-700 font-medium">Companies</span>
          </div>
          <div className="bg-white/80 rounded-xl shadow-lg px-6 py-4 flex flex-col items-center animate-bounce-slow">
            <span className="text-3xl font-extrabold text-green-600">98%</span>
            <span className="text-gray-700 font-medium">Success Rate</span>
          </div>
        </div>
      </div>
      {/* Add entrance animation to feature cards below if present */}
      {/* ...rest of your hero content... */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-in; }
        .animate-fade-in-slow { animation: fade-in 1.8s ease-in; }
        .animate-fade-in-slower { animation: fade-in 2.5s ease-in; }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 1.2s cubic-bezier(0.4,0,0.2,1); }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce { animation: bounce 1.2s infinite; }
        .animate-bounce-slow { animation: bounce 2.2s infinite; }
        /* Marquee animation */
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </section>
  )
}
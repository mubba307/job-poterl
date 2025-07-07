'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { 
  User as UserIcon, 
  ChevronDown, 
  LogOut, 
  Settings, 
  Trash2,
  Accessibility,
  Bell,
  Search,
  Globe,
  HelpCircle,
  Bookmark,
  TrendingUp,
  Building,
  FileText,
  MessageCircle,
  Info,
  X
} from 'lucide-react';
import Signup from '../signup/signup';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignupMessage, setShowSignupMessage] = useState(false);
  const [lastAttemptedHref, setLastAttemptedHref] = useState(null);
  const [hasNavigatedAfterLogin, setHasNavigatedAfterLogin] = useState(false);
  
  // UC Design: Accessibility and user experience states
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Job Match',
      message: 'Senior Developer position at TechCorp matches your profile',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'Application Update',
      message: 'Your application for Product Manager has been reviewed',
      time: '1 day ago',
      unread: true
    },
    {
      id: 3,
      title: 'Interview Scheduled',
      message: 'Video interview scheduled for tomorrow at 2 PM',
      time: '2 days ago',
      unread: false
    }
  ]);

  // Load user from localStorage on mount and when storage changes
  React.useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('token') || localStorage.getItem('userToken');
      if (token && !user) {
        try {
          const response = await fetch('/api/profile', {
            headers: { Authorization: 'Bearer ' + token }
          });
          if (response.ok) {
            const data = await response.json();
            if (data.user) {
              setUser(data.user);
              localStorage.setItem('userData', JSON.stringify(data.user));
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    }

    function syncUser() {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('userData');
        const userToken = localStorage.getItem('userToken');
        const token = localStorage.getItem('token');
        
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (e) {
            console.error('Error parsing userData:', e);
            setUser({ token: userToken || token });
          }
        } else if (userToken || token) {
          setUser({ token: userToken || token });
          // Fetch user data from API if we have token but no userData
          fetchUserData();
        } else {
          setUser(null);
        }
      }
    }
    
    syncUser();
    
    // Listen for storage changes
    window.addEventListener('storage', syncUser);
    
    // Listen for custom profile update event
    const handleProfileUpdate = () => {
      console.log('Profile updated, refreshing navbar user data');
      syncUser();
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  // Watch for user login/signup and navigate if needed
  React.useEffect(() => {
    if (user && lastAttemptedHref && !hasNavigatedAfterLogin) {
      router.push(lastAttemptedHref);
      setLastAttemptedHref(null);
      setShowSignupMessage(false);
      setHasNavigatedAfterLogin(true);
    }
    if (!user) {
      setHasNavigatedAfterLogin(false);
    }
  }, [user, lastAttemptedHref, hasNavigatedAfterLogin, router]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
    setUser(null);
    setProfileOpen(false);
    window.location.href = '/loginme';
  };

  // Delete account handler (demo: just remove user)
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      localStorage.removeItem('userToken');
      localStorage.removeItem('token');
      setUser(null);
      setProfileOpen(false);
      window.location.href = '/signupme';
    }
  };

  // Helper to handle protected nav links
  const handleProtectedNav = (e, href) => {
    if (!user) {
      e.preventDefault();
      setShowSignupMessage(true);
      setLastAttemptedHref(href);
      setTimeout(() => setShowSignupMessage(false), 2000);
    }
  };

  // Add this function inside the Navbar component
  const getDashboardHref = () => {
    if (user?.role === 'admin') return '/admin-dashboard';
    if (user?.role === 'employer') return '/employer-dashboard';
    return '/dashboard'; // default for job seekers
  };

  React.useEffect(() => {
    // Fade-in animation for navbar
    const nav = document.getElementById('main-navbar');
    if (nav) {
      nav.style.opacity = 0;
      nav.style.transform = 'translateY(-16px)';
      setTimeout(() => {
        nav.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)';
        nav.style.opacity = 1;
        nav.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);

  return (
    <>
      {/* UC Design: Accessibility Menu */}
      {showAccessibilityMenu && (
        <div className="fixed top-16 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 w-80 z-50 p-4 glass fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              Accessibility Settings
            </h3>
            <button onClick={() => setShowAccessibilityMenu(false)}>
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                  className="rounded"
                />
                Dark Mode
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* UC Design: Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 w-80 z-50">
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

      <nav id="main-navbar" className="fixed top-0 left-0 w-full z-40 glass shadow-lg backdrop-blur-lg transition-all duration-500 px-4 py-2 flex items-center justify-between animate-fade-in">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl font-extrabold gradient-text tracking-tight drop-shadow-lg hover:scale-105 transition-transform duration-300">
            JobSeeker
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="relative group px-2 py-1 font-semibold text-lg text-blue-700 hover:text-secondary transition-colors duration-200">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/job-track" className="relative group px-2 py-1 font-semibold text-lg text-blue-700 hover:text-secondary transition-colors duration-200">
            Job Tracker
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/blogs" className="relative group px-2 py-1 font-semibold text-lg text-blue-700 hover:text-secondary transition-colors duration-200">
            Blogs
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/career-guidance" className="relative group px-2 py-1 font-semibold text-lg text-blue-700 hover:text-secondary transition-colors duration-200">
            Career Guidance
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/resume" className="relative group px-2 py-1 font-semibold text-lg text-blue-700 hover:text-secondary transition-colors duration-200">
            Resume
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href={getDashboardHref()} className="relative group px-2 py-1 font-semibold text-lg text-blue-700 hover:text-secondary transition-colors duration-200">
            Dashboard
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-full bg-white/70 hover:bg-blue-100 transition-all duration-200 shadow-md">
            <Bell className={`w-6 h-6 text-blue-600 ${showNotifications ? 'animate-bounce' : 'animate-pulse'}`} />
            {notifications.some(n => n.unread) && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>
          {/* Profile/User menu */}
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 hover:bg-blue-100 transition-all duration-200 shadow-md">
            {user && user.avatarUrl ? (
              <img src={`http://localhost:5000${user.avatarUrl}`} alt="Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-blue-500" />
            ) : (
              <UserIcon className="w-7 h-7 text-blue-600" />
            )}
            <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
          </button>
          {/* Mobile menu button */}
          <button className="md:hidden ml-2 p-2 rounded-full bg-white/70 hover:bg-blue-100 transition-all duration-200 shadow-md" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm fade-in" onClick={() => setMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-64 bg-white glass shadow-2xl h-full p-6 flex flex-col gap-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-100 transition" onClick={() => setMenuOpen(false)}>
              <X className="w-6 h-6 text-blue-600" />
            </button>
            <Link href="/" className="font-bold text-xl gradient-text mb-2" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/job-track" className="font-semibold text-lg text-blue-700" onClick={() => setMenuOpen(false)}>Job Tracker</Link>
            <Link href="/blogs" className="font-semibold text-lg text-blue-700" onClick={() => setMenuOpen(false)}>Blogs</Link>
            <Link href="/career-guidance" className="font-semibold text-lg text-blue-700" onClick={() => setMenuOpen(false)}>Career Guidance</Link>
            <Link href="/resume" className="font-semibold text-lg text-blue-700" onClick={() => setMenuOpen(false)}>Resume</Link>
            <Link href={getDashboardHref()} className="font-semibold text-lg text-blue-700" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          </div>
        </div>
      )}
      {/* Signup Message Toast */}
      {showSignupMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold animate-fade-in-out">
          Please signup to access this feature.
        </div>
      )}
    </>
  );
}
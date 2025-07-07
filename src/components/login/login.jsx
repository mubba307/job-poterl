'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userType, setUserType] = useState('jobseeker');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    
    // Check if this is an admin login
    const isAdmin = formData.email === 'admin@gmail.com' && formData.password === 'admin123';
    
    console.log('Login attempt:', { email: formData.email, isAdmin });
    
    if (isAdmin) {
      // Admin login (demo mode)
      localStorage.setItem('adminToken', 'demo_token_' + Date.now());
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('userType', 'admin');
      setLoginType('admin');
      setLoginSuccess(true);
      
      console.log('Admin credentials detected, setting localStorage:', {
        adminToken: localStorage.getItem('adminToken'),
        isAdmin: localStorage.getItem('isAdmin'),
        userType: localStorage.getItem('userType')
      });
      
      // Redirect admin to admin dashboard
      setTimeout(() => {
        console.log('Redirecting admin to admin dashboard...');
        router.push('/admin-dashboard');
      }, 1000);
    } else {
      // Regular user login - call backend API
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
          // Save real token from backend
          localStorage.setItem('token', data.token);
          localStorage.setItem('userType', userType);
          setLoginType(userType);
          setLoginSuccess(true);
          
          console.log('Login successful, token saved:', data.token);
          
          // Redirect to dashboard
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login API error:', error);
        setError('Network error. Please try again.');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-xs sm:max-w-md animate-fade-in-slide glass">
        {/* Success Message */}
        {loginSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Login Successful!</h3>
              <p className="text-sm text-green-600">
                {loginType === 'admin' 
                  ? 'Redirecting to admin dashboard...' 
                  : 'Redirecting to dashboard...'
                }
              </p>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in glass">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-8 py-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight animate-slide-down">Welcome Back</h1>
            <p className="text-blue-100 mt-2 animate-fade-in-slow">Sign in to your JobPortal account</p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-8 animate-fade-in-slow space-y-6">
            {/* User Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Login as:
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    name="userType"
                    value="jobseeker"
                    checked={userType === 'jobseeker'}
                    onChange={(e) => setUserType(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Job Seeker</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer flex-1">
                  <input
                    type="radio"
                    name="userType"
                    value="employer"
                    checked={userType === 'employer'}
                    onChange={(e) => setUserType(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Employer</span>
                </label>
              </div>
            </div>

            {/* Login Form Fields */}
            <div className="space-y-4">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-transparent bg-white transition-all duration-200"
                  placeholder="Email Address"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-600 peer-focus:text-xs">
                  Email Address
                </label>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-transparent bg-white transition-all duration-200"
                  placeholder="Password"
                />
                <label className="absolute left-4 top-3 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-blue-600 peer-focus:text-xs">
                  Password
                </label>
                <button type="button" className="absolute right-4 top-3 text-gray-400 hover:text-blue-600" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-bounce disabled:opacity-60 disabled:cursor-not-allowed" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-center text-gray-600 text-sm mt-2">
              Don&apos;t have an account?{' '}
              <Link href="/signupme" className="text-blue-600 hover:underline font-semibold">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
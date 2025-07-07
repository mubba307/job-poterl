'use client';
import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Briefcase, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/navbar';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'jobseeker',
    location: '',
    experience: '',
    skills: '',
    company: '',
    industry: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    console.log('Validating form with data:', formData);

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      console.log('First name validation failed');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      console.log('Last name validation failed');
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      console.log('Email validation failed - empty');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      console.log('Email validation failed - invalid format');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      console.log('Phone validation failed');
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
      console.log('Phone validation failed - wrong format');
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      console.log('Password validation failed');
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      console.log('Password validation failed - too short');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      console.log('Password confirmation validation failed');
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      console.log('Location validation failed');
    }

    if (formData.userType === 'jobseeker') {
      if (!formData.experience) {
        newErrors.experience = 'Experience level is required';
        console.log('Experience validation failed');
      }
      if (!formData.skills.trim()) {
        newErrors.skills = 'Skills are required';
        console.log('Skills validation failed');
      }
    } else {
      if (!formData.company.trim()) {
        newErrors.company = 'Company name is required';
        console.log('Company validation failed');
      }
      if (!formData.industry || formData.industry.trim() === '') {
        newErrors.industry = 'Industry is required';
        console.log('Industry validation failed');
      } else {
        // Validate industry enum values
        const validIndustries = ['IT', 'Finance', 'Marketing', 'Other'];
        if (!validIndustries.includes(formData.industry)) {
          newErrors.industry = `Invalid industry. Must be one of: ${validIndustries.join(', ')}`;
          console.log('Industry validation failed - invalid value');
        }
      }
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('Form is valid:', isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Yahan URL ko absolute bana dein:
      // Combine firstName and lastName into name for backend compatibility
      const signupPayload = {
        ...formData,
        name: formData.firstName + ' ' + formData.lastName,
        experience: formData.userType === 'jobseeker' ? formData.experience : '',
        skills: formData.userType === 'jobseeker' ? formData.skills : '',
        // Only include company and industry for employers
        ...(formData.userType === 'employer' && { company: formData.company, industry: formData.industry })
      };
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupPayload)
      });

      const data = await response.json();

      if (response.ok) {
        // Save user to localStorage for immediate login (optional, or after email verification)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        setSuccess('Account created successfully! Please check your email.');
        setTimeout(() => router.push('/loginme'), 3000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="flex items-center justify-center p-2 sm:p-4 pt-8">
        <div className="w-full max-w-xs sm:max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-slide glass">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-8 py-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight animate-slide-down">Join JobPortal</h1>
            <p className="text-blue-100 text-center mt-2 animate-fade-in-slow">Start your career journey today</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mx-2 sm:mx-8 mt-4 flex items-center space-x-3 animate-fade-in">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-green-800">Success!</h3>
                <p className="text-sm text-green-600">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-2 sm:mx-8 mt-4 flex items-center space-x-3 animate-fade-in">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 animate-fade-in-slow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-transparent bg-white transition-all duration-200"
                  placeholder="First Name"
                  autoComplete="given-name"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 pointer-events-none bg-white px-1">
                  First Name
                </label>
                {errors.firstName && <span className="text-xs text-red-500 mt-1 block animate-fade-in">{errors.firstName}</span>}
              </div>
              {/* Last Name */}
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-transparent bg-white transition-all duration-200"
                  placeholder="Last Name"
                  autoComplete="family-name"
                />
                <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 pointer-events-none bg-white px-1">
                  Last Name
                </label>
                {errors.lastName && <span className="text-xs text-red-500 mt-1 block animate-fade-in">{errors.lastName}</span>}
              </div>
            </div>
            {/* Email, Phone, Password, etc. - repeat similar structure for all fields with floating labels and icons */}
            {/* ...rest of your form fields... */}
            <button type="submit" className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-bounce disabled:opacity-60 disabled:cursor-not-allowed" disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
            <p className="text-center text-gray-600 text-sm mt-2">
              Already have an account?{' '}
              <Link href="/loginme" className="text-blue-600 hover:underline font-semibold">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-in; }
        .animate-fade-in-slow { animation: fade-in 1.8s ease-in; }
        @keyframes fade-in-slide {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-slide { animation: fade-in-slide 1.2s cubic-bezier(0.4,0,0.2,1); }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 1.2s cubic-bezier(0.4,0,0.2,1); }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce { animation: bounce 1.2s infinite; }
      `}</style>
    </div>
  );
}


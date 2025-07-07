'use client';
import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('userToken');
    console.log('Profile component: Token from localStorage:', token ? 'Present' : 'Missing');
    console.log('Profile component: Current URL:', window.location.href);
    
    if (!token) {
      console.log('Profile component: No token found, showing login message');
      setErrors({ auth: 'Please login to view your profile' });
      return;
    }

    console.log('Profile component: Making API call to /api/profile');
    fetch('/api/profile', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => {
        console.log('Profile component: API response status:', res.status);
        console.log('Profile component: API response headers:', Object.fromEntries(res.headers.entries()));
        if (res.status === 401 || res.status === 403) {
          console.log('Profile component: Authentication failed, clearing token');
          localStorage.removeItem('token');
          localStorage.removeItem('userToken');
          setErrors({ auth: 'Session expired. Please login again.' });
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          console.log('Profile component: API response data:', data);
          setProfile(data.user || data);
          setForm(data.user || data);
          setPreview(data.user?.avatarUrl || data.avatarUrl || '');
          setErrors({});
        }
      })
      .catch(error => {
        console.error('Profile component: API error:', error);
        setErrors({ auth: 'Failed to load profile. Please try again.' });
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file (JPEG, PNG, GIF)' }));
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }
      
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!form.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!form.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!form.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    // Conditional validation based on user type
    if (form.userType === 'jobseeker') {
      if (!form.experience) {
        newErrors.experience = 'Experience level is required';
      }
      if (
        !form.skills ||
        (Array.isArray(form.skills) && form.skills.length === 0) ||
        (typeof form.skills === 'string' && form.skills.trim() === '')
      ) {
        newErrors.skills = 'Skills are required';
      }
    } else if (form.userType === 'employer') {
      if (!form.company?.trim()) {
        newErrors.company = 'Company name is required';
      }
      if (!form.industry || form.industry.trim() === '') {
        newErrors.industry = 'Industry is required';
      } else {
        const validIndustries = ['IT', 'Finance', 'Marketing', 'Other'];
        if (!validIndustries.includes(form.industry)) {
          newErrors.industry = `Invalid industry. Must be one of: ${validIndustries.join(', ')}`;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    const token = localStorage.getItem('token') || localStorage.getItem('userToken');
    if (!token) {
      setErrors({ auth: 'Please login to update your profile' });
      return;
    }
    
    if (!validateForm()) return;

    const formData = new FormData();
    
    // Only send necessary fields, exclude sensitive ones
    const allowedFields = ['firstName', 'lastName', 'phone', 'location', 'experience', 'skills', 'company', 'industry'];
    
    allowedFields.forEach(key => {
      if (form[key] !== undefined && form[key] !== null && form[key] !== '') {
        formData.append(key, form[key]);
      }
    });
    
    if (image) formData.append('avatar', image);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token },
        body: formData
      });
      const data = await res.json();
      
      if (res.ok) {
        setProfile(data.user || data);
        setEdit(false);
        setErrors({});
        
        // Update localStorage with new user data
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }
        
        // Dispatch custom event to notify navbar to refresh
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('profileUpdated'));
        }
      } else if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        setErrors({ auth: 'Session expired. Please login again.' });
      } else {
        setErrors({ submit: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    }
  };

  const handleEditClick = () => {
    const token = localStorage.getItem('token') || localStorage.getItem('userToken');
    if (!token) {
      setErrors({ auth: 'Please login to edit your profile' });
      return;
    }
    setEdit(true);
    setErrors({});
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fade-in-slide">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-10 max-w-xs sm:max-w-lg w-full text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center animate-bounce">
          <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-blue-900 mb-2 animate-slide-down">Loading Profile...</h2>
        <p className="text-gray-600 animate-fade-in-slow">Please wait while we fetch your profile details.</p>
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

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gray-50 py-4 sm:py-8">
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-2xl glass animate-fade-in">
        {!edit ? (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mb-4 rounded-full overflow-hidden border-4 border-blue-500 bg-gray-100 flex items-center justify-center">
              {profile.avatarUrl ? (
                <img 
                  src={`http://localhost:5000${profile.avatarUrl}`} 
                  alt="User Avatar" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <span className={`text-4xl sm:text-5xl text-blue-400 font-bold ${profile.avatarUrl ? 'hidden' : 'flex'}`}>{profile.firstName ? profile.firstName[0] : '?'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 text-center">{profile.firstName} {profile.lastName}</h2>
            <p className="text-gray-900 mb-2 text-center break-all">{profile.email}</p>
            <p className="text-sm text-blue-600 mb-4 capitalize text-center">{profile.userType}</p>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Phone:</span>
                <span className="text-gray-900">{profile.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Location:</span>
                <span className="text-gray-900">{profile.location}</span>
              </div>
              
              {profile.userType === 'jobseeker' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Experience:</span>
                    <span className="text-gray-900 capitalize">{profile.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Skills:</span>
                    <span className="text-gray-900">{profile.skills?.join(', ') || profile.skills}</span>
                  </div>
                </>
              )}
              
              {profile.userType === 'employer' && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Company:</span>
                    <span className="text-gray-900">{profile.company}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Industry:</span>
                    <span className="text-gray-900">{profile.industry}</span>
                  </div>
                </>
              )}
            </div>
            <button onClick={handleEditClick} className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold w-full sm:w-auto">Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            {errors.auth && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                {errors.auth}
                <button 
                  onClick={() => window.location.href = '/loginme'}
                  className="ml-2 text-blue-600 hover:underline"
                >
                  Login
                </button>
              </div>
            )}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                {errors.submit}
              </div>
            )}
            
            <div className="flex flex-col items-center">
              <label htmlFor="avatar-upload" className="cursor-pointer w-24 h-24 sm:w-28 sm:h-28 mb-2 rounded-full overflow-hidden border-4 border-blue-500 bg-gray-100 flex items-center justify-center hover:border-blue-600 transition-colors relative">
                {preview ? (
                  <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                ) : profile.avatarUrl ? (
                  <img 
                    src={`http://localhost:5000${profile.avatarUrl}`} 
                    alt="Current Avatar" 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span className={`text-4xl sm:text-5xl text-blue-400 font-bold ${preview || profile.avatarUrl ? 'hidden' : 'flex'}`}>
                  {form.firstName ? form.firstName[0] : '?'}
                </span>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <span className="text-white text-xs opacity-0 hover:opacity-100">Change Photo</span>
                </div>
              </label>
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
              <p className="text-xs text-gray-900 font-bold mt-1">Click to upload image (Max 5MB)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  name="firstName" 
                  value={form.firstName || ''} 
                  onChange={handleChange} 
                  placeholder="First Name" 
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} 
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <input 
                  name="lastName" 
                  value={form.lastName || ''} 
                  onChange={handleChange} 
                  placeholder="Last Name" 
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} 
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  name="email" 
                  value={form.email || ''} 
                  readOnly
                  disabled
                  placeholder="Email" 
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" 
                />
                <p className="text-xs text-gray-900 font-bold mt-1">Email cannot be changed</p>
              </div>
              
              <div>
                <input 
                  name="phone" 
                  value={form.phone || ''} 
                  onChange={handleChange} 
                  placeholder="Phone" 
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} 
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            
            <div>
              <input 
                name="location" 
                value={form.location || ''} 
                onChange={handleChange} 
                placeholder="Location" 
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`} 
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
            
            {/* Conditional fields based on user type */}
            {form.userType === 'jobseeker' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <select
                    name="experience"
                    value={form.experience || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select experience</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6+ years)</option>
                    <option value="fresher">Fresher</option>
                    <option value="junior">Junior</option>
                  </select>
                  {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                </div>
                
                <div>
                  <input 
                    name="skills" 
                    value={form.skills || ''} 
                    onChange={handleChange} 
                    placeholder="Skills (comma separated)" 
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.skills ? 'border-red-500' : 'border-gray-300'}`} 
                  />
                  {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    name="company" 
                    value={form.company || ''} 
                    onChange={handleChange} 
                    placeholder="Company Name" 
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company ? 'border-red-500' : 'border-gray-300'}`} 
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>
                
                <div>
                  <select
                    name="industry"
                    value={form.industry || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.industry ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select industry</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                </div>
              </div>
            )}
            
            <div className="flex gap-2 mt-4 flex-col sm:flex-row">
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">Save Changes</button>
              <button type="button" onClick={() => setEdit(false)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition font-semibold">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

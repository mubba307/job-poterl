"use client";
import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { API_ENDPOINTS } from '../../config/api';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Users, 
  Building2, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronUp, 
  Star,
  Briefcase,
  Globe,
  AlertCircle,
  CheckCircle,
  Copy,
  Mail,
  MessageCircle,
  Linkedin,
  Twitter,
  X,
  Download
} from 'lucide-react';

// Demo job data for offline functionality
const demoJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    experience: "5+ years",
    description: "We're looking for an experienced React developer to join our team...",
    requirements: ["React", "TypeScript", "Node.js", "AWS"],
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    views: 245,
    applications: 12
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "New York, NY",
    salary: "$90,000 - $110,000",
    type: "Full-time",
    experience: "3+ years",
    description: "Creative UX/UI designer needed for innovative projects...",
    requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    views: 189,
    applications: 8
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Remote",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    experience: "4+ years",
    description: "Join our data science team to build ML models...",
    requirements: ["Python", "TensorFlow", "SQL", "Statistics"],
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    views: 312,
    applications: 15
  }
];

// Responsive JobCardList that uses demo data for offline functionality
export function JobCardList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setJobs(demoJobs);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
    
    /* 
    // Uncomment this when your backend is ready
    axios.get(API_ENDPOINTS.JOBS)
      .then(res => {
        setJobs(res.data.jobs || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch jobs:', err);
        setError('Failed to load jobs');
        setLoading(false);
      });
    */
  }, []);

  return (
    <section className="w-full py-8 px-2 sm:px-4 bg-gray-50">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">
        Latest Jobs
      </h2>
      {loading && <div className="text-center text-blue-700">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, idx) => (
          <JobCard key={job.id || idx} job={job} />
        ))}
      </div>
    </section>
  );
}

const JobCard = ({ 
  job, 
  onBookmark, 
  onApply, 
  onShare, 
  isBookmarked = false,
  showSalary = true,
  compactMode = false,
  onCardClick,
  onReport,
  onFeedback,
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [expanded, setExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('idle');
  const [viewCount, setViewCount] = useState(job?.views || 0);
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [showJDModal, setShowJDModal] = useState(false);

  const shareMenuRef = useRef(null);
  const cardRef = useRef(null);

  // Check if sharing is supported
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  // Handle bookmark state
  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  // Calculate time left for application deadline
  useEffect(() => {
    if (job?.deadline) {
      const updateTimeLeft = () => {
        const now = new Date();
        const deadline = new Date(job.deadline);
        const diff = deadline - now;
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          
          if (days > 0) {
            setTimeLeft(`${days} day${days > 1 ? 's' : ''} left`);
          } else if (hours > 0) {
            setTimeLeft(`${hours} hour${hours > 1 ? 's' : ''} left`);
          } else {
            setTimeLeft('Less than 1 hour left');
          }
        } else {
          setTimeLeft('Expired');
        }
      };
      
      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [job?.deadline]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Intersection Observer for view tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setViewCount(prev => prev + 1);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!job) {
    return (
      <div className="bg-white border border-red-200 rounded-2xl shadow-md p-6 w-full max-w-md">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>Job data not available</span>
        </div>
      </div>
    );
  }

  const handleBookmark = (e) => {
    e.stopPropagation();
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    onBookmark?.(job, newBookmarked);
  };

  const handleApply = async (e) => {
    e.stopPropagation();
    setApplicationStatus('applying');
    
    try {
      await onApply?.(job);
      setApplicationStatus('applied');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setApplicationStatus('idle');
      }, 3000);
    } catch (error) {
      setApplicationStatus('error');
      setTimeout(() => {
        setApplicationStatus('idle');
      }, 3000);
    }
  };

  const handleShare = (platform = 'native') => {
    const shareData = {
      title: job.title,
      text: `Check out this job: ${job.title} at ${job.company}`,
      url: job.link || window.location.href
    };

    switch (platform) {
      case 'native':
        if (canShare) {
          navigator.share(shareData);
        }
        break;
      case 'copy':
        navigator.clipboard.writeText(job.link || window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + '\n\n' + shareData.url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`);
        break;
    }
    
    setShowShareMenu(false);
    onShare?.(job, platform);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'new': return 'bg-green-100 text-green-700 border-green-200';
      case 'featured': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'remote': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getApplicationButtonText = () => {
    switch (applicationStatus) {
      case 'applying': return 'Applying...';
      case 'applied': return 'Applied ✓';
      case 'error': return 'Try Again';
      default: return 'Apply Now';
    }
  };

  const getApplicationButtonClass = () => {
    const baseClass = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ";
    
    switch (applicationStatus) {
      case 'applying': return baseClass + "bg-gray-400 text-white cursor-not-allowed";
      case 'applied': return baseClass + "bg-green-500 text-white cursor-not-allowed";
      case 'error': return baseClass + "bg-red-500 text-white hover:bg-red-600";
      default: return baseClass + "bg-blue-600 text-white hover:bg-blue-700";
    }
  };

  const isUrgent = job.deadline && new Date(job.deadline) - new Date() < 7 * 24 * 60 * 60 * 1000; // 7 days
  const isExpired = job.deadline && new Date(job.deadline) < new Date();

  // Download JD as text file
  const handleDownloadJD = (e) => {
    e.stopPropagation();
    const content = `Job Title: ${job.title}\nCompany: ${job.company}\nDescription: ${job.description}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${job.title.replace(/\s+/g, '_')}_JD.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Feedback submit
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setShowFeedback(false);
    setFeedbackText('');
    onFeedback?.(job, feedbackText);
    alert("Thank you for your feedback!");
  };

  // Report submit
  const handleReportSubmit = (e) => {
    e.preventDefault();
    setShowReport(false);
    setReportReason('');
    onReport?.(job, reportReason);
    alert("Report submitted. We'll review this job soon.");
  };

  return (
    <div 
      ref={cardRef}
      className={`bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
        compactMode ? 'p-4' : 'p-6'
      } ${isExpired ? 'opacity-60' : ''} cursor-pointer w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto`}
      onClick={() => onCardClick?.(job)}
    >
      {/* Status Badges */}
      <div className="absolute top-3 left-3 flex gap-2 z-10 flex-wrap">
        {job.featured && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full border border-yellow-200 flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </span>
        )}
        {job.isRemote && (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
            Remote
          </span>
        )}
        {isUrgent && !isExpired && (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full border border-red-200 animate-pulse">
            Urgent
          </span>
        )}
        {isExpired && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
            Expired
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10 flex-wrap">
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full transition-all duration-200 ${
            bookmarked 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={bookmarked ? "Remove Bookmark" : "Bookmark"}
          aria-label={bookmarked ? "Remove Bookmark" : "Bookmark"}
        >
          <Heart className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        <div className="relative" ref={shareMenuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowShareMenu(!showShareMenu);
            }}
            className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-all duration-200"
            title="Share"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {showShareMenu && (
            <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-48">
              <div className="p-2">
                {canShare && (
                  <button
                    onClick={() => handleShare('native')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <Share2 className="w-4 h-4" />
                    Share via System
                  </button>
                )}
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div className={`flex flex-col sm:flex-row items-start gap-4 ${compactMode ? 'mb-3 mt-6' : 'mb-4 mt-8'}`}>
        {job.logo && (
          <div className="relative flex-shrink-0">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className={`object-contain rounded-lg ${compactMode ? 'w-10 h-10' : 'w-14 h-14'} sm:w-14 sm:h-14`}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {job.companyRating && (
              <div className="absolute -bottom-1 -right-1 bg-white border border-gray-200 rounded-full px-1 text-xs flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                {job.companyRating}
              </div>
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className={`font-semibold text-gray-800 ${compactMode ? 'text-lg' : 'text-xl'} line-clamp-2`}>
            {job.title}
          </h2>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <p className="text-gray-600 font-medium">{job.company}</p>
            {job.companyWebsite && (
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          {job.companySize && (
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <Users className="w-3 h-3" />
              {job.companySize} employees
            </div>
          )}
        </div>
      </div>

      {/* Job Info Section */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 ${compactMode ? 'mb-3' : 'mb-4'}`}>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{job.location}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <span>{job.type}</span>
        </div>

        {showSalary && job.salary && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>{job.salary}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{job.datePosted}</span>
        </div>

        {job.experience && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{job.experience}</span>
          </div>
        )}

        {viewCount > 0 && (
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span>{viewCount} views</span>
          </div>
        )}
      </div>

      {/* Deadline Warning */}
      {job.deadline && !isExpired && (
        <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
          isUrgent ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
        } flex-wrap`}>
          <AlertCircle className={`w-4 h-4 ${isUrgent ? 'text-red-500' : 'text-blue-500'}`} />
          <span className={`text-sm ${isUrgent ? 'text-red-700' : 'text-blue-700'}`}>
            Application deadline: {timeLeft}
          </span>
        </div>
      )}

      {/* Skills/Tags */}
      {job.skills && job.skills.length > 0 && (
        <div className={`flex flex-wrap gap-2 ${compactMode ? 'mb-3' : 'mb-4'}`}>
          {(expanded ? job.skills : job.skills.slice(0, 4)).map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  +{job.skills.length - 4} more <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Description Preview */}
      <div className={compactMode ? 'mb-3' : 'mb-4'}>
        <p className="text-gray-800 text-sm">
          {expanded && job.description 
            ? job.description 
            : job.description?.length > 120 
              ? job.description.slice(0, 120) + '...'
              : job.description
          }
        </p>
        {job.description && job.description.length > 120 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 flex items-center gap-1"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Benefits/Perks */}
      {job.benefits && job.benefits.length > 0 && (
        <div className={`bg-gray-50 rounded-lg p-3 ${compactMode ? 'mb-3' : 'mb-4'}`}>
          <h4 className="text-sm font-medium text-gray-800 mb-2">Benefits</h4>
          <div className="flex flex-wrap gap-2">
            {job.benefits.slice(0, 3).map((benefit, idx) => (
              <span key={idx} className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                {benefit}
              </span>
            ))}
            {job.benefits.length > 3 && (
              <span className="text-xs text-gray-500">
                +{job.benefits.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <button
          onClick={handleApply}
          disabled={applicationStatus === 'applying' || applicationStatus === 'applied' || isExpired}
          className={getApplicationButtonClass() + " w-full sm:w-auto"}
        >
          {applicationStatus === 'applied' && <CheckCircle className="w-4 h-4" />}
          {getApplicationButtonText()}
        </button>

        {job.link && (
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium w-full sm:w-auto justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
            View Details
          </a>
        )}

        {/* Download JD */}
        <button
          onClick={handleDownloadJD}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm font-medium w-full sm:w-auto justify-center"
        >
          <Download className="w-4 h-4" />
          Download JD
        </button>

        {/* Feedback */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowFeedback(true);
          }}
          className="flex items-center gap-2 px-4 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-all duration-200 text-sm font-medium w-full sm:w-auto justify-center"
        >
          <MessageCircle className="w-4 h-4" />
          Feedback
        </button>

        {/* Report */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowReport(true);
          }}
          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all duration-200 text-sm font-medium w-full sm:w-auto justify-center"
        >
          <AlertCircle className="w-4 h-4" />
          Report
        </button>
      </div>

      {/* Progress indicator for application process */}
      {job.applicationSteps && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Application Process:</span>
            <span>{job.applicationSteps} steps</span>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowFeedback(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-green-700 mb-4">Job Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                rows={4}
                placeholder="Share your feedback about this job..."
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold w-full"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowReport(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-red-700 mb-4">Report Job</h3>
            <form onSubmit={handleReportSubmit}>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                value={reportReason}
                onChange={e => setReportReason(e.target.value)}
                required
              >
                <option value="">Select reason</option>
                <option value="spam">Spam or scam</option>
                <option value="expired">Job expired</option>
                <option value="incorrect">Incorrect info</option>
                <option value="other">Other</option>
              </select>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold w-full"
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}

      {/* JD Preview Modal */}
      {showJDModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowJDModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-blue-700 mb-4">Job Description Preview</h3>
            <pre className="bg-gray-100 rounded-lg p-4 mb-4 text-sm max-h-60 overflow-y-auto">
              {job.description}
            </pre>
            <button
              onClick={handleDownloadJD}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold w-full"
            >
              Download JD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
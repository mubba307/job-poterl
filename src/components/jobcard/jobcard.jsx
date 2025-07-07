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
  Download,
  ArrowRight
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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Try to get userId from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUserId(userObj._id || userObj.id); // adjust key as per your storage
      } catch (e) {
        // handle error
        setUserId(null);
      }
    }
  }, []);

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
    <section className="w-full py-12 px-2 sm:px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fade-in">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center drop-shadow-lg animate-slide-down">
        Latest Jobs
      </h2>
      {loading && (
        <div className="flex gap-6 justify-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-80 h-56 rounded-2xl glass shimmer"></div>
          ))}
        </div>
      )}
      {error && <div className="text-center text-red-600 animate-fade-in">{error}</div>}
      <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, idx) => (
          <JobCard key={job.id || idx} job={job} userId={userId} />
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
  userId
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
      className={`relative rounded-2xl glass shadow-xl border-2 border-transparent hover:border-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300 p-6 flex flex-col gap-3 group cursor-pointer hover:scale-105 animate-fade-in`}
      tabIndex={0}
      aria-label={`Job card for ${job.title} at ${job.company}`}
      onClick={onCardClick}
      onKeyDown={e => e.key === 'Enter' && onCardClick && onCardClick()}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-2xl font-bold shadow-md animate-bounce">
          <Briefcase className="w-7 h-7 text-blue-600 animate-pulse" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-900 gradient-text drop-shadow mb-1 animate-slide-down">{job.title}</h3>
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Building2 className="w-4 h-4 text-purple-500" />
            {job.company}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs animate-fade-in">
          <MapPin className="w-4 h-4" /> {job.location}
        </span>
        {showSalary && (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold text-xs animate-fade-in">
            <DollarSign className="w-4 h-4" /> {job.salary}
          </span>
        )}
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-semibold text-xs animate-fade-in">
          <Clock className="w-4 h-4" /> {job.type}
        </span>
        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-semibold text-xs animate-fade-in">
          <Calendar className="w-4 h-4" /> {timeLeft}
        </span>
      </div>
      <div className="text-gray-800 text-sm mb-2 line-clamp-2 animate-fade-in">{job.description}</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {job.requirements?.slice(0, 4).map((req, i) => (
          <span key={i} className="px-2 py-1 rounded bg-gray-100 text-xs font-medium text-gray-700 animate-fade-in">{req}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-bounce"
          onClick={onApply}
        >
          Apply Now <ArrowRight className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-full bg-white/80 hover:bg-blue-100 transition-all duration-200 shadow-md ${bookmarked ? 'text-red-500' : 'text-gray-400'}`}
            onClick={onBookmark}
            aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark Job'}
          >
            <Heart className={`w-5 h-5 ${bookmarked ? 'animate-bounce' : 'animate-pulse'}`} />
          </button>
          <button
            className="p-2 rounded-full bg-white/80 hover:bg-blue-100 transition-all duration-200 shadow-md text-blue-500"
            onClick={() => setShowShareMenu(!showShareMenu)}
            aria-label="Share Job"
          >
            <Share2 className="w-5 h-5 animate-pulse" />
          </button>
        </div>
      </div>
      {/* Share menu, feedback, report, etc. can be animated similarly */}
    </div>
  );
};

export default JobCard;

<style jsx>{`
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in { animation: fade-in 1s ease-in; }
  .animate-fade-in-slow { animation: fade-in 1.8s ease-in; }
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
  .animate-bounce-slow { animation: bounce 2.2s infinite; }
`}</style>
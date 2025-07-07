'use client';
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';

// Mock JobCard component since it's imported
const JobCard = ({ job, userId }) => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const userIdFromContextOrAPI = userId;
  const companyEmail = job.companyEmail || "company@example.com";

  async function handleApply() {
    const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
    if (!token) {
      setShowSignupModal(true);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          userId: userIdFromContextOrAPI,
          jobId: job.id,
          companyEmail: companyEmail
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Application sent! ' + data.message);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300 w-[380px] h-[420px] flex flex-col">
      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Sign Up Required</h2>
            <p className="mb-6">Please sign up or log in to apply for jobs.</p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold mb-2 w-full"
              onClick={() => { setShowSignupModal(false); window.location.href = '/signup'; }}
            >
              Go to Signup
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-semibold w-full"
              onClick={() => setShowSignupModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-lg text-gray-900 truncate">{job.title}</h3>
            <p className="text-gray-900 truncate">{job.company}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0 ml-2">
          {job.isUrgent && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
              Urgent
            </span>
          )}
          {job.isFeatured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
              Featured
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-2 mb-4 flex-shrink-0">
        <div className="flex items-center text-sm text-gray-900">
          <span className="mr-2 flex-shrink-0">📍</span>
          <span className="truncate flex-1">{job.location}</span>
          {job.isRemote && <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex-shrink-0">Remote</span>}
        </div>
        <div className="flex items-center text-sm text-gray-900">
          <span className="mr-2 flex-shrink-0">💰</span>
          <span className="truncate">{job.salary}</span>
        </div>
        <div className="flex items-center text-sm text-gray-900">
          <span className="mr-2 flex-shrink-0">⏱</span>
          <span className="truncate">{job.experience}</span>
        </div>
        <div className="flex items-center text-sm text-gray-900">
          <span className="mr-2 flex-shrink-0">📅</span>
          <span className="truncate">{job.datePosted}</span>
        </div>
      </div>
      
      <div className="flex-1 mb-4">
        <p className="text-gray-900 text-sm line-clamp-4 h-20 overflow-hidden">{job.description}</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4 h-16 overflow-hidden">
        {job.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded whitespace-nowrap">
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="text-gray-500 text-xs self-center">+{job.skills.length - 4} more</span>
        )}
      </div>
      
      <div className="flex items-center space-x-2 mt-2">
        <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
          {job.category}
        </span>
      </div>
      
      <button
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 mt-auto"
        onClick={handleApply}
      >
        Apply Now
      </button>
    </div>
  );
};

// Enhanced job data with more realistic examples
const jobSections = [
  {
    id: 'featured',
    title: "Featured Jobs",
    priority: 1,
    jobs: [
      {
        id: 'job-1',
        title: "Senior Frontend Developer",
        company: "TechNova Solutions",
        logo: "https://via.placeholder.com/60x60?text=TN",
        location: "Bangalore, India",
        type: "Full Time",
        isRemote: true,
        salary: "₹8-12 LPA",
        experience: "3-5 years",
        datePosted: "2 days ago",
        description: "Work with React and modern JS to build scalable UIs for our SaaS platform. Lead frontend architecture decisions.",
        skills: ["React", "JavaScript", "TypeScript", "CSS", "Redux"],
        companyWebsite: "https://technova.com",
        category: "Technology",
        isUrgent: false,
        isFeatured: true,
        link: "#"
      },
      {
        id: 'job-2',
        title: "Backend Developer",
        company: "FinEdge Corp",
        logo: "https://via.placeholder.com/60x60?text=FE",
        location: "Mumbai, India",
        type: "Full Time",
        isRemote: false,
        salary: "₹10-15 LPA",
        experience: "2-4 years",
        datePosted: "1 day ago",
        description: "Develop robust APIs and microservices using Node.js and MongoDB. Work on high-scale financial systems.",
        skills: ["Node.js", "MongoDB", "API", "AWS", "Docker"],
        companyWebsite: "https://finedge.com",
        category: "Technology",
        isUrgent: true,
        isFeatured: true,
        link: "#"
      },
      {
        id: 'job-7',
        title: "Full Stack Developer",
        company: "StartupHub",
        logo: "https://via.placeholder.com/60x60?text=SH",
        location: "Hyderabad, India",
        type: "Full Time",
        isRemote: true,
        salary: "₹9-14 LPA",
        experience: "2-4 years",
        datePosted: "3 days ago",
        description: "Build end-to-end solutions using MERN stack. Work on exciting startup projects with cutting-edge technology.",
        skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
        companyWebsite: "https://startuphub.com",
        category: "Technology",
        isUrgent: false,
        isFeatured: true,
        link: "#"
      },
      {
        id: 'job-17',
        title: "Product Designer",
        company: "Designify",
        logo: "https://via.placeholder.com/60x60?text=DF",
        location: "Chennai, India",
        type: "Full Time",
        isRemote: false,
        salary: "₹7-11 LPA",
        experience: "2-5 years",
        datePosted: "Today",
        description: "Design beautiful and functional interfaces for web and mobile apps.",
        skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
        companyWebsite: "https://designify.com",
        category: "Design",
        isUrgent: false,
        isFeatured: true,
        link: "#"
      },
      {
        id: 'job-100',
        title: 'Registered Nurse',
        company: 'City Hospital',
        logo: 'https://via.placeholder.com/60x60?text=CH',
        location: 'Delhi, India',
        type: 'Full Time',
        isRemote: false,
        salary: '₹4-6 LPA',
        experience: '1-3 years',
        datePosted: 'Today',
        description: 'Provide patient care and support in a busy hospital environment.',
        skills: ['Patient Care', 'Nursing', 'Communication'],
        companyWebsite: 'https://cityhospital.com',
        category: 'Healthcare',
        isUrgent: false,
        isFeatured: false,
        link: '#'
      },
      {
        id: 'job-101',
        title: 'School Teacher',
        company: 'Green Valley School',
        logo: 'https://via.placeholder.com/60x60?text=GV',
        location: 'Mumbai, India',
        type: 'Full Time',
        isRemote: false,
        salary: '₹3-5 LPA',
        experience: '2-5 years',
        datePosted: 'Yesterday',
        description: 'Teach and mentor students in a progressive school environment.',
        skills: ['Teaching', 'Classroom Management', 'Subject Knowledge'],
        companyWebsite: 'https://greenvalleyschool.com',
        category: 'Education',
        isUrgent: false,
        isFeatured: false,
        link: '#'
      },
      {
        id: 'job-102',
        title: 'Retail Store Manager',
        company: 'ShopSmart',
        logo: 'https://via.placeholder.com/60x60?text=SS',
        location: 'Bangalore, India',
        type: 'Full Time',
        isRemote: false,
        salary: '₹5-8 LPA',
        experience: '3-6 years',
        datePosted: '2 days ago',
        description: 'Oversee daily operations and staff at a busy retail store.',
        skills: ['Retail', 'Management', 'Customer Service'],
        companyWebsite: 'https://shopsmart.com',
        category: 'Retail',
        isUrgent: false,
        isFeatured: false,
        link: '#'
      }
    ]
  },
  {
    id: 'remote',
    title: "Remote Opportunities",
    priority: 2,
    jobs: [
      {
        id: 'job-3',
        title: "UI/UX Designer",
        company: "Healthify Pvt Ltd",
        logo: "https://via.placeholder.com/60x60?text=HL",
        location: "Remote",
        type: "Remote",
        isRemote: true,
        salary: "₹7-10 LPA",
        experience: "2-3 years",
        datePosted: "Today",
        description: "Design user-centric interfaces and experiences for our health app. Create wireframes and prototypes.",
        skills: ["UI/UX", "Figma", "Adobe XD", "Prototyping", "User Research"],
        companyWebsite: "https://healthify.com",
        category: "Design",
        isUrgent: false,
        isFeatured: false,
        link: "#"
      },
      {
        id: 'job-6',
        title: "DevOps Engineer",
        company: "CloudSync Tech",
        logo: "https://via.placeholder.com/60x60?text=CS",
        location: "Remote",
        type: "Remote",
        isRemote: true,
        salary: "₹12-18 LPA",
        experience: "3-6 years",
        datePosted: "1 day ago",
        description: "Manage cloud infrastructure and CI/CD pipelines. Ensure system reliability and scalability.",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
        companyWebsite: "https://cloudsync.com",
        category: "Technology",
        isUrgent: false,
        isFeatured: false,
        link: "#"
      },
      {
        id: 'job-8',
        title: "Content Writer",
        company: "Digital Media Co",
        logo: "https://via.placeholder.com/60x60?text=DM",
        location: "Remote",
        type: "Remote",
        isRemote: true,
        salary: "₹4-7 LPA",
        experience: "1-3 years",
        datePosted: "2 days ago",
        description: "Create engaging content for digital platforms. Write blogs, social media posts, and marketing materials.",
        skills: ["Content Writing", "SEO", "Social Media", "Marketing", "Research"],
        companyWebsite: "https://digitalmedia.com",
        category: "Marketing",
        isUrgent: false,
        isFeatured: false,
        link: "#"
      },
      {
        id: 'job-18',
        title: "Remote QA Tester",
        company: "Testly",
        logo: "https://via.placeholder.com/60x60?text=TQ",
        location: "Remote",
        type: "Remote",
        isRemote: true,
        salary: "₹6-9 LPA",
        experience: "2-4 years",
        datePosted: "Today",
        description: "Test web and mobile applications for bugs and usability issues.",
        skills: ["QA", "Testing", "Automation", "Jest", "Cypress"],
        companyWebsite: "https://testly.com",
        category: "Technology",
        isUrgent: false,
        isFeatured: false,
        link: "#"
      }
    ]
  },
  {
    id: 'urgent',
    title: "Urgent Hiring",
    priority: 3,
    jobs: [
      {
        id: 'job-5',
        title: "Support Engineer",
        company: "QuickHelp",
        logo: "https://via.placeholder.com/60x60?text=QH",
        location: "Delhi, India",
        type: "Full Time",
        isRemote: false,
        salary: "₹5-8 LPA",
        experience: "1-3 years",
        datePosted: "Today",
        description: "Provide technical support and resolve customer queries quickly. Work with diverse technology stack.",
        skills: ["Support", "Communication", "Problem Solving", "Linux", "Troubleshooting"],
        companyWebsite: "https://quickhelp.com",
        category: "Support",
        isUrgent: true,
        isFeatured: false,
        link: "#"
      },
      {
        id: 'job-9',
        title: "Sales Executive",
        company: "GrowthCorp",
        logo: "https://via.placeholder.com/60x60?text=GC",
        location: "Pune, India",
        type: "Full Time",
        isRemote: false,
        salary: "₹3-6 LPA",
        experience: "1-2 years",
        datePosted: "Today",
        description: "Drive sales growth and build client relationships. Meet targets and expand our customer base.",
        skills: ["Sales", "Communication", "CRM", "Negotiation", "Lead Generation"],
        companyWebsite: "https://growthcorp.com",
        category: "Sales",
        isUrgent: true,
        isFeatured: false,
        link: "#"
      },
      {
        id: 'job-19',
        title: "Urgent React Native Developer",
        company: "Appify",
        logo: "https://via.placeholder.com/60x60?text=AR",
        location: "Gurgaon, India",
        type: "Full Time",
        isRemote: false,
        salary: "₹10-14 LPA",
        experience: "2-4 years",
        datePosted: "Today",
        description: "Build and maintain mobile apps using React Native. Immediate joiners preferred.",
        skills: ["React Native", "Mobile", "Redux", "APIs"],
        companyWebsite: "https://appify.com",
        category: "Technology",
        isUrgent: true,
        isFeatured: false,
        link: "#"
      }
    ]
  },
  {
    id: 'internships',
    title: "Internship Programs",
    priority: 4,
    jobs: [
      {
        id: 'job-4',
        title: "Data Analyst Intern",
        company: "FinEdge Corp",
        logo: "https://via.placeholder.com/60x60?text=FE",
        location: "Mumbai, India",
        type: "Internship",
        isRemote: false,
        salary: "₹20k/month",
        experience: "0-1 years",
        datePosted: "5 days ago",
        description: "Assist in data collection and analysis for financial products. Learn advanced analytics techniques.",
        skills: ["Excel", "SQL", "Analytics", "Python", "Tableau"],
        companyWebsite: "https://finedge.com",
        category: "Analytics",
        isUrgent: false,
        isFeatured: false,
        link: "#"
      },
      {
        id: 'job-10',
        title: "Marketing Intern",
        company: "BrandMax",
        logo: "https://via.placeholder.com/60x60?text=BM",
        location: "Bangalore, India",
        type: "Internship",
        isRemote: true,
        salary: "₹15k/month",
        experience: "0 years",
        datePosted: "1 week ago",
        description: "Support marketing campaigns and social media activities. Learn digital marketing strategies.",
        skills: ["Digital Marketing", "Social Media", "Content Creation", "Analytics", "Design"],
        companyWebsite: "https://brandmax.com",
        category: "Marketing",
        isUrgent: false,
        isFeatured: false,
        link: "#"
      },
      {
        id: 'job-20',
        title: "Software Engineering Intern",
        company: "CodeLabs",
        logo: "https://via.placeholder.com/60x60?text=CL",
        location: "Hyderabad, India",
        type: "Internship",
        isRemote: false,
        salary: "₹25k/month",
        experience: "0 years",
        datePosted: "3 days ago",
        description: "Work on real-world projects with experienced engineers. Learn coding best practices and software development lifecycle.",
        skills: ["Python", "Java", "Data Structures", "Algorithms", "Git"],
        companyWebsite: "https://codelabs.com",
        category: "Technology",
        isUrgent: false,
        isFeatured: false,
        link: "#"
      }
    ]
  }
];

export default function JobNewsletter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollRefs = useRef({});

  // Get unique categories
  const categories = useMemo(() => {
    const allJobs = jobSections.flatMap(section => section.jobs);
    return ['All', ...new Set(allJobs.map(job => job.category))];
  }, []);

  // Filter sections based on search and category
  const filteredSections = useMemo(() => {
    return jobSections.map(section => ({
      ...section,
      jobs: section.jobs.filter(job => {
        const matchesSearch = !searchTerm ||
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
    })).filter(section => section.jobs.length > 0);
  }, [searchTerm, selectedCategory]);

  // Auto-scroll functionality
  useEffect(() => {
    const intervals = {};
    
    filteredSections.forEach(section => {
      if (scrollRefs.current[section.id] && section.jobs.length > 1) {
        intervals[section.id] = setInterval(() => {
          const container = scrollRefs.current[section.id];
          if (container) {
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;
            const currentScroll = container.scrollLeft;
            
            if (currentScroll >= scrollWidth - clientWidth - 10) {
              container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              container.scrollTo({ left: currentScroll + 370, behavior: 'smooth' });
            }
          }
        }, 4000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [filteredSections]);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Newsletter Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🚀 Career Opportunities Newsletter
            </h1>
            <p className="text-xl text-gray-900 mb-4">
              Your Weekly Dose of Amazing Job Opportunities
            </p>
            <p className="text-sm text-gray-900">
              {getCurrentDate()} • Issue #247
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-900 border-2 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <div className="absolute right-3 top-3 text-gray-400">
                🔍
              </div>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-900 border-2 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-900 text-white">
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Newsletter Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Jobs', value: filteredSections.reduce((acc, section) => acc + section.jobs.length, 0), icon: '💼' },
              { label: 'Featured', value: filteredSections.reduce((acc, section) => acc + section.jobs.filter(job => job.isFeatured).length, 0), icon: '⭐' },
              { label: 'Remote', value: filteredSections.reduce((acc, section) => acc + section.jobs.filter(job => job.isRemote).length, 0), icon: '🌐' },
              { label: 'Urgent', value: filteredSections.reduce((acc, section) => acc + section.jobs.filter(job => job.isUrgent).length, 0), icon: '🚨' }
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredSections.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-900">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <section className="w-full max-w-xs sm:max-w-5xl mx-auto py-8 sm:py-12 px-2 sm:px-4 animate-fade-in glass rounded-2xl shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8 text-center animate-slide-down">Explore Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSections.map(section => (
                <div key={section.id} className="col-span-full">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4 mt-8 animate-fade-in-slow">{section.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.jobs.map(job => (
                      <JobCard key={job.id} job={job} userId={userId} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Footer */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            📧 Stay Updated with Weekly Job Alerts!
          </h3>
          <p className="text-gray-900 mb-6">
            Get the latest job opportunities delivered straight to your inbox every week
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-900 mt-4">
            Unsubscribe anytime • Privacy policy • Weekly delivery
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
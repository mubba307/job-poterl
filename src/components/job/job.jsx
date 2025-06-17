import React, { useEffect, useState, useMemo } from 'react'
import { Search, MapPin, Briefcase, DollarSign, Filter, ChevronDown, Heart, ExternalLink, Users, Calendar } from 'lucide-react'

export default function Job() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [jobTypeFilter, setJobTypeFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [favorites, setFavorites] = useState(new Set())
  const [expandedCompany, setExpandedCompany] = useState(null)

  // Mock data with more detailed information
  const mockData = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=entropy",
      location: "San Francisco, CA",
      industry: "Technology",
      employees: "500-1000",
      founded: "2015",
      description: "Leading provider of innovative tech solutions",
      rating: 4.5,
      jobs: [
        { id: 101, title: "Senior Software Engineer", type: "Full-time", salary: "$120,000 - $150,000", posted: "2 days ago", remote: true },
        { id: 102, title: "DevOps Engineer", type: "Full-time", salary: "$110,000 - $140,000", posted: "1 week ago", remote: true },
        { id: 103, title: "UI/UX Designer", type: "Contract", salary: "$80,000 - $100,000", posted: "3 days ago", remote: true },
        { id: 104, title: "Cloud Architect", type: "Full-time", salary: "$140,000 - $170,000", posted: "5 days ago", remote: false }
      ]
    },
    {
      id: 2,
      name: "DataFlow Analytics",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=entropy",
      location: "New York, NY",
      industry: "Data & Analytics",
      employees: "100-500",
      founded: "2018",
      description: "Transforming businesses through data insights",
      rating: 4.2,
      jobs: [
        { id: 201, title: "Data Scientist", type: "Full-time", salary: "$110,000 - $140,000", posted: "1 day ago", remote: true },
        { id: 202, title: "Machine Learning Engineer", type: "Full-time", salary: "$130,000 - $160,000", posted: "4 days ago", remote: true }
      ]
    },
    {
      id: 3,
      name: "GreenTech Innovations",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=entropy",
      location: "Austin, TX",
      industry: "Clean Energy",
      employees: "50-100",
      founded: "2020",
      description: "Sustainable technology for a better tomorrow",
      rating: 4.7,
      jobs: [
        { id: 301, title: "Sustainability Consultant", type: "Full-time", salary: "$70,000 - $90,000", posted: "5 days ago", remote: false },
        { id: 302, title: "Environmental Engineer", type: "Full-time", salary: "$85,000 - $105,000", posted: "1 week ago", remote: false },
        { id: 303, title: "Research Analyst", type: "Part-time", salary: "$40,000 - $55,000", posted: "2 days ago", remote: true }
      ]
    },
    {
      id: 4,
      name: "FinanceFlow Pro",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=entropy",
      location: "Chicago, IL",
      industry: "Financial Services",
      employees: "200-500",
      founded: "2012",
      description: "Innovative financial solutions for modern businesses",
      rating: 4.3,
      jobs: [
        { id: 401, title: "Financial Analyst", type: "Full-time", salary: "$65,000 - $85,000", posted: "3 days ago", remote: false },
        { id: 402, title: "Senior Accountant", type: "Full-time", salary: "$75,000 - $95,000", posted: "6 days ago", remote: true }
      ]
    },
    {
      id: 5,
      name: "HealthTech Solutions",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=entropy",
      location: "Boston, MA",
      industry: "Healthcare Technology",
      employees: "300-700",
      founded: "2016",
      description: "Revolutionizing healthcare through technology",
      rating: 4.6,
      jobs: [
        { id: 501, title: "Healthcare Software Developer", type: "Full-time", salary: "$95,000 - $120,000", posted: "1 day ago", remote: true },
        { id: 502, title: "Clinical Data Analyst", type: "Full-time", salary: "$80,000 - $100,000", posted: "4 days ago", remote: false }
      ]
    },
    {
      id: 6,
      name: "Creative Digital Agency",
      logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop&crop=entropy",
      location: "Los Angeles, CA",
      industry: "Marketing & Advertising",
      employees: "50-200",
      founded: "2019",
      description: "Creating impactful digital experiences",
      rating: 4.4,
      jobs: [
        { id: 601, title: "Creative Director", type: "Full-time", salary: "$90,000 - $120,000", posted: "2 days ago", remote: false },
        { id: 602, title: "Digital Marketing Specialist", type: "Contract", salary: "$55,000 - $70,000", posted: "1 week ago", remote: true }
      ]
    }
  ]

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCompanies(mockData)
        setLoading(false)
      } catch (err) {
        setError('Failed to load companies')
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Get unique locations and job types for filters
  const uniqueLocations = useMemo(() => 
    [...new Set(companies.map(company => company.location))], [companies]
  )
  
  const uniqueJobTypes = useMemo(() => 
    [...new Set(companies.flatMap(company => company.jobs.map(job => job.type)))], [companies]
  )

  // Filter and sort companies
  const filteredCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.jobs.some(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesLocation = !locationFilter || company.location === locationFilter
      const matchesJobType = !jobTypeFilter || company.jobs.some(job => job.type === jobTypeFilter)
      
      return matchesSearch && matchesLocation && matchesJobType
    })

    // Sort companies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return b.rating - a.rating
        case 'jobs':
          return b.jobs.length - a.jobs.length
        default:
          return 0
      }
    })

    return filtered
  }, [companies, searchTerm, locationFilter, jobTypeFilter, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage)

  const toggleFavorite = (companyId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(companyId)) {
      newFavorites.delete(companyId)
    } else {
      newFavorites.add(companyId)
    }
    setFavorites(newFavorites)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>)
    }
    return stars
  }

  if (loading) {
    return (
      <section className="w-full py-8 px-2 sm:px-4 bg-gray-50">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-blue-700">Loading amazing opportunities...</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full py-8 px-2 sm:px-4 bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-8 px-2 sm:px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Discover Your Next Career Move
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            {filteredCompanies.length} companies • {filteredCompanies.reduce((acc, company) => acc + company.jobs.length, 0)} open positions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies or jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm sm:text-base"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Job Type Filter */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm sm:text-base"
              >
                <option value="">All Job Types</option>
                {uniqueJobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort By */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm sm:text-base"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="jobs">Sort by Job Count</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Company Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Company Header */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                  <div className="flex items-center">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{company.industry}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(company.id)}
                    className={`p-2 rounded-full transition ${
                      favorites.has(company.id) 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className="h-5 w-5" fill={favorites.has(company.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Company Info */}
                <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-gray-600 mb-4 gap-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {company.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {company.employees}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {renderStars(company.rating)}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">{company.rating} • Founded {company.founded}</span>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm mb-4">{company.description}</p>

                {/* Jobs Preview */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">Open Positions ({company.jobs.length})</h4>
                  {company.jobs.slice(0, expandedCompany === company.id ? company.jobs.length : 2).map((job) => (
                    <div key={job.id} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                        <h5 className="font-medium text-gray-900 text-sm sm:text-base">{job.title}</h5>
                        {job.remote && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Remote</span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-gray-600 gap-2">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {job.posted}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {company.jobs.length > 2 && (
                    <button
                      onClick={() => setExpandedCompany(
                        expandedCompany === company.id ? null : company.id
                      )}
                      className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium"
                    >
                      {expandedCompany === company.id ? 'Show Less' : `Show ${company.jobs.length - 2} More Jobs`}
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm sm:text-base">
                  View All Jobs
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm sm:text-base"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition text-sm sm:text-base ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm sm:text-base"
            >
              Next
            </button>
          </div>

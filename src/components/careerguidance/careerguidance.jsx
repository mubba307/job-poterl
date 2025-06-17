"use client";
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  Award, 
  BookOpen, 
  Users, 
  DollarSign, 
  BarChart3, 
  Clock, 
  Star, 
  ChevronRight, 
  CheckCircle2,
  Trophy,
  Briefcase,
  GraduationCap,
  Building,
  Globe,
  Zap
} from 'lucide-react';

const CareerGuidancePage = () => {
  const [activeTab, setActiveTab] = useState('paths');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [skillsAssessment, setSkillsAssessment] = useState({});
  const [completedSkills, setCompletedSkills] = useState({});

  const careerPaths = [
    {
      id: 1,
      title: "Software Development",
      category: "Technology",
      salary: "$75K - $150K",
      growth: "+22%",
      description: "Build applications, websites, and software solutions",
      skills: ["JavaScript", "Python", "React", "Node.js", "SQL"],
      levels: [
        { title: "Junior Developer", experience: "0-2 years", salary: "$50K-$75K" },
        { title: "Mid-Level Developer", experience: "2-5 years", salary: "$75K-$110K" },
        { title: "Senior Developer", experience: "5-8 years", salary: "$110K-$150K" },
        { title: "Tech Lead", experience: "8+ years", salary: "$130K-$180K" }
      ],
      companies: ["Google", "Microsoft", "Amazon", "Meta", "Netflix"],
      trending: true
    },
    {
      id: 2,
      title: "Data Science",
      category: "Analytics",
      salary: "$80K - $160K",
      growth: "+31%",
      description: "Analyze data to drive business decisions and insights",
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
      levels: [
        { title: "Data Analyst", experience: "0-2 years", salary: "$55K-$80K" },
        { title: "Data Scientist", experience: "2-5 years", salary: "$85K-$125K" },
        { title: "Senior Data Scientist", experience: "5-8 years", salary: "$125K-$160K" },
        { title: "Principal Data Scientist", experience: "8+ years", salary: "$150K-$200K" }
      ],
      companies: ["Netflix", "Uber", "Airbnb", "Spotify", "LinkedIn"],
      trending: true
    },
    {
      id: 3,
      title: "Digital Marketing",
      category: "Marketing",
      salary: "$45K - $100K",
      growth: "+10%",
      description: "Create and manage digital marketing campaigns",
      skills: ["SEO", "Social Media", "Analytics", "Content Marketing", "PPC"],
      levels: [
        { title: "Marketing Coordinator", experience: "0-2 years", salary: "$35K-$50K" },
        { title: "Digital Marketing Specialist", experience: "2-4 years", salary: "$50K-$70K" },
        { title: "Marketing Manager", experience: "4-7 years", salary: "$70K-$100K" },
        { title: "Marketing Director", experience: "7+ years", salary: "$100K-$150K" }
      ],
      companies: ["HubSpot", "Salesforce", "Adobe", "Buffer", "Hootsuite"],
      trending: false
    },
    {
      id: 4,
      title: "UX/UI Design",
      category: "Design",
      salary: "$60K - $130K",
      growth: "+13%",
      description: "Design user experiences and interfaces for digital products",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
      levels: [
        { title: "Junior Designer", experience: "0-2 years", salary: "$45K-$65K" },
        { title: "UX/UI Designer", experience: "2-5 years", salary: "$65K-$95K" },
        { title: "Senior Designer", experience: "5-8 years", salary: "$95K-$130K" },
        { title: "Design Director", experience: "8+ years", salary: "$120K-$170K" }
      ],
      companies: ["Apple", "Google", "Airbnb", "Spotify", "Figma"],
      trending: true
    }
  ];

  const skillCategories = [
    {
      name: "Technical Skills",
      skills: [
        { name: "Programming", proficiency: 0, required: 80, description: "Core programming languages" },
        { name: "Database Management", proficiency: 0, required: 70, description: "SQL, NoSQL databases" },
        { name: "Cloud Platforms", proficiency: 0, required: 60, description: "AWS, Azure, GCP" },
        { name: "Version Control", proficiency: 0, required: 85, description: "Git, GitHub workflows" }
      ]
    },
    {
      name: "Soft Skills",
      skills: [
        { name: "Communication", proficiency: 0, required: 90, description: "Written and verbal communication" },
        { name: "Problem Solving", proficiency: 0, required: 85, description: "Analytical thinking" },
        { name: "Teamwork", proficiency: 0, required: 80, description: "Collaboration and leadership" },
        { name: "Time Management", proficiency: 0, required: 75, description: "Project planning and execution" }
      ]
    },
    {
      name: "Business Skills",
      skills: [
        { name: "Project Management", proficiency: 0, required: 70, description: "Agile, Scrum methodologies" },
        { name: "Business Analysis", proficiency: 0, required: 65, description: "Requirements gathering" },
        { name: "Client Relations", proficiency: 0, required: 60, description: "Customer service skills" },
        { name: "Strategic Thinking", proficiency: 0, required: 55, description: "Long-term planning" }
      ]
    }
  ];

  const industryInsights = [
    {
      industry: "Technology",
      growth: "+15%",
      averageSalary: "$95K",
      topRoles: ["Software Engineer", "Data Scientist", "Product Manager"],
      trends: ["AI/ML Integration", "Remote Work", "Cloud Migration"],
      companies: 850000,
      description: "Fastest growing sector with high demand for skilled professionals"
    },
    {
      industry: "Healthcare",
      growth: "+8%",
      averageSalary: "$72K",
      topRoles: ["Nurse Practitioner", "Healthcare Admin", "Medical Tech"],
      trends: ["Telemedicine", "Digital Health", "Personalized Medicine"],
      companies: 620000,
      description: "Stable growth with increasing demand for healthcare services"
    },
    {
      industry: "Finance",
      growth: "+6%",
      averageSalary: "$85K",
      topRoles: ["Financial Analyst", "Investment Advisor", "Risk Manager"],
      trends: ["Fintech Innovation", "Blockchain", "Robo-advisors"],
      companies: 380000,
      description: "Traditional sector embracing digital transformation"
    },
    {
      industry: "Education",
      growth: "+5%",
      averageSalary: "$58K",
      topRoles: ["Instructional Designer", "Ed-Tech Specialist", "Teacher"],
      trends: ["Online Learning", "EdTech Tools", "Personalized Learning"],
      companies: 450000,
      description: "Evolution towards digital and personalized learning experiences"
    }
  ];

  const updateSkillProficiency = (category, skillName, value) => {
    setSkillsAssessment(prev => ({
      ...prev,
      [`${category}-${skillName}`]: parseInt(value)
    }));
  };

  const toggleSkillCompletion = (category, skillName) => {
    const key = `${category}-${skillName}`;
    setCompletedSkills(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Career Guidance Hub
                </h1>
                <p className="text-gray-600 mt-1">Discover your path to professional success</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-2xl text-purple-600">10K+</div>
                <div className="text-gray-600">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-blue-600">500K+</div>
                <div className="text-gray-600">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-indigo-600">95%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'paths', label: 'Career Paths', icon: Target },
              { id: 'skills', label: 'Skills Assessment', icon: Award },
              { id: 'insights', label: 'Industry Insights', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Career Paths Tab */}
        {activeTab === 'paths' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Career Paths</h2>
              <p className="text-gray-600">Discover trending careers and their growth trajectories</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {careerPaths.map(career => (
                <div
                  key={career.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedCareer(career)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{career.title}</h3>
                          {career.trending && (
                            <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs px-2 py-1 rounded-full">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                        <p className="text-purple-600 font-medium">{career.category}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{career.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900">{career.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-900">{career.growth}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {career.skills.length > 3 && (
                          <span className="text-purple-600 text-xs">+{career.skills.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
                      <span>Explore Path</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Career Detail Modal */}
            {selectedCareer && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">{selectedCareer.title}</h2>
                        <p className="text-purple-600 font-medium mt-1">{selectedCareer.category}</p>
                      </div>
                      <button
                        onClick={() => setSelectedCareer(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4">Career Progression</h3>
                        <div className="space-y-4">
                          {selectedCareer.levels.map((level, index) => (
                            <div key={index} className="border-l-4 border-purple-400 pl-4">
                              <h4 className="font-semibold text-gray-900">{level.title}</h4>
                              <p className="text-sm text-gray-600">{level.experience}</p>
                              <p className="text-sm font-medium text-green-600">{level.salary}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">Top Companies</h3>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {selectedCareer.companies.map(company => (
                            <div key={company} className="bg-gray-50 p-3 rounded-lg text-center">
                              <Building className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                              <span className="text-sm font-medium">{company}</span>
                            </div>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold mb-4">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCareer.skills.map(skill => (
                            <span key={skill} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Skills Assessment Tab */}
        {activeTab === 'skills' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills Assessment</h2>
              <p className="text-gray-600">Evaluate your current skills and identify areas for improvement</p>
            </div>

            <div className="space-y-8">
              {skillCategories.map(category => (
                <div key={category.name} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <span>{category.name}</span>
                  </h3>

                  <div className="space-y-6">
                    {category.skills.map(skill => {
                      const key = `${category.name}-${skill.name}`;
                      const currentProficiency = skillsAssessment[key] || skill.proficiency;
                      const isCompleted = completedSkills[key];

                      return (
                        <div key={skill.name} className="border-b border-gray-100 pb-6 last:border-b-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => toggleSkillCompletion(category.name, skill.name)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  isCompleted
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-gray-300 hover:border-green-400'
                                }`}
                              >
                                {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                              </button>
                              <div>
                                <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                                <p className="text-sm text-gray-600">{skill.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">
                                {currentProficiency}% / {skill.required}%
                              </div>
                              <div className="text-xs text-gray-500">Current / Required</div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Proficiency Level</span>
                              <span>{currentProficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  currentProficiency >= skill.required
                                    ? 'bg-green-500'
                                    : currentProficiency >= skill.required * 0.7
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${currentProficiency}%` }}
                              ></div>
                            </div>
                          </div>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={currentProficiency}
                            onChange={(e) => updateSkillProficiency(category.name, skill.name, e.target.value)}
                            className="w-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Industry Insights Tab */}
        {activeTab === 'insights' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Industry Insights</h2>
              <p className="text-gray-600">Stay informed about market trends and opportunities</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {industryInsights.map(industry => (
                <div key={industry.industry} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{industry.industry}</h3>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 font-semibold">{industry.growth}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{industry.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-blue-600">{industry.averageSalary}</div>
                      <div className="text-sm text-gray-600">Avg Salary</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Building className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-purple-600">{industry.companies.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Companies</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Top Roles</h4>
                    <div className="space-y-2">
                      {industry.topRoles.map(role => (
                        <div key={role} className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span>Trending Skills</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.trends.map(trend => (
                        <span key={trend} className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                          {trend}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Market Overview */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <Globe className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">2.8M+</div>
                  <div className="text-purple-100">Job Openings</div>
                </div>
                <div>
                  <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">15%</div>
                  <div className="text-purple-100">Avg Growth Rate</div>
                </div>
                <div>
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">450K+</div>
                  <div className="text-purple-100">New Hires/Month</div>
                </div>
                <div>
                  <GraduationCap className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">89%</div>
                  <div className="text-purple-100">Skills Match Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerGuidancePage;
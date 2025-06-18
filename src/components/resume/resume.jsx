"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Eye, Download, Edit3, Save, X, Move, Star, Briefcase, GraduationCap, Award, User, Mail, Phone, Globe, Github, Linkedin } from "lucide-react";

export default function Resume() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    linkedin: "",
    github: "",
    portfolio: "",
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ institution: "", degree: "", year: "", gpa: "" }],
    skills: [{ category: "", items: "" }],
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    certifications: [{ name: "", issuer: "", date: "" }]
  });

  const [savedResumes, setSavedResumes] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [previewMode, setPreviewMode] = useState(false);
  const [editingResume, setEditingResume] = useState(null);
  const [activeSection, setActiveSection] = useState("personal");

  const templates = {
    modern: { name: "Modern", color: "blue", accent: "indigo" },
    classic: { name: "Classic", color: "gray", accent: "slate" },
    creative: { name: "Creative", color: "purple", accent: "violet" },
    minimal: { name: "Minimal", color: "green", accent: "emerald" }
  };

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "skills", name: "Skills", icon: Star },
    { id: "projects", name: "Projects", icon: Edit3 },
    { id: "certifications", name: "Certifications", icon: Award }
  ];

  const handleChange = (e, section = null, index = null) => {
    const { name, value } = e.target;
    
    if (section && index !== null) {
      setForm(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => 
          i === index ? { ...item, [name]: value } : item
        )
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const addSection = (section) => {
    const defaults = {
      experience: { company: "", position: "", duration: "", description: "" },
      education: { institution: "", degree: "", year: "", gpa: "" },
      skills: { category: "", items: "" },
      projects: { name: "", description: "", technologies: "", link: "" },
      certifications: { name: "", issuer: "", date: "" }
    };

    setForm(prev => ({
      ...prev,
      [section]: [...prev[section], defaults[section]]
    }));
  };

  const removeSection = (section, index) => {
    setForm(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      // Use localStorage instead of API call for offline functionality
      const savedResumesData = localStorage.getItem('savedResumes');
      if (savedResumesData) {
        setSavedResumes(JSON.parse(savedResumesData));
      } else {
        setSavedResumes([]);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setSavedResumes([]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const resumeData = {
        ...form,
        id: editingResume ? editingResume.id : Date.now(),
        template: selectedTemplate,
        createdAt: editingResume ? editingResume.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Get existing resumes from localStorage
      const existingResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');

      if (editingResume) {
        // Update existing resume
        const updatedResumes = existingResumes.map(resume => 
          resume.id === editingResume.id ? resumeData : resume
        );
        localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
        setEditingResume(null);
      } else {
        // Add new resume
        const newResumes = [...existingResumes, resumeData];
        localStorage.setItem('savedResumes', JSON.stringify(newResumes));
      }

      resetForm();
      fetchResumes(); // Refresh the list
      setSuccess(editingResume ? "Resume updated successfully!" : "Resume saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to save resume.");
      console.error('Error saving resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      linkedin: "",
      github: "",
      portfolio: "",
      experience: [{ company: "", position: "", duration: "", description: "" }],
      education: [{ institution: "", degree: "", year: "", gpa: "" }],
      skills: [{ category: "", items: "" }],
      projects: [{ name: "", description: "", technologies: "", link: "" }],
      certifications: [{ name: "", issuer: "", date: "" }]
    });
  };

  const handleEdit = (resume) => {
    setEditingResume(resume);
    setForm({ ...resume });
    setSelectedTemplate(resume.template || "modern");
    setActiveSection("personal");
  };

  const handleDelete = async (id) => {
    try {
      // Get existing resumes from localStorage
      const existingResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]');
      const updatedResumes = existingResumes.filter(resume => resume.id !== id);
      localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
      setSavedResumes(updatedResumes);
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  const exportToPDF = (resume) => {
    // Simulate PDF export
    const content = `Resume: ${resume.name}\nEmail: ${resume.email}\nPhone: ${resume.phone}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.name}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredResumes = savedResumes.filter(resume =>
    resume.name.toLowerCase().includes(search.toLowerCase()) ||
    resume.email.toLowerCase().includes(search.toLowerCase())
  );

  const currentTemplate = templates[selectedTemplate];

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <input
            type="url"
            name="github"
            value={form.github}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website</label>
        <input
          type="url"
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Write a compelling summary of your professional background..."
        />
      </div>
    </div>
  );

  const renderDynamicSection = (sectionName, fields) => (
    <div className="space-y-4">
      {form[sectionName].map((item, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
          <button
            onClick={() => removeSection(sectionName, index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
            type="button"
          >
            <Trash2 size={16} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field.name} className={field.span ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={item[field.name]}
                    onChange={(e) => handleChange(e, sectionName, index)}
                    rows={3}
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={item[field.name]}
                    onChange={(e) => handleChange(e, sectionName, index)}
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => addSection(sectionName)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        type="button"
      >
        <Plus size={16} />
        Add {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
      </button>
    </div>
  );

  const renderResumePreview = (resume) => (
    <div className={`bg-white rounded-xl shadow-lg p-8 border-l-4 border-${currentTemplate.color}-500`}>
      <div className="mb-6">
        <h1 className={`text-3xl font-bold text-${currentTemplate.color}-900 mb-2`}>{resume.name}</h1>
        <div className={`flex flex-wrap gap-4 text-${currentTemplate.color}-600`}>
          {resume.email && <span className="flex items-center gap-1"><Mail size={14} />{resume.email}</span>}
          {resume.phone && <span className="flex items-center gap-1"><Phone size={14} />{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
        <div className="flex gap-4 mt-2">
          {resume.linkedin && <a href={resume.linkedin} className={`text-${currentTemplate.color}-600 hover:underline`} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {resume.github && <a href={resume.github} className={`text-${currentTemplate.color}-600 hover:underline`} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {resume.portfolio && <a href={resume.portfolio} className={`text-${currentTemplate.color}-600 hover:underline`} target="_blank" rel="noopener noreferrer">Portfolio</a>}
        </div>
      </div>

      {resume.summary && (
        <div className="mb-6">
          <h2 className={`text-xl font-semibold text-${currentTemplate.color}-800 mb-2 border-b border-gray-200 pb-1`}>Summary</h2>
          <p className="text-gray-700">{resume.summary}</p>
        </div>
      )}

      {resume.experience && resume.experience.some(exp => exp.company) && (
        <div className="mb-6">
          <h2 className={`text-xl font-semibold text-${currentTemplate.color}-800 mb-3 border-b border-gray-200 pb-1`}>Experience</h2>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                <span className="text-sm text-gray-600">{exp.duration}</span>
              </div>
              <p className={`text-${currentTemplate.color}-600 mb-2`}>{exp.company}</p>
              <p className="text-gray-700 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {resume.education && resume.education.some(edu => edu.institution) && (
        <div className="mb-6">
          <h2 className={`text-xl font-semibold text-${currentTemplate.color}-800 mb-3 border-b border-gray-200 pb-1`}>Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className={`text-${currentTemplate.color}-600`}>{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.year}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {resume.skills && resume.skills.some(skill => skill.category) && (
        <div className="mb-6">
          <h2 className={`text-xl font-semibold text-${currentTemplate.color}-800 mb-3 border-b border-gray-200 pb-1`}>Skills</h2>
          {resume.skills.map((skill, index) => (
            <div key={index} className="mb-2">
              <span className="font-medium text-gray-800">{skill.category}:</span>
              <span className="ml-2 text-gray-700">{skill.items}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Resume Builder Pro
          </h1>
          <p className="text-xl text-gray-600">Create professional resumes with advanced templates and features</p>
        </div>

        {/* Template Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(templates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedTemplate === key 
                    ? `border-${template.color}-500 bg-${template.color}-50` 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-20 bg-gradient-to-br from-${template.color}-100 to-${template.accent}-100 rounded mb-2`}></div>
                <p className="font-medium text-gray-800">{template.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Section Navigation */}
              <div className="border-b bg-gray-50 p-4">
                <div className="flex flex-wrap gap-2">
                  {sections.map(section => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                          activeSection === section.id 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={16} />
                        {section.name}
                      </button>
                    );
                  })}
                </div>
              </div>
              <form className="p-6" onSubmit={handleSave}>
                {activeSection === "personal" && renderPersonalInfo()}
                
                {activeSection === "experience" && renderDynamicSection("experience", [
                  { name: "company", label: "Company", placeholder: "Company name" },
                  { name: "position", label: "Position", placeholder: "Job title" },
                  { name: "duration", label: "Duration", placeholder: "e.g., Jan 2020 - Present" },
                  { name: "description", label: "Description", type: "textarea", span: true, placeholder: "Describe your achievements and responsibilities..." }
                ])}

                {activeSection === "education" && renderDynamicSection("education", [
                  { name: "institution", label: "Institution", placeholder: "University/School name" },
                  { name: "degree", label: "Degree", placeholder: "e.g., Bachelor of Science" },
                  { name: "year", label: "Year", placeholder: "e.g., 2020" },
                  { name: "gpa", label: "GPA", placeholder: "Optional" }
                ])}

                {activeSection === "skills" && renderDynamicSection("skills", [
                  { name: "category", label: "Category", placeholder: "e.g., Programming Languages" },
                  { name: "items", label: "Skills", placeholder: "e.g., JavaScript, Python, React", span: true }
                ])}

                {activeSection === "projects" && renderDynamicSection("projects", [
                  { name: "name", label: "Project Name", placeholder: "Project title" },
                  { name: "technologies", label: "Technologies", placeholder: "e.g., React, Node.js" },
                  { name: "link", label: "Link", placeholder: "Project URL (optional)" },
                  { name: "description", label: "Description", type: "textarea", span: true, placeholder: "Describe the project..." }
                ])}

                {activeSection === "certifications" && renderDynamicSection("certifications", [
                  { name: "name", label: "Certification", placeholder: "Certification name" },
                  { name: "issuer", label: "Issuer", placeholder: "Issuing organization" },
                  { name: "date", label: "Date", placeholder: "e.g., 2023" }
                ])}

                <div className="flex gap-4 mt-8 pt-6 border-t">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-semibold disabled:opacity-50"
                  >
                    {loading ? "Saving..." : editingResume ? "Update Resume" : "Save Resume"}
                  </button>
                  {editingResume && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingResume(null);
                        resetForm();
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {success && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    {success}
                  </div>
                )}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
              <div className="bg-white rounded-xl shadow-lg p-4 max-h-[600px] overflow-y-auto">
                {renderResumePreview(form)}
              </div>
            </div>
          </div>
        </div>

        {/* Saved Resumes Section */}
        <div className="mt-12">
          <button
            onClick={() => setShowSaved(!showSaved)}
            className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-lg hover:from-blue-200 hover:to-indigo-200 transition font-semibold"
          >
            {showSaved ? "Hide Saved Resumes" : "Show Saved Resumes"} ({savedResumes.length})
          </button>

          {showSaved && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Saved Resumes</h2>
                <input
                  type="text"
                  placeholder="Search resumes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition w-full md:w-64"
                />
              </div>

              {filteredResumes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No resumes found</p>
                  <p className="text-gray-400">Create your first resume to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredResumes.map((resume) => (
                    <div key={resume.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{resume.name}</h3>
                          <p className="text-gray-600 text-sm">{resume.email}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {templates[resume.template]?.name || "Modern"} Template
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(resume)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => exportToPDF(resume)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                            title="Download"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(resume.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Experience:</strong> {resume.experience?.filter(exp => exp.company).length || 0} entries</p>
                        <p><strong>Education:</strong> {resume.education?.filter(edu => edu.institution).length || 0} entries</p>
                        <p><strong>Skills:</strong> {resume.skills?.filter(skill => skill.category).length || 0} categories</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Last updated: {new Date(resume.updatedAt || resume.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
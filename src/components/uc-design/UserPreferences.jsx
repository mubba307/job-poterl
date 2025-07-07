import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Accessibility, 
  Smartphone, 
  Monitor, 
  Users2, 
  Bell, 
  Mail, 
  Eye, 
  Heart, 
  Zap, 
  Shield, 
  Globe,
  Moon,
  Sun,
  Type,
  Volume2,
  VolumeX,
  Palette,
  Target,
  TrendingUp,
  Award,
  Clock,
  MessageCircle,
  Video,
  FileText,
  Calendar,
  Send,
  Bookmark,
  Share2,
  AlertTriangle,
  CheckCircle,
  Play,
  BarChart3,
  Sparkles,
  Phone,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  User,
  CreditCard,
  HelpCircle,
  X,
  Rocket,
  Lightbulb,
  GraduationCap,
  Code2,
  Megaphone
} from 'lucide-react';

export default function UserPreferences() {
  const [preferences, setPreferences] = useState({
    // Accessibility
    darkMode: false,
    fontSize: 'medium',
    highContrast: false,
    screenReader: false,
    keyboardNavigation: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    jobAlerts: true,
    applicationUpdates: true,
    
    // Personalization
    personalizedRecommendations: true,
    showSalaryInfo: true,
    showCompanyReviews: true,
    showRemoteJobs: true,
    
    // Privacy
    shareProfile: false,
    allowContact: true,
    showOnlineStatus: false,
    
    // Language & Region
    language: 'en',
    timezone: 'Asia/Kolkata',
    currency: 'INR'
  });

  const [activeTab, setActiveTab] = useState('accessibility');
  const [showPreferences, setShowPreferences] = useState(false);

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const tabs = [
    {
      id: 'accessibility',
      name: 'Accessibility',
      icon: Accessibility,
      description: 'Customize your experience for better accessibility'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      description: 'Manage how you receive updates and alerts'
    },
    {
      id: 'personalization',
      name: 'Personalization',
      icon: Target,
      description: 'Tailor your job search experience'
    },
    {
      id: 'privacy',
      name: 'Privacy',
      icon: Shield,
      description: 'Control your privacy and data sharing'
    }
  ];

  return (
    <>
      {/* UC Design: Floating Preferences Button */}
      <button
        onClick={() => setShowPreferences(!showPreferences)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
        aria-label="Open user preferences"
        title="User Preferences"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* UC Design: Preferences Panel */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Users2 className="w-6 h-6" />
                    User Preferences
                  </h2>
                  <p className="text-blue-100 mt-1">
                    Customize your experience for better accessibility and personalization
                  </p>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-white hover:text-blue-200 transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Accessibility Tab */}
              {activeTab === 'accessibility' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Visual Preferences
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Dark Mode</span>
                          <button
                            onClick={() => handlePreferenceChange('darkMode', !preferences.darkMode)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Font Size</label>
                          <select
                            value={preferences.fontSize}
                            onChange={(e) => handlePreferenceChange('fontSize', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="extra-large">Extra Large</option>
                          </select>
                        </div>

                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">High Contrast</span>
                          <button
                            onClick={() => handlePreferenceChange('highContrast', !preferences.highContrast)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.highContrast ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Volume2 className="w-5 h-5" />
                        Audio & Navigation
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Screen Reader Support</span>
                          <button
                            onClick={() => handlePreferenceChange('screenReader', !preferences.screenReader)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.screenReader ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.screenReader ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Keyboard Navigation</span>
                          <button
                            onClick={() => handlePreferenceChange('keyboardNavigation', !preferences.keyboardNavigation)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.keyboardNavigation ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Email Notifications
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Job Alerts</span>
                          <button
                            onClick={() => handlePreferenceChange('jobAlerts', !preferences.jobAlerts)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.jobAlerts ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.jobAlerts ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Application Updates</span>
                          <button
                            onClick={() => handlePreferenceChange('applicationUpdates', !preferences.applicationUpdates)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.applicationUpdates ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.applicationUpdates ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Push Notifications
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Enable Push Notifications</span>
                          <button
                            onClick={() => handlePreferenceChange('pushNotifications', !preferences.pushNotifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Personalization Tab */}
              {activeTab === 'personalization' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Job Recommendations
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Personalized Recommendations</span>
                          <button
                            onClick={() => handlePreferenceChange('personalizedRecommendations', !preferences.personalizedRecommendations)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.personalizedRecommendations ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.personalizedRecommendations ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Show Salary Information</span>
                          <button
                            onClick={() => handlePreferenceChange('showSalaryInfo', !preferences.showSalaryInfo)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.showSalaryInfo ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.showSalaryInfo ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Show Remote Jobs</span>
                          <button
                            onClick={() => handlePreferenceChange('showRemoteJobs', !preferences.showRemoteJobs)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.showRemoteJobs ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.showRemoteJobs ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Company Information
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Show Company Reviews</span>
                          <button
                            onClick={() => handlePreferenceChange('showCompanyReviews', !preferences.showCompanyReviews)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.showCompanyReviews ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.showCompanyReviews ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Profile Privacy
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Share Profile with Employers</span>
                          <button
                            onClick={() => handlePreferenceChange('shareProfile', !preferences.shareProfile)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.shareProfile ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.shareProfile ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Allow Direct Contact</span>
                          <button
                            onClick={() => handlePreferenceChange('allowContact', !preferences.allowContact)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.allowContact ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.allowContact ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>

                        <label className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">Show Online Status</span>
                          <button
                            onClick={() => handlePreferenceChange('showOnlineStatus', !preferences.showOnlineStatus)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              preferences.showOnlineStatus ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              preferences.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Regional Settings
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Language</label>
                          <select
                            value={preferences.language}
                            onChange={(e) => handlePreferenceChange('language', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="bn">Bengali</option>
                            <option value="te">Telugu</option>
                            <option value="mr">Marathi</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">Currency</label>
                          <select
                            value={preferences.currency}
                            onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          >
                            <option value="INR">Indian Rupee (₹)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-900 font-bold">
                  <p>Your preferences are automatically saved</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-4 py-2 text-gray-900 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
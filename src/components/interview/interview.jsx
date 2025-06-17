"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Video, VideoOff, Mic, MicOff, Users, Clock, FileText, CheckCircle, Phone, PhoneOff, Settings, Calendar } from 'lucide-react';

const InterviewPrepPage = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const [selectedTab, setSelectedTab] = useState('checklist');
  const [checkedItems, setCheckedItems] = useState({});

  // Dummy Google Meet URL for demonstration
  const googleMeetUrl = "https://meet.google.com/iiw-prat-pmm"; 

  // Timer effect
  useEffect(() => {
    let timer;
    if (isInCall && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsInCall(false); // End call when timer runs out
      // Optionally, add a notification or alert that the call has ended
    }
    return () => clearInterval(timer);
  }, [isInCall, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleChecklistItem = useCallback((id) => { // Memoized with useCallback
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []); // Empty dependency array means this function is created once

  // Function to handle joining/leaving the call
  const handleCallToggle = () => {
    if (isInCall) {
      // Logic for leaving the call (e.g., reset timer, show confirmation)
      setIsInCall(false);
      setTimeRemaining(30 * 60); // Reset timer
      alert("You have left the mock interview call.");
    } else {
      // Logic for joining the call (e.g., open Google Meet URL)
      // This is where you would open the actual Google Meet link
      const confirmJoin = window.confirm("You are about to join the mock interview on Google Meet. Do you want to proceed?");
      if (confirmJoin) {
        window.open(googleMeetUrl, '_blank'); // Opens Google Meet in a new tab
        setIsInCall(true);
        // Reset timer if joining fresh, or keep it running if it's a "resume" feature
        setTimeRemaining(30 * 60); // Start timer for new call
      }
    }
  };

  const checklistItems = [
    { id: 1, text: "Test camera and microphone" },
    { id: 2, text: "Check internet connection stability" },
    { id: 3, text: "Prepare resume and portfolio" },
    { id: 4, text: "Research company background" },
    { id: 5, text: "Prepare STAR method examples" },
    { id: 6, text: "Set up quiet, well-lit environment" },
    { id: 7, text: "Have water and notepad ready" },
    { id: 8, text: "Practice common interview questions" }
  ];

  const commonQuestions = [
    "Tell me about yourself",
    "Why do you want to work here?",
    "What are your greatest strengths?",
    "What is your biggest weakness?",
    "Where do you see yourself in 5 years?",
    "Why are you leaving your current job?",
    "Describe a challenging situation you overcame",
    "Do you have any questions for us?"
  ];

  const tips = [
    "Maintain eye contact by looking at the camera, not the screen",
    "Keep your hands visible and use natural gestures",
    "Speak clearly and at a moderate pace",
    "Have good posture and sit up straight",
    "Prepare specific examples using the STAR method",
    "Ask thoughtful questions about the role and company",
    "Follow up with a thank-you email within 24 hours"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Interview Preparation Hub</h1>
                <p className="text-gray-600">Get ready for your video interview</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Call Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-900 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-semibold">Mock Interview Room</h2> {/* Changed from Google Meet */}
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 text-sm">{googleMeetUrl}</span> {/* Display URL */}
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Video Area */}
                <div className="relative bg-gray-800 rounded-lg aspect-video mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideoOn ? (
                      <div className="text-center">
                        <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">You</span>
                        </div>
                        <p className="text-white">Camera is on</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <VideoOff className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-400">Camera is off</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Participant indicator */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    {isInCall ? '1 participant' : '0 participants'} {/* Dynamic participant count */}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setIsAudioOn(!isAudioOn)}
                    className={`p-3 rounded-full ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
                  >
                    {isAudioOn ? (
                      <Mic className="w-5 h-5 text-white" />
                    ) : (
                      <MicOff className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
                  >
                    {isVideoOn ? (
                      <Video className="w-5 h-5 text-white" />
                    ) : (
                      <VideoOff className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <button
                    onClick={handleCallToggle} // Use the new handler
                    className={`p-3 rounded-full ${isInCall ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition-colors`}
                  >
                    {isInCall ? (
                      <PhoneOff className="w-5 h-5 text-white" />
                    ) : (
                      <Phone className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                    <Settings className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Meeting Info */}
              <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Interview Scheduled</h3>
                    <p className="text-blue-700 text-sm">Software Engineer Position - Tech Corp</p>
                    <p className="text-blue-600 text-sm mt-1">Join the meeting 5-10 minutes early to test your setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preparation Panel */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="border-b">
              <div className="flex space-x-1 p-1">
                {[
                  { id: 'checklist', label: 'Checklist', icon: CheckCircle },
                  { id: 'questions', label: 'Questions', icon: FileText },
                  { id: 'tips', label: 'Tips', icon: Users }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 h-96 overflow-y-auto">
              {selectedTab === 'checklist' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-4">Pre-Interview Checklist</h3>
                  {checklistItems.map(item => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center ${
                          checkedItems[item.id]
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {checkedItems[item.id] && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </button>
                      <span className={`text-sm ${
                        checkedItems[item.id] ? 'text-gray-500 line-through' : 'text-gray-700'
                      }`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'questions' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-4">Common Interview Questions</h3>
                  {commonQuestions.map((question, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium">{question}</p>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'tips' && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-4">Interview Tips</h3>
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Camera Test</h4>
            <p className="text-sm text-gray-600">Check your video quality</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Mic className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Audio Test</h4>
            <p className="text-sm text-gray-600">Test microphone & speakers</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Practice Mode</h4>
            <p className="text-sm text-gray-600">Mock interview session</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Join Meeting</h4>
            <p className="text-sm text-gray-600">Start your interview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepPage;
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi there! How can I help you today?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = inputValue;
    const newUserMessage = { type: 'user', text: userMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate typing delay for better UX
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: botResponse },
      ]);
      setIsLoading(false);
    }, 500);
  };

  // Function to generate intelligent responses based on user input (fallback)
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Job-related responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to JobPortal. I'm here to help you with your job search, resume building, and career guidance. How can I assist you today?";
    }
    
    if (message.includes('resume') || message.includes('cv')) {
      if (message.includes('create') || message.includes('make') || message.includes('build')) {
        return "Great! To create a resume, go to the 'Resume' section in our navigation menu. We have a professional resume builder with multiple templates, step-by-step guidance, and expert tips. You can save multiple versions and export them as PDF. Would you like me to guide you through the process?";
      }
      if (message.includes('improve') || message.includes('better') || message.includes('tips')) {
        return "Here are key resume tips: 1) Keep it 1-2 pages, 2) Use action verbs (achieved, developed, managed), 3) Quantify achievements with numbers, 4) Tailor it to each job, 5) Include relevant keywords, 6) Proofread carefully. Visit our Resume section for templates and examples!";
      }
      if (message.includes('template') || message.includes('format')) {
        return "We offer multiple resume templates: Modern, Classic, Creative, and Minimal. Each template is professionally designed and ATS-friendly. You can preview them in our Resume Builder section and choose the one that best fits your industry and experience level.";
      }
      return "I can help you create, improve, or review your resume. Our Resume Builder offers professional templates, expert guidance, and tips. What specific aspect of resume writing would you like help with?";
    }
    
    if (message.includes('job') || message.includes('work') || message.includes('career')) {
      if (message.includes('find') || message.includes('search') || message.includes('looking')) {
        return "To find jobs: 1) Browse our job listings, 2) Use search filters (location, industry, experience), 3) Create a profile for personalized recommendations, 4) Set up job alerts, 5) Apply directly through our platform. What type of job are you looking for?";
      }
      if (message.includes('apply') || message.includes('application')) {
        return "To apply for jobs: 1) Create a profile, 2) Upload your resume, 3) Browse job listings, 4) Click 'Apply Now', 5) Fill out the application form, 6) Submit your application. Make sure your resume is up-to-date!";
      }
      return "I can help you with job searching, resume tips, interview preparation, and career advice. What specific area would you like help with?";
    }
    
    if (message.includes('interview')) {
      if (message.includes('prepare') || message.includes('tips') || message.includes('help')) {
        return "Interview preparation tips: 1) Research the company thoroughly, 2) Practice common questions, 3) Prepare your own questions, 4) Dress professionally, 5) Arrive early, 6) Bring copies of your resume, 7) Follow up with a thank-you email. Check our Interview Prep section for detailed guides!";
      }
      if (message.includes('question')) {
        return "Common interview questions: 'Tell me about yourself', 'Why do you want this job?', 'What are your strengths/weaknesses?', 'Where do you see yourself in 5 years?', 'Why should we hire you?'. Practice your answers and use the STAR method for behavioral questions.";
      }
      return "I can help you prepare for interviews with tips, common questions, and best practices. What aspect of interviewing would you like to focus on?";
    }
    
    if (message.includes('salary') || message.includes('pay') || message.includes('money')) {
      return "Salary negotiation tips: 1) Research industry standards, 2) Know your worth and experience level, 3) Practice your pitch, 4) Be prepared to discuss benefits too, 5) Don't be the first to mention salary, 6) Consider the total compensation package. Would you like specific negotiation strategies?";
    }
    
    if (message.includes('help') || message.includes('support')) {
      return "I'm here to help! I can assist with: Job searching and applications, Resume building and tips, Interview preparation, Career advice, Salary negotiation, and general questions about JobPortal. What do you need help with?";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I'm here whenever you need help with your career journey. Good luck with your job search and feel free to ask more questions!";
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
      return "Goodbye! Feel free to come back anytime for more career guidance. Good luck with your job search and remember - I'm here to help you succeed!";
    }
    
    // Default responses for unrecognized input
    const defaultResponses = [
      "I'm here to help with job-related questions. Could you tell me more about what you're looking for?",
      "I can assist with job searching, resume tips, interview preparation, and career advice. What would you like to know?",
      "That's an interesting question! I'm focused on helping with career and job-related topics. How can I assist you with your professional goals?",
      "I'm your career assistant! I can help with job searching, resume building, interview tips, and more. What specific area would you like help with?",
      "I'm here to support your career journey. Whether it's finding jobs, building resumes, or preparing for interviews, I'm ready to help!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Open chatbot"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 h-96 max-h-[80vh] overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between rounded-t-lg shadow">
            <div className="flex items-center space-x-2">
              <Bot size={24} />
              <h3 className="font-semibold text-lg">JobPortal Bot</h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-1"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm ${msg.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 font-bold text-black"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 
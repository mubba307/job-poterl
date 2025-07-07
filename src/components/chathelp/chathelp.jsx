'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi there! How can I help you today?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useAxios, setUseAxios] = useState(true); // Toggle this to switch between axios and fetch
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Send message to backend using axios or fetch
  const sendMessageToBackend = async (message) => {
    const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || '/api/chatbot'; // Set in .env
    const apiKey = process.env.NEXT_PUBLIC_CHATBOT_API_KEY; // Set in .env if needed

    if (useAxios) {
      // Axios
      const response = await axios.post(apiUrl, { message }, {
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'x-api-key': apiKey }),
        }
      });
      return response.data.reply;
    } else {
      // Fetch
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'x-api-key': apiKey }),
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.reply;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = inputValue;
    const newUserMessage = { type: 'user', text: userMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToBackend(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: botResponse },
      ]);
    } catch (err) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Sorry, there was an error connecting to the chatbot.' },
      ]);
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    setMessages([{ type: 'bot', text: 'Hi there! How can I help you today?' }]);
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
          <form onSubmit={handleSendMessage} className="p-4 bg-white flex items-center space-x-2 border-t border-gray-200">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex items-center space-x-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || inputValue.trim() === ''}
              >
                <Send size={18} />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export function JobFetcher() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://job-api8.p.rapidapi.com/v1/breweries/search',
        headers: {
          'x-rapidapi-key': '4cf0ec23camsh48c0c4165ba76d9p1d4565jsn0942d1052430',
          'x-rapidapi-host': 'job-api8.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      setData('Error fetching data');
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Jobs</button>
      <pre>{data ? JSON.stringify(data, null, 2) : null}</pre>
    </div>
  );
}
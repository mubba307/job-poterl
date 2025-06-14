import React, { useState, useRef, useEffect } from 'react';

export default function ChatHelp() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    // Simulate bot reply
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { from: 'bot', text: "Thank you for your message! We'll get back to you soon." }
      ]);
    }, 800);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-white border-none rounded-none shadow-none flex flex-col z-50">
      <div className="bg-blue-700 text-white px-6 py-4 font-semibold flex items-center justify-between">
        <span className="flex items-center"><span className="mr-2">💬</span> Chat Help</span>
        {/* You can add a close button here if needed */}
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`px-4 py-2 rounded-lg max-w-[75%] text-base
              ${msg.from === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex border-t border-gray-200">
        <input
          type="text"
          className="flex-1 px-4 py-3 outline-none text-base"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 hover:bg-blue-800 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
//src/components/chatWidget.jsx

'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const ChatWidget = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), content: newMessage, sender: 'user' },
    ]);
    setNewMessage('');

    // Simulate typing and agent response
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, content: 'Thanks for your message!', sender: 'agent' },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return isVisible ? (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-lg flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">Chat with us</h3>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-700 p-1 rounded-full"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Avatar */}
            <div className="w-8 h-8">
              <Image
                src={
                  msg.sender === 'user'
                    ? '/uploads/dashboardDefault/drgnimages.jpeg'
                    : '/uploads/vendorProfile/Ayinla.webp'
                }
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            {/* Message */}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

export default ChatWidget;

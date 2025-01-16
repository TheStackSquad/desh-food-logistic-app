'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import {
  chatIconAnimation,
  chatWidgetAnimation,
  messageAnimation,
  typingAnimation
} from '@/components/motion/animations';
import ChatMessage, { ChatSession } from '@/schema/models/chatModel';

const ChatWidget = ({ isVisible, onClose }) => {
  // State
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState(ChatSession.CLOSED);
  
  // Refs
  const messageEndRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);

  // Utility functions
  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  }, []);

  const startInactivityTimer = useCallback(() => {
    clearInactivityTimer();
    inactivityTimeoutRef.current = setTimeout(() => {
      if (chatState !== ChatSession.ACTIVE) {
        onClose();
      }
    }, 10000);
  }, [chatState, onClose, clearInactivityTimer]);

  // Effects
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isVisible) {
      startInactivityTimer();
    }
    return () => clearInactivityTimer();
  }, [isVisible, startInactivityTimer, clearInactivityTimer]);

  // Event handlers
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = new ChatMessage(
      Date.now(),
      newMessage,
      'user',
      new Date()
    );

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage = new ChatMessage(
        Date.now(),
        'Thanks for your message! An agent will be with you shortly.',
        'agent',
        new Date()
      );
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    startInactivityTimer();
  };

  // Sub-components
  const ChatIcon = () => (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      variants={chatIconAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      onClick={() => setChatState(ChatSession.ACTIVE)}
    >
      <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
        <MessageCircle className="w-6 h-6" />
      </button>
    </motion.div>
  );

  const ChatWindow = () => (
    <motion.div
      className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-xl overflow-hidden z-50"
      variants={chatWidgetAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">Chat with us</h3>
        <button 
          onClick={() => setChatState(ChatSession.CLOSED)}
          className="p-1 hover:bg-blue-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            variants={messageAnimation}
            initial="initial"
            animate="animate"
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            variants={typingAnimation}
            animate="animate"
            className="flex gap-1 p-3 w-16 bg-gray-100 rounded-full"
          >
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {chatState === ChatSession.CLOSED && isVisible && <ChatIcon />}
      {chatState === ChatSession.ACTIVE && <ChatWindow />}
    </AnimatePresence>
  );
};

export default ChatWidget;
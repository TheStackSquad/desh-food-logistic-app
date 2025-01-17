
// src/components/FlashText.js
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/componentStyle/flashText.css';

const FlashText = ({ texts }) => {
  // Use null as initial state to indicate "not mounted yet"
  const [currentText, setCurrentText] = React.useState(null);
  const [isMounted, setIsMounted] = React.useState(false);

  // Handle mounting state
  React.useEffect(() => {
    setIsMounted(true);
    setCurrentText(0); // Set initial text only after mounting
  }, []);

  // Cycle through texts only after mounting
  React.useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMounted, texts.length]);

  // Show nothing until mounted to prevent hydration mismatch
  if (!isMounted) {
    return <div className="flash-text-container">
      <div className="flash-text">{texts[0]}</div>
    </div>;
  }

  return (
    <div className="flash-text-container">
      <AnimatePresence mode="wait">
        {currentText !== null && (
          <motion.div
            key={texts[currentText]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9 }}
            className="flash-text"
          >
            {texts[currentText]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlashText;

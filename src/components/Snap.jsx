
// src/components/Snap.jsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vendorData } from '@/components/objects/vendorData';

export default function Snap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const navRefs = useRef([]);

  const handleTagClick = (index) => {
    setActiveIndex(index);
  };

  const scrollToCenter = (element) => {
    if (scrollContainerRef.current && element) {
      const container = scrollContainerRef.current;
      const scrollLeft = element.offsetLeft - (container.clientWidth / 2) + (element.clientWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (navRefs.current[activeIndex]) {
      scrollToCenter(navRefs.current[activeIndex]);
    }
  }, [activeIndex]);

  return (
    <div className="snapGrid max-w-6xl mx-auto rounded-xl shadow-lg p-2">
      {/* Navigation Bar */}
      <div className="relative mb-8">
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mask-fade-edges"
        >
          {vendorData.liTags.map((item, index) => (
            <motion.button
              key={item.id}
              ref={(el) => (navRefs.current[index] = el)}
              onClick={() => handleTagClick(index)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300
                ${activeIndex === index
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Card Container */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {vendorData.liTags.map((item, index) => (
            activeIndex === index && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full bg-white rounded-xl p-6 shadow-md border border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.headerText}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.content}</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {item.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center space-x-3 text-green-600"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
// components/motion/cardSlider.js
'use client';

//Card Slide Logic
export const containerVariants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // Reduced for snappier stagger
      delayChildren: 0.1      // Slight initial delay
    }
  }
};

export const cardVariants = {
  hidden: {
    y: 20,          // Start slightly below final position
    opacity: 0,
    scale: 0.95     // Start slightly smaller
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  },
  exit: {
    y: 20,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// ../components/motion/animations.js
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  
  export const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  

//chat animations
// src/components/motion/animations.jsx

export const chatIconAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95 
    }
  };
  
  export const chatWidgetAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      y: "100%", 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  export const messageAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 25 }
    }
  };
  
  export const typingAnimation = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  
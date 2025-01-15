"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RiderLanding() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Rider/Signup');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 overflow-hidden relative">
      {/* Animated background circles */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-20 filter blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-300 rounded-full opacity-20 filter blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main content */}
      <div className="container mx-auto px-4 h-screen flex items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo animation */}
          <motion.div
            className="mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </motion.div>

          {/* Text animations */}
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Speed Meets Service
          </motion.h1>

          <motion.p 
            className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Your journey to excellence begins here. Join our elite team of riders
            delivering happiness across the city.
          </motion.p>

          {/* Loading animation */}
          <motion.div 
            className="flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  y: [-8, 0, -8],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
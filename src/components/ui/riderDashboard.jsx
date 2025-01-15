// src/components/ui/riderDashboard.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  Wallet, 
  TrendingUp, 
  Bike, 
  Clock, 
  Bell,
  Star,
  Calendar,
  MapPin,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import Image from 'next/image';

const RiderDashboard = () => {
  const [notifications, setNotifications] = useState(3);
  const [earnings, setEarnings] = useState({
    today: 85.50,
    week: 534.25,
    month: 2150.00
  });
  const [stats, setStats] = useState({
    completedRides: 145,
    rating: 4.8,
    hoursOnline: 28,
    cancelRate: "2.1%"
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/uploads/dashboardDefault/drgnimages.jpeg"
              alt="Rider Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Online since 8:30 AM</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Bell size={24} className="text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Earnings Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Today's Earnings</h3>
            <DollarSign className="text-green-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">₦{earnings.today.toFixed(2)}</p>
          <div className="mt-2 text-sm text-gray-500">From 12 deliveries</div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Weekly Earnings</h3>
            <TrendingUp className="text-blue-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">₦{earnings.week.toFixed(2)}</p>
          <div className="mt-2 text-sm text-gray-500">Past 7 days</div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600">Monthly Earnings</h3>
            <Calendar className="text-purple-500" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">₦{earnings.month.toFixed(2)}</p>
          <div className="mt-2 text-sm text-gray-500">November 2023</div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Bike className="text-indigo-500" size={20} />
            <h3 className="text-gray-600">Completed Rides</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.completedRides}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="text-yellow-500" size={20} />
            <h3 className="text-gray-600">Rating</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.rating}/5.0</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="text-green-500" size={20} />
            <h3 className="text-gray-600">Hours Online</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.hoursOnline}h</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="text-red-500" size={20} />
            <h3 className="text-gray-600">Cancel Rate</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.cancelRate}</p>
        </motion.div>
      </div>

      {/* Payout Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Wallet size={24} className="text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Available for payout</h3>
              <p className="text-sm text-gray-600">Processed every Monday</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <span>Request Payout</span>
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RiderDashboard;
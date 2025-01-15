//src/components/ui/vendorInsightLayout.jsx
'use client';

import React, { useState } from 'react';
import { 
  Filter, 
  ExternalLink, 
  ChevronDown, 
  Star,
  ChevronUp
} from 'lucide-react';

const StatCard = ({ label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    <div className="text-gray-600 mb-2">{label}</div>
    <div className="text-2xl font-semibold text-gray-900">{value}</div>
  </div>
);

const VendorInsight = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isPopularItemsExpanded, setIsPopularItemsExpanded] = useState(false);

  const stats = [
    { label: 'Total Orders', value: '0' },
    { label: 'Total Amount', value: '₦0' },
    { label: 'Average Order Amount', value: '₦0' },
  ];

  const ratings = ['All', '5 Star', '4 Star', '3 Star', '2 Star', '1 Star'];

  return (
    <div className="insightGrid min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Insights</h1>

        {/* Stats Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Stats</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </section>

        {/* Popular Items Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center cursor-pointer"
               onClick={() => setIsPopularItemsExpanded(!isPopularItemsExpanded)}>
            <h2 className="text-xl font-semibold text-gray-800">Most Popular Items</h2>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              {isPopularItemsExpanded ? 
                <ChevronUp className="w-6 h-6" /> : 
                <ChevronDown className="w-6 h-6" />
              }
            </button>
          </div>
          {isPopularItemsExpanded && (
            <div className="mt-4">
              {/* Popular items content would go here */}
              <p className="text-gray-600">No popular items yet</p>
            </div>
          )}
        </section>

        {/* Reviews Section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Filter className="w-5 h-5" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <ExternalLink className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="text-gray-700">Your Rating</span>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-6 h-6 text-yellow-400 fill-current" 
                  />
                ))}
                <span className="ml-2 text-lg font-semibold">0.0</span>
              </div>
              <p className="text-gray-600">No ratings yet</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => setActiveFilter(rating)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeFilter === rating
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating} {rating !== 'All' && '(0)'}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VendorInsight;
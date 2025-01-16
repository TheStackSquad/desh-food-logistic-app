"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Wallet, LogOut, Clock, ShoppingBag, Star, 
  MapPin, TrendingUp, Users, ChevronRight,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function VendorPayout() {
  //eslint-disable-next-line
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  // Sample data for the earnings chart
  const earningsData = [
    { name: 'Mon', amount: 45000 },
    { name: 'Tue', amount: 52000 },
    { name: 'Wed', amount: 49000 },
    { name: 'Thu', amount: 63000 },
    { name: 'Fri', amount: 58000 },
    { name: 'Sat', amount: 81000 },
    { name: 'Sun', amount: 76000 },
  ];

  const [selectedCard, setSelectedCard] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    //logout logic
  };

  const handlePayout = () => {
    //logout logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="payoutGrid max-w-7xl mx-auto space-y-6">
        {/* Header Section - Unchanged */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden 
                          shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/uploads/dashboardDefault/drgnimages.jpeg"
                alt="Vendor"
                width={64}
                height={64}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Vendor Dashboard
              </h2>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>{currentTime}</span>
                <span className="ml-2">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

          </div>
          <Button
            variant="outline"
            className="flex items-center space-x-2 hover:bg-red-50 
                     hover:text-red-600 transition-colors duration-300"
            onClick={() => handleLogout()}
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </Button>
        </div>

        {/* Earnings Chart Section */}
        <Card className="bg-white p-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Weekly Earnings Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `₦${value/1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`₦${value.toLocaleString()}`, "Amount"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="transform hover:scale-105 transition-transform duration-300
                        hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Weekly Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 truncate">
    ₦424,500.00
  </div>
  <p className="text-gray-500 mt-2 flex items-center text-sm sm:text-base">
    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
    +12.5% from last week
  </p>
</CardContent>

          </Card>

          <Card className="transform hover:scale-105 transition-transform duration-300
                        hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Customer Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">847</div>
              <p className="text-gray-500 mt-2">New customers this week</p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-transform duration-300
                        hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Satisfaction Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">4.8</div>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    fill={i < 4 ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-transform duration-300
                        hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="w-5 h-5 text-purple-600" />
                Commission Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">10%</div>
              <p className="text-gray-500 mt-2">Standard platform fee</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className={`cursor-pointer transition-all duration-300 ${
              selectedCard === 'popular' ? 'ring-2 ring-blue-500' : ''
            } hover:shadow-lg`}
            onClick={() => handleCardClick('popular')}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                  Most Popular Items
                </div>
                <ChevronRight className={`w-5 h-5 transform transition-transform 
                  ${selectedCard === 'popular' ? 'rotate-90' : ''}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Jollof Rice Special</span>
                  <span className="text-gray-600">847 orders</span>
                </li>
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Chicken Suya</span>
                  <span className="text-gray-600">623 orders</span>
                </li>
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Pepper Soup</span>
                  <span className="text-gray-600">419 orders</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-300 ${
              selectedCard === 'satisfaction' ? 'ring-2 ring-blue-500' : ''
            } hover:shadow-lg`}
            onClick={() => handleCardClick('satisfaction')}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Customer Insights
                </div>
                <ChevronRight className={`w-5 h-5 transform transition-transform 
                  ${selectedCard === 'satisfaction' ? 'rotate-90' : ''}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">5-Star Reviews</span>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">732</span>
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  </div>
                </li>
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Repeat Orders</span>
                  <span className="text-gray-600">64%</span>
                </li>
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Avg. Delivery</span>
                  <span className="text-gray-600">28 mins</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-300 ${
              selectedCard === 'locations' ? 'ring-2 ring-blue-500' : ''
            } hover:shadow-lg`}
            onClick={() => handleCardClick('locations')}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  Top Locations
                </div>
                <ChevronRight className={`w-5 h-5 transform transition-transform 
                  ${selectedCard === 'locations' ? 'rotate-90' : ''}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Lekki Phase 1</span>
                  <span className="text-gray-600">423 orders</span>
                </li>
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Victoria Island</span>
                  <span className="text-gray-600">385 orders</span>
                </li>
                <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Ikoyi</span>
                  <span className="text-gray-600">291 orders</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Payout Section */}
        <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-green-600" />
              Available for Payout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-900">
                  ₦382,050.00
                </div>
                <p className="text-gray-500 mt-2">After commission</p>
              </div>
              <Button
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700
                         transform hover:scale-105 transition-all duration-300"
                onClick={() => handlePayout()}
              >
                <Wallet className="w-4 h-4" />
                <span>Request Payout</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
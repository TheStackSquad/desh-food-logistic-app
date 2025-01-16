

// src/app/Vendor/Payout/components/AnalyticsSection.jsx
'use client';

import { useState } from 'react';
import { ShoppingBag, Users, MapPin, Star } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";

export default function AnalyticsSection() {
  const [selectedCard, setSelectedCard] = useState(null);

  const analyticsData = {
    popular: {
      title: "Most Popular Items",
      icon: ShoppingBag,
      iconColor: "text-purple-600",
      items: [
        { label: "Jollof Rice Special", value: "847 orders" },
        { label: "Chicken Suya", value: "623 orders" },
        { label: "Pepper Soup", value: "419 orders" }
      ]
    },
    satisfaction: {
      title: "Customer Insights",
      icon: Users,
      iconColor: "text-blue-600",
      items: [
        { label: "5-Star Reviews", value: "732" },
        { label: "Repeat Orders", value: "64%" },
        { label: "Avg. Delivery", value: "28 mins" }
      ]
    },
    locations: {
      title: "Top Locations",
      icon: MapPin,
      iconColor: "text-orange-600",
      items: [
        { label: "Lekki Phase 1", value: "423 orders" },
        { label: "Victoria Island", value: "385 orders" },
        { label: "Ikoyi", value: "291 orders" }
      ]
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(analyticsData).map(([key, data]) => (
        <AnalyticsCard
          key={key}
          {...data}
          isSelected={selectedCard === key}
          onClick={() => setSelectedCard(selectedCard === key ? null : key)}
        />
      ))}
    </div>
  );
}
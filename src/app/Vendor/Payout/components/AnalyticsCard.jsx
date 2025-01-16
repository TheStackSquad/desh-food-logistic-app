// src/app/Vendor/Payout/components/AnalyticsCard.jsx
'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ChevronRight } from "lucide-react";

export default function AnalyticsCard({ 
  title, 
  icon: Icon, 
  iconColor, 
  items, 
  isSelected, 
  onClick 
}) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      } hover:shadow-lg`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            {title}
          </div>
          <ChevronRight className={`w-5 h-5 transform transition-transform 
            ${isSelected ? 'rotate-90' : ''}`} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span className="font-medium">{item.label}</span>
              <span className="text-gray-600">{item.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
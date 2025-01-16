
  // src/app/Vendor/Payout/components/StatsGrid.jsx
  'use client';
  
  import { TrendingUp, Users, Star, Wallet } from "lucide-react";
  import StatsCard from "./StatsCard";
  
  export default function StatsGrid() {
    const stats = [
      {
        icon: TrendingUp,
        title: "Weekly Earnings",
        value: "₦424,500.00",
        subtitle: "+12.5% from last week",
        iconColor: "text-green-600"
      },
      {
        icon: Users,
        title: "Customer Growth",
        value: "847",
        subtitle: "New customers this week",
        iconColor: "text-blue-600"
      },
      {
        icon: Star,
        title: "Satisfaction Rate",
        value: "4.8",
        subtitle: "Average rating",
        iconColor: "text-yellow-500"
      },
      {
        icon: Wallet,
        title: "Commission Rate",
        value: "10%",
        subtitle: "Standard platform fee",
        iconColor: "text-purple-600"
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    );
  }
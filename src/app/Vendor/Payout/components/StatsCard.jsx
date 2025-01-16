  // src/app/Vendor/Payout/components/StatsCard.jsx
  'use client';
  
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
  
  export default function StatsCard({ icon: Icon, title, value, subtitle, iconColor }) {
    return (
      <Card className="transform hover:scale-105 transition-transform duration-300
                      hover:shadow-lg cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${iconColor}`}>{value}</div>
          {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
        </CardContent>
      </Card>
    );
  }
  
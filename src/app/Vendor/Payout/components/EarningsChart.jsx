  // src/app/Vendor/Payout/components/EarningsChart.jsx
  'use client';
  
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
  import { Activity } from "lucide-react";
  import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
  import { useMemo } from 'react';
  
  export default function EarningsChart() {
    const earningsData = useMemo(() => [
      { name: 'Mon', amount: 45000 },
      { name: 'Tue', amount: 52000 },
      { name: 'Wed', amount: 49000 },
      { name: 'Thu', amount: 63000 },
      { name: 'Fri', amount: 58000 },
      { name: 'Sat', amount: 81000 },
      { name: 'Sun', amount: 76000 },
    ], []);
  
    return (
      <Card className="bg-white">
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
              <YAxis tickFormatter={(value) => `₦${value/1000}k`} />
              <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, "Amount"]} />
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
    );
  }
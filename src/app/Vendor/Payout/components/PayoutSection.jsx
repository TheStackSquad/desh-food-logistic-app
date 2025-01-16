// src/app/Vendor/Payout/components/PayoutSection.jsx
'use client';

import { Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function PayoutSection() {
  const handlePayout = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing payout request...',
        success: 'Payout request submitted successfully!',
        error: 'Failed to process payout request',
      }
    );
  };

  return (
    <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="text-gray-500" />
          <span>Payout Section</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start space-y-4">
        <p className="text-gray-700">Easily process your payout requests.</p>
        <Button onClick={handlePayout} className="bg-blue-500 text-white hover:bg-blue-600">
          Request Payout
        </Button>
      </CardContent>
    </Card>
  );
}

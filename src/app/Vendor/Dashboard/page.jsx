//src/app/Vendor/Dashboard/page.js
'use client';

import VendorDashboard from '@/components/ui/vendorDashboard';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <VendorDashboard />
    </div>
  );
}
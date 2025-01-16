  // src/app/Vendor/Payout/page.jsx
  'use client';
  
  import { Suspense } from "react";
  import dynamic from "next/dynamic";
  import { useCurrentTime } from '@/app/Vendor/Payout/hooks/useCurrentTime';
  
  // Dynamic imports with custom loading states
  const VendorHeader = dynamic(() => import("@/app/Vendor/Payout/components/VendorHeader"), {
    loading: () => <div className="h-24 bg-gray-100 animate-pulse rounded-lg" />
  });
  
  const EarningsChart = dynamic(() => import("@/app/Vendor/Payout/components/EarningsChart"), {
    loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />
  });
  
  const StatsGrid = dynamic(() => import("@/app/Vendor/Payout/components/StatsGrid"), {
    loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-lg" />
  });
  
  const AnalyticsSection = dynamic(() => import("@/app/Vendor/Payout/components/AnalyticsSection"), {
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
  });
  
  const PayoutSection = dynamic(() => import("@/app/Vendor/Payout/components/PayoutSection"), {
    loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
  });
  
  export default function VendorPayout() {
    const currentTime = useCurrentTime();
  
    return (
      <div className="space-y-6">
        <Suspense fallback={<div className="h-24 bg-gray-100 animate-pulse rounded-lg" />}>
          <VendorHeader currentTime={currentTime} />
        </Suspense>
  
        <Suspense fallback={<div className="h-80 bg-gray-100 animate-pulse rounded-lg" />}>
          <EarningsChart />
        </Suspense>
  
        <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse rounded-lg" />}>
          <StatsGrid />
        </Suspense>
  
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
          <AnalyticsSection />
        </Suspense>
  
        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg" />}>
          <PayoutSection />
        </Suspense>
      </div>
    );
  }
//src/app/Dashboard/page.js
'use client'

import DashboardLayout from '@/components/ui/dashboardLayout';
import { SafeHydration } from '@/components/SafeHydration';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <SafeHydration>
   <  DashboardLayout />
    </SafeHydration>
    </div>
  );
}

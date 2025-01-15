//src/app/Dashboard/page.js
'use client'
import ProfileUI from '@/components/ui/riderProfile';

export default function profileLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <  ProfileUI />
    </div>
  );
}
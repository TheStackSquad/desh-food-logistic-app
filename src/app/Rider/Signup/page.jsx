//src/app/Vendor/Signup/page.js
'use client';
import RiderSignUpForm from '@/components/ui/riderRegForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RiderSignUpForm />
    </div>
  );
}
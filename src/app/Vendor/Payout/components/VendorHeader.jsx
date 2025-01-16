  // src/app/Vendor/Payout/components/VendorHeader.jsx
  'use client';
  
  import Image from "next/image";
  import { Clock, LogOut } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { useRouter } from "next/navigation";
  
  export default function VendorHeader({ currentTime }) {
    const router = useRouter();
  
    const handleLogout = () => {
      // Add logout logic here
      router.push('/login');
    };
  
    return (
      <header className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full bg-gray-200 overflow-hidden 
                        shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src="/uploads/dashboardDefault/drgnimages.jpeg"
              alt="Vendor"
              fill
              sizes="(max-width: 64px) 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Vendor Dashboard
            </h2>
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              <span>{currentTime}</span>
              <span className="ml-2">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="flex items-center space-x-2 hover:bg-red-50 
                   hover:text-red-600 transition-colors duration-300"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </Button>
      </header>
    );
  }
// src/app/Rider/layout.js
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { 
    UserPlus, 
    LogIn, 
    User,  
    Gauge 
  } from "lucide-react";
  
  const navigation = [
    {
      name: "Signup",
      href: "/Rider/Signup",
      icon: UserPlus,
    },
    {
      name: "Login",
      href: "/Rider/Login",
      icon: LogIn,
    },
    {
      name: "Profile",
      href: "/Rider/Profile",
      icon: User,
    },
    {
      name: "Dashboard",
      href: "/Rider/Dashboard",
      icon: Gauge,
    },
  ];

export default function VendorLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Main content area */}
      <main className="navGrid flex-1 p-6 overflow-y-auto">
        {children}
      </main>

      {/* Navigation sidebar */}
      <nav className="navGrid2 fixed bottom-0 left-0 right-0 bg-white border-t md:relative md:w-64 md:border-t-0 md:border-l">
        <ul className="layoutBox flex md:flex-col p-2 space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name} className="flex-shrink-0">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors
                    ${isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
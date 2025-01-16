  
  // src/app/Vendor/Payout/hooks/useCurrentTime.js
  'use client';
  
  import { useState, useEffect } from 'react';
  
  export function useCurrentTime() {
    const [time, setTime] = useState(() =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }));
      }, 60000); // Update every minute
  
      return () => clearInterval(timer);
    }, []);
  
    return time;
  }
  
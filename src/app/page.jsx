//src/app/page.jsx
'use client';
import React, { useEffect } from 'react';  // Add useEffect import
import HomePageLayout from '@/components/ui/homeLayout';
import Snap from "@/components/Snap";
import Ratings from '@/components/Ratings';


export default function Home() {

  return (
    <div className="Home">
      <HomePageLayout /> 
      <div className="section2">
        <Snap />
      </div>
      <div className="section3">
        <header className='star-listing'>
          Restaurants Near You
        </header>
        <Ratings />
      </div>
    </div>
  );
}
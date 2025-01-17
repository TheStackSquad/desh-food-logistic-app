// src/components/ui/Home.js
'use client';
import React from 'react';
import FlashText from "@/components/FlashText";
import SlideNav from "@/components/motion/slideNav";
import texts from '@/components/objects/texts';

function Home() {
  if (!texts || texts.length === 0) {
    console.warn('No texts provided for FlashText component');
    return null;
  }

  return (
    <div className="home">
      <div className="section1">
        <FlashText texts={texts} />
        <SlideNav /> 
      </div>
    </div>
  );
}

export default Home;
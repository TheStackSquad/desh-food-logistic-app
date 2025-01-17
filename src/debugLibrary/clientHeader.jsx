// src/components/ClientHeader.jsx
'use client';

import Header from '@/components/Navbar';
import { PerformanceWrapper } from '@/debugLibrary/performanceWrapper';

export function ClientHeader() {
  return (
    <PerformanceWrapper id="Header">
      <Header />
    </PerformanceWrapper>
  );
}
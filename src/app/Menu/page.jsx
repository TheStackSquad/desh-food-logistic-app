//src/app/Menu/page.js
'use client';

export const dynamic = 'force-dynamic';

import MenuUI from '@/components/ui/MenuLayout';

export default function Menu() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <MenuUI />
    </div>
  );
}
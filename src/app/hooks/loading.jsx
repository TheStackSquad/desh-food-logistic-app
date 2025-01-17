// src/app/loading.jsx
'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Loading DevKitchen...
        </div>
      </div>
    </div>
  );
}

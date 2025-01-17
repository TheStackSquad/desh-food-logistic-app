// src/components/ui/MenuLayout.jsx
'use client';

import React, { useState, Suspense, useCallback } from 'react';
import dynamic from 'next/dynamic';
import useMeals from '@/app/hooks/useMeals';
import useLikeToggle from '@/app/hooks/useLikeToggle';

// Dynamic imports with suspense fallback
const VendorTypeSelect = dynamic(() => import('@/components/ui/menu/VendorTypeSelect'), {
  ssr: false,
  loading: () => <LoadingPlaceholder width={200} height={40} />
});

const MealCard = dynamic(() => import('@/components/ui/menu/MealCard'), {
  ssr: false,
  loading: () => <LoadingPlaceholder height={384} />
});

// Generic loading placeholder component
const LoadingPlaceholder = ({ width = '100%', height, className = '' }) => (
  <div
    className={`bg-gray-200 animate-pulse rounded ${className}`}
    style={{ width, height }}
  />
);

export default function MenuLayout() {
  const [selectedType, setSelectedType] = useState('all');
  const [pendingLikes, setPendingLikes] = useState(new Set());

  const { meals, loading, error } = useMeals(selectedType);
  const { handleLikeToggle, isLiked } = useLikeToggle(setPendingLikes);

  //eslint-disable-next-line
  const handleAddToCart = useCallback((meal) => {
    // Implement cart logic
  }, []);

  const renderMealCard = useCallback(
    (meal) => (
      <Suspense key={meal._id} fallback={<LoadingPlaceholder height={384} />}>
        <MealCard
          meal={meal}
          onLike={handleLikeToggle}
          isLiked={isLiked(meal._id)}
          isPending={pendingLikes.has(meal._id)}
          onAddToCart={handleAddToCart}
        />
      </Suspense>
    ),
    [handleLikeToggle, isLiked, pendingLikes, handleAddToCart]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Suspense fallback={<LoadingPlaceholder width={200} height={40} />}>
          <VendorTypeSelect onValueChange={setSelectedType} defaultValue="all" />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <LoadingPlaceholder key={idx} height={384} />
            ))
          : meals.map(renderMealCard)}
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4">
          Failed to load meals. Please try again later.
        </div>
      )}
    </div>
  );
}

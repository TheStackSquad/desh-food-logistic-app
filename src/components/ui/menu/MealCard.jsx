// src/components/ui/menu/MealCard.jsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ShoppingCart, Heart } from 'lucide-react';

export default function MealCard({ meal, onLike, isLiked, isPending, onAddToCart }) {
  return (
    <Card className="card-menu group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="card-menu relative h-48 w-full overflow-hidden">
        <Image
          src={meal.image}
          alt={meal.mealName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          layout="fill"
          objectFit="cover"
        />

        <div className="absolute right-2 top-2 flex gap-2">
          <button
            onClick={() => onAddToCart(meal)}
            className="rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:bg-gray-100 active:scale-95"
            aria-label={`Add ${meal.mealName} to cart`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button
            onClick={() => onLike(meal)}
            className={`rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:bg-gray-100 active:scale-95 
              ${isLiked ? 'text-red-500' : 'text-gray-500'}
              ${isPending ? 'animate-pulse' : ''}`}
            disabled={isPending}
            aria-label={isLiked ? `Unlike ${meal.mealName}` : `Like ${meal.mealName}`}
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{meal.mealName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{meal.category}</p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{meal.description}</p>
        <p className="mt-4 text-lg font-bold text-primary">₦{meal.price.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}

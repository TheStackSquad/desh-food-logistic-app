"use client";

import React from "react";
import { Heart } from "lucide-react";

const RestaurantCard = ({ name, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <div className="flex space-x-2">
          {/* Red Heart for Normal Like */}
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          {/* Purple Heart for Super Like */}
          <Heart className="w-5 h-5 text-purple-500 fill-purple-500" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">
          <span className="font-bold">Rating:</span> {rating} / 5
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;

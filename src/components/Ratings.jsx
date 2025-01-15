"use client";

import React from "react";
import RestaurantCard from "@/components/RestaurantCard";

const Restaurant = () => {
  const [restaurants, setRestaurants] = React.useState([
    { id: 1, name: "Joe's Diner", ratings: [5, 5, 5, 4, 5] },
    { id: 2, name: "Pizza Palace", ratings: [2, 2, 2, 2, 5] },
    { id: 3, name: "Sushi Stop", ratings: [4, 4, 3, 4, 4] },
    { id: 4, name: "Burger Bliss", ratings: [5, 5, 4, 5, 5] },
    { id: 5, name: "Taco Town", ratings: [3, 3, 4, 3, 4] },
    { id: 6, name: "Pasta Point", ratings: [4, 5, 4, 5, 4] },
    { id: 7, name: "Vegan Vibes", ratings: [5, 4, 5, 5, 5] },
  ]);

  const getModeRating = (ratings) => {
    const frequency = {};
    let maxFreq = 0;
    let modeRating = ratings[0];

    ratings.forEach((rating) => {
      frequency[rating] = (frequency[rating] || 0) + 1;
      if (frequency[rating] > maxFreq) {
        maxFreq = frequency[rating];
        modeRating = rating;
      }
    });

    return modeRating;
  };

  const sortedRestaurants = [...restaurants].sort(
    (a, b) => getModeRating(b.ratings) - getModeRating(a.ratings)
  );

  return (
    <div className="container mx-auto px-4 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sortedRestaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          name={restaurant.name}
          rating={getModeRating(restaurant.ratings)}
        />
      ))}
    </div>
  );
};

export default Restaurant;

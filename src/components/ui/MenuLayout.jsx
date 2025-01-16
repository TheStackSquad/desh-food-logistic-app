// src/components/ui/MenuLayout.jsx
'use client';

// Core React and Redux imports
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRecent } from '@/reduxStore/actions/authActions';

// UI Component imports
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

// Constants
const VENDOR_TYPES = [
  { value: 'all', label: 'All Vendors' },
  { value: 'Ice Cream', label: 'Ice Cream' },
  { value: 'Alcohol Beverages', label: 'Alcohol Beverages' },
  { value: 'Chinese Cuisines', label: 'Asian Cuisines' },
  { value: 'African Food', label: 'Traditional' },
  { value: 'Bakery Delight', label: 'Bakery Delight' },
];

// Custom hook for fetching meals
const useMeals = (selectedType) => {
  const [state, setState] = useState({
    meals: [],
    loading: false,
    error: null,
  });

  // Fetch meals from API
  const fetchMeals = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(`/api/Menu?category=${selectedType}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setState({ meals: data, loading: false, error: null });
    } catch (error) {
      console.error(error);
      setState((prev) => ({
        ...prev,
        error: 'Failed to load meals',
        loading: false,
      }));
    }
  }, [selectedType]);
  
  // Trigger fetch on type change
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  
  return state;
};

// Meal Card Component
const MealCard = ({ meal, onLike, isLiked, isPending, onAddToCart }) => (
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

// Main MenuLayout Component
export default function MenuLayout() {
  // Redux hooks
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const recentItems = useSelector((state) => state.auth.user?.recent || []);

  // Local state
  const [selectedType, setSelectedType] = useState('all');
  const [pendingLikes, setPendingLikes] = useState(new Set());
  
  // Custom hook for meals data
  const { meals, loading, error } = useMeals(selectedType);

  // Callbacks for user actions
  const handleLikeToggle = useCallback(async (meal) => {
    if (!user?.username) {
      toast.error('Please log in to save favorites');
      return;
    }

    setPendingLikes((prev) => new Set([...prev, meal._id]));

    try {
      await dispatch(toggleRecent(meal));
      toast.success(
        isLiked(meal._id)
          ? 'Removed from favorites'
          : 'Added to favorites'
      );
    } catch (error) {
      console.error(error);
    } finally {
      setPendingLikes((prev) => {
        const updated = new Set(prev);
        updated.delete(meal._id);
        return updated;
      });
    }
  }, [dispatch, user, isLiked]);

  const isLiked = useCallback(
    (mealId) => recentItems.some((item) => item._id === mealId),
    [recentItems]
  );

    //eslint-disable-next-line
  const handleAddToCart = useCallback((meal) => {
    // Implement cart logic here
 //   console.log('Adding to cart:', meal);
  }, []);

  // Rendering helpers
  const renderMealCard = useCallback((meal) => (
    <MealCard
      key={meal._id}
      meal={meal}
      onLike={handleLikeToggle}
      isLiked={isLiked(meal._id)}
      isPending={pendingLikes.has(meal._id)}
      onAddToCart={handleAddToCart}
    />
  ), [handleLikeToggle, isLiked, pendingLikes, handleAddToCart]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Select onValueChange={setSelectedType} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select vendor type" />
          </SelectTrigger>
          <SelectContent>
            {VENDOR_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <section>
        <h2 className="mb-6 text-2xl font-bold">
          {selectedType === 'all' ? 'All Vendors' : `Vendors in ${selectedType}`}
        </h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {meals.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No meals found in this category.
              </p>
            ) : (
              meals.map(renderMealCard)
            )}
          </div>
        )}
      </section>
    </div>
  );
}
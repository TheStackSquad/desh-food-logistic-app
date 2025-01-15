// src/components/object/vendorData.jsx
import { Pizza,
  Coffee,
  Utensils,
  ShoppingBag,
  Salad,
  IceCream } from 'lucide-react';

export const vendorData = {
  liTags: [
    {
      id: 1,
      title: "Fast Food",
      icon: IceCream,
      headerText: "Quick Meals",
      content: "Speedy and delicious fast food options",
      features: [
        "15-minute delivery guarantee",
        "Combo meal discounts",
        "Special lunch hour deals"
      ]
    },
    {
      id: 2,
      title: "Local Dishes",
      icon: Utensils,
      headerText: "Traditional Flavors",
      content: "Authentic local cuisine made fresh",
      features: [
        "Daily specials rotation",
        "Family-size portions available",
        "Traditional recipe guarantee"
      ]
    },
    {
      id: 3,
      title: "Beverages",
      icon: Coffee,
      headerText: "Refreshing Drinks",
      content: "Wide selection of beverages",
      features: [
        "Hot and cold options",
        "Custom sweetness levels",
        "Premium coffee selection"
      ]
    },
    {
      id: 4,
      title: "Groceries",
      icon: ShoppingBag,
      headerText: "Fresh Supplies",
      content: "Quality groceries delivered to you",
      features: [
        "Same-day delivery",
        "Fresh produce guarantee",
        "Bulk purchase discounts"
      ]
    },
    {
      id: 5,
      title: "Healthy Options",
      icon: Salad,
      headerText: "Nutritious Choices",
      content: "Healthy and balanced meal options",
      features: [
        "Calorie-counted meals",
        "Vegetarian friendly",
        "Organic ingredients"
      ]
    },
    {
      id: 6,
      title: "Specials",
      icon: Pizza,
      headerText: "Today's Specials",
      content: "Limited time offers and deals",
      features: [
        "Chef's special dishes",
        "Weekend promotions",
        "Seasonal offerings"
      ]
    }
  ]
};

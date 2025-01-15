//src/schemas/models/vendorSchemas/Meal.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const MealSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: [
      'Appetizers',
      'Main Courses',
      'Desserts',
      'Beverages',
      'Breakfast',
      'Lunch Specials',
      'Dinner Specials',
      'Vegetarian Options',
      'Vegan Options',
      'Kids\' Meals',
    ],
    message: '{VALUE} is not a valid category', // Custom error message
  },
  mealName: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL of the meal image
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: 'Price must be a positive number',
    },
    set: (value) => Number(value), // Automatically convert to number
  },
  priceDescription: { type: String },
  pack: { type: String },
  inStock: { type: Boolean, default: true },
});

export const Meal = mongoose.model('Meal', MealSchema);

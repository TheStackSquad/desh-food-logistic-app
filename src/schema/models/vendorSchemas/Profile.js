import mongoose from 'mongoose';

// Define vendor types as an enum to ensure data consistency
export const VENDOR_TYPES = {
  RESTAURANT: 'restaurant',
  GROCERY: 'grocery',
  SPICE: 'spice',
  BEVERAGE: 'beverage',
  CAFÉ: 'café',
  BAKERY: 'bakery',
  FARMER_MARKET: 'farmer_market',
  DELI: 'deli',
  FOOD_TRUCK: 'food_truck',
  JUICE_BAR: 'juice_bar',
  TEA_HOUSE: 'tea_house',
  WINE_SHOP: 'wine_shop',
  BREWERY: 'brewery',
  CATERING: 'catering',
  SNACK_VENDOR: 'snack_vendor',
};

const vendorProfileSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: [true, 'Please provide a full name'],
    },
    storeName: {
      type: String,
      required: [true, 'Please provide a store name'],
      unique: true,
    },
    storeDescription: {
      type: String,
    },
    vendorType: {
      type: String,
      required: [true, 'Please specify vendor type'],
      enum: {
        values: Object.values(VENDOR_TYPES),
        message: '{VALUE} is not a supported vendor type',
      },
    },
    address: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

export const VendorProfile = mongoose.model('VendorProfile', vendorProfileSchema);

export const VENDOR_TYPE_OPTIONS = Object.entries(VENDOR_TYPES).map(([key, value]) => ({
  label: key.toLowerCase().replace('_', ' '), // transforms "FOOD_TRUCK" to "food truck"
  value: value // keeps the original value like "food_truck"
}));
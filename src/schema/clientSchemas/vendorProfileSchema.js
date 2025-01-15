// src/schemas/vendorProfileSchema.js
'use client';

import * as Yup from 'yup';

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

export const vendorProfileSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('Full name is required')
    .min(2, 'Name too short'),
  storeName: Yup.string()
    .required('Store name is required')
    .min(2, 'Store name too short'),
  storeDescription: Yup.string(),
  vendorType: Yup.string()
    .required('Vendor type is required')
    .oneOf(Object.values(VENDOR_TYPES), 'Invalid vendor type selected'),
  address: Yup.string(),
  profilePic: Yup.mixed(),
  coverImage: Yup.mixed()
});

// Export vendor types for use in the form component
export const VENDOR_TYPE_OPTIONS = Object.entries(VENDOR_TYPES).map(([key, value]) => ({
  label: key.charAt(0) + key.slice(1).toLowerCase().replace('_', ' '),
  value: value
}));
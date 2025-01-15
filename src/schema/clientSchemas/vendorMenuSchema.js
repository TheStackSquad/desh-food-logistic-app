//src/schema/clientSchemas/vendorMenuSchema.js
import * as Yup from 'yup';

const vendorMenuSchema = Yup.object({
  mealName: Yup.string().required('Meal name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  priceDescription: Yup.string(),
  description: Yup.string().required('Description is required'),
  category: Yup.string()
    .required('Category is required')
    .oneOf(
      [
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
      'Invalid category'
    ),
  pack: Yup.string(),
  inStock: Yup.boolean().required('Stock status is required'),
  image: Yup.mixed()
    .nullable()
    .required('Image is required')
    .test('fileSize', 'File size too large', (value) => !value || value.size <= 5 * 1024 * 1024) // 5MB limit
    .test('fileType', 'Unsupported file format', (value) =>
      !value || ['image/jpeg', 'image/png'].includes(value.type)
    ),
});

export default vendorMenuSchema;

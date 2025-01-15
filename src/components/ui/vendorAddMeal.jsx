//src/components/ui/vendorAddMeal.jsx
'use client';

import React from 'react';
import { useFormik } from 'formik';
import vendorMenuSchema from '@/schema/clientSchemas/vendorMenuSchema';
import { useDispatch } from 'react-redux';
import { addMenuItem } from '@/reduxStore/actions/vendorActions';

const Menu = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      mealName: '',
      price: '',
      priceDescription: '',
      description: '',
      image: null,
      category: '',
      pack: '',
      inStock: true, // Default value
    },
    validationSchema: vendorMenuSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addMenuItem(values));
      resetForm(); // Reset the form after submission
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 bg-gray-100 rounded-lg shadow-lg space-y-4">
      <div>
        <label htmlFor="mealName" className="block text-sm font-medium text-gray-700">
          Meal Name
        </label>
        <input
          id="mealName"
          name="mealName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.mealName}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.mealName && formik.errors.mealName && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.mealName}</p>
        )}
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.price}</p>
        )}
      </div>
      <div>
        <label htmlFor="priceDescription" className="block text-sm font-medium text-gray-700">
          Price Description
        </label>
        <input
          id="priceDescription"
          name="priceDescription"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.priceDescription}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a category</option>
          <option value="Appetizers">Appetizers</option>
          <option value="Main Courses">Main Courses</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch Specials">Lunch Specials</option>
          <option value="Dinner Specials">Dinner Specials</option>
          <option value="Vegetarian Options">Vegetarian Options</option>
          <option value="Vegan Options">Vegan Options</option>
          <option value="Kids' Meals">Kids' Meals</option>
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="inStock" className="block text-sm font-medium text-gray-700">
          In Stock
        </label>
        <div className="flex items-center">
          <span
            className={`w-10 h-5 flex items-center bg-${formik.values.inStock ? 'green' : 'gray'}-400 rounded-full p-1 cursor-pointer`}
            onClick={() => formik.setFieldValue('inStock', !formik.values.inStock)}
          >
            <span
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                formik.values.inStock ? 'translate-x-5' : ''
              }`}
            ></span>
          </span>
          <span className="ml-2">{formik.values.inStock ? 'Yes' : 'No'}</span>
        </div>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
          className="mt-1 block w-full"
        />
        {formik.touched.image && formik.errors.image && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.image}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default Menu;

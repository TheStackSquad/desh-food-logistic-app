// src/Pages/Checkout.js
'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { checkoutSchema } from '@/schema/clientSchemas/checkoutSchema';
import { FaRegCreditCard, FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';
import Image from 'next/image';
import { getPaymentGateways, getAttributions } from '@/config/paymentGateway';
import '@/styles/uiStyle/payment.css';

const PaymentUI = () => {
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      expiryDate: '',
      securityCode: '',
      zipCode: '',
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      // Handle payment processing logic here
      console.log(values);
    },
  });

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const numeric = value.replace(/\D/g, '');
    const groups = numeric.match(/.{1,4}/g);
    return groups ? groups.join(' ') : numeric;
  };

  const gateways = getPaymentGateways();
  const attributions = getAttributions();
  

  return (
    <div className="paymentGrid min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h2>
        
        {/* Scan Card Button */}
        <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg mb-8 flex items-center justify-center gap-2 transition-colors duration-200">
          <FaCamera className="text-gray-500" />
          <span>Scan Card</span>
        </button>

        {/* Payment Gateways */}
        <div className="space-y-6">
      {/* Payment Gateway Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {gateways.map((gateway) => (
          <div 
            key={gateway.id}
            className="aspect-square rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 p-4 cursor-pointer"
          >
            <div className="relative w-full h-full">
              <Image
                src={gateway.imagePath}
                alt={gateway.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>

         {/* Attributions - Only shown in production */}
         {process.env.NODE_ENV === 'production' && attributions.length > 0 && (
        <div className="text-xs text-gray-500 mt-4">
          <p className="font-medium mb-1">Image Credits:</p>
          <ul className="space-y-1">
            {attributions.map((attribution, index) => (
              <li key={index}>
                <a 
                  href={attribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {attribution.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

        {/* Payment Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Card Number Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formatCardNumber(formik.values.cardNumber)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, '');
                  formik.setFieldValue('cardNumber', value);
                }}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.touched.cardNumber && formik.errors.cardNumber
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder="1234 5678 9012 3456"
              />
              <FaRegCreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {formik.touched.cardNumber && formik.errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.cardNumber}</p>
            )}
          </div>

          {/* Expiry Date and Security Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                {...formik.getFieldProps('expiryDate')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.touched.expiryDate && formik.errors.expiryDate
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder="MM/YY"
              />
              {formik.touched.expiryDate && formik.errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Security Code
              </label>
              <div className="relative">
                <input
                  type={showSecurityCode ? 'text' : 'password'}
                  name="securityCode"
                  {...formik.getFieldProps('securityCode')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.securityCode && formik.errors.securityCode
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } focus:border-transparent focus:outline-none focus:ring-2`}
                  placeholder="123"
                />
                <button
                  type="button"
                  onClick={() => setShowSecurityCode(!showSecurityCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showSecurityCode ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formik.touched.securityCode && formik.errors.securityCode && (
                <p className="mt-1 text-sm text-red-600">{formik.errors.securityCode}</p>
              )}
            </div>
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              {...formik.getFieldProps('zipCode')}
              className={`w-full px-4 py-3 rounded-lg border ${
                formik.touched.zipCode && formik.errors.zipCode
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:border-transparent focus:outline-none focus:ring-2`}
              placeholder="12345"
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.zipCode}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentUI;
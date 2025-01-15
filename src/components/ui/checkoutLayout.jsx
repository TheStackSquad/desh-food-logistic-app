'use client';
import React, { useState } from "react";
import Link from "next/link";

const CheckoutUI = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const isValidPhone = /^[0-9]{10,15}$/.test(formData.phone);
  const isValid = formData.name && isValidPhone && formData.address;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-200 hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>
            <p className="text-gray-500 italic">Your cart is empty.</p>
          </div>

          {/* Delivery Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Delivery Details</h2>
            <form className="space-y-6">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 peer placeholder-transparent"
                  placeholder="Name"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                >
                  Name
                </label>
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 peer placeholder-transparent"
                  placeholder="Phone"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="phone"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                >
                  Phone Number
                </label>
                {!isValidPhone && formData.phone && (
                  <p className="mt-1 text-sm text-red-500">Please enter a valid phone number.</p>
                )}
              </div>

              {/* Address */}
              <div className="relative">
                <input
                  type="text"
                  id="address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 peer placeholder-transparent"
                  placeholder="Address"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="address"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm"
                >
                  Delivery Address
                </label>
              </div>

              {/* Notes */}
              <div className="relative">
                <textarea
                  id="notes"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 min-h-[100px] resize-y"
                  placeholder="Delivery Notes (Optional)"
                  onChange={handleInputChange}
                />
              </div>

              {/* Proceed to Payment Button */}
              <Link href="/Payment" className="block">
                <button
                  disabled={!isValid}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                    transition-all duration-200
                    hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    disabled:bg-gray-400 disabled:cursor-not-allowed
                    shadow-md hover:shadow-lg"
                >
                  Proceed to Payment
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutUI;
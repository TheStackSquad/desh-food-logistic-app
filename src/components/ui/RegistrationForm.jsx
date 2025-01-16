 // src/components/ui/RegistrationForm.js
 'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import FormInput from '@/components/ui/FormInput';

const RegistrationForm = () => {
  const router = useRouter();
//  console.log('Form component rendered'); // Debug log

  const initialValues = {
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//    console.log('Form submission started', values); // Debug log
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
//      console.log('API Response:', data); // Debug log
        // Log the raw response for debugging
//      console.log('Raw response:', response);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Registration successful!');
      resetForm();
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error); // Debug log
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registerGrid">
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign Up Here!
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        // Note: validation schema will be imported from userSchema.js
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <label htmlFor="text">Username</label>
            <FormInput
              label="Username"
              name="username"
              type="text"
              id="username"
            />
            <label htmlFor="text">Address</label>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              id="email"
            />
            <label htmlFor="tel">Phone Number</label>
            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              id="phone"
            />
            <label htmlFor="text">Delivery Address</label>
            <FormInput
              label="Delivery Address"
              name="address"
              type="text"
              id="address"
            />
            <label htmlFor="password">City</label>
            <FormInput
              label="City/State"
              name="city"
              type="text"
              id="city"
            />
            <label htmlFor="password">Password</label>
            <FormInput
              label="Password"
              name="password"
              type="password"
              id="password"
            />
            <label htmlFor="password">Password</label>
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              id="confirmPassword"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-2 px-4 rounded-md text-white
                bg-blue-500 hover:bg-blue-600 transition-colors
                disabled:bg-blue-300 disabled:cursor-not-allowed
              `}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <span
                onClick={() => router.push('/Login')}
                onKeyDown={(e) =>
                  e.key === "Enter" && router.push("/Login")
                }
                role="button"
                tabIndex={0}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default RegistrationForm;
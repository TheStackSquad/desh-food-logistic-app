//src/components/ui/dashboardCard.jsx
"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

export const DashboardCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

export const DashboardCardContent = ({ children, className = '' }) => (
  <div className={`p-4 space-y-3 ${className}`}>
    {children}
  </div>
);

export const DashboardWrap = ({ children, className = '' }) => (
  <div className={`px-4 py-3 bg-gray-50 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

export const Modal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      {/* Modal Content */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                  Confirm Delete
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this menu item? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              disabled={isDeleting}
              onClick={onConfirm}
              className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm 
                ${isDeleting 
                  ? 'bg-red-300 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-500'} 
                sm:ml-3 sm:w-auto`}
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Deleting...
                </div>
              ) : (
                'Delete'
              )}
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={onClose}
              className={`mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                ${isDeleting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50'} 
                sm:mt-0 sm:w-auto`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
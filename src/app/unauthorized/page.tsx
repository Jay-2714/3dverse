"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowBack, Home } from '@mui/icons-material';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <Lock className="h-8 w-8 text-red-600" />
        </div>
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        
        {/* Message */}
        <p className="text-gray-600 mb-8">
          You don't have permission to access this resource. Please contact an administrator if you believe this is an error.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => router.back()}
            className="
              flex items-center justify-center px-4 py-2 
              border border-gray-300 rounded-md shadow-sm 
              text-sm font-medium text-gray-700 
              bg-white hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-colors duration-200
            "
          >
            <ArrowBack className="w-4 h-4 mr-2" />
            Go Back
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="
              flex items-center justify-center px-4 py-2 
              border border-transparent rounded-md shadow-sm 
              text-sm font-medium text-white 
              bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-colors duration-200
            "
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </button>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Error Code: 403 - Forbidden
          </p>
        </div>
      </div>
    </div>
  );
}

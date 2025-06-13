"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CheckCircle, Error, Email } from '@mui/icons-material';
import { authClient } from '@/lib/auth-client';

interface VerificationState {
  status: 'loading' | 'success' | 'error' | 'expired' | 'no-token';
  message: string;
}

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [verificationState, setVerificationState] = useState<VerificationState>({
    status: 'loading',
    message: 'Verifying your email...'
  });

  useEffect(() => {
    if (!token) {
      setVerificationState({
        status: 'no-token',
        message: 'No verification token provided. Please check your email for the verification link.'
      });
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      // Use Better Auth's verification API
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      if (response.ok) {
        setVerificationState({
          status: 'success',
          message: 'Your email has been successfully verified! You can now sign in.'
        });
        toast.success('Email verified successfully!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login?verified=true');
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 400 || response.status === 410) {
          setVerificationState({
            status: 'expired',
            message: 'Verification link has expired or is invalid. Please request a new verification email.'
          });
        } else {
          setVerificationState({
            status: 'error',
            message: errorData.message || 'Email verification failed. Please try again.'
          });
        }
        toast.error(errorData.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationState({
        status: 'error',
        message: 'Network error occurred. Please check your connection and try again.'
      });
      toast.error('Verification failed due to network error');
    }
  };

  const resendVerification = () => {
    // Redirect to register page where user can request new verification
    router.push('/register?resend=true');
  };

  const renderContent = () => {
    switch (verificationState.status) {
      case 'loading':
        return (
          <div className="text-center">
            <LoadingSpinner message="Verifying your email..." />
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600 mb-8">
              {verificationState.message}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Redirecting you to login page in a few seconds...
            </p>
            <button
              onClick={() => router.push('/login?verified=true')}
              className="
                px-6 py-3 border border-transparent rounded-md shadow-sm 
                text-sm font-medium text-white bg-green-600 hover:bg-green-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                transition-colors duration-200
              "
            >
              Continue to Login
            </button>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
              <Email className="h-8 w-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Verification Link Expired
            </h1>
            <p className="text-gray-600 mb-8">
              {verificationState.message}
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
              <button
                onClick={resendVerification}
                className="
                  px-6 py-3 border border-transparent rounded-md shadow-sm 
                  text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transition-colors duration-200
                "
              >
                Get New Verification Link
              </button>
              <button
                onClick={() => router.push('/login')}
                className="
                  px-6 py-3 border border-gray-300 rounded-md shadow-sm 
                  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transition-colors duration-200
                "
              >
                Back to Login
              </button>
            </div>
          </div>
        );

      case 'no-token':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
              <Email className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verification
            </h1>
            <p className="text-gray-600 mb-8">
              {verificationState.message}
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
              <button
                onClick={() => router.push('/register')}
                className="
                  px-6 py-3 border border-transparent rounded-md shadow-sm 
                  text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transition-colors duration-200
                "
              >
                Create Account
              </button>
              <button
                onClick={() => router.push('/login')}
                className="
                  px-6 py-3 border border-gray-300 rounded-md shadow-sm 
                  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transition-colors duration-200
                "
              >
                Sign In Instead
              </button>
            </div>
          </div>
        );

      case 'error':
      default:
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <Error className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-8">
              {verificationState.message}
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
              <button
                onClick={() => token && verifyEmail(token)}
                disabled={!token}
                className="
                  px-6 py-3 border border-transparent rounded-md shadow-sm 
                  text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-200
                "
              >
                Retry Verification
              </button>
              <button
                onClick={() => router.push('/register')}
                className="
                  px-6 py-3 border border-gray-300 rounded-md shadow-sm 
                  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transition-colors duration-200
                "
              >
                Register Again
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <LoadingSpinner message="Loading verification page..." />
          </div>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}

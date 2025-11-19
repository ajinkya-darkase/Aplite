"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Apply purple gradient for forgot password page
  React.useEffect(() => {
    document.body.classList.add('home-gradient');
    return () => {
      document.body.classList.remove('home-gradient');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // TODO: Implement forgot password API call
      // const response = await authApi.forgotPassword(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Password reset link has been sent to your email.');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      setError(err.response?.data?.message || err.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-[70vh] items-center justify-center m-8 py-8 sm:my-8 md:my-8">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 w-full">
            {/* Logo and Title */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <Image 
                  src="/brand/Aplite-Logo-dark.svg" 
                  width={120} 
                  height={32} 
                  alt="Aplite" 
                  className="h-12" 
                />
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password</h2>
              <p className="text-sm text-slate-600">
                Enter your email address and we&apos;ll send you a link to reset your password
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0A1544] text-white py-3 rounded-lg font-medium hover:bg-[#101B5B] transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {isLoading ? 'Sending...' : 'Verify'}
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center">
              <button
                onClick={() => router.push('/login')}
                className="text-sm text-[#0A1544] font-semibold hover:underline"
              >
                Back to Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

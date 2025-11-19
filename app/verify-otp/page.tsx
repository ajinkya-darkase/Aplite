"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const { registrationEmail, clearRegistrationData } = useAuthStore();

  // Apply purple gradient
  React.useEffect(() => {
    document.body.classList.add('home-gradient');
    return () => {
      document.body.classList.remove('home-gradient');
    };
  }, []);

  // Redirect if no email in store
  useEffect(() => {
    if (!registrationEmail) {
      router.push('/get-started');
    }
  }, [registrationEmail, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await authApi.verifyOtp(registrationEmail, otp);
      
      if (response.status === 'success' || response.success) {
        setSuccess('Email verified successfully! Redirecting to login...');
        clearRegistrationData();
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      setError(err.response?.data?.message || err.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!registrationEmail) {
    return null;
  }

  return (
    <>
      <div className="flex min-h-[70vh] items-center justify-center py-8">
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
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Email</h2>
              <p className="text-sm text-slate-600">
                We&apos;ve sent a verification code to <span className="font-semibold">{registrationEmail}</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                <p className="mt-2 text-xs text-slate-500 text-center">
                  Enter the 6-digit code sent to your email
                </p>
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
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-[#0A1544] text-white py-3 rounded-lg font-medium hover:bg-[#101B5B] transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>

            {/* Back to Registration */}
            <div className="text-center">
              <button
                onClick={() => router.push('/get-started')}
                className="text-sm text-[#0A1544] font-semibold hover:underline"
              >
                Back to Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

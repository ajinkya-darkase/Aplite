"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useAuthStore } from '@/lib/store/authStore';

interface VerifyOtpProps {
  onBack?: () => void;
  mode?: 'registration' | 'password-reset';
  email?: string;
  onPasswordResetSuccess?: (otp: string) => void;
}

export default function VerifyOtp({ onBack, mode = 'registration', email: propEmail, onPasswordResetSuccess }: VerifyOtpProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const router = useRouter();
  
  const { registrationEmail, verifyOtp, resendOtp, isLoading } = useAuthStore();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Use propEmail for password reset, registrationEmail for registration
  const emailToUse = mode === 'password-reset' ? propEmail : registrationEmail;

  // Apply purple gradient
  React.useEffect(() => {
    document.body.classList.add('home-gradient');
    return () => {
      document.body.classList.remove('home-gradient');
    };
  }, []);

  // Redirect if no email in store (only for registration mode)
  useEffect(() => {
    if (mode === 'registration' && !registrationEmail) {
      router.push('/get-started');
    }
  }, [registrationEmail, router, mode]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const digits = pastedData.split('').filter(char => /^\d$/.test(char));
    
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const lastIndex = Math.min(digits.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    if (!emailToUse) {
      setError('Email is required');
      return;
    }

    if (mode === 'password-reset') {
      // For password reset, just pass the OTP to the next step
      // The actual verification will happen when changing the password
      setSuccess('OTP entered successfully!');
      
      // Call the success callback with the OTP
      if (onPasswordResetSuccess) {
        setTimeout(() => {
          onPasswordResetSuccess(otpString);
        }, 500);
      }
    } else {
      // Handle registration OTP verification
      const success = await verifyOtp(emailToUse, otpString);
      
      if (success) {
        setSuccess('Email verified successfully! Redirecting to login...');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        // Error is already set in the store
        const storeError = useAuthStore.getState().error;
        setError(storeError || 'Invalid OTP. Please try again.');
      }
    }
  };

  const handleResendCode = async () => {
    if (!canResend || !emailToUse) return;
    
    setError('');
    setResendMessage('');
    
    if (mode === 'password-reset') {
      // Handle password reset OTP resend
      try {
        const { authApi } = await import('@/lib/api/auth');
        const response = await authApi.resendOtpResetPassword(emailToUse);
        
        // Check for success response with message and email
        if (response.message && response.email) {
          setResendMessage('OTP sent to your email for password reset!');
          setResendTimer(30);
          setCanResend(false);
          // Clear OTP inputs
          setOtp(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setResendMessage('');
          }, 3000);
        } else {
          setError('Failed to resend OTP. Please try again.');
        }
      } catch (error) {
        console.error('Resend OTP error:', error);
        const err = error as { response?: { data?: { message?: string } }; message?: string };
        setError(err.response?.data?.message || err.message || 'Failed to resend OTP. Please try again.');
      }
    } else {
      // Handle registration OTP resend
      const success = await resendOtp(emailToUse);
      
      if (success) {
        setResendMessage('New OTP sent to your email!');
        setResendTimer(30);
        setCanResend(false);
        // Clear OTP inputs
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setResendMessage('');
        }, 3000);
      } else {
        const storeError = useAuthStore.getState().error;
        setError(storeError || 'Failed to resend OTP. Please try again.');
      }
    }
  };

  if (!emailToUse) {
    return null;
  }

  return (
    <div className="flex min-h-screen md:min-h-[70vh] items-center justify-center p-4 md:py-8">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-200 w-full">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <Image 
              src="/brand/Aplite-Logo-dark.svg" 
              width={120} 
              height={32} 
              alt="Aplite" 
              className="h-10 md:h-12" 
            />
          </div>

          {/* Title and Description */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              Verify your email
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              We sent a 6-digit verification code to your email
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Boxes */}
            <div className="flex gap-2 md:gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  autoComplete="off"
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-xl md:text-2xl font-semibold border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-[#0A1544] outline-none transition-all"
                />
              ))}
            </div>

            {/* Resend Code */}
            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="text-sm text-[#0A1544] hover:text-[#101B5B] underline font-medium disabled:opacity-50"
                >
                  Resend code
                </button>
              ) : (
                <p className="text-sm text-slate-600">
                  Resend code in <span className="font-semibold text-[#0A1544]">{resendTimer}s</span>
                </p>
              )}
            </div>

            {/* Resend Success Message */}
            {resendMessage && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm text-center">
                {resendMessage}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-orange-50 border border-orange-300 text-orange-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full bg-[#0A1544] text-white py-3 md:py-4 rounded-lg font-medium hover:bg-[#101B5B] transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoading ? 'Verifying...' : 'Continue'}
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={() => onBack ? onBack() : router.push('/get-started')}
              className="w-full bg-transparent border-2 border-slate-300 text-slate-700 py-3 md:py-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

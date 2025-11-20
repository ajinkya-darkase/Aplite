"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Eye, EyeOff } from 'lucide-react';

interface ChangePasswordProps {
  email: string;
  otp: string;
  onBack?: () => void;
  mode?: 'forgot-password' | 'authenticated';
}

export default function ChangePassword({ email, otp, onBack, mode = 'forgot-password' }: ChangePasswordProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const { authApi } = await import('@/lib/api/auth');
      
      if (mode === 'forgot-password') {
        // Use verify-otp-reset-password endpoint for forgot password flow
        const response = await authApi.verifyOtpResetPassword(email, otp, newPassword);

        // Check for success response with message and email
        if (response.message && response.email) {
          setSuccess('Password reset successfully! Redirecting to login...');
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          setError('Failed to reset password. Please try again.');
        }
      } else {
        // Use change-password endpoint for authenticated users
        const response = await authApi.changePassword(email, newPassword, otp);

        if (response.message) {
          setSuccess('Password changed successfully!');
        } else {
          setError('Failed to change password. Please try again.');
        }
      }
    } catch (error) {
      console.error('Change password error:', error);
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      setError(err.response?.data?.message || err.message || 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              Change Password
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Enter your new password below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A1544] text-white py-3 md:py-4 rounded-lg font-medium hover:bg-[#101B5B] transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoading ? 'Changing Password...' : 'Change Password'}
            </button>

            {/* Back Button */}
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-full bg-transparent border-2 border-slate-300 text-slate-700 py-3 md:py-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

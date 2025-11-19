"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { setRegistrationData, setLoading, isLoading } = useAuthStore();

  // Apply purple gradient for get-started page
  React.useEffect(() => {
    document.body.classList.add('home-gradient');
    return () => {
      document.body.classList.remove('home-gradient');
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.register(formData);
      
      if (response.status === 'success' || response.success) {
        // Store registration data in Zustand
        setRegistrationData(formData);
        
        // Redirect to OTP verification page
        router.push('/verify-otp');
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[70vh] md:h-[70vh] items-center justify-center p-8">
      <div className="w-full max-w-xl md:h-full flex items-center my-4 md:my-0">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-200 md:h-full w-full flex flex-col justify-center max-h-[90vh] md:max-h-full overflow-y-auto">
          <div className="text-center mb-3 md:mb-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
              <h1 className="text-xl md:text-3xl font-bold text-slate-900">
                Get Started with
              </h1>
              <Image src="/brand/Aplite-Logo-dark.svg" width={120} height={32} alt="Aplite" className="h-8 md:h-12" />
            </div>
            <p className="text-xs md:text-sm text-slate-600 px-2">
              Join thousands of businesses protecting their payments with verified banking information. Fill out the form below and we&apos;ll get you set up.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6 mb-3 md:mb-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <div>
                <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 md:py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 md:py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 md:py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 md:py-3 pr-12 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A1544] text-white py-2.5 md:py-3 text-sm md:text-base rounded-lg font-medium hover:bg-[#101B5B] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoading ? 'Sending OTP...' : 'Register'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-xs md:text-sm text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-[#0A1544] font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

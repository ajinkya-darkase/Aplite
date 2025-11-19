"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
import { authApi } from '@/lib/api/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Apply purple gradient for login page
  React.useEffect(() => {
    document.body.classList.add('home-gradient');
    return () => {
      document.body.classList.remove('home-gradient');
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);
      
      if (response.status === 'success' || response.success) {
        // TODO: Replace with your actual redirect URL
        // For external URL:
        // window.location.href = 'https://your-dashboard-url.com';
        
        // For internal route (uncomment when ready):
        router.push('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    <div className="flex h-[70vh] items-center justify-center m-8 py-8 sm:my-8 md:my-8">
      <div className="w-full max-w-xl h-full flex items-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 h-full w-full flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Image src="/brand/Aplite-Logo-dark.svg" width={120} height={32} alt="Aplite" className="h-12" />
              {/* <h1 className="text-2xl font-bold text-slate-900">Aplite Admin</h1> */}
            </div>
            
            <p className="text-sm text-slate-600 mt-2">Sign in to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
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
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="text-sm text-[#0A1544] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
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
              {isLoading ? 'logging In...' : 'log In'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => router.push('/get-started')}
                className="text-[#0A1544] font-semibold hover:underline"
              >
                Get Started
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

"use client";

import HeroSec from "@/components/sections/HeroSec";
import BlankCard from "@/components/ui/BlankCard";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Image from "next/image";
// import { useAuth } from '@/lib/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const { login } = useAuth();

  // Apply purple gradient for login page
  React.useEffect(() => {
    document.body.classList.add('home-gradient');
    return () => {
      document.body.classList.remove('home-gradient');
    };
  }, []);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   try {
  //     await login(email, password);
  //     router.push('/dashboard');
  //   } catch (error: any) {
  //     setError(error.message || 'Login failed');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <>
    {/* <div className="flex items-center justify-center">
    <HeroSec
        subtitle="aplite"
        title="Welcome Back"
        buttonLabel=""
    />
    </div> */}
    {/* <BlankCard>
      <div className="flex text-center">
        <h1>Welcome Back</h1>
      </div>
    </BlankCard> */}
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image src="/brand/Aplite-Logo-dark.svg" width={120} height={32} alt="Aplite" className="h-12" />
              {/* <h1 className="text-2xl font-bold text-slate-900">Aplite Admin</h1> */}
            </div>
            
            <p className="text-sm text-slate-600 mt-2">Sign in to access the dashboard</p>
          </div>

          <form className="space-y-5">
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
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

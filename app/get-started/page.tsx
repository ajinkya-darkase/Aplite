"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Building2, Phone } from 'lucide-react';
import Image from 'next/image';

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyName: '',
    phoneNumber: '',
    description: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    setIsLoading(true);
    // Add your form submission logic here
    console.log(formData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-slate-900">
                Get Started with
              </h1>
              <Image src="/brand/Aplite-Logo-dark.svg" width={120} height={32} alt="Aplite" className="h-12" />
            </div>
            <p className="text-sm text-slate-600">
              Join thousands of businesses protecting their payments with verified banking information. Fill out the form below and we'll get you set up.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="Acme Corp"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
            </div>

            {/* What best describes you */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">What best describes you?</label>
              <select
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all bg-white"
                required
              >
                <option value="">Select an option</option>
                <option value="business-owner">Accounts Payable Team</option>
                <option value="finance-manager">Accounts Recievable Team</option>
                <option value="accountant">Finance/Accounting Professional</option>
                <option value="procurement">Bank/Fintech</option>
                <option value="procurement">ERP/SOftware Provider</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* How can we help (Optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">How can we help? (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0A1544] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about your needs..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A1544] text-white py-3 rounded-lg font-medium hover:from-[#101B5B] hover:to-[#2563eb] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
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

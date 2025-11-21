"use client";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/get-started");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 md:p-12 max-w-2xl w-full mx-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>

        <div className="text-center">
          <div className="mb-10">
            <div className="w-20 h-20 bg-[#0A1544]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-[#0A1544]" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Sign in Required
            </h3>
            <p className="text-gray-600 text-lg">
              Please register or login to search for business information
            </p>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGetStarted}
              className="w-full bg-[#0A1544] text-white py-4 rounded-lg font-medium hover:bg-[#101B5B] transition-colors shadow-lg text-base"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-base"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
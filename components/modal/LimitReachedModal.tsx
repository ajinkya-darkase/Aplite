"use client";

import Modal from "./Modal";
import { Zap } from "lucide-react";

type LimitReachedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LimitReachedModal({ 
  isOpen, 
  onClose
}: LimitReachedModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      contentClassName="bg-white border border-slate-200"
      headerClassName="border-b border-slate-100 px-8 py-8 bg-white rounded-lg"
      bodyClassName="px-8 py-10"
      footerClassName="border-t border-slate-100 px-8 py-8 bg-white flex flex-col sm:flex-row gap-3"
      title={
        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <Zap className="text-indigo-600" size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Free Trial Limit Reached</h2>
            <p className="text-sm text-slate-600 mt-1">Continue your search with premium access</p>
          </div>
        </div>
      }
      description=""
    >
      <div className="space-y-6">
        {/* Status Info Box */}
        <div className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-200">
          <div className="flex-shrink-0 mt-0.5">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white text-sm font-bold">
              ✓
            </div>
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-slate-900">
              You&apos;ve maximized your free trial
            </p>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed">
              You&apos;ve explored all available search features with your free trial quota. Verify yourself to search and view multiple business details. Upgrade now to unlock unlimited business searches and continue your journey.
            </p>
          </div>
        </div>

        {/* Premium Benefits */}
        <div className="bg-blue-50 rounded-xl p-6 border border-indigo-200">
          <p className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-lg">⭐</span> With Premium Access, Get:
          </p>
          <div className="space-y-3">
            {[
              { icon: "🔍", title: "Unlimited Searches", desc: "Search as many businesses as you need" },
              { icon: "📊", title: "Advanced Analytics", desc: "Deep insights with detailed filters and reports" },
              { icon: "📥", title: "Export & Integrate", desc: "Download data and connect to your tools" }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-xl flex-shrink-0">{feature.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-end">
        <button
          onClick={onClose}
          className="px-6 py-3.5 text-sm font-medium text-slate-700 bg-white border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg transition-all duration-200 hover:shadow-md"
        >
          Maybe Later
        </button>
        <button
          onClick={() => window.open("https://aplite-vendor.vercel.app/login", "_blank")}
          className="px-6 py-3.5 text-base font-bold text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          style={{ backgroundColor: "#0a1544" }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          <span>✨ Start Premium Access</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </Modal>
  );
}

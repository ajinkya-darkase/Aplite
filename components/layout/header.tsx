"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/authStore";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const solutionsButtonRef = React.useRef<HTMLDivElement>(null);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setSolutionsOpen(true);
    if (solutionsButtonRef.current) {
      setDropdownPosition(solutionsButtonRef.current.offsetLeft);
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  };

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full px-2 md:px-4">
        <nav className={`flex h-24 items-center justify-between px-6 transition-all duration-300 md:px-10 ${
          isScrolled ? "rounded-b-3xl bg-white shadow-lg" : "bg-transparent"
        }`}>
          <Link href="/" className="flex items-center">
            <Image 
              src={isScrolled ? "/brand/Aplite-Logo-dark.svg" : "/brand/Aplite-logo.svg"}
              alt="Aplite Logo" 
              width={120} 
              height={32}
              className="h-8 w-auto"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className={`text-base font-semibold transition-transform hover:scale-110 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}>
              Home
            </Link>
            {/* <Link href="/product" className={`text-base font-semibold transition-transform hover:scale-110 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}>
              Product
            </Link> */}
            <div 
              className="relative" 
              ref={solutionsButtonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 text-base font-semibold transition-transform hover:scale-110 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Solutions
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <Link href="/pricing" className={`text-base font-semibold transition-transform hover:scale-110 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}>
              Pricing
            </Link>
            <Link href="/company" className={`text-base font-semibold transition-transform hover:scale-110 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}>
              About Us
            </Link>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated ? (
              <>
                <span className={`text-sm font-medium ${isScrolled ? "text-gray-900" : "text-white"}`}>
                  {user?.firstName || user?.email}
                </span>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleLogout}
                  className={isScrolled ? "!border-gray-900 !text-gray-900 hover:!bg-gray-100" : ""}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  asChild
                  className={isScrolled ? "!border-gray-900 !text-gray-900 hover:!bg-gray-100" : ""}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  asChild
                  className={`!bg-white !text-black ${
                    isScrolled ? "!border !border-gray-900" : "!border !border-white"
                  }`}
                >
                  <Link href="/get-started">Contact Us</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Backdrop Blur Overlay */}
      {solutionsOpen && (
        <div className="fixed inset-0 top-24 z-30 hidden backdrop-blur-sm md:block" />
      )}

      {/* Desktop Solutions Dropdown - Outside header */}
      {solutionsOpen && (
        <div
          className="fixed top-24 z-40 hidden md:block pt-3"
          style={{ left: `${dropdownPosition}px` }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Arrow/Notch */}
          <div className="relative ml-8 h-3">
            <div className="absolute top-0 left-0 h-6 w-6 rotate-45 bg-white border-l border-t border-gray-200 z-10"></div>
          </div>
          
          <div className="relative w-[600px] rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl -mt-[1px]">
            <div className="grid grid-cols-2 gap-3">
              {/* Left Column */}
              <div className="space-y-2">
                <Link
                  href="/solutions/ap-teams"
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <Image 
                      src="/navigation/payable.png" 
                      alt="AP Teams" 
                      width={40} 
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-0.5 text-sm font-semibold text-gray-900">Account Payable Teams</h3>
                    <p className="text-xs text-gray-500">Streamline AP workflows</p>
                  </div>
                </Link>
                
                <Link
                  href="/solutions/ar-teams"
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <Image 
                      src="/navigation/receivable.png" 
                      alt="AR Teams" 
                      width={40} 
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-0.5 text-sm font-semibold text-gray-900">Account Receivable Teams</h3>
                    <p className="text-xs text-gray-500">Accelerate collections</p>
                  </div>
                </Link>

                <Link
                  href="/solutions/banks-fintech"
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <Image 
                      src="/navigation/bank-fintech.png" 
                      alt="Banks & Fintech" 
                      width={40} 
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-0.5 text-sm font-semibold text-gray-900">Banks & Fintech</h3>
                    <p className="text-xs text-gray-500">Payment verification</p>
                  </div>
                </Link>
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <Link
                  href="/solutions/erp"
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <Image 
                      src="/navigation/erp.png" 
                      alt="ERP Systems" 
                      width={40} 
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-0.5 text-sm font-semibold text-gray-900">ERP Systems</h3>
                    <p className="text-xs text-gray-500">Integrate seamlessly</p>
                  </div>
                </Link>

                <Link
                  href="/solutions/invoicing"
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <Image 
                      src="/navigation/invoice.png" 
                      alt="Invoicing Software" 
                      width={40} 
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-0.5 text-sm font-semibold text-gray-900">Invoicing Software</h3>
                    <p className="text-xs text-gray-500">Verify before sending</p>
                  </div>
                </Link>

                <Link
                  href="/solutions/ai-agents"
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
                  onClick={() => setSolutionsOpen(false)}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <Image 
                      src="/navigation/ai.png" 
                      alt="AI Agents" 
                      width={40} 
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-0.5 text-sm font-semibold text-gray-900">AI Agents</h3>
                    <p className="text-xs text-gray-500">Automate with AI</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Slide-in Menu */}
          <div className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-sm animate-slide-in bg-background shadow-xl md:hidden">
            <div className="flex h-full flex-col overflow-y-auto">
              {/* Menu Header */}
              <div className="flex items-center justify-between border-b p-4">
                <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <Image 
                    src="/brand/Aplite-logo.svg" 
                    alt="Aplite Logo" 
                    width={120} 
                    height={32}
                    className="h-8 w-auto"
                  />
                </Link>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 space-y-1 p-4">
                <Link
                  href="/"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                {/* <Link
                  href="/product"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Product
                </Link> */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                  >
                    Solutions
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileSolutionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileSolutionsOpen && (
                    <div className="space-y-1 pl-3">
                      <Link
                        href="/solutions/ap-teams"
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        AP Teams
                      </Link>
                      <Link
                        href="/solutions/ar-teams"
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        AR Teams
                      </Link>
                      <Link
                        href="/solutions/banks-fintech"
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Banks & Fintech
                      </Link>
                      <Link
                        href="/solutions/erp"
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        ERP Systems
                      </Link>
                      <Link
                        href="/solutions/invoicing"
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Invoicing Software
                      </Link>
                      <Link
                        href="/solutions/ai-agents"
                        className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        AI Agents
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  href="/pricing"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/company"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>

              {/* Bottom Buttons */}
              <div className="border-t p-4">
                <div className="flex flex-col gap-3">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 text-sm font-medium">
                        {user?.firstName || user?.email}
                      </div>
                      <Button 
                        variant="secondary" 
                        onClick={handleLogout}
                        className="w-full justify-start"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="secondary" asChild className="w-full justify-start">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
                          Contact Us
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

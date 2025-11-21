"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SEARCH_EXAMPLES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import HeroSec from "@/components/sections/HeroSec";
import { useAuthStore } from "@/lib/store/authStore";
import SignUpModal from "../Modals/SignUpModal";

export function Hero() {
  const [placeholder, setPlaceholder] = useState(SEARCH_EXAMPLES[0]);
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const router = useRouter();
  
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SEARCH_EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlaceholder(SEARCH_EXAMPLES[index]);
  }, [index]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Show popup when user starts typing
    if (value.trim() && !isAuthenticated) {
      setShowSearchPopup(true);
    } else {
      setShowSearchPopup(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      if (!isAuthenticated) {
        router.push("/get-started");
      } else {
        // Handle search logic for authenticated users
        console.log("Searching for:", searchValue);
      }
    }
  };

  return (
    <>
      <HeroSec
        title="Pay the right business, every time."
        description="Instant access to verified business banking information — protect against fraud and errors."
        buttonLabel={!isAuthenticated ? "Get Started" : undefined}
        onButtonClick={!isAuthenticated ? () => router.push("/get-started") : undefined}
        centered={true}
      >
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="h-10 text-black sm:h-12 md:h-14 w-full rounded-xl border bg-background pl-9 sm:pl-10 md:pl-12 pr-4 text-sm sm:text-base shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </form>
      </HeroSec>

      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={showSearchPopup} 
        onClose={() => setShowSearchPopup(false)} 
      />
    </>
  );
}

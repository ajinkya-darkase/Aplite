"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SEARCH_EXAMPLES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import HeroSec from "@/components/sections/HeroSec";

export function Hero() {
  const [placeholder, setPlaceholder] = useState(SEARCH_EXAMPLES[0]);
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SEARCH_EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlaceholder(SEARCH_EXAMPLES[index]);
  }, [index]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchValue);
      // You can navigate to a search results page or perform search
    }
  };

  return (
    <HeroSec
      title="Pay the right business, every time."
      description="Instant access to verified business banking information — protect against fraud and errors."
      buttonLabel="Get Started"
      onButtonClick={() => router.push("/get-started")}
      centered={true}
    >
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative w-full">
        <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="h-10 text-black sm:h-12 md:h-14 w-full rounded-xl border bg-background pl-9 sm:pl-10 md:pl-12 pr-4 text-sm sm:text-base shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </form>
    </HeroSec>
  );
}

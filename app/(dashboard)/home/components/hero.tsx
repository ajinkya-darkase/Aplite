"use client";

import { useState, useEffect } from "react";
import { Search, Building2, MapPin, Calendar, Hash } from "lucide-react";
import { SEARCH_EXAMPLES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import HeroSec from "@/components/sections/HeroSec";
import { useAuthStore } from "@/lib/store/authStore";
import { useSearchStore } from "@/lib/store/searchStore";
import { useDebounce } from "@/lib/useDebounce";
import { apiClient } from "@/lib/api";
import SignUpModal from "../Modals/SignUpModal";

export function Hero() {
  const [placeholder, setPlaceholder] = useState(SEARCH_EXAMPLES[0]);
  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const router = useRouter();
  
  const { isAuthenticated } = useAuthStore();
  const { searchResults, isSearching, setSearchResults, setIsSearching, clearResults } = useSearchStore();
  const debouncedSearchValue = useDebounce(searchValue, 300);

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
    
    if (value.trim() && !isAuthenticated) {
      setShowSearchPopup(true);
    } else {
      setShowSearchPopup(false);
    }
    
    if (!value.trim()) {
      clearResults();
    }
  };

  const performSearch = async (query: string) => {
    if (!query.trim() || !isAuthenticated) return;
    
    setIsSearching(true);
    try {
      const results = await apiClient.searchBusiness(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/get-started");
    }
  };

  useEffect(() => {
    if (debouncedSearchValue && isAuthenticated) {
      performSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue, isAuthenticated]);

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
        
        {/* Search Results */}
        {isAuthenticated && searchValue && (isSearching || searchResults.length > 0) && (
          <div className="mt-4 bg-white rounded-lg shadow-lg border max-w-2xl mx-auto">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : (
              <div className="max-h-80 overflow-y-auto p-2">
                {searchResults.map((result) => (
                  <div 
                    key={result.applicationId} 
                    className="p-4 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer transition-colors group rounded-lg"
                    onClick={() => router.push(`/home/${result.applicationId}`)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <div className="font-semibold text-gray-900 group-hover:text-blue-700">{result.legalName}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Hash className="w-3 h-3" />
                        <span>EIN: {result.ein}</span>
                      </div>
                      
                      {result.formationState && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>Formed in {result.formationState}</span>
                        </div>
                      )}
                      
                      {result.formationDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>Since {new Date(result.formationDate).getFullYear()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {searchResults.length === 0 && searchValue && (
                  <div className="p-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <Search className="w-8 h-8 mx-auto" />
                    </div>
                    <div className="text-gray-500 font-medium">No businesses found</div>
                    <div className="text-sm text-gray-400 mt-1">Try searching with a different name or PIN</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </HeroSec>

      {/* Sign Up Modal */}
      <SignUpModal 
        isOpen={showSearchPopup} 
        onClose={() => setShowSearchPopup(false)} 
      />
    </>
  );
}

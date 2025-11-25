import { create } from 'zustand';

interface SearchResult {
  applicationId: number;
  userId: number;
  legalName: string;
  ein: string;
  formationState: string | null;
  formationDate: string | null;
}

interface SearchStore {
  searchResults: SearchResult[];
  isSearching: boolean;
  searchQuery: string;
  setSearchResults: (results: SearchResult[]) => void;
  setIsSearching: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchResults: [],
  isSearching: false,
  searchQuery: '',
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (loading) => set({ isSearching: loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearResults: () => set({ searchResults: [], searchQuery: '' }),
}));
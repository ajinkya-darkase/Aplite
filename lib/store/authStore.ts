import { create } from 'zustand';
import { User, Company } from '@/types/api';

interface AuthState {
  // User data
  user: User | null;
  company: Company | null;
  
  // Registration flow
  registrationEmail: string;
  registrationData: {
    firstName: string;
    lastName: string;
    workEmail: string;
    password: string;
  } | null;
  
  // Loading states
  isLoading: boolean;
  
  // Error handling
  error: string | null;
  
  // Actions
  setUser: (user: User, company: Company) => void;
  clearUser: () => void;
  
  setRegistrationData: (data: { firstName: string; lastName: string; workEmail: string; password: string }) => void;
  setRegistrationEmail: (email: string) => void;
  clearRegistrationData: () => void;
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  company: null,
  registrationEmail: '',
  registrationData: null,
  isLoading: false,
  error: null,
  
  // User actions
  setUser: (user, company) => {
    set({ user, company, error: null });
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('company', JSON.stringify(company));
    }
  },
  
  clearUser: () => {
    set({ user: null, company: null });
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('company');
    }
  },
  
  // Registration actions
  setRegistrationData: (data) => {
    set({ registrationData: data, registrationEmail: data.workEmail });
  },
  
  setRegistrationEmail: (email) => {
    set({ registrationEmail: email });
  },
  
  clearRegistrationData: () => {
    set({ registrationData: null, registrationEmail: '' });
  },
  
  // Loading and error actions
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),
}));

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authApi } from "@/lib/api/auth";
import { User, Company } from "@/types/api";

interface RegistrationData {
  firstName: string;
  lastName: string;
  workEmail: string;
  password: string;
}

interface AuthState {
  // Authentication state
  isAuthenticated: boolean;
  user: User | null;
  company: Company | null;
  accessToken: string | null;
  
  // Registration flow
  registrationEmail: string;
  registrationData: RegistrationData | null;
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string, companyId?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  
  register: (data: RegistrationData) => Promise<boolean>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  resendOtp: (email: string) => Promise<boolean>;
  
  setRegistrationData: (data: RegistrationData) => void;
  setRegistrationEmail: (email: string) => void;
  clearRegistrationData: () => void;
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      company: null,
      accessToken: null,
      registrationEmail: "",
      registrationData: null,
      isLoading: false,
      error: null,

      // Login action
      login: async (username, password, companyId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.login(username, password, companyId);
          
          // Check if we have access_token and user (direct response format)
          if (response.access_token && response.user) {
            console.log("Login successful");
            
            // Store token in localStorage for axios interceptor
            if (typeof window !== "undefined") {
              localStorage.setItem("access_token", response.access_token);
            }
            
            set({
              isAuthenticated: true,
              user: response.user,
              company: null, // Company data not in current response
              accessToken: response.access_token,
              isLoading: false,
              error: null,
            });
            
            return true;
          } 
          // Fallback to nested data format
          else if (response.status === "success" || response.success) {
            console.log("Login successful");
            
            set({
              isAuthenticated: true,
              user: response.data?.user ?? null,
              company: response.data?.company ?? null,
              accessToken: null,
              isLoading: false,
              error: null,
            });
            
            return true;
          } else {
            set({ 
              isLoading: false, 
              error: response.message || "Login failed" 
            });
            return false;
          }
        } catch (error) {
          console.error("Login error:", error);
          const err = error as { response?: { data?: { message?: string } }; message?: string };
          set({ 
            isLoading: false, 
            error: err.response?.data?.message || err.message || "Login failed" 
          });
          return false;
        }
      },

      // Logout action
      logout: async () => {
        try {
          await authApi.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Clear token from localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
          }
          
          set({
            isAuthenticated: false,
            user: null,
            company: null,
            accessToken: null,
            error: null,
          });
          
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      },

      // Register action
      register: async (data) => {
        set({ isLoading: true, error: null });
        
        try {
          // Transform workEmail to email for API
          const apiData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.workEmail,
            password: data.password,
          };
          
          const response = await authApi.register(apiData);
          console.log("Registration API response:", response);
          
          // Check if registration was successful
          // Backend returns message and email on success
          if (response.message && response.email) {
            console.log("Registration successful, OTP sent");
            
            set({
              registrationData: data,
              registrationEmail: data.workEmail,
              isLoading: false,
              error: null,
            });
            
            return true;
          } else {
            console.log("Registration failed:", response);
            set({ 
              isLoading: false, 
              error: response.message || "Registration failed" 
            });
            return false;
          }
        } catch (error) {
          console.error("Registration error:", error);
          const err = error as { response?: { data?: { message?: string } }; message?: string };
          set({ 
            isLoading: false, 
            error: err.response?.data?.message || err.message || "Registration failed" 
          });
          return false;
        }
      },

      // Verify OTP action
      verifyOtp: async (email, otp) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.verifyOtp(email, otp);
          console.log("OTP verification response:", response);
          
          // Backend returns access_token and user on success
          if (response.access_token && response.user) {
            console.log("OTP verified successfully");
            
            // Don't store auth data here - only after login
            set({
              isLoading: false,
              error: null,
            });
            
            // Clear registration data after successful verification
            get().clearRegistrationData();
            
            return true;
          } else {
            set({ 
              isLoading: false, 
              error: response.message || "Invalid OTP" 
            });
            return false;
          }
        } catch (error) {
          console.error("OTP verification error:", error);
          const err = error as { response?: { data?: { message?: string } }; message?: string };
          set({ 
            isLoading: false, 
            error: err.response?.data?.message || err.message || "OTP verification failed" 
          });
          return false;
        }
      },

      // Resend OTP action
      resendOtp: async (email) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.resendRegisterOtp(email);
          console.log("Resend OTP response:", response);
          
          // Check if resend was successful
          if (response.message && response.email) {
            console.log("OTP resent successfully");
            
            set({
              isLoading: false,
              error: null,
            });
            
            return true;
          } else {
            set({ 
              isLoading: false, 
              error: response.message || "Failed to resend OTP" 
            });
            return false;
          }
        } catch (error) {
          console.error("Resend OTP error:", error);
          const err = error as { response?: { data?: { message?: string } }; message?: string };
          set({ 
            isLoading: false, 
            error: err.response?.data?.message || err.message || "Failed to resend OTP" 
          });
          return false;
        }
      },

      // Registration data actions
      setRegistrationData: (data) => {
        set({ 
          registrationData: data, 
          registrationEmail: data.workEmail 
        });
      },

      setRegistrationEmail: (email) => {
        set({ registrationEmail: email });
      },

      clearRegistrationData: () => {
        set({ 
          registrationData: null, 
          registrationEmail: "" 
        });
      },

      // Loading and error actions
      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-session",
      storage: createJSONStorage(() => sessionStorage),
      // Keep only safe fields in storage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        company: state.company,
        accessToken: state.accessToken,
        registrationEmail: state.registrationEmail,
      }),
    }
  )
);

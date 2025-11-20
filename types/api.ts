export interface LoginPayload {
  email: string;
  password: string;
  loginidentity: number;
  company_id: number;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface Company {
  id: number;
  name: string;
  plan?: string;
  logo?: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ApiResponse<T = unknown> {
  status?: 'success' | 'error';
  message?: string;
  data?: T;
  success?: boolean;
  email?: string; // For registration and forgot-password response
  access_token?: string; // For OTP verification response
  token_type?: string;
  expires_in?: number; // For login response (seconds)
  expiresIn?: number; // For forgot-password OTP expiry (seconds)
  expiryInSeconds?: number; // For resend-otp-reset-password OTP expiry (seconds)
  user?: User;
  [key: string]: any; // Allow additional properties
}
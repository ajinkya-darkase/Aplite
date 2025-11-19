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

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  success?: boolean; // Some APIs might use this
}
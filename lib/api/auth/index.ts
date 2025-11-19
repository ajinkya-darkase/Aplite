import sharedApiClient from '../../shared/axios.config';
import { ApiResponse, User, Company } from '../../../types/api';

export const authApi = {
    // Register - sends OTP to email
    register: async (data: {
        firstName: string;
        lastName: string;
        workEmail: string;
        password: string;
    }): Promise<ApiResponse<{ message: string }>> => {
        const response = await sharedApiClient.post('/auth/register', {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.workEmail,
            password: data.password,
        });
        return response.data;
    },

    // Verify OTP
    verifyOtp: async (email: string, otp: string): Promise<ApiResponse<{ message: string }>> => {
        const response = await sharedApiClient.post('/auth/verify-otp', {
            email,
            otp,
        });
        return response.data;
    },

    // Login
    login: async (username: string, password: string, companyId?: string): Promise<ApiResponse<{ user: User; company: Company }>> => {
        const loginPayload = {
            username,
            password,
            loginidentity: 1,
            company_id: companyId ? parseInt(companyId) : 10156
        };

        const response = await sharedApiClient.post('/auth/login', loginPayload);
        return response.data;
    },

    // Logout
    logout: async (): Promise<ApiResponse> => {
        const response = await sharedApiClient.get('/logout', { withCredentials: false });

        if (typeof document !== 'undefined') {
            document.cookie = 'SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

        return response.data;
    },

    // Refresh token
    refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
        const response = await sharedApiClient.post('/refresh-token');
        return response.data;
    },

    // Verify token
    verifyToken: async (): Promise<ApiResponse<{ valid: boolean }>> => {
        const response = await sharedApiClient.get('/verify-token');
        return response.data;
    },
};

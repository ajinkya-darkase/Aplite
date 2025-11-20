import sharedApiClient from '../../shared/axios.config';
import { ApiResponse, User, Company, RegisterPayload, VerifyOtpPayload } from '../../../types/api';

export const authApi = {
    // Register - sends OTP to email
    register: async (data: RegisterPayload): Promise<ApiResponse<{ message: string }>> => {
        const payload = {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
        };
        
        const response = await sharedApiClient.post('/auth/register', payload);
        console.log("Registration response:", response);
        return response.data;
    },

    // Verify OTP
    verifyOtp: async (email: string, otp: string): Promise<ApiResponse<{ message: string }>> => {
        const payload: VerifyOtpPayload = { email, otp };
        const response = await sharedApiClient.post('/auth/verify-otp', payload);
        return response.data;
    },

    // Resend OTP
    resendRegisterOtp: async (email: string): Promise<ApiResponse<{ message: string }>> => {
        const response = await sharedApiClient.post('/auth/resend-register-otp', { email });
        console.log("Resend OTP response:", response);
        return response.data;
    },

    // Login
    login: async (email: string, password: string): Promise<ApiResponse<{ user: User; company: Company }>> => {
        const loginPayload = {
            email,
            password,
        };

        const response = await sharedApiClient.post('/auth/login', loginPayload);
        return response.data;
    },

    // Logout
    logout: async (): Promise<ApiResponse> => {
        const response = await sharedApiClient.post('/auth/logout');

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

    // Forgot Password - sends OTP to email
    forgotPassword: async (email: string): Promise<ApiResponse<{ message: string }>> => {
        const response = await sharedApiClient.post('/auth/forgot-password', { email });
        return response.data;
    },

    // Verify OTP and reset password (combined in one step)
    verifyOtpResetPassword: async (email: string, otp: string, newPassword: string): Promise<ApiResponse<{ message: string }>> => {
        const response = await sharedApiClient.post('/auth/verify-otp-reset-password', { 
            email, 
            otp,
            newPassword 
        });
        return response.data;
    },

    // Resend OTP for password reset
    resendOtpResetPassword: async (email: string): Promise<ApiResponse<{ message: string }>> => {
        const response = await sharedApiClient.post('/auth/resend-otp-reset-password', { email });
        return response.data;
    },

    // Change Password
    changePassword: async (email: string, newPassword: string, otp: string): Promise<ApiResponse<{ message: string }>> => {
        const response = await sharedApiClient.post('/auth/change-password', { 
            email, 
            newPassword,
            otp 
        });
        return response.data;
    },
};

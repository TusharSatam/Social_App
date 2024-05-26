import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://social-media-11p4.onrender.com/auth'; // Replace with your actual backend API URL

// Define types for credentials and userData


interface Credentials {
  email: string;
  password: string;
}

interface VerifyRegisterCredentials {
  otp: string;
  email:string;
  password:string;
}
// Define response types for each mutation endpoint
interface LoginResponse {
  token: string; // Adjust based on your actual response structure
  user: any; // Adjust based on your actual response structure
}

interface LogoutResponse {
  success: boolean; // Adjust based on your actual response structure
}

interface RegisterResponse {
  message: string; // Adjust based on your actual response structure
  user: any; // Adjust based on your actual response structure
}
interface SendForgotPassOTPRequest {
  email: string;
}
interface VerifyForgotPassOTPRequest {
  email: string;
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<any, Credentials>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyRegisterOTP: builder.mutation<any, VerifyRegisterCredentials>({
      query: (registerOTP) => ({
        url: '/verify-otp',
        method: 'POST',
        body: registerOTP,
      }),
    }),
    register: builder.mutation<any, Credentials>({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    sendForgotPassOTP: builder.mutation<any, SendForgotPassOTPRequest>({
      query: (request) => ({
        url: '/sendotp-password',
        method: 'POST',
        body: request,
      }),
    }),
    verifyForgotPassOTP: builder.mutation<any, VerifyForgotPassOTPRequest>({
      query: (request) => ({
        url: '/verifyOtp-password',
        method: 'POST',
        body: request,
      }),
    }),
  }),
});
// 
export const { useLoginMutation,useVerifyRegisterOTPMutation, useRegisterMutation,useSendForgotPassOTPMutation,useVerifyForgotPassOTPMutation  } = authApi;

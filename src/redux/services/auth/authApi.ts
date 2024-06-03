import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_URL = 'https://social-media-11p4.onrender.com/auth'; // Replace with your actual backend API URL

// Define types for credentials and userData

interface Credentials {
  email: string;
  password?: string;
}

interface VerifyRegisterCredentials {
  otp: string;
  email: string;
  password: string;
}
// Define response types for each mutation endpoint
interface GetUserDataType {
  token: string; // Adjust based on your actual response structure
}

interface SendForgotPassOTPRequest {
  email: string;
}
interface VerifyForgotPassOTPRequest {
  email: string;
}
interface ChangePassword {
  email: string;
  newPassword: string;
}
interface UpdateData {
  Name?: string;
  phone?: string;
  ProfilePicture?: string | null;
  Interests?: string[];
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async headers => {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    // signin apis

    login: builder.mutation<any, Credentials>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // signup apis

    register: builder.mutation<any, Credentials>({
      query: userData => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyRegisterOTP: builder.mutation<any, VerifyRegisterCredentials>({
      query: registerOTP => ({
        url: '/verify-otp',
        method: 'POST',
        body: registerOTP,
      }),
    }),
    //forgot password apis
    sendForgotPassOTP: builder.mutation<any, SendForgotPassOTPRequest>({
      query: request => ({
        url: '/sendotp-password',
        method: 'POST',
        body: request,
      }),
    }),
    verifyForgotPassOTP: builder.mutation<any, VerifyForgotPassOTPRequest>({
      query: request => ({
        url: '/verifyOtp-password',
        method: 'POST',
        body: request,
      }),
    }),
    changePassword: builder.mutation<any, ChangePassword>({
      query: request => ({
        url: '/update-password',
        method: 'PUT',
        body: request,
      }),
    }),
    // user apis
    getLoggedInUserData: builder.mutation<any, GetUserDataType>({
      query: request => ({
        url: '/token',
        method: 'POST',
        body: request,
      }),
    }),
    //onBoarding apis
    updateUserData: builder.mutation<any, UpdateData>({
      query: request => ({
        url: '/update',
        method: 'PUT',
        body: request,
      }),
    }),
    //resend-otp
    resendVerifyOTP: builder.mutation<any, SendForgotPassOTPRequest>({
      query: request => ({
        url: '/resend-otp',
        method: 'POST',
        body: request,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useVerifyRegisterOTPMutation,
  useRegisterMutation,
  useSendForgotPassOTPMutation,
  useVerifyForgotPassOTPMutation,
  useChangePasswordMutation,
  useGetLoggedInUserDataMutation,
  useUpdateUserDataMutation,
  useResendVerifyOTPMutation,
} = authApi;

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {logout} from "@social/redux/Slice/AuthSlice";

const API_URL = "https://social-media-11p4.onrender.com"; // Replace with your actual backend API URL

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
interface UpdateProfilePassword {
    email: string;
    currentPassword: string;
    newPassword: string;
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

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async headers => {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWrapper: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        await AsyncStorage.removeItem("token");
        api.dispatch(logout());
    }
    return result;
};

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWrapper,
    endpoints: builder => ({
        // signin apis

        login: builder.mutation<any, Credentials>({
            query: credentials => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        // signup apis

        register: builder.mutation<any, Credentials>({
            query: userData => ({
                url: "/auth/signup",
                method: "POST",
                body: userData,
            }),
        }),
        verifyRegisterOTP: builder.mutation<any, VerifyRegisterCredentials>({
            query: registerOTP => ({
                url: "/auth/verify-otp",
                method: "POST",
                body: registerOTP,
            }),
        }),
        //forgot password apis
        sendForgotPassOTP: builder.mutation<any, SendForgotPassOTPRequest>({
            query: request => ({
                url: "/auth/sendotp-password",
                method: "POST",
                body: request,
            }),
        }),
        verifyForgotPassOTP: builder.mutation<any, VerifyForgotPassOTPRequest>({
            query: request => ({
                url: "/auth/verifyOtp-password",
                method: "POST",
                body: request,
            }),
        }),
        changePassword: builder.mutation<any, ChangePassword>({
            query: request => ({
                url: "/auth/update-password",
                method: "PUT",
                body: request,
            }),
        }),
        // user apis
        getLoggedInUserData: builder.mutation<any, GetUserDataType>({
            query: request => ({
                url: "/auth/token",
                method: "POST",
                body: request,
            }),
        }),
        //onBoarding apis
        updateUserData: builder.mutation<any, UpdateData>({
            query: request => ({
                url: "/auth/update",
                method: "PUT",
                body: request,
            }),
        }),

        getAllUsers: builder.query<any, void>({
            query: () => ({
                url: "/auth/allUsers",
            }),
        }),

        //resend-otp
        resendVerifyOTP: builder.mutation<any, SendForgotPassOTPRequest>({
            query: request => ({
                url: "/auth/resend-otp",
                method: "POST",
                body: request,
            }),
        }),
        resendForgotVerifyOTP: builder.mutation<any, SendForgotPassOTPRequest>({
            query: request => ({
                url: "/auth/resend-otp/password",
                method: "POST",
                body: request,
            }),
        }),
        //update Password from Profile
        updateProfilePassword: builder.mutation<any, UpdateProfilePassword>({
            query: request => ({
                url: "/auth/password-manager",
                method: "POST",
                body: request,
            }),
        }),

        // -----Post Creation----------
        sharePost: builder.mutation<
            any,
            {media: any[]; id: string} & Partial<{
                caption: string;
                location: string;
                tag: any;
            }>
        >({
            query: request => ({
                url: "/post/onboard",
                method: "POST",
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
    useGetAllUsersQuery,
    useSharePostMutation,
    useUpdateProfilePasswordMutation,
    useResendVerifyOTPMutation,
    useResendForgotVerifyOTPMutation,
} = authApi;

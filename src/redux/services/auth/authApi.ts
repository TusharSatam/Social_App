import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {logout} from "@social/redux/Slice/AuthSlice";
import { ChangePassword, Credentials, fetchOthersFollowActivityStats, FollowUser, GetAllFollowers, GetAllMyFollowing, GetAllMyPosts, GetAllOtherPersonFollowers, GetAllOtherPersonFollowing, GetUserDataType, isFollowing, RemoveFollower, SendForgotPassOTPRequest, SocialLoginProps, UnFollowUser, UpdateData, UpdateProfilePassword, VerifyForgotPassOTPRequest, VerifyRegisterCredentials } from "../../../../type/types";

const API_URL = "https://social-media-node-n6qc.onrender.com"; // Replace with your actual backend API URL

// Define types for credentials and userData



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
    tagTypes:["profileActivity"],
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
        // -------------Faceboook Signup------------------
        facebookFirebaseLogin: builder.mutation<any, SocialLoginProps>({
            query: request => ({
                url: "/auth/facebook-login",
                method: "POST",
                body: request,
            }),
        }),
        // -------------Google Signup------------------
        googleFirebaseLogin: builder.mutation<any, SocialLoginProps>({
            query: request => ({
                url: "/auth/google-login",
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
            invalidatesTags:["profileActivity"],
        }),
        //---Profile Activitys apis
        followUser: builder.mutation<any, FollowUser>({
            query: request => ({
                url: "/auth/follow",
                method: "POST",
                body: request,
            }),
        }),
        unfollowUser: builder.mutation<any, UnFollowUser>({
            query: request => ({
                url: "/auth/unfollow",
                method: "POST",
                body: request,
            }),
        }),
        getAllMyPosts: builder.query<any, GetAllMyPosts>({
            query: ({ userId, page, limit }) => ({
              url: `/post/getAllMyPosts?userId=${userId}&page=${page}&limit=${limit}`,
              method: "GET",
            }),
            providesTags:["profileActivity"],
          }),
        getAllMyFollowing: builder.mutation<any, GetAllMyFollowing>({
            query: request => ({
                url: "/auth/getAllMyFollowingList",
                method: "POST",
                body: request,
            }),
        }),
        getOtherPersonFollowingList: builder.mutation<any, GetAllOtherPersonFollowing>({
            query: request => ({
                url: "/auth/getOtherPersonFollowingList",
                method: "POST",
                body: request,
            }),
        }),
        getOtherPersonFollowersList: builder.mutation<any, GetAllOtherPersonFollowers>({
            query: request => ({
                url: "/auth/getOtherPersonFollowersList",
                method: "POST",
                body: request,
            }),
        }),
        getAllFollowers: builder.mutation<any, GetAllFollowers>({
            query: request => ({
                url: "/auth/getAllFollowers",
                method: "POST",
                body: request,
            }),
        }),
        
        removeFollower: builder.mutation<any, RemoveFollower>({
            query: request => ({
                url: "/auth/removeFollower",
                method: "POST",
                body: request,
            }),
        }),
        getUserDetailsById: builder.mutation<any, { userId: string }>({
            query: ({ userId }) => ({
                url: `/auth/${userId}`,
                method: "GET",
            }),
        }),
        getProfileActivityStats: builder.query<any, string>({
            query: (userId) => ({
                url: `/auth/getProfileActivityStats`,
                method: "GET", // Adjust method as per your API
                params: { userId }, // Pass userId in the body or params as needed
            }),
        }),
        getAllMyShorts: builder.query<any, { page: number; user: string,limit:number }>({
            query: ({ page, user }) => ({
                url: "/shorts/getAllMyShorts",
                method: "GET",
                params: { page, user },
            }),
            providesTags:["profileActivity"],
        }),
        checkIsFollowing: builder.mutation<any, isFollowing>({
            query: request => ({
                url: "/auth/isFollowing",
                method: "POST",
                body: request,
            }),
        }),
        getAllMySavedPosts: builder.query<any, { page: number; userId: string;limit:number }>({
            query: ({ page, userId,limit }) => ({
                url:`/savepost/${userId}`,
                method: "GET",
                params: { page, limit },
            }),
        }),
        getAllMySavedShorts: builder.query<any, { page: number; userId: string;limit:number }>({
            query: ({ page, userId,limit }) => ({
                url: `/saveshorts/${userId}`,
                method: "GET",
                params: { page, limit },
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
    useGoogleFirebaseLoginMutation,
    useFacebookFirebaseLoginMutation,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useGetAllFollowersMutation,
    useGetAllMyFollowingMutation,
    useGetAllMyPostsQuery,
    useRemoveFollowerMutation,
    useGetUserDetailsByIdMutation,
    useGetProfileActivityStatsQuery,
    useGetOtherPersonFollowingListMutation,
    useGetOtherPersonFollowersListMutation,
    useCheckIsFollowingMutation,
    useGetAllMyShortsQuery,
    useGetAllMySavedPostsQuery,
    useGetAllMySavedShortsQuery
} = authApi;

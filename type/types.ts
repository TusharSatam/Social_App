export interface Credentials {
    email: string;
    password?: string;
}

export interface VerifyRegisterCredentials {
    otp: string;
    email: string;
    password: string;
}
// Define response types for each mutation endpoint
export interface GetUserDataType {
    token: string; // Adjust based on your actual response structure
}

export interface SendForgotPassOTPRequest {
    email: string;
}
export interface UpdateProfilePassword {
    email: string;
    currentPassword: string;
    newPassword: string;
}
export interface SocialLoginProps {
    email: string;
    name: string;
    photo: string;
}
export interface VerifyForgotPassOTPRequest {
    email: string;
}
export interface ChangePassword {
    email: string;
    newPassword: string;
}
export interface UpdateData {
    Name?: string;
    phone?: string;
    ProfilePicture?: string | null;
    Interests?: string[];
}

export interface FollowUser {
    myUserId: string;
    followUserId: string;
}
export interface RemoveFollower {
    myUserId: string;
    myFollowerUserId: string;
}
export interface UnFollowUser {
    myUserId: string;
    myFollowingUserId: string;
}

export interface UserRequest {
    userId: string;
    page?: number;
    limit?: number;
}

export interface GetAllMyPosts extends UserRequest {}
export interface GetAllFollowers extends UserRequest {}
export interface GetAllMyFollowing extends UserRequest {}

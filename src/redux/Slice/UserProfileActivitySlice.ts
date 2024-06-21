import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Define types for state and action payloads
interface UserProfileActivityState {
    followers: any[] | null; // Replace 'any[]' with the actual type of followers
    followings: any[] | null; // Replace 'any[]' with the actual type of followings
    posts: any[] | null; // Replace 'any[]' with the actual type of posts
    shorts: any[] | null; // Replace 'any[]' with the actual type of shorts
}

// Define initial state
const initialState: UserProfileActivityState = {
    followers: null,
    followings: null,
    posts: null,
    shorts: null,
};

const UserProfileActivitySlice = createSlice({
    name: "UserProfileActivity",
    initialState,
    reducers: {
        setFollowers(state, action: PayloadAction<any[]>) {
            state.followers = action.payload;
        },
        setFollowings(state, action: PayloadAction<any[]>) {
            state.followings = action.payload;
        },
        setPosts(state, action: PayloadAction<any[]>) {
            state.posts = action.payload;
        },
        setShorts(state, action: PayloadAction<any[]>) {
            state.shorts = action.payload;
        },
    },
});

// Export action creators with explicit types
export const {setFollowers, setFollowings, setPosts, setShorts} =
    UserProfileActivitySlice.actions;

// Export reducer with inferred type based on initialState
export default UserProfileActivitySlice.reducer;

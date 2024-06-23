import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Define types for state and action payloads
interface UserProfileActivityState {
    followers: any[] | null; 
    followings: any[] | null; 
    posts: any[] | null; 
    shorts: any[] | null; 
    savedPosts: any[] | null;
    savedShorts: any[] | null;
}

// Define initial state
const initialState: UserProfileActivityState = {
    followers: null,
    followings: null,
    posts: null,
    shorts: null,
    savedPosts: null,
    savedShorts: null,
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
        setSavedPosts(state, action: PayloadAction<any[]>) {
            state.savedPosts = action.payload;
        },
        setSavedShorts(state, action: PayloadAction<any[]>) {
            state.savedShorts = action.payload;
        },
    },
});

// Export action creators with explicit types
export const {setFollowers, setFollowings, setPosts, setShorts,setSavedPosts,setSavedShorts} =
    UserProfileActivitySlice.actions;

// Export reducer with inferred type based on initialState
export default UserProfileActivitySlice.reducer;

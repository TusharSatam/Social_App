import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mediaPosts: [],
};

export const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setMediaPosts(state, action) {
            state.mediaPosts = [...state.mediaPosts, ...action.payload];
        },

        updateMediaPosts(state, action) {
            state.mediaPosts = action.payload;
        },
        singleMediaPost(state, action) {
            state.mediaPosts = [...state.mediaPosts, action.payload];
        },
        clearMediaPost(state) {
            state.mediaPosts = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setMediaPosts,
    updateMediaPosts,
    singleMediaPost,
    clearMediaPost,
} = PostSlice.actions;

export default PostSlice.reducer;

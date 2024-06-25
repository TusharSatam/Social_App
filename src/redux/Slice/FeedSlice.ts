import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    commentFeedCacheReset: false,
};

export const FeedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        toggle(state, action) {
            state.commentFeedCacheReset = action.payload;
        },
    },
});

export const {toggle} = FeedSlice.actions;

export default FeedSlice.reducer;

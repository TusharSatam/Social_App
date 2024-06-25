// src/store.js
import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./services/auth/authApi";
import AuthSlice from "./Slice/AuthSlice";
import {composeWithDevTools} from "@redux-devtools/extension";
import PostSlice from "./Slice/PostSlice";
import UserProfileActivitySlice from "./Slice/UserProfileActivitySlice";
import ExploreSlice from "./Slice/ExploreSlice";
// import { composeWithDevTools } from 'redux-devtools-extension';
const store = configureStore({
    reducer: {
        auth: AuthSlice,
        post: PostSlice,
        userProfileActivity: UserProfileActivitySlice,
        explore: ExploreSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: composeWithDevTools(),
});

export default store;

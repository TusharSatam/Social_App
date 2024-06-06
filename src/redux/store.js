// src/store.js
import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./services/auth/authApi";
import AuthSlice from "./Slice/AuthSlice";
import {composeWithDevTools} from "@redux-devtools/extension";
import PostSlice from "./Slice/PostSlice";
// import { composeWithDevTools } from 'redux-devtools-extension';
const store = configureStore({
    reducer: {
        auth: AuthSlice,
        post: PostSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: composeWithDevTools(),
});

export default store;

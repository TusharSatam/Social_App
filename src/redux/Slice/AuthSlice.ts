import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for state and action payloads
interface AuthState {
  user: any; // Replace 'any' with the actual type of your user data
  token: string | null;
  isAuthenticated: boolean; // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null; // Replace 'string' with the actual type of your error data
}

interface SetAuthDataPayload {
  data: any; // Replace 'any' with the actual type of your user data
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<SetAuthDataPayload>) {
      state.user = action.payload.data;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

// Export action creators with explicit types
export const { setAuthData, logout } = AuthSlice.actions;

// Export reducer with inferred type based on initialState
export default AuthSlice.reducer;

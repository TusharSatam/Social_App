import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false, // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };
  
export const AuthSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAuthData(state, action) {
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
})

// Action creators are generated for each case reducer function
export const { setAuthData,logout  } = AuthSlice.actions

export default AuthSlice.reducer
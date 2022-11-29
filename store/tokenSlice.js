import { createSlice } from '@reduxjs/toolkit';

// Sample Code to create a slice of reducers
export const tokenSlice = createSlice({
  name: 'authTokens',
  initialState: {
    accessToken: null,
    refreshToken: null
  },
  reducers: {
    setAuthTokens: (state, payload) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
  }
});

export const { setAuthTokens } = tokenSlice.actions;
export default tokenSlice.reducer;

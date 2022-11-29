import { configureStore } from '@reduxjs/toolkit';
import tokenReducers from './tokenSlice';

export default configureStore({
  reducer: {
    authTokens: tokenReducers
  }
});

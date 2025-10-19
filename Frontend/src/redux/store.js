import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.jsx';
import reportSlice from './slices/reportSlice.jsx';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportSlice,

  },
});

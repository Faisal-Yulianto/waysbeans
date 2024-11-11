import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import profileReducer  from '../store/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

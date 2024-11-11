import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../hook/axiosClient';

// Define types for User, AuthState
interface User {
  id: number;
  email: string;
  fullname: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

// Async thunk for Register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string; fullname: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('auth/register', data);
      return response.data;  // Assuming the response has token and user data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('auth/login', data);
      const token = response.data.token; 
      if (token) {
        localStorage.setItem("token", token);
        return response.data; 
      } else {
        return rejectWithValue("Token tidak ditemukan");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register case
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login case
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log('Token setelah login: ', action.payload.token);
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '../hook/axiosClient';

interface User {
  email: string;
  fullname: string;
}

interface Profile {
  userId: number;
  image?: string | null;
  user: User;
}

interface ProfileState {
  profile: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

// Async thunk untuk mengambil profile dari API
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get<Profile>(`/api/profiles/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      return rejectWithValue(error?.response?.data || 'Failed to fetch profile');
    }
  }
);

// Async thunk untuk mengupdate profile di API
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (
    { userId, profileData, imageBuffer }: { userId: number; profileData: Partial<Profile>; imageBuffer?: Blob },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append('email', profileData.user?.email || '');
    formData.append('fullname', profileData.user?.fullname || '');
    if (imageBuffer) {
      formData.append('image', imageBuffer, 'profileImage.png');
    }

    try {
      const response = await axiosClient.put<Profile>(`/api/profiles/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return rejectWithValue(error?.response?.data || 'Failed to update profile');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducer for fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Reducer for updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;

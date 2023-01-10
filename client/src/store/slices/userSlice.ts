import { Status } from './../../types/index';
import { IUserAuthData, IUserLoginData } from './../../types/user';
import { RootState } from './../index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '../../http/userAPI';
import { AxiosError } from 'axios';

export const login = createAsyncThunk(
  'user/loginStatus',
  async (data: IUserLoginData, thunkApi) => {
    try {
      const response = await loginUser(data);
      return response.data;
    } catch (err) {
      const error: AxiosError<string> = err as any;
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      } else {
        return thunkApi.rejectWithValue('Непредвиденная ошибка!');
      }
    }
  }
);

export const logout = createAsyncThunk('user/logoutStatus', async () => {
  return await logoutUser();
});

export interface UserState {
  isAutheticated: boolean;
  userLoading: Status;
  data: IUserAuthData;
  error: string;
}

const initialState: UserState = {
  isAutheticated: false,
  userLoading: Status.LOADING,
  error: '',
  data: {
    email: '',
    name: '',
    isActivated: false,
    isAdmin: false,
    accessToken: '',
    refreshToken: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.userLoading = Status.LOADING;
      state.isAutheticated = false;
      state.data = initialState.data;
      state.error = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userLoading = Status.SUCCESS;
      state.isAutheticated = true;
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.userLoading = Status.FAILED;
      state.isAutheticated = false;
      state.data = initialState.data;
      state.error = action.payload as string;
    });
    builder.addCase(logout.pending, (state) => {
      state.userLoading = Status.LOADING;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userLoading = Status.SUCCESS;
      state.isAutheticated = false;
      state.data = initialState.data;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.userLoading = Status.FAILED;
      console.log(action.payload);
    });
  },
});

export const selectUserData = (state: RootState) => state.user.data;
export const selectUserLoading = (state: RootState) => state.user.userLoading;
export const selectAuthStatus = (state: RootState) => state.user.isAutheticated;

export default userSlice.reducer;

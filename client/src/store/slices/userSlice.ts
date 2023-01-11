import { Status } from './../../types/index';
import {
  IUserAuthData,
  IUserLoginData,
  IUserRegData,
} from './../../types/user';
import { RootState } from './../index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, loginUser, logoutUser } from '../../http/userAPI';
import axios, { AxiosError } from 'axios';

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

export const register = createAsyncThunk(
  'user/registerStatus',
  async (data: IUserRegData, thunkApi) => {
    try {
      const response = await createUser(data);
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

export const checkAuth = createAsyncThunk(
  'user/checkStatus',
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IUserAuthData>(
        `${process.env.REACT_APP_API_URL}/user/refresh`,
        { withCredentials: true }
      );
      console.log(response);

      return response.data;
    } catch (err) {
      console.log(err);

      const error: AxiosError<string> = err as any;
      if (error.response) {
        return thunkApi.rejectWithValue(error.response.data);
      } else {
        return thunkApi.rejectWithValue('Непредвиденная ошибка!');
      }
    }
  }
);

export const logout = createAsyncThunk(
  'user/logoutStatus',
  async (_, thunkApi) => {
    try {
      const response = await logoutUser();
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

export interface UserState {
  isAutheticated: boolean;
  userLoading: Status;
  data: IUserAuthData;
  error: string;
  message: string;
}

const initialState: UserState = {
  isAutheticated: false,
  userLoading: Status.LOADING,
  error: '',
  message: '',
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
    builder.addCase(register.pending, (state) => {
      state.userLoading = Status.LOADING;
      state.isAutheticated = false;
      state.data = initialState.data;
      state.error = '';
      state.message = '';
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.userLoading = Status.SUCCESS;
      state.isAutheticated = true;
      state.data = action.payload;
      state.error = '';
      state.message = `Пользователь ${action.payload.name} успешно зарегистрирован. Для полноценной работы активируйте аккаунт по ссылке, отправленной на почту ${action.payload.email}!`;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.userLoading = Status.FAILED;
      state.isAutheticated = false;
      state.data = initialState.data;
      state.error = action.payload as string;
      state.message = '';
    });
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
    builder.addCase(checkAuth.pending, (state) => {
      state.userLoading = Status.LOADING;
      state.isAutheticated = false;
      state.data = initialState.data;
      state.error = '';
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.userLoading = Status.SUCCESS;
      state.isAutheticated = true;
      state.data = action.payload;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.userLoading = Status.FAILED;
      state.isAutheticated = false;
      state.data = initialState.data;
      // state.error = action.payload as string;
    });
    builder.addCase(logout.pending, (state) => {
      state.userLoading = Status.LOADING;
      state.error = '';
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.userLoading = Status.SUCCESS;
      state.isAutheticated = false;
      state.data = initialState.data;
      state.error = '';
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.userLoading = Status.FAILED;
      state.error = action.payload as string;
    });
  },
});

export const selectUserData = (state: RootState) => state.user.data;
export const selectAdminStatus = (state: RootState) => state.user.data.isAdmin;
export const selectUserLoading = (state: RootState) => state.user.userLoading;
export const selectAuthStatus = (state: RootState) => state.user.isAutheticated;
export const selectError = (state: RootState) => state.user.error;
export const selectMessage = (state: RootState) => state.user.message;

export default userSlice.reducer;

import { Status } from './../../types/index';
import { RootState } from './../index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  error: string;
  message: string;
  status: Status;
}

const initialState: AppState = {
  status: Status.LOADING,
  error: '',
  message: '',
};

const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = Status.FAILED;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.status = Status.SUCCESS;
    },
  },
});

// export const selectAppError = (state: RootState) => state.app.error;
// export const selectAppMessage = (state: RootState) => state.app.message;
// export const selectAppStatus = (state: RootState) => state.app.status;

export default appSlice.reducer;

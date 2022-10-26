import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStorage } from '../../Types';
import { storage } from '../../Utils/storage';
import { IUserState } from '../redux-state';

export function createInitUserState(): IUserState {
  return {
    accessToken: null,
    isLoading: false,
  };
}

export const appSlice = createSlice({
  name: 'AppSlide',
  initialState: createInitUserState(),
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        storage.set(EStorage.TOKEN, action.payload);
        state.accessToken = action.payload;
      }
    },
    logOut: (state) => {
      state.accessToken = '';
      storage.delete(EStorage.TOKEN);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setAccessToken, logOut, setLoading } = appSlice.actions;
export default appSlice.reducer;

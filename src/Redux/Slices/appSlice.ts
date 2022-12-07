import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStorage } from '../../Types';
import { storage } from '../../Utils/storage';
import { IUserState } from '../redux-state';

export function createInitUserState(): IUserState {
  return {
    accessToken: null,
    isLoading: false,
    language: 'en',
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
    setLanguage: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        storage.set(EStorage.LANGUAGE, action.payload);
        state.language = action.payload;
      }
    },
  },
});
export const { setAccessToken, logOut, setLoading, setLanguage } = appSlice.actions;
export default appSlice.reducer;

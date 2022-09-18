import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStorage } from '../../Types';
import { storage } from '../../Utils/storage';
import { IUserState } from '../redux-state';

export function createInitUserState(): IUserState {
  return {
    accessToken: null,
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
      console.log('clear store ');
      state.accessToken = '';
      storage.delete(EStorage.TOKEN);
    },
  },
});
export const { setAccessToken, logOut } = appSlice.actions;
export default appSlice.reducer;

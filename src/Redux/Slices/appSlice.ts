import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        state.accessToken = action.payload;
      }
    },
    logOut: (state) => {
      state.accessToken = '';
    },
  },
});
export const { setAccessToken, logOut } = appSlice.actions;
export default appSlice.reducer;

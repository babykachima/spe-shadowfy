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
      console.log('payload action -->', action.payload);
      if (action.payload) {
        state.accessToken = action.payload;
      }
    },
  },
});
export const { setAccessToken } = appSlice.actions;
export default appSlice.reducer;

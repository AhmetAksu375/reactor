// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  aud: string | null;
  email: string | null;
  exp: number | null;
  iat: number | null;
  iss: string | null;
  nameid: string | null;
  nbf: number | null;
  unique_name: string | null;
}

const initialState: UserState = {
  aud: null,
  email: null,
  exp: null,
  iat: null,
  iss: null,
  nameid: null,
  nbf: null,
  unique_name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.aud = action.payload.aud;
      state.email = action.payload.email;
      state.exp = action.payload.exp;
      state.iat = action.payload.iat;
      state.iss = action.payload.iss;
      state.nameid = action.payload.nameid;
      state.nbf = action.payload.nbf;
      state.unique_name = action.payload.unique_name;
    },
    clearUser: (state) => {
      state.aud = null;
      state.email = null;
      state.exp = null;
      state.iat = null;
      state.iss = null;
      state.nameid = null;
      state.nbf = null;
      state.unique_name = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

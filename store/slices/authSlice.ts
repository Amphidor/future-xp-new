import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export interface AuthState {
  user: any | null;
  token: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("refreshToken");
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      // Also update the user cookie to keep in sync
      Cookies.set("user", JSON.stringify(action.payload));
    },
    rehydrateFromCookie(state) {
      const userStr = Cookies.get('user');
      const tokenStr = Cookies.get('token');
      if (userStr && tokenStr) {
        state.user = JSON.parse(userStr);
        state.token = tokenStr;
        state.loading = false;
        state.error = null;
      }
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure,updateUser, logout, rehydrateFromCookie } = authSlice.actions;
export default authSlice.reducer;
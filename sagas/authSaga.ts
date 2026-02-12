import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from "../store/slices/authSlice";
import Cookies from "js-cookie";

// Use local API route (proxy) to avoid CORS - proxies to console.future-xp.com
function loginApi(payload: { email: string; password: string }) {
  return axios.post("/api/auth/student-login", payload);
}

// Worker saga
function* handleLogin(action: ReturnType<typeof loginRequest>): any {
  try {
    const response = yield call(loginApi, action.payload);

    const { token, user } = response.data;
    
    // Save to cookies
    Cookies.set("user", JSON.stringify(user));
    Cookies.set("token", token);

    yield put(loginSuccess({ user, token }));
  } catch (error: any) {
    yield put(
      loginFailure(error.response?.data?.message || "Login failed")
    );
  }
}

// Logout saga
function* handleLogout() {
  Cookies.remove("user");
  Cookies.remove("token");
}

// Watcher saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}
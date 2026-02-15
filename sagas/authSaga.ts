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

const COOKIE_OPTIONS = { expires: 7 }; // 7 days

// Worker saga: save user + token from login response, then redirect is handled by LoginForm useEffect
function* handleLogin(action: ReturnType<typeof loginRequest>): any {
  try {
    const response = yield call(loginApi, action.payload);
    const data = response.data;

    const user = data.user ?? data;
    const token = data.token ?? data.accessToken;

    if (!user || !token) {
      yield put(loginFailure("Invalid login response"));
      return;
    }

    // Save to cookies so middleware and AuthCheck can use them
    Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
    Cookies.set("token", token, COOKIE_OPTIONS);
    if (data.refreshToken) {
      Cookies.set("refreshToken", data.refreshToken, COOKIE_OPTIONS);
    }

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
  Cookies.remove("refreshToken");
}

// Watcher saga
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}
import axios from "axios";

/** External backend API base – used for login and register from the client (e.g. on Amplify). */
export const EXTERNAL_API_URL = "https://console.future-xp.com/api";

/**
 * Single source for backend API base URL (server-side / Next.js API routes).
 * Local and production both use production URL by default (console.future-xp.com).
 * Override with BACKEND_URL or NEXT_PUBLIC_API_URL in .env to point elsewhere.
 */
const getApiBaseUrl = (): string => {
  const fromEnv =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
  if (fromEnv) return fromEnv.replace(/\/$/, ""); // trim trailing slash
  return EXTERNAL_API_URL;
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * For client-side login and register.
 * In development we use same-origin /api (Next.js proxy) to avoid CORS.
 * In production we call EXTERNAL_API_URL directly.
 */
export function getClientAuthBaseUrl(): string {
  if (typeof window === "undefined") return "";
  if (process.env.NODE_ENV === "development") return "";
  return EXTERNAL_API_URL;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

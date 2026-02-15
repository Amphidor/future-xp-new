import axios from "axios";

/** External backend API base – used for login and register from the client (e.g. on Amplify). */
export const EXTERNAL_API_URL = "https://console.future-xp.com/api";

/**
 * Single source for backend API base URL (server-side / Next.js API routes).
 * - npm run dev  → .env.development → http://localhost:3000/api
 * - npm run build / start / prod → .env.production → https://console.future-xp.com/api
 */
const getApiBaseUrl = (): string => {
  const fromEnv =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
  if (fromEnv) return fromEnv.replace(/\/$/, ""); // trim trailing slash
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : EXTERNAL_API_URL;
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * For client-side login and register. In development uses same-origin /api (Next.js proxy).
 * In production uses EXTERNAL_API_URL so auth works without API routes on Amplify.
 */
export function getClientAuthBaseUrl(): string {
  if (typeof window === "undefined") return ""; // SSR: use relative
  if (process.env.NODE_ENV === "development") return "";
  return EXTERNAL_API_URL;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

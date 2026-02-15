import axios from "axios";

/**
 * Single source for backend API base URL (used in lib/api.ts).
 * - npm run dev  → .env.development → http://localhost:3000/api
 * - npm run build / start / prod → .env.production → https://console.future-xp.com/api
 * Override via BACKEND_URL or NEXT_PUBLIC_API_URL in .env.local if needed.
 */
const getApiBaseUrl = (): string => {
  const fromEnv =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";
  if (fromEnv) return fromEnv.replace(/\/$/, ""); // trim trailing slash
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://console.future-xp.com/api";
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * For client-side auth calls. In development we use same-origin /api (Next.js proxy).
 * In production (e.g. Amplify static) we call the backend directly so auth works without API routes.
 */
export function getClientAuthBaseUrl(): string {
  if (typeof window === "undefined") return ""; // SSR: use relative
  const url =
    process.env.NEXT_PUBLIC_API_URL ?? "https://console.future-xp.com/api";
  return process.env.NODE_ENV === "development" ? "" : url.replace(/\/$/, "");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

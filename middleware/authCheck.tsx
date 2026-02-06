// components/AuthCheck.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";

interface AuthCheckProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = new Set<string>(["/login", "/signup", "/forgot-password"]);

export default function AuthCheck({ children }: AuthCheckProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (PUBLIC_ROUTES.has(pathname)) {
        if (!cancelled) setIsAuthenticated(true);
        return;
      }

      let token = Cookies.get("token");
      let refreshToken = Cookies.get("refreshToken");

      if (!token) {
        router.replace(`/login`);
        return;
      }

      try {
        await axios.get(`/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!cancelled) setIsAuthenticated(true);
      } catch (err: any) {
        const status = err?.response?.status;
        const message = err?.response?.data?.message;

        // -----------------------------------------
        // 🔥 FIX: TRY REFRESH-TOKEN BEFORE LOGOUT
        // -----------------------------------------
        if ((status === 401 || message === "Invalid token.") && refreshToken) {
          try {
            const res = await axios.post(`/api/auth/refresh-token`, {
              refreshToken,
            });

            // Save new tokens
            Cookies.set("token", res.data.accessToken, { expires: 7 });
            Cookies.set("refreshToken", res.data.refreshToken, { expires: 7 });

            // Retry /me with new access token
            await axios.get(`/api/user/me`, {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            });

            if (!cancelled) setIsAuthenticated(true);
            return;
          } catch (refreshErr) {
            // Refresh failed → proceed to logout
          }
        }

        // -----------------------------------------
        // ❌ OLD LOGOUT CODE (kept as-is)
        // -----------------------------------------
        try {
          await axios.post(`/api/auth/logout`, {}, { withCredentials: true });
        } catch (_) {}

        Cookies.remove("token");
        Cookies.remove("refreshToken");
        dispatch(logout());
        router.replace(`/login`);
        return;
      }
    }

    setIsAuthenticated(null);
    verify();

    return () => {
      cancelled = true;
    };
  }, [pathname, router, dispatch]);

  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <Image src="/germanfy_octopus_logo.png" alt="Logo Loader" width={128} height={128} />
        </motion.div>
        <div className="flex space-x-3 mt-4">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay }}
              className="w-6 h-6 rounded-full bg-primary shadow-md"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

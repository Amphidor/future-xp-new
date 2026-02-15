// components/AuthCheck.tsx
'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

interface AuthCheckProps {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = new Set<string>(["/login", "/signup", "/forgot-password"]);

export default function AuthCheck({ children }: AuthCheckProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (PUBLIC_ROUTES.has(pathname)) {
      setIsAuthenticated(true);
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      router.replace("/");
      return;
    }

    // Token present – allow access (no /me or /logout calls)
    setIsAuthenticated(true);
  }, [pathname, router]);

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

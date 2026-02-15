"use client";

import AuthCheck from "@/middleware/authCheck";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthCheck>{children}</AuthCheck>;
}

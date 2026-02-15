import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

const BACKEND_LOGIN_URL = `${API_BASE_URL}/auth/student-login`;

// Required so this route can read the request body (avoids static export bailout)
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("[student-login] Body parse error:", e);
    }
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { message: "Body must be an object with email and password" },
      { status: 400 }
    );
  }
  const { email, password } = body as Record<string, unknown>;
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const cookie = request.headers.get("cookie");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (cookie) headers["Cookie"] = cookie;

    const res = await fetch(BACKEND_LOGIN_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ email: String(email), password: String(password) }),
    });

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson
      ? await res.json()
      : { message: (await res.text()) || "Login failed" };

    if (!res.ok) {
      const message =
        data?.message ??
        data?.error ??
        (typeof data === "object" && data !== null && "message" in data
          ? (data as { message?: string }).message
          : null) ??
        "Login failed";
      return NextResponse.json(
        { message },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    const message = err.message;
    if (process.env.NODE_ENV === "development") {
      console.error("[student-login] Error:", message);
      console.error("[student-login] Backend URL:", BACKEND_LOGIN_URL);
    }
    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === "development"
            ? `Backend error: ${message}. Is the backend running at ${API_BASE_URL}?`
            : "Login failed",
        ...(process.env.NODE_ENV === "development" && {
          debug: { backendUrl: BACKEND_LOGIN_URL, error: message },
        }),
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

const BACKEND_REGISTER_URL = `${API_BASE_URL}/auth/student-register`;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(BACKEND_REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson
      ? await res.json()
      : { message: (await res.text()) || "Registration failed" };

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Registration failed" },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    const message = err.message;
    const stack = err.stack;
    if (process.env.NODE_ENV === "development") {
      console.error("[student-register] Error:", message);
      console.error("[student-register] Backend URL:", BACKEND_REGISTER_URL);
      console.error("[student-register] Stack:", stack);
    }
    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === "development"
            ? `Backend error: ${message}. Is the backend running on ${API_BASE_URL}?`
            : "Registration failed",
        ...(process.env.NODE_ENV === "development" && {
          debug: { backendUrl: BACKEND_REGISTER_URL, error: message },
        }),
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

// Static export: return 401 so build succeeds; with output: "export" there is no server – call backend from client.
export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  try {
    const res = await fetch(`${API_BASE_URL}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        data?.message ? { message: data.message } : { message: "Unauthorized" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

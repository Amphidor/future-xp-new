import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const cookieStore = cookies();
    const tokenFromCookie = cookieStore.get("token")?.value;
    const token = authHeader?.replace(/^Bearer\s+/i, "") || tokenFromCookie;

    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    const res = await fetch(`${API_BASE_URL}/career_cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        data?.message ? { message: data.message } : data,
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch career cards" },
      { status: 500 }
    );
  }
}

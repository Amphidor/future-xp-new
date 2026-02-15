import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const cookieStore = await cookies();
    const tokenFromCookie = cookieStore.get("token")?.value;
    const token = authHeader?.replace(/^Bearer\s+/i, "") || tokenFromCookie;

    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const card_id = body?.card_id;
    const swipe_action = body?.swipe_action;

    if (card_id == null || !["left", "right"].includes(swipe_action)) {
      return NextResponse.json(
        { message: "card_id and swipe_action (left|right) required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_BASE_URL}/swipeCard`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ card_id: Number(card_id), swipe_action }),
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
      { message: "Failed to record swipe" },
      { status: 500 }
    );
  }
}

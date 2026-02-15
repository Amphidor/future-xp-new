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
    const question_id = body?.question_id;
    const option_id = body?.option_id;

    if (question_id == null || option_id == null) {
      return NextResponse.json(
        { message: "question_id and option_id required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_BASE_URL}/sparkResponse`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question_id: Number(question_id),
        option_id: Number(option_id),
      }),
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
      { message: "Failed to submit response" },
      { status: 500 }
    );
  }
}

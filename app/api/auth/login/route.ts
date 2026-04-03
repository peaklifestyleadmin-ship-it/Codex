import { NextRequest, NextResponse } from "next/server";
import { signAccessToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const token = signAccessToken({ email, role: "admin" });
  return NextResponse.json({ token });
}

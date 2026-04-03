import { NextResponse } from "next/server";

export async function POST() {
  // Stub queue trigger for day-based campaign send.
  return NextResponse.json({ queued: true, cadence: [1, 2, 3] });
}

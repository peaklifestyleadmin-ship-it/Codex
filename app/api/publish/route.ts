import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  // Stub: integrate Pinterest + Reddit official APIs here.
  return NextResponse.json({ queued: true, accountsRotated: true, randomDelayApplied: true, payload });
}

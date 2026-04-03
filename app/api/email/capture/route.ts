import { NextRequest, NextResponse } from "next/server";
import { emailSequence } from "@/lib/email";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { email, source } = await request.json();
  await query("insert into leads(email, source, created_at) values($1,$2,now()) on conflict(email) do nothing", [
    email,
    source ?? "site"
  ]);
  const sequence = emailSequence(email);
  return NextResponse.json({ leadSaved: true, sequence });
}

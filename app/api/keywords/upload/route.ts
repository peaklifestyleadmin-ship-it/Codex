import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  const text = await request.text();
  const lines = text.trim().split("\n").slice(1);

  for (const line of lines) {
    const [keyword, niche, source, priority] = line.split(",");
    await query(
      `insert into keywords(keyword,niche,source,priority_score,status)
      values($1,$2,$3,$4,'new') on conflict do nothing`,
      [keyword, niche, source, Number(priority || 50)]
    );
  }

  return NextResponse.json({ inserted: lines.length });
}

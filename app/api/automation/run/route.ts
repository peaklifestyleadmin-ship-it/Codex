import { NextResponse } from "next/server";
import { discoverKeywords } from "@/lib/keyword-discovery";
import { query } from "@/lib/db";

export async function POST() {
  const discovered = await discoverKeywords();

  for (const row of discovered) {
    await query(
      `insert into keywords(keyword, niche, source, priority_score, status)
       values($1, 'general', $2, $3, 'new')
       on conflict (keyword) do update set priority_score = excluded.priority_score`,
      [row.keyword, row.source, row.score]
    );
  }

  return NextResponse.json({ discovered: discovered.length });
}

import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST() {
  const winners = await query<{ keyword_id: string }>(
    "select keyword_id from keyword_metrics where ctr > 5 and clicks > 100"
  );
  const underperformers = await query<{ keyword_id: string }>(
    "select keyword_id from keyword_metrics where ctr < 1 and clicks > 100"
  );

  return NextResponse.json({
    scaleKeywords: winners.map((w) => w.keyword_id),
    rewriteKeywords: underperformers.map((w) => w.keyword_id)
  });
}

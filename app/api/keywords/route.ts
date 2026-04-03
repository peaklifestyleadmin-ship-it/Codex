import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";

const keywordSchema = z.object({
  keyword: z.string().min(2),
  niche: z.string().min(2),
  source: z.enum(["manual", "pinterest", "amazon", "reddit"]),
  priority_score: z.number().min(0).max(100),
  status: z.enum(["new", "queued", "published", "archived"]).default("new")
});

export async function GET() {
  const rows = await query("select * from keywords order by created_at desc limit 500");
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const body = keywordSchema.parse(await request.json());
  const [created] = await query(
    `insert into keywords(keyword, niche, source, priority_score, status)
     values($1,$2,$3,$4,$5)
     returning *`,
    [body.keyword, body.niche, body.source, body.priority_score, body.status]
  );
  return NextResponse.json(created, { status: 201 });
}

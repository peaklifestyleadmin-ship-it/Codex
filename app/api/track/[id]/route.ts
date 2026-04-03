import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  await query(
    "insert into click_events(link_id, source, keyword, clicked_at, metadata) values($1,$2,$3,now(),$4)",
    [params.id, body.source ?? "unknown", body.keyword ?? "unknown", JSON.stringify(body)]
  );
  return NextResponse.json({ ok: true });
}

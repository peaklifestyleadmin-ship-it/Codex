import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const source = request.nextUrl.searchParams.get("source") ?? "direct";
  const keyword = request.nextUrl.searchParams.get("keyword") ?? "unknown";

  await query(
    "insert into click_events(link_id, source, keyword, clicked_at) values($1,$2,$3, now())",
    [params.id, source, keyword]
  );

  const [link] = await query<{ target_url: string }>("select target_url from redirect_links where id=$1", [params.id]);
  return NextResponse.redirect(link?.target_url ?? "https://www.amazon.com");
}

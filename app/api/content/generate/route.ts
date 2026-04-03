import { NextRequest, NextResponse } from "next/server";
import { generateContentPack } from "@/lib/content-engine";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { keywordId } = await request.json();
  const [keyword] = await query<{ keyword: string }>("select keyword from keywords where id=$1", [keywordId]);
  if (!keyword) return NextResponse.json({ error: "keyword not found" }, { status: 404 });

  const content = await generateContentPack(keyword.keyword);

  await query(
    `insert into content_assets(keyword_id, reddit_posts, pinterest_captions, blog_markdown, status)
     values($1,$2,$3,$4,'generated')`,
    [keywordId, content.reddit, content.pinterestCaptions, content.blogMarkdown]
  );

  return NextResponse.json(content);
}

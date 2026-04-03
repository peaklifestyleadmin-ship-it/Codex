import { NextRequest, NextResponse } from "next/server";
import { generatePinterestInfographics } from "@/lib/openai";

export async function POST(request: NextRequest) {
  const { keyword } = await request.json();
  const images = await generatePinterestInfographics(keyword);
  return NextResponse.json({ keyword, imagesGenerated: images.length, images });
}

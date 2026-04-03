import { MetadataRoute } from "next";
import { query } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.APP_URL ?? "http://localhost:3000";
  const posts = await query<{ slug: string }>("select slug from blog_posts where status='published'").catch(() => []);
  return [
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.9 },
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 }))
  ];
}

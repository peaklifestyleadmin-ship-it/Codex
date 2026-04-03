import Link from "next/link";
import { query } from "@/lib/db";

export default async function BlogIndexPage() {
  const posts = await query<{ slug: string; title: string; excerpt: string }>(
    "select slug, title, excerpt from blog_posts where status='published' order by published_at desc limit 50"
  ).catch(() => []);

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold">SEO Authority Blog</h1>
      {posts.map((post) => (
        <article key={post.slug} className="rounded border border-slate-800 p-4">
          <h2 className="font-semibold"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
          <p className="text-sm text-slate-300">{post.excerpt}</p>
        </article>
      ))}
    </section>
  );
}

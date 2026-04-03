import { notFound } from "next/navigation";
import { query } from "@/lib/db";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post] = await query<{ title: string; content_markdown: string }>(
    "select title, content_markdown from blog_posts where slug=$1 and status='published'",
    [params.slug]
  ).catch(() => []);

  if (!post) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{post.title}</h1>
      <pre className="whitespace-pre-wrap">{post.content_markdown}</pre>
    </article>
  );
}

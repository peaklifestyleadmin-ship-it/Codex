import Link from "next/link";

export default function ReviewPage({ params }: { params: { keyword: string } }) {
  const keyword = decodeURIComponent(params.keyword);
  const items = ["Option A", "Option B", "Option C"];

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Best {keyword}: Detailed Comparison</h1>
      <p className="text-slate-300">Pre-sell page with pros/cons and CTA routing via tracked redirects.</p>
      {items.map((item, i) => (
        <article key={item} className="rounded border border-slate-800 p-4">
          <h2 className="font-semibold">{item}</h2>
          <p>Pros: Strong ratings, budget fit. Cons: Limited accessories.</p>
          <Link href={`/go/${i + 1}?source=seo&keyword=${encodeURIComponent(keyword)}`} className="mt-2 inline-block rounded bg-emerald-500 px-3 py-2 font-medium text-black">Check price</Link>
        </article>
      ))}
    </section>
  );
}

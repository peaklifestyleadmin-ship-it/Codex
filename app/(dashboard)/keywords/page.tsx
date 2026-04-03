import { KeywordTable } from "@/components/keyword-table";
import { query } from "@/lib/db";
import { KeywordRow } from "@/types";

export default async function KeywordsPage() {
  const rows = await query<KeywordRow>(
    "select id, keyword, niche, source, priority_score, status, created_at from keywords order by created_at desc limit 200"
  ).catch(() => []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Keyword Management</h1>
      <p className="text-slate-300">Manual + auto discovered keywords with prioritization pipeline.</p>
      <KeywordTable rows={rows} />
    </section>
  );
}

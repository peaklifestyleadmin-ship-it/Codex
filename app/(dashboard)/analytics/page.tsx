import { AnalyticsCards } from "@/components/analytics-cards";
import { query } from "@/lib/db";

export default async function AnalyticsPage() {
  const [row] = await query<{ clicks: number; revenue: number; ctr: number; best_platform: string }>(`
    select 
      coalesce(sum(clicks), 0) as clicks,
      coalesce(sum(revenue_estimate), 0) as revenue,
      coalesce(avg(ctr), 0) as ctr,
      coalesce((select source from keyword_metrics order by clicks desc limit 1), 'n/a') as best_platform
    from keyword_metrics
  `).catch(() => [{ clicks: 0, revenue: 0, ctr: 0, best_platform: "n/a" }]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <AnalyticsCards
        metrics={{
          totalClicks: Number(row.clicks),
          estimatedRevenue: Number(row.revenue),
          bestPlatform: row.best_platform,
          ctr: Number(row.ctr)
        }}
      />
    </section>
  );
}

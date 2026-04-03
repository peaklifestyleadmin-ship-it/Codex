import { DashboardMetrics } from "@/types";

export function AnalyticsCards({ metrics }: { metrics: DashboardMetrics }) {
  const cards = [
    ["Total Clicks", metrics.totalClicks],
    ["Estimated Revenue", `$${metrics.estimatedRevenue.toFixed(2)}`],
    ["Best Platform", metrics.bestPlatform],
    ["Average CTR", `${metrics.ctr.toFixed(2)}%`]
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map(([label, value]) => (
        <article key={label} className="rounded border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </article>
      ))}
    </div>
  );
}

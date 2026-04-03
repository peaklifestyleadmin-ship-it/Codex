export type KeywordSource = "manual" | "pinterest" | "amazon" | "reddit";

export interface KeywordRow {
  id: string;
  keyword: string;
  niche: string;
  source: KeywordSource;
  priority_score: number;
  status: "new" | "queued" | "published" | "archived";
  created_at: string;
}

export interface DashboardMetrics {
  totalClicks: number;
  estimatedRevenue: number;
  bestPlatform: string;
  ctr: number;
}

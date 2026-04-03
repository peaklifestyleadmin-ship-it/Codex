import { scoreKeyword } from "@/lib/scoring";

export async function discoverKeywords() {
  // Placeholder connectors for Pinterest, Amazon, Reddit.
  const seeds = [
    "best ergonomic office chair",
    "standing desk under $300",
    "noise cancelling headphones review"
  ];

  return seeds.map((keyword, i) => ({
    keyword,
    source: i % 2 ? "amazon" : "reddit",
    score: scoreKeyword(keyword, 18 + i * 3)
  }));
}

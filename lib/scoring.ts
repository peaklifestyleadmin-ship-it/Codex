export function scoreKeyword(keyword: string, trendFrequency: number) {
  const buyerTerms = ["best", "review", "under", "vs", "top"];
  const buyerIntent = buyerTerms.some((term) => keyword.toLowerCase().includes(term)) ? 70 : 35;
  return Math.min(100, buyerIntent + Math.min(30, trendFrequency));
}

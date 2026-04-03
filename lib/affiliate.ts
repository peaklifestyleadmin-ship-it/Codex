interface NetworkPerformance {
  network: "amazon" | "clickbank" | "shareasale";
  epc: number;
}

export function pickAffiliateNetwork(perf: NetworkPerformance[]) {
  return perf.sort((a, b) => b.epc - a.epc)[0]?.network ?? "amazon";
}

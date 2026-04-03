import { discoveryQueue, optimizeQueue } from "@/lib/workers/queues";

async function run() {
  await discoveryQueue.add("daily-discovery", {}, { repeat: { pattern: "0 3 * * *" } });
  await optimizeQueue.add("daily-optimize", {}, { repeat: { pattern: "0 4 * * *" } });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

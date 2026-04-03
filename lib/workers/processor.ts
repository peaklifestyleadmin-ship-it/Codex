import { Worker } from "bullmq";
import IORedis from "ioredis";
import { discoverKeywords } from "@/lib/keyword-discovery";
import { generateContentPack } from "@/lib/content-engine";
import { generatePinterestInfographics } from "@/lib/openai";

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", { maxRetriesPerRequest: null });

export function startWorkers() {
  const discoveryWorker = new Worker(
    "keyword-discovery",
    async () => {
      const keywords = await discoverKeywords();
      return { count: keywords.length };
    },
    { connection }
  );

  const contentWorker = new Worker(
    "content-generation",
    async (job) => {
      const keyword = String(job.data.keyword);
      return generateContentPack(keyword);
    },
    { connection }
  );

  const publishWorker = new Worker(
    "publish-content",
    async (job) => {
      await new Promise((r) => setTimeout(r, 1000 + Math.random() * 3000));
      return { posted: true, channels: job.data.channels ?? ["reddit", "pinterest", "blog"] };
    },
    { connection }
  );

  const optimizationWorker = new Worker(
    "optimize",
    async (job) => {
      if (job.data.mode === "scale") return generatePinterestInfographics(job.data.keyword);
      return { rewritten: true };
    },
    { connection }
  );

  return [discoveryWorker, contentWorker, publishWorker, optimizationWorker];
}

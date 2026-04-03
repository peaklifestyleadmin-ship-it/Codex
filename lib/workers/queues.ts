import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", { maxRetriesPerRequest: null });

export const discoveryQueue = new Queue("keyword-discovery", { connection });
export const contentQueue = new Queue("content-generation", { connection });
export const publishQueue = new Queue("publish-content", { connection });
export const optimizeQueue = new Queue("optimize", { connection });

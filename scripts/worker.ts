import { startWorkers } from "@/lib/workers/processor";

const workers = startWorkers();
console.log(`Workers started: ${workers.length}`);

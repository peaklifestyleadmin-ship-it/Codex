const required = ["OPENAI_API_KEY", "DATABASE_URL", "REDIS_URL"] as const;

export function assertEnv() {
  const missing = required.filter((item) => !process.env[item]);
  if (missing.length) {
    throw new Error(`Missing env vars: ${missing.join(", ")}`);
  }
}

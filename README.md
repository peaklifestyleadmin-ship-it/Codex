# Affiliate Autopilot SaaS (Next.js + Postgres + BullMQ)

Production-oriented SaaS template that automates an affiliate marketing flywheel:

1. Keyword discovery (manual + automated)
2. AI content generation (SEO/Reddit/Pinterest)
3. Image generation for infographics
4. Multi-channel publishing pipeline
5. Click/lead/revenue tracking
6. Auto-optimization loop

## Project Structure

- `app/` - Next.js app routes, dashboard pages, APIs, redirect tracking
- `components/` - UI components for keyword + analytics dashboards
- `lib/` - database, env, scoring, affiliate rotation, AI modules
- `lib/workers/` - BullMQ queue declarations and workers
- `scripts/` - worker bootstrap and recurring scheduler
- `db/schema.sql` - PostgreSQL schema and metrics view

## Local Setup

```bash
cp .env.example .env
npm install
psql "$DATABASE_URL" -f db/schema.sql
npm run dev
```

Run background workers:

```bash
npm run worker
npx tsx scripts/scheduler.ts
```

## Deployment (Production)

1. **Frontend/API**: Deploy on Vercel or containerized Node runtime.
2. **DB**: Use Supabase or managed PostgreSQL.
3. **Queue**: Use Redis (Upstash/ElastiCache).
4. **Worker**: Deploy `scripts/worker.ts` as a long-running process (Render/Fly/AWS ECS).
5. **Scheduler**: Configure cron to call `/api/automation/run` + `/api/optimize/run` or run `scripts/scheduler.ts` once in worker bootstrap.

## Safety + Compliance Notes

- Use official Pinterest/Reddit APIs and respect Terms of Service.
- Add moderation + rate limiting before enabling full autopublishing.
- Add legal disclosures for affiliate content (FTC + platform requirements).

## Required Environment Variables

- `OPENAI_API_KEY`
- `REDDIT_API_KEYS`
- `PINTEREST_API_KEYS`
- `DATABASE_URL`
- `REDIS_URL`
- `APP_URL`

## Testing in Codex

Run a smoke-test helper tailored for restricted Codex environments:

```bash
bash scripts/run-codex-tests.sh
```

This script checks project structure, Node/npm availability, optional `psql`, attempts dependency install + typecheck, and reports warnings when environment limitations block full runtime validation.


create extension if not exists "pgcrypto";

create table if not exists keywords (
  id uuid primary key default gen_random_uuid(),
  keyword text unique not null,
  niche text not null,
  source text not null check (source in ('manual','pinterest','amazon','reddit')),
  priority_score int not null default 50,
  status text not null default 'new' check (status in ('new','queued','published','archived')),
  created_at timestamptz not null default now()
);

create table if not exists content_assets (
  id uuid primary key default gen_random_uuid(),
  keyword_id uuid not null references keywords(id) on delete cascade,
  reddit_posts text,
  pinterest_captions text,
  blog_markdown text,
  image_urls jsonb default '[]'::jsonb,
  status text not null default 'generated',
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  keyword_id uuid references keywords(id) on delete set null,
  slug text unique not null,
  title text not null,
  excerpt text,
  content_markdown text not null,
  seo_title text,
  seo_description text,
  status text not null default 'draft',
  published_at timestamptz
);

create table if not exists redirect_links (
  id bigserial primary key,
  keyword_id uuid references keywords(id) on delete set null,
  network text not null check (network in ('amazon','clickbank','shareasale')),
  target_url text not null,
  epc numeric(10,2) not null default 0,
  active boolean not null default true
);

create table if not exists click_events (
  id bigserial primary key,
  link_id bigint not null references redirect_links(id) on delete cascade,
  source text not null,
  keyword text not null,
  metadata jsonb,
  clicked_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists email_events (
  id bigserial primary key,
  lead_id uuid references leads(id) on delete cascade,
  day_number int not null,
  status text not null,
  scheduled_at timestamptz,
  sent_at timestamptz
);

create materialized view if not exists keyword_metrics as
select
  k.id as keyword_id,
  coalesce(sum(case when c.source = 'pinterest' then 1 else 0 end),0) as pinterest_clicks,
  coalesce(sum(case when c.source = 'reddit' then 1 else 0 end),0) as reddit_clicks,
  coalesce(count(c.id),0) as clicks,
  case when coalesce(count(c.id),0) = 0 then 0 else (count(c.id)::numeric / greatest(1000, count(c.id)) * 100) end as ctr,
  coalesce(sum(r.epc),0) as revenue_estimate,
  case
    when coalesce(sum(case when c.source = 'pinterest' then 1 else 0 end),0) >= coalesce(sum(case when c.source = 'reddit' then 1 else 0 end),0) then 'pinterest'
    else 'reddit'
  end as source
from keywords k
left join redirect_links r on r.keyword_id = k.id
left join click_events c on c.link_id = r.id
group by k.id;

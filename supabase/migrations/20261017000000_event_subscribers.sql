-- Email subscribers for new FCC events (/events).
--
-- Visitors subscribe without an account, so these tables are only touched by
-- the server with the service role key (SUPABASE_SERVICE_ROLE_KEY): RLS is on
-- with no policies, which blocks the anon and authenticated roles entirely.

create table public.event_subscribers (
	id uuid primary key default gen_random_uuid(),
	email text not null unique check (email = lower(email) and char_length(email) <= 254),
	-- Secret for the confirm and unsubscribe links in emails
	token uuid not null unique default gen_random_uuid(),
	created_at timestamptz not null default now(),
	-- Last confirmation email sent, to throttle repeat sign-ups
	confirm_sent_at timestamptz,
	confirmed_at timestamptz,
	unsubscribed_at timestamptz
);

create index event_subscribers_active_idx
	on public.event_subscribers (confirmed_at)
	where confirmed_at is not null and unsubscribed_at is null;

alter table public.event_subscribers enable row level security;

-- One row per Sanity event that has been announced, so a webhook retry (or a
-- re-publish) never emails subscribers twice
create table public.event_announcements (
	sanity_id text primary key,
	title text not null,
	recipients integer not null default 0,
	created_at timestamptz not null default now()
);

alter table public.event_announcements enable row level security;

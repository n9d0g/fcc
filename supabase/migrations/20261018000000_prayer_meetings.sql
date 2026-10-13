-- Weekly prayer meeting schedule (replaces the "prayer" type in Sanity).
--
-- Admins manage it at /admin/prayer. Each meeting has a leader *name*, shown
-- publicly on /ministries/prayer, and optionally a linked site account. Only
-- linked leaders get reminder emails (2 weeks, 1 week and the day of), sent
-- by /api/cron/prayer-reminders.

create table public.prayer_meetings (
	id uuid primary key default gen_random_uuid(),
	meeting_date date not null unique,
	-- null while the devotional is still unassigned ("TBA")
	leader_name text check (char_length(leader_name) between 1 and 100),
	leader_user_id uuid references auth.users (id) on delete set null,
	scripture text check (char_length(scripture) <= 200),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table public.prayer_meetings enable row level security;

create policy "Anyone reads the prayer schedule"
	on public.prayer_meetings for select
	to anon, authenticated
	using (true);

create policy "Admins add meetings"
	on public.prayer_meetings for insert
	to authenticated
	with check ((select public.is_admin()));

create policy "Admins edit meetings"
	on public.prayer_meetings for update
	to authenticated
	using ((select public.is_admin()))
	with check ((select public.is_admin()));

create policy "Admins delete meetings"
	on public.prayer_meetings for delete
	to authenticated
	using ((select public.is_admin()));

-- Signed-out visitors only see the public columns, not which account leads
revoke all on public.prayer_meetings from anon;
grant select (id, meeting_date, leader_name, scripture) on public.prayer_meetings to anon;

create or replace function public.prayer_meetings_touch()
returns trigger
language plpgsql
as $$
begin
	new.updated_at := now();
	return new;
end;
$$;

create trigger prayer_meetings_touch
	before update on public.prayer_meetings
	for each row execute function public.prayer_meetings_touch();

-- One row per reminder sent. Keyed by the leader too, so if a meeting is
-- reassigned the new leader still gets their own reminders.
create table public.prayer_reminders (
	meeting_id uuid not null references public.prayer_meetings (id) on delete cascade,
	leader_user_id uuid not null references auth.users (id) on delete cascade,
	kind text not null check (kind in ('two_weeks', 'one_week', 'day_of')),
	sent_at timestamptz not null default now(),
	primary key (meeting_id, leader_user_id, kind)
);

-- Server only (service role); no policies
alter table public.prayer_reminders enable row level security;

-- Accounts admins can link a leader to. auth.users isn't readable through the
-- API, so this returns nothing unless the caller is an admin.
create or replace function public.admin_list_users()
returns table (id uuid, email text, display_name text)
language sql
stable
security definer
set search_path = ''
as $$
	select u.id, u.email::text, nullif(trim(u.raw_user_meta_data ->> 'display_name'), '')
	from auth.users u
	where public.is_admin() and u.email is not null
	order by coalesce(nullif(trim(u.raw_user_meta_data ->> 'display_name'), ''), u.email::text)
$$;

revoke execute on function public.admin_list_users() from public, anon;
grant execute on function public.admin_list_users() to authenticated;

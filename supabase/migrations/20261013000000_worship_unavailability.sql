-- Sundays a worship team member can't serve.
--
-- Approved team members block out Sundays from /ministries/praise/availability;
-- admins are emailed on every change and see everyone's dates at
-- /admin/availability.

create table public.worship_unavailability (
	-- References the team request (unique per user) rather than auth.users so
	-- PostgREST can embed the member's name, and leaving the team clears it
	user_id uuid not null references public.worship_team_requests (user_id) on delete cascade,
	sunday date not null check (extract(dow from sunday) = 0),
	created_at timestamptz not null default now(),
	primary key (user_id, sunday)
);

create index worship_unavailability_sunday_idx
	on public.worship_unavailability (sunday);

alter table public.worship_unavailability enable row level security;

create policy "Members read their own dates; admins read all"
	on public.worship_unavailability for select
	to authenticated
	using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "Team members block out their own Sundays"
	on public.worship_unavailability for insert
	to authenticated
	with check (
		user_id = (select auth.uid())
		and (select public.is_worship_team())
	);

create policy "Team members clear their own Sundays"
	on public.worship_unavailability for delete
	to authenticated
	using (user_id = (select auth.uid()));

-- Admin emails for availability notifications. auth.users isn't readable
-- through the API, so this hands them out only to team members and admins.
create or replace function public.admin_emails()
returns setof text
language sql
stable
security definer
set search_path = ''
as $$
	select email::text from auth.users
	where raw_app_meta_data ->> 'role' = 'admin'
		and email is not null
		and (public.is_worship_team() or public.is_admin())
$$;

revoke execute on function public.admin_emails() from public, anon;
grant execute on function public.admin_emails() to authenticated;

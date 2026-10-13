-- Worship team join requests.
--
-- A signed-in user can submit one request; an admin approves or rejects it,
-- either from /admin/worship-requests on the site or by editing `status` in
-- the Supabase Table Editor (which bypasses RLS).
--
-- Admins are users with app_metadata.role = 'admin'. app_metadata can only be
-- changed with the service role, so users can't promote themselves. To make
-- someone an admin, run in the SQL editor:
--
--   update auth.users
--   set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'
--   where email = 'someone@example.com';

create type public.worship_request_status as enum ('pending', 'approved', 'rejected');

create table public.worship_team_requests (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null unique references auth.users (id) on delete cascade,
	email text not null,
	full_name text not null check (char_length(full_name) between 1 and 100),
	roles text[] not null default '{}',
	message text check (char_length(message) <= 1000),
	status public.worship_request_status not null default 'pending',
	created_at timestamptz not null default now(),
	reviewed_at timestamptz,
	reviewed_by uuid references auth.users (id) on delete set null
);

create index worship_team_requests_status_idx
	on public.worship_team_requests (status, created_at desc);

-- Reads auth.users rather than the JWT so a newly promoted admin doesn't have
-- to wait for their token to refresh.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
	select coalesce(
		(select raw_app_meta_data ->> 'role' from auth.users where id = auth.uid()) = 'admin',
		false
	)
$$;

-- For gating worship-team-only data in future RLS policies.
create or replace function public.is_worship_team()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
	select exists (
		select 1 from public.worship_team_requests
		where user_id = auth.uid() and status = 'approved'
	)
$$;

alter table public.worship_team_requests enable row level security;

create policy "Users read their own request; admins read all"
	on public.worship_team_requests for select
	to authenticated
	using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "Users submit a pending request for themselves"
	on public.worship_team_requests for insert
	to authenticated
	with check (
		user_id = (select auth.uid())
		and email = (select auth.jwt() ->> 'email')
		and status = 'pending'
		and reviewed_at is null
		and reviewed_by is null
	);

create policy "Admins review requests"
	on public.worship_team_requests for update
	to authenticated
	using ((select public.is_admin()))
	with check ((select public.is_admin()));

create policy "Admins delete requests"
	on public.worship_team_requests for delete
	to authenticated
	using ((select public.is_admin()));

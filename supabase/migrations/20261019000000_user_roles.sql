-- Leader roles below the superuser.
--
-- Superusers are still the users with app_metadata.role = 'admin' (see
-- 20261012000000_worship_team_requests.sql). They can do everything, and they
-- hand out the narrower roles below at /admin/users:
--
--   prayer_leader   manages the prayer schedule (/admin/prayer)
--   worship_leader  sees song usage and adds songs (/ministries/praise/song-usage)
--
-- One row per role a user holds, so someone can be both. To add a role later:
--
--   alter type public.app_role add value 'youth_leader';
--
-- then list it in ROLES (src/lib/schemas/roles.ts) and use
-- public.has_role('youth_leader') in that feature's policies.

create type public.app_role as enum ('prayer_leader', 'worship_leader');

create table public.user_roles (
	user_id uuid not null references auth.users (id) on delete cascade,
	role public.app_role not null,
	granted_at timestamptz not null default now(),
	granted_by uuid references auth.users (id) on delete set null,
	primary key (user_id, role)
);

alter table public.user_roles enable row level security;

create policy "Users read their own roles; superusers read all"
	on public.user_roles for select
	to authenticated
	using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "Superusers grant roles"
	on public.user_roles for insert
	to authenticated
	with check ((select public.is_admin()));

create policy "Superusers revoke roles"
	on public.user_roles for delete
	to authenticated
	using ((select public.is_admin()));

-- True for superusers and for anyone granted the role. Reads the table rather
-- than the JWT, so a new role works without signing out and back in.
create or replace function public.has_role(r public.app_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
	select public.is_admin() or exists (
		select 1 from public.user_roles
		where user_id = auth.uid() and role = r
	)
$$;

-- Left executable by anon: the restrictive songs policies below run for
-- signed-out visitors too, and it's simply false for them

-- Prayer schedule: prayer leaders get what admins had
-- (20261018000000_prayer_meetings.sql)

drop policy "Admins add meetings" on public.prayer_meetings;
drop policy "Admins edit meetings" on public.prayer_meetings;
drop policy "Admins delete meetings" on public.prayer_meetings;

create policy "Prayer leaders add meetings"
	on public.prayer_meetings for insert
	to authenticated
	with check ((select public.has_role('prayer_leader')));

create policy "Prayer leaders edit meetings"
	on public.prayer_meetings for update
	to authenticated
	using ((select public.has_role('prayer_leader')))
	with check ((select public.has_role('prayer_leader')));

create policy "Prayer leaders delete meetings"
	on public.prayer_meetings for delete
	to authenticated
	using ((select public.has_role('prayer_leader')));

-- Prayer leaders link meetings to accounts, and superusers assign roles, so
-- both can list users. Still returns nothing for anyone else.
create or replace function public.admin_list_users()
returns table (id uuid, email text, display_name text)
language sql
stable
security definer
set search_path = ''
as $$
	select u.id, u.email::text, nullif(trim(u.raw_user_meta_data ->> 'display_name'), '')
	from auth.users u
	where public.has_role('prayer_leader') and u.email is not null
	order by coalesce(nullif(trim(u.raw_user_meta_data ->> 'display_name'), ''), u.email::text)
$$;

-- Songs: worship leaders read and add them (20261016000000_songs_admin_only.sql)

drop policy "Only admins read songs" on public.songs;
drop policy "Admins read songs" on public.songs;

create policy "Only worship leaders read songs"
	on public.songs
	as restrictive
	for select
	to anon, authenticated
	using ((select public.has_role('worship_leader')));

create policy "Worship leaders read songs"
	on public.songs for select
	to authenticated
	using ((select public.has_role('worship_leader')));

-- Restrictive for the same reason as reads: any older permissive insert
-- policy on songs can't let anyone else in
create policy "Only worship leaders add songs"
	on public.songs
	as restrictive
	for insert
	to anon, authenticated
	with check ((select public.has_role('worship_leader')));

create policy "Worship leaders add songs"
	on public.songs for insert
	to authenticated
	with check ((select public.has_role('worship_leader')));

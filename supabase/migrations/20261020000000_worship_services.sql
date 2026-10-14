-- Worship schedule and team roster (replace the "praise" and
-- "praise-assignments" types in Sanity).
--
-- Worship leaders (public.has_role('worship_leader'), see
-- 20261019000000_user_roles.sql) manage both at /admin/worship. Everyone can
-- read them on /ministries/praise/schedule.

create table public.worship_services (
	id uuid primary key default gen_random_uuid(),
	service_date date not null unique,

	-- Team, as names: plenty of members don't have an account
	lead text check (char_length(lead) <= 200),
	guitar text check (char_length(guitar) <= 200),
	backup_guitar text check (char_length(backup_guitar) <= 200),
	keys text check (char_length(keys) <= 200),
	bass text check (char_length(bass) <= 200),
	drums text check (char_length(drums) <= 200),
	electric text check (char_length(electric) <= 200),
	md text check (char_length(md) <= 200),
	backup text check (char_length(backup) <= 200),
	av text check (char_length(av) <= 200),

	-- Sermon
	series text check (char_length(series) <= 200),
	topic text check (char_length(topic) <= 200),
	speaker text check (char_length(speaker) <= 200),
	scripture text check (char_length(scripture) <= 200),
	objective text check (char_length(objective) <= 2000),
	summary text check (char_length(summary) <= 2000),

	-- [{ "title": "...", "artist": "..." }], in running order
	songs jsonb not null default '[]' check (jsonb_typeof(songs) = 'array'),
	-- [{ "name": "...", "reason": "..." }], shown publicly
	unavailable jsonb not null default '[]' check (jsonb_typeof(unavailable) = 'array'),

	-- Chords PDF. chords_path is set for files in the "chords" bucket below;
	-- services imported from Sanity keep pointing at Sanity's CDN instead.
	chords_url text,
	chords_path text,

	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	updated_by uuid references auth.users (id) on delete set null
);

alter table public.worship_services enable row level security;

create policy "Anyone reads the worship schedule"
	on public.worship_services for select
	to anon, authenticated
	using (true);

create policy "Worship leaders add services"
	on public.worship_services for insert
	to authenticated
	with check ((select public.has_role('worship_leader')));

create policy "Worship leaders edit services"
	on public.worship_services for update
	to authenticated
	using ((select public.has_role('worship_leader')))
	with check ((select public.has_role('worship_leader')));

create policy "Worship leaders delete services"
	on public.worship_services for delete
	to authenticated
	using ((select public.has_role('worship_leader')));

create or replace function public.worship_services_touch()
returns trigger
language plpgsql
as $$
begin
	new.updated_at := now();
	new.updated_by := auth.uid();
	return new;
end;
$$;

create trigger worship_services_touch
	before insert or update on public.worship_services
	for each row execute function public.worship_services_touch();

-- Who plays what, shown under the schedule. Values match WORSHIP_POSITIONS
-- in src/lib/schemas/worship-schedule.ts.
create table public.worship_roster (
	id uuid primary key default gen_random_uuid(),
	position text not null check (
		position in ('leader', 'acoustic_guitar', 'keys', 'bass', 'drums', 'electric_guitar', 'backup')
	),
	name text not null check (char_length(name) between 1 and 100),
	created_at timestamptz not null default now(),
	unique (position, name)
);

alter table public.worship_roster enable row level security;

create policy "Anyone reads the worship roster"
	on public.worship_roster for select
	to anon, authenticated
	using (true);

create policy "Worship leaders add to the roster"
	on public.worship_roster for insert
	to authenticated
	with check ((select public.has_role('worship_leader')));

create policy "Worship leaders remove from the roster"
	on public.worship_roster for delete
	to authenticated
	using ((select public.has_role('worship_leader')));

-- Chords PDFs. Public bucket, so the schedule links straight to the file;
-- only worship leaders can upload or remove.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('chords', 'chords', true, 20971520, array['application/pdf'])
on conflict (id) do nothing;

create policy "Worship leaders list chords"
	on storage.objects for select
	to authenticated
	using (bucket_id = 'chords' and (select public.has_role('worship_leader')));

create policy "Worship leaders upload chords"
	on storage.objects for insert
	to authenticated
	with check (bucket_id = 'chords' and (select public.has_role('worship_leader')));

create policy "Worship leaders remove chords"
	on storage.objects for delete
	to authenticated
	using (bucket_id = 'chords' and (select public.has_role('worship_leader')));

-- Worship leaders schedule the team, so they see who blocked out which
-- Sundays (/admin/availability), not just superusers. Approving join requests
-- stays with superusers.

drop policy "Members read their own dates; admins read all"
	on public.worship_unavailability;

create policy "Members read their own dates; worship leaders read all"
	on public.worship_unavailability for select
	to authenticated
	using (user_id = (select auth.uid()) or (select public.has_role('worship_leader')));

drop policy "Users read their own request; admins read all"
	on public.worship_team_requests;

create policy "Users read their own request; worship leaders read all"
	on public.worship_team_requests for select
	to authenticated
	using (user_id = (select auth.uid()) or (select public.has_role('worship_leader')));

-- Who to email when a team member changes their availability: superusers and
-- worship leaders. Like admin_emails(), only callable by team members and
-- leaders, since auth.users isn't readable through the API.
create or replace function public.worship_leader_emails()
returns setof text
language sql
stable
security definer
set search_path = ''
as $$
	select distinct u.email::text from auth.users u
	where u.email is not null
		and (
			u.raw_app_meta_data ->> 'role' = 'admin'
			or exists (
				select 1 from public.user_roles r
				where r.user_id = u.id and r.role = 'worship_leader'
			)
		)
		and (public.is_worship_team() or public.has_role('worship_leader'))
$$;

revoke execute on function public.worship_leader_emails() from public, anon;
grant execute on function public.worship_leader_emails() to authenticated;

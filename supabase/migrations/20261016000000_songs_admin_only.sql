-- Song usage is for superusers only (/ministries/praise/song-usage).
--
-- public.songs was created outside these migrations, so its existing policies
-- aren't known here. A RESTRICTIVE policy is ANDed with every permissive one,
-- so reads require an admin even if an older "anyone can read" policy is still
-- around. The service role (scripts, Table Editor) bypasses RLS as before.

alter table public.songs enable row level security;

create policy "Only admins read songs"
	on public.songs
	as restrictive
	for select
	to anon, authenticated
	using ((select public.is_admin()));

-- Restrictive policies only narrow access, so admins also need a permissive
-- one in case none exists yet
create policy "Admins read songs"
	on public.songs for select
	to authenticated
	using ((select public.is_admin()));

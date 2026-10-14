-- Follow-ups to 20261020000000_worship_services.sql:
--
--   1. Drop the MD and Sound/AV columns from the schedule.
--   2. Backup vocals become a list, since a service can have several.
--   3. Roster names can be linked to site accounts. A linked entry takes the
--      account's display name, and follows it when the person renames
--      themselves on /account.

-- 1 + 2. Existing backup text ("Ana, Ben & Cy") is split into names, the same
-- way splitNames() in src/lib/schemas/worship-schedule.ts does for imports.
-- (ALTER ... USING can't take a subquery, hence the add/copy/swap.)

alter table public.worship_services
	add column backup_list text[] not null default '{}';

update public.worship_services
set backup_list = array(
	select trim(name)
	from unnest(regexp_split_to_array(backup, '\s*(,|;|/|&|\mand\M)\s*', 'i')) as name
	where trim(name) <> ''
	limit 10
)
where backup is not null;

alter table public.worship_services
	drop column md,
	drop column av,
	drop column backup;

alter table public.worship_services rename column backup_list to backup;

alter table public.worship_services
	add constraint worship_services_backup_check check (cardinality(backup) <= 10);

-- 3. Roster entries linked to accounts

alter table public.worship_roster
	add column user_id uuid references auth.users (id) on delete set null;

create policy "Worship leaders edit the roster"
	on public.worship_roster for update
	to authenticated
	using ((select public.has_role('worship_leader')))
	with check ((select public.has_role('worship_leader')));

-- Worship leaders pick accounts to link, alongside prayer leaders linking
-- meetings. Otherwise unchanged from 20261019000000_user_roles.sql.
create or replace function public.admin_list_users()
returns table (id uuid, email text, display_name text)
language sql
stable
security definer
set search_path = ''
as $$
	select u.id, u.email::text, nullif(trim(u.raw_user_meta_data ->> 'display_name'), '')
	from auth.users u
	where (public.has_role('prayer_leader') or public.has_role('worship_leader'))
		and u.email is not null
	order by coalesce(nullif(trim(u.raw_user_meta_data ->> 'display_name'), ''), u.email::text)
$$;

-- Also renames the person's roster entries. Otherwise unchanged from
-- 20261015000000_sync_display_name.sql.
create or replace function public.sync_display_name()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
	-- Trimmed and capped to fit the name columns' 100-character checks
	display_name text := left(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), 100);
begin
	if display_name is null
		or display_name is not distinct from left(nullif(trim(old.raw_user_meta_data ->> 'display_name'), ''), 100)
	then
		return new;
	end if;

	update public.worship_team_requests
	set full_name = display_name
	where user_id = new.id and full_name is distinct from display_name;

	update public.blog_author_requests
	set full_name = display_name
	where user_id = new.id and full_name is distinct from display_name;

	-- author_name is recomputed from blog_author_requests by
	-- blog_posts_before_write, so touching the rows is enough
	update public.blog_posts
	set author_name = display_name
	where author_id = new.id and author_name is distinct from display_name;

	-- Skips a position that already lists someone by the new name, so a
	-- clash can't block the person's profile update
	update public.worship_roster r
	set name = display_name
	where r.user_id = new.id
		and r.name is distinct from display_name
		and not exists (
			select 1 from public.worship_roster o
			where o.position = r.position and o.name = display_name and o.id <> r.id
		);

	return new;
end;
$$;

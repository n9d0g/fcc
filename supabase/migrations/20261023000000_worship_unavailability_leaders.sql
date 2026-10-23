-- Worship leaders block out Sundays too, whether or not they ever filed a
-- worship team request.
--
-- worship_unavailability.user_id used to reference the team request, so
-- PostgREST could embed the member's name. It now references the account, and
-- worship_unavailability_members() does the naming instead.

alter table public.worship_unavailability
	drop constraint worship_unavailability_user_id_fkey,
	add constraint worship_unavailability_user_id_fkey
		foreign key (user_id) references auth.users (id) on delete cascade;

drop policy "Team members block out their own Sundays"
	on public.worship_unavailability;

create policy "Worship members block out their own Sundays"
	on public.worship_unavailability for insert
	to authenticated
	with check (
		user_id = (select auth.uid())
		and (select public.is_worship_member())
	);

-- Who blocked out which Sundays, named from their team request or, for leaders
-- without one, their account. auth.users isn't readable through the API, so
-- this returns nothing unless the caller is a worship leader.
create or replace function public.worship_unavailability_members(
	from_date date,
	to_date date default null
)
returns table (sunday date, full_name text, email text, roles text[])
language sql
stable
security definer
set search_path = ''
as $$
	select
		wu.sunday,
		coalesce(
			r.full_name,
			nullif(trim(u.raw_user_meta_data ->> 'display_name'), ''),
			split_part(u.email::text, '@', 1)
		),
		coalesce(r.email, u.email::text),
		coalesce(r.roles, '{}')
	from public.worship_unavailability wu
	join auth.users u on u.id = wu.user_id
	left join public.worship_team_requests r on r.user_id = wu.user_id
	where public.has_role('worship_leader')
		and wu.sunday >= from_date
		and (to_date is null or wu.sunday <= to_date)
	order by wu.sunday
$$;

revoke execute on function public.worship_unavailability_members(date, date)
	from public, anon;
grant execute on function public.worship_unavailability_members(date, date)
	to authenticated;

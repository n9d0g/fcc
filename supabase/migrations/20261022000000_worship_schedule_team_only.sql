-- The worship schedule and roster are for the worship team only, not everyone
-- (they were readable by anon in 20261020000000_worship_services.sql).
--
-- "Worship team" here means approved members (public.is_worship_team()) plus
-- worship leaders and superusers (public.has_role('worship_leader')).

create or replace function public.is_worship_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
	select public.is_worship_team() or public.has_role('worship_leader')
$$;

revoke execute on function public.is_worship_member() from public, anon;
grant execute on function public.is_worship_member() to authenticated;

drop policy "Anyone reads the worship schedule" on public.worship_services;

create policy "Worship team reads the worship schedule"
	on public.worship_services for select
	to authenticated
	using ((select public.is_worship_member()));

drop policy "Anyone reads the worship roster" on public.worship_roster;

create policy "Worship team reads the worship roster"
	on public.worship_roster for select
	to authenticated
	using ((select public.is_worship_member()));

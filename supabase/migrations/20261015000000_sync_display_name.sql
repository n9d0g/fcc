-- Keep names in sync with the account's display name.
--
-- The worship team and blog author requests each store the name entered when
-- the person applied, and blog posts copy the author's name for public pages.
-- When the display name changes (on /account, or by hand in the dashboard /
-- SQL editor), push it to all three so the person shows up the same way
-- everywhere.

-- Only bump updated_at when the post itself changes, so syncing an author's
-- name doesn't make every post look freshly edited (it feeds "Last edited"
-- and the sitemap's lastmod). Otherwise unchanged from 20261014000000_blog.sql.
create or replace function public.blog_posts_before_write()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
	new.author_name := coalesce(
		(select full_name from public.blog_author_requests where user_id = new.author_id),
		''
	);

	if tg_op = 'INSERT' then
		new.created_at := now();
		new.updated_at := now();
	elsif (new.title, new.excerpt, new.body, new.status)
		is distinct from (old.title, old.excerpt, old.body, old.status) then
		new.updated_at := now();
	else
		new.updated_at := old.updated_at;
	end if;

	if not public.is_admin() then
		if tg_op = 'INSERT' then
			new.reviewed_at := null;
			new.reviewed_by := null;
			new.review_note := null;
			new.published_at := null;
		else
			new.reviewed_at := old.reviewed_at;
			new.reviewed_by := old.reviewed_by;
			new.review_note := old.review_note;
			new.published_at := old.published_at;
		end if;
	end if;

	if new.status = 'pending' and (tg_op = 'INSERT' or old.status <> 'pending') then
		new.submitted_at := now();
	end if;
	if new.status = 'published' and (tg_op = 'INSERT' or old.status <> 'published') then
		new.published_at := now();
	end if;

	return new;
end;
$$;

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

	return new;
end;
$$;

create trigger sync_display_name
	after update of raw_user_meta_data on auth.users
	for each row execute function public.sync_display_name();

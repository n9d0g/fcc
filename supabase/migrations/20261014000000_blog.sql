-- Community blog.
--
-- Two approval steps, both done by admins at /admin/blog:
--   1. A signed-in user requests author access (blog_author_requests).
--   2. An approved author writes posts and submits them; an admin publishes
--      or rejects each one (blog_posts.status).
--
-- Published posts are public. Authors can edit their drafts, pending and
-- rejected posts, but a published post is locked; an admin can unpublish it
-- back to a draft if it needs changes.

create table public.blog_author_requests (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null unique references auth.users (id) on delete cascade,
	email text not null,
	full_name text not null check (char_length(full_name) between 1 and 100),
	message text check (char_length(message) <= 1000),
	status public.worship_request_status not null default 'pending',
	created_at timestamptz not null default now(),
	reviewed_at timestamptz,
	reviewed_by uuid references auth.users (id) on delete set null
);

create index blog_author_requests_status_idx
	on public.blog_author_requests (status, created_at desc);

create or replace function public.is_blog_author()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
	select exists (
		select 1 from public.blog_author_requests
		where user_id = auth.uid() and status = 'approved'
	)
$$;

alter table public.blog_author_requests enable row level security;

create policy "Users read their own author request; admins read all"
	on public.blog_author_requests for select
	to authenticated
	using (user_id = (select auth.uid()) or (select public.is_admin()));

create policy "Users request author access for themselves"
	on public.blog_author_requests for insert
	to authenticated
	with check (
		user_id = (select auth.uid())
		and email = (select auth.jwt() ->> 'email')
		and status = 'pending'
		and reviewed_at is null
		and reviewed_by is null
	);

create policy "Admins review author requests"
	on public.blog_author_requests for update
	to authenticated
	using ((select public.is_admin()))
	with check ((select public.is_admin()));

create policy "Admins delete author requests"
	on public.blog_author_requests for delete
	to authenticated
	using ((select public.is_admin()));

create type public.blog_post_status as enum ('draft', 'pending', 'published', 'rejected');

create table public.blog_posts (
	id uuid primary key default gen_random_uuid(),
	-- References the author request (unique per user) so revoking access
	-- removes their posts too
	author_id uuid not null references public.blog_author_requests (user_id) on delete cascade,
	-- Copied from the author request by trigger so public pages can show it
	-- without exposing the request table
	author_name text not null default '',
	slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	title text not null check (char_length(title) between 1 and 120),
	excerpt text not null default '' check (char_length(excerpt) <= 300),
	body text not null check (char_length(body) between 1 and 20000),
	status public.blog_post_status not null default 'draft',
	review_note text check (char_length(review_note) <= 1000),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	submitted_at timestamptz,
	published_at timestamptz,
	reviewed_at timestamptz,
	reviewed_by uuid references auth.users (id) on delete set null
);

create index blog_posts_published_idx
	on public.blog_posts (published_at desc) where status = 'published';
create index blog_posts_author_idx on public.blog_posts (author_id, updated_at desc);
create index blog_posts_pending_idx
	on public.blog_posts (submitted_at) where status = 'pending';

-- Server-owned columns: the author's name, timestamps, and (for anyone but an
-- admin) the review fields, so authors can't forge an approval
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
	new.updated_at := now();

	if tg_op = 'INSERT' then
		new.created_at := now();
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

create trigger blog_posts_before_write
	before insert or update on public.blog_posts
	for each row execute function public.blog_posts_before_write();

alter table public.blog_posts enable row level security;

create policy "Anyone reads published posts"
	on public.blog_posts for select
	to anon, authenticated
	using (status = 'published');

create policy "Authors read their own posts; admins read all"
	on public.blog_posts for select
	to authenticated
	using (author_id = (select auth.uid()) or (select public.is_admin()));

create policy "Authors write drafts and submit posts"
	on public.blog_posts for insert
	to authenticated
	with check (
		author_id = (select auth.uid())
		and (select public.is_blog_author())
		and status in ('draft', 'pending')
	);

create policy "Authors edit their unpublished posts"
	on public.blog_posts for update
	to authenticated
	using (author_id = (select auth.uid()) and status <> 'published')
	with check (
		author_id = (select auth.uid())
		and (select public.is_blog_author())
		and status in ('draft', 'pending')
	);

create policy "Admins review posts"
	on public.blog_posts for update
	to authenticated
	using ((select public.is_admin()))
	with check ((select public.is_admin()));

create policy "Authors delete their unpublished posts; admins delete any"
	on public.blog_posts for delete
	to authenticated
	using (
		(author_id = (select auth.uid()) and status <> 'published')
		or (select public.is_admin())
	);

-- Let blog requesters and authors look up who to notify, alongside the
-- worship team (see 20261013000000_worship_unavailability.sql)
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
		and (
			public.is_worship_team()
			or public.is_admin()
			or exists (
				select 1 from public.blog_author_requests
				where user_id = auth.uid() and status <> 'rejected'
			)
		)
$$;

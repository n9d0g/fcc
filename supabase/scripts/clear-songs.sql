-- Clears every song from public.songs (the data behind /ministries/praise/song-usage).
--
-- Run by hand in the Supabase SQL editor. This is deliberately NOT a
-- migration, so it never runs on its own.
--
-- It copies the songs into backup.songs_<date> first. The `backup` schema isn't
-- exposed through the API, so the copy stays private.
--
-- To undo:
--   insert into public.songs select * from backup.songs_20261016;
--
-- Once you're sure you don't need it:
--   drop table backup.songs_20261016;

begin;

create schema if not exists backup;

-- Fails if today's backup already exists, rather than overwriting it.
-- Rename the table (and the restore line above) to run it again.
create table backup.songs_20261016 as
	select * from public.songs;

-- delete rather than truncate, so it still works if another table
-- references songs (truncate would refuse, or with cascade, wipe that too)
delete from public.songs;

-- Sanity check: shows how many songs were backed up (and so deleted)
select count(*) as songs_backed_up from backup.songs_20261016;

commit;

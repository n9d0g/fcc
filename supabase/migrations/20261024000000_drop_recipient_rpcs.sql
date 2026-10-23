-- Notification recipients are now looked up server-side with the service role
-- (src/lib/server/notifier.ts), so these caller-gated lookups are unused.

drop function if exists public.admin_emails();
drop function if exists public.worship_leader_emails();

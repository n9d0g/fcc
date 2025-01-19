import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	'https://iszwzekctytqgkzlplio.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzend6ZWtjdHl0cWdremxwbGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NTc1MjUsImV4cCI6MjA1MTQzMzUyNX0.Zir9sjg3DWOdFoNbCSB2_B677FafzzK-2fgbkoEvTpo'
)

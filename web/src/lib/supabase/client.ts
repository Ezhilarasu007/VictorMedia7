import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oymdfzwugtgkphlcahgp.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bWRmend1Z3Rna3BobGNhaGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MjgwNTgsImV4cCI6MjEwMzIwNDA1OH0._Wm98QUoi-QLzKWBoizPUW2DXc1SrgUILyRMJjqxWew'
  );
}

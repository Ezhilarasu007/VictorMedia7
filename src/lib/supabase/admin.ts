import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bWRmend1Z3Rna3BobGNhaGdwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzYyODA1OCwiZXhwIjoyMTAzMjA0MDU4fQ.wiBhjbKv6uo69DSsl5PKVB6sDbH9_32aUDL85BItwIo';
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oymdfzwugtgkphlcahgp.supabase.co';

  return createSupabaseClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

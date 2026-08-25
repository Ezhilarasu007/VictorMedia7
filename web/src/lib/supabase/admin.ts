import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// SECURE SERVER-ONLY SUPABASE ADMIN CLIENT
// Never expose SUPABASE_SERVICE_ROLE_KEY to client-side JS
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';

  if (!serviceKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. Operating with standard privileges.');
    return createSupabaseClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key');
  }

  return createSupabaseClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

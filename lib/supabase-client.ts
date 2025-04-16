import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

/**
 * Initialize and return a Supabase client
 * This ensures we only create one instance of the client
 */
export function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      `Supabase credentials missing: ${!supabaseUrl ? 'URL' : ''} ${
        !supabaseAnonKey ? 'Anon Key' : ''
      }`
    );
    return null;
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    return null;
  }
}

/**
 * Check if Supabase environment variables are set
 */
export function hasSupabaseCredentials() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
} 
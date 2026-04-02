import { createClient } from "@supabase/supabase-js";

// Make sure to add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Exporting a singleton client. Since we are doing output: 'export' for GitHub pages, 
// we rely entirely on the standard browser localStorage for Supabase Auth persistence.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

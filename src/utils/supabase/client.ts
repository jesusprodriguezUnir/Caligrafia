import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
	"";

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient() {
	if (supabaseClient) {
		return supabaseClient;
	}

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error(
			"Supabase env vars faltantes. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY (o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)."
		);
	}

	// Singleton client for browser runtime in static deployments.
	supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
	return supabaseClient;
}

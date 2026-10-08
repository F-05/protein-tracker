import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseURL || !supabaseKEY) {
    throw new Error("Missing supabase environment variables");
}

export const supabase = createClient(supabaseURL, supabaseKEY);
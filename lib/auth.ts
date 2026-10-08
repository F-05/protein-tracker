import { supabase } from "@/lib/supabase";

let sessionPromise: Promise<void> | null = null;

export function ensureSession(): Promise<void> {
    if (!sessionPromise) {
        sessionPromise = (async () => {
            const { data } = await supabase.auth.getSession();

            if (!data.session) {
                const { error } = await supabase.auth.signInAnonymously();

                if (error) {
                    console.error("Anonyous sign-in failed:", error.message);
                    sessionPromise = null;
                }
            }
        })();
    }

    return sessionPromise;
}